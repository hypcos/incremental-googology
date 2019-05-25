const Loop = ()=>{
   setTimeout(Loop,v.UpdateInterval);
   var n
   ,dt=(Date.now()-LastUpdate)*0.001;
   LastUpdate=Date.now();
   for(n=v.Counting.length;--n;) v.CountingEff[n]=Plus(v.CountingEff[n],Times(Times(v.Counting[n],v.CountingEff[n+1]||1),dt));
   Vue.set(v.CountingEff,0,v.CountingEff[0]);
   v.MainNumber=Plus(v.MainNumber,Times(v.Growth,dt));
   if(v.AutoSave&&LastUpdate-LastSave>=v.AutoSave){
      LastSave=LastUpdate;
      Save(0)
   }
}
,InitialString = JSON.stringify({
   UpdateInterval:62
   ,AutoSave:5000
   ,ExportBox:false
   ,ExportContent:''
   ,MainNumber:1.0001
   ,CurrentTab:0
   ,RevCounting:0
   ,Counting:[0]
   ,CountingBought:[0]
   ,CountingEff:[1]
   ,KCounting:[195643523275200]
   ,CountingBulklevel:[0]
});
var LastUpdate=Date.now()
,LastSave=Date.now()
,LastGame=Date.now()
,v = new Vue({
   el:'#game'
   ,data:JSON.parse(InitialString)
   ,computed:{
      Growth(){return Times(this.Counting[0],this.CountingEff[1]||1)}
      ,CountingCost(){return this.CountingBought.map((x,n)=>{var u=Plus(x,1);return Times(Plus(n+1,Divide(Times(u,u),this.KCounting[n])),u)})}
      ,CantCounting(){
         var n,a=[LessQ(this.MainNumber,this.CountingCost[0])];
         for(n=this.Counting.length;--n;) a[n]=LessQ(this.Counting[n-1],this.CountingCost[n]);
         return a
      }
   }
   ,methods:{
      Save:n=>Save(n)
      ,Load:n=>Load(n)
      ,Export(){
         Save(0);
         this.ExportContent=localStorage.getItem('0').split('').map(x=>String.fromCharCode(174+(x.charCodeAt(0)>>8),174+(x.charCodeAt(0)&255))).join('');
         this.ExportBox=true
      }
      ,Import(){
         var arr=this.ExportContent.split(''),i;
         for(i=0;i<arr.length;++i) arr.splice(i,2,String.fromCharCode((arr[i].charCodeAt(0)-174<<8)+arr[i+1].charCodeAt(0)-174));
         localStorage.setItem('0',arr.join(''));
         this.ExportBox=false;
         Load(0)
      }
      ,Reset(){
         if(!confirm('Unlike other resets, you will lose all the process WITHOUT ANY BONUS OR REWARD.\nDo you really want a FULL reset?')) return;
         LastGame=Date.now();
         var init=JSON.parse(InitialString);
         Object.getOwnPropertyNames(init).map(x=>this[x]=init[x]);
         Save(0)
      }
      ,shortScaleName:x=>ShortScaleName(x)
      ,ShortScaleName:x=>UpperFirst(ShortScaleName(x))
      ,Show:(n,x)=>Show(n,3,Math.pow(10,n+1))(x)
      ,ShowInt:(n,x)=>Show(n,0,Math.pow(10,n+1))(x)
      ,ShowPercent:x=>Math.abs(x)<0.009995?x.toExponential(2):x.toPrecision(3)
      ,BuyCounting(n){
         if(n) this.Counting[n-1]=Minus(this.Counting[n-1],this.CountingCost[n]);
         else this.MainNumber=Minus(this.MainNumber,this.CountingCost[0]);
         Vue.set(this.Counting,n,Plus(this.Counting[n],1));
         Vue.set(this.CountingBought,n,Plus(this.CountingBought[n],1))
      }
      ,BulkCounting(n){
         const n1=n+1
         ,f=x=>{var u=Times(x,Plus(x,1));return Times(Plus(Times(n1,0.5),Times(0.25,Divide(u,this.KCounting[n]))),u)}
         ,solve=Y=>{
            var z,u,sq=Times(n1,n1);
            if(LessQ(Y,Times(Times(0.00006,this.KCounting[n]),sq))){
               z=Divide(Y,Times(sq,this.KCounting[n]));
               u=Times(Divide(Plus(Y,Y),n1),Minus(1,Times(z,Minus(1,Plus(z,z)))))
            }else{
               u=Times(Minus(Power(Plus(sq,Times(4,Divide(Y,this.KCounting[n]))),0.5),n1),this.KCounting[n])
            }
            return Plus(Power(Plus(u,0.25),0.5),-0.5)
         };
         var available,delta;
         available=Times(n?this.Counting[n-1]:this.MainNumber,Math.exp(this.CountingBulklevel[n]));
         delta=Floor(Minus(solve(Plus(available,f(this.CountingBought[n]))),this.CountingBought[n]));
         if(Sign(delta)<0) delta=0;
         if(n) this.Counting[n-1]=Minus(this.Counting[n-1],Min(Minus(f(Plus(this.CountingBought[n],delta)),f(this.CountingBought[n])),available));
         else this.MainNumber=Minus(this.MainNumber,Min(Minus(f(Plus(this.CountingBought[n],delta)),f(this.CountingBought[n])),available));
         Vue.set(this.Counting,n,Plus(this.Counting[n],delta));
         Vue.set(this.CountingBought,n,Plus(this.CountingBought[n],delta))
      }
      ,BUYCounting(){
         var n;
         if(this.RevCounting) for(n=this.Counting.length;n--;) this.BulkCounting(n);
         else for(n=0;n<this.Counting.length;++n) this.BulkCounting(n)
      }
   }
   ,watch:{
      Counting(a){
         var l=a.length;
         if(LessQ(a[l-1],l+1)) return;
         a[l]=0;
         this.CountingBought[l]=0;
         this.CountingEff[l]=1;
         this.KCounting[l]=195643523275200;
         if(!this.CountingBulklevel.hasOwnProperty(l)) this.CountingBulklevel[l]=0;
      }
   }
});
//Save and load
//Deal with Number (length 4 stream, start<=65520), N (big number representation, length 9 stream, start>=65528), Array (start 65526, end 65527).
const NumberToStream = x=>{//Works for 4/MAX <= x <= MAX
   var sign,expo,frac;
   if(x==0){
      sign=0;
      expo=0;
      frac=0
   }else if(isFinite(x)){
      sign=x<0;
      expo=Math.floor(Math.log2(Math.abs(x)))+1023;
      frac=Math.abs(x)/Math.pow(2,expo-1075)-4503599627370496
   }else if(x==Infinity){
      sign=0;
      expo=2047;
      frac=0
   }else if(x==-Infinity){
      sign=1;
      expo=2047;
      frac=0
   }else{
      sign=0;
      expo=2047;
      frac=1
   }
   return String.fromCharCode((sign<<15)+(expo<<4)+Math.floor(frac/281474976710656),Math.floor(frac/4294967296)&65535,Math.floor(frac/65536)&65535,frac&65535)
}
,StreamToNumber = x=>{
   var sign=x.charCodeAt(0)>>15
   ,expo=x.charCodeAt(0)>>4&2047
   ,frac=(x.charCodeAt(0)&15)*281474976710656+x.charCodeAt(1)*4294967296+x.charCodeAt(2)*65536+x.charCodeAt(3);
   if(expo==0) return 0;
   if(expo==2047) return frac?NaN:sign?-Infinity:Infinity;
   return Math.pow(2,expo-1075)*(4503599627370496+frac)*(sign?-1:1)
}
,NToStream = x=>String.fromCharCode(65528+(x.neg<<1)+x.recip)+NumberToStream(x.val)+NumberToStream(x.pt)
,StreamToN = x=>({neg:x.charCodeAt(0)&2,recip:x.charCodeAt(0)&1,val:StreamToNumber(x.substr(1,4)),pt:StreamToNumber(x.substr(5,4))})
,ToStream = x=>{
   var str,i;
   if(Array.isArray(x)){
      str=String.fromCharCode(65526);
      for(i=0;i<x.length;++i) str+=ToStream(x[i]);
      return str+String.fromCharCode(65527)
   }
   return typeof x=='object'&&x.hasOwnProperty('neg')?NToStream(x):NumberToStream(+x)
}
,FromStream = x=>{
   var xleft,stack;
   if(x.charCodeAt(0)<=65520) return StreamToNumber(x);
   if(x.charCodeAt(0)>=65528) return StreamToN(x);
   if(x.charCodeAt(0)!=65526) return;
   stack=[[]];
   xleft=x.substr(1);
   while(xleft.length){
      if(xleft.charCodeAt(0)<=65520){
         stack[stack.length-1].push(StreamToNumber(xleft.substr(0,4)));
         xleft=xleft.substr(4)
      }else if(xleft.charCodeAt(0)>=65528){
         stack[stack.length-1].push(StreamToN(xleft.substr(0,9)));
         xleft=xleft.substr(9)
      }else if(xleft.charCodeAt(0)==65526){
         stack.push([]);
         xleft=xleft.substr(1)
      }else if(stack.length==1){
         return stack[0]
      }else{
         stack[stack.length-2].push(stack[stack.length-1]);
         stack.pop();
         xleft=xleft.substr(1)
      }
   }
}
,Save = n=>{
   var rev=v.RevCounting;
   localStorage.setItem(''+n,ToStream([LastUpdate,[v.UpdateInterval,v.AutoSave],[LastGame],[],v.MainNumber,[rev,v.Counting,v.CountingBought,v.CountingEff,v.KCounting,v.CountingBulklevel]]))
}
,Load = n=>{
   var stream=localStorage.getItem(''+n),rev;
   if(stream) [LastUpdate,[v.UpdateInterval,v.AutoSave],[LastGame],[],v.MainNumber,[rev,v.Counting,v.CountingBought,v.CountingEff,v.KCounting,v.CountingBulklevel]]=FromStream(stream)
   v.RevCounting=rev&1
};
//Initialization
Load(0);
document.body.removeChild(document.getElementById('loading'));
Loop()
