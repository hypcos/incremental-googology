const Loop = ()=>{
   setTimeout(Loop,v.UpdateInterval);
   var digit_=Floor(Log(10,v.MainNumber))
   ,dt=(Date.now()-LastUpdate)*0.001
   ,n,temp;
   LastUpdate=Date.now();
   for(temp=v.HigherDigitEff[0]||1,n=v.Teens.length;n--;) temp=Times(temp,v.TeensEff[n]);
   v.TenEff=Plus(v.TenEff,Times(Times(v.Ten,temp),dt));
   for(n=v.FirstDigit.length;n--;) v.FirstDigitEff[n]=Plus(v.FirstDigitEff[n],Times(Times(v.FirstDigit[n],Times(v.FirstDigitEff[n+1]||1,v.TysEff[n]||1)),dt));
   Vue.set(v.FirstDigitEff,0,v.FirstDigitEff[0]);
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
   ,MainNumber:1
   ,CurrentTab:0
   ,RevFirstDigit:false
   ,RevTeens:false
   ,RevTys:false
   ,RevHigherDigit:false
   ,One:0
   ,OneBought:0
   ,OneBulklevel:0
   ,FirstDigit:[]
   ,FirstDigitBought:[]
   ,FirstDigitEff:[]
   ,FirstDigitBulklevel:[]
   ,Teens:[]
   ,TeensBought:[]
   ,TeensEff:[]
   ,TeensBulklevel:[]
   ,Tys:[]
   ,TysBought:[]
   ,TysEff:[]
   ,TysBulklevel:[]
   ,Ten:0
   ,TenBought:0
   ,TenEff:1
   ,TenBulklevel:0
   ,HigherDigit:[]
   ,HigherDigitEff:[]
   ,HigherDigitBulklevel:[]
   ,MaxFirstDigit:1
   ,MaxTeen:0
   ,MaxTy:0
   ,MaxHigherDigit:0
});
var LastUpdate=Date.now()
,LastSave=Date.now()
,LastGame=Date.now()
,v = new Vue({
   el:'#game'
   ,data:JSON.parse(InitialString)
   ,computed:{
      Growth(){return Times(this.One,Times(this.TenEff,this.FirstDigitEff[0]||1))}
      ,OneCost(){return Simplex(1,this.OneBought)}
      ,CantOne(){return LessQ(this.MainNumber,this.OneCost)}
      ,FirstDigitCost(){return this.FirstDigitBought.map((x,n)=>Simplex(n+1,Plus(x,1)))}
      ,CantFirstDigit(){
         var n,a=[LessQ(this.One,this.FirstDigitCost[0])];
         for(n=this.FirstDigit.length;--n;) a[n]=LessQ(this.FirstDigit[n-1],this.FirstDigitCost[n]);
         return a
      }
      ,TenCost(){return Simplex(9,Plus(this.TenBought,1))}
      ,CantTen(){return LessQ(this.MainNumber,this.TenCost)}
      ,singleDigitName(){return _tier0}
      ,SingleDigitName(){return _tier0.map(UpperFirst)}
      ,CanUnlockFirstDigit(){return this.MaxFirstDigit<8}
      ,CantUnlockFirstDigit(){return LessQ(this.FirstDigit[this.MaxFirstDigit-1]||0,40585)}
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
      ,Show(n,x){return Show(n,3,Math.pow(10,n+1))(x)}
      ,ShowInt(n,x){return Show(n,0,Math.pow(10,n+1))(x)}
      ,ShowPercent(x){return Math.abs(x)<0.009995?x.toExponential(2):x.toPrecision(3)}
      ,BuyOne(){
         this.MainNumber=Minus(this.MainNumber,this.OneCost);
         this.One=Plus(this.One,1);
         this.OneBought=Plus(this.OneBought,1)
      }
      ,BulkOne(){
         var available=Times(this.MainNumber,Math.exp(this.OneBulklevel))
         ,upper=Minus(Root(Times(Plus(available,Simplex(2,Plus(this.OneBought,-1))),Factorial(2)),2),Plus(this.OneBought,-1))
         ,delta=BinFloorSolve(d=>SimpDiff(2,Plus(this.OneBought,-1),d),available,Natural(Times(Minus(upper,2),0.99999999)),upper);
         this.MainNumber=Minus(this.MainNumber,SimpDiff(2,Plus(this.OneBought,-1),delta));
         this.One=Plus(this.One,delta);
         this.OneBought=Plus(this.OneBought,delta)
      }
      ,BuyFirstDigit(n){
         if(n) this.FirstDigit[n-1]=Minus(this.FirstDigit[n-1],this.FirstDigitCost[n]);
         else this.One=Minus(this.One,this.FirstDigitCost[0]);
         Vue.set(this.FirstDigit,n,Plus(this.FirstDigit[n],1));
         Vue.set(this.FirstDigitBought,n,Plus(this.FirstDigitBought[n],1))
      }
      ,BulkFirstDigit(n){
         var available,upper,delta;
         if(n){
            available=Times(this.FirstDigit[n-1],Math.exp(this.FirstDigitBulklevel[n]))
            ,upper=Minus(Root(Times(Plus(available,Simplex(n+2,this.FirstDigitBought[n])),Factorial(n+2)),n+2),this.FirstDigitBought[n])
            ,delta=BinFloorSolve(d=>SimpDiff(n+2,this.FirstDigitBought[n],d),available,Natural(Times(Minus(upper,n+2),0.99999999)),upper);
            this.FirstDigit[n-1]=Minus(this.FirstDigit[n-1],SimpDiff(n+2,this.FirstDigitBought[n],delta));
            Vue.set(this.FirstDigit,n,Plus(this.FirstDigit[n],delta));
            Vue.set(this.FirstDigitBought,n,Plus(this.FirstDigitBought[n],delta))
         }else{
            available=Times(this.One,Math.exp(this.FirstDigitBulklevel[0]))
            ,upper=Minus(Root(Times(Plus(available,Simplex(2,this.FirstDigitBought[0])),Factorial(2)),2),this.FirstDigitBought[0])
            ,delta=BinFloorSolve(d=>SimpDiff(2,this.FirstDigitBought[0],d),available,Natural(Times(Minus(upper,2),0.99999999)),upper);
            this.One=Minus(this.One,SimpDiff(2,this.FirstDigitBought[0],delta));
            Vue.set(this.FirstDigit,0,Plus(this.FirstDigit[0],delta));
            Vue.set(this.FirstDigitBought,0,Plus(this.FirstDigitBought[0],delta))
         }
      }
      ,BuyTen(){
         this.MainNumber=Minus(this.MainNumber,this.TenCost);
         this.Ten=Plus(this.Ten,1);
         this.TenBought=Plus(this.TenBought,1)
      }
      ,BulkTen(){
         var available=Times(this.MainNumber,Math.exp(this.TenBulklevel))
         ,upper=Minus(Root(Times(Plus(available,Simplex(10,this.TenBought)),Factorial(10)),10),this.TenBought)
         ,delta=BinFloorSolve(d=>SimpDiff(10,this.TenBought,d),available,Natural(Times(Minus(upper,10),0.99999999)),upper);
         this.MainNumber=Minus(this.MainNumber,SimpDiff(10,this.TenBought,delta));
         this.Ten=Plus(this.Ten,delta);
         this.TenBought=Plus(this.TenBought,delta)
      }
      ,BulkHigherDigit(n){}
      ,BUYFirstDigit(){
         var n;
         if(this.RevFirstDigit){
            for(n=this.FirstDigit.length;n--;) this.BulkFirstDigit(n);
            this.BulkOne()
         }else{
            this.BulkOne();
            for(n=0;n<this.FirstDigit.length;++n) this.BulkFirstDigit(n)
         }
      }
      ,BUYHigherDigit(){
         var n;
         if(this.RevHigherDigit){
            for(n=this.HigherDigit.length;n--;) this.BulkHigherDigit(n);
            this.BulkTen()
         }else{
            this.BulkTen();
            for(n=0;n<this.HigherDigit.length;++n) this.BulkHigherDigit(n)
         }
      }
      ,UnlockFirstDigit(){
         var init=JSON.parse(InitialString);
         this.MainNumber=init.MainNumber;
         this.One=init.One;
         this.OneBought=init.OneBought;
         this.FirstDigit=init.FirstDigit;
         this.FirstDigitBought=init.FirstDigitBought;
         this.FirstDigitEff=init.FirstDigitEff;
         this.Teens=init.Teens;
         this.TeensBought=init.TeensBought;
         this.TeensEff=init.TeensEff;
         this.Tys=init.Tys;
         this.TysBought=init.TysBought;
         this.TysEff=init.TysEff;
         this.Ten=init.Ten;
         this.TenBought=init.TenBought;
         this.TenEff=init.TenEff;
         this.HigherDigit=init.HigherDigit;
         this.HigherDigitEff=init.HigherDigitEff;
         this.MaxFirstDigit+=1
      }
   }
   ,watch:{
      One(x){
         if(this.FirstDigit.length||LessQ(x,2)) return;
         this.FirstDigit[0]=0;
         this.FirstDigitBought[0]=0;
         this.FirstDigitEff[0]=1;
         if(!this.FirstDigitBulklevel.hasOwnProperty(0)) this.FirstDigitBulklevel[0]=0
      }
      ,FirstDigit(a){
         var l=a.length;
         if(l>7||l>=this.MaxFirstDigit||!l||LessQ(a[l-1],l+2)) return;
         a[l]=0;
         this.FirstDigitBought[l]=0;
         this.FirstDigitEff[l]=1;
         if(!this.FirstDigitBulklevel.hasOwnProperty(l)) this.FirstDigitBulklevel[l]=0
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
   var rev=v.RevFirstDigit|v.RevTeens<<1|v.RevTys<<2|v.RevHigherDigit<<3;
   localStorage.setItem(''+n,ToStream([LastUpdate,[v.UpdateInterval,v.AutoSave],[LastGame],[],v.MainNumber,[rev,v.One,v.OneBought,v.OneBulklevel,v.FirstDigit,v.FirstDigitBought,v.FirstDigitEff,v.FirstDigitBulklevel,v.Teens,v.TeensBought,v.TeensEff,v.TeensBulklevel,v.Tys,v.TysBought,v.TysEff,v.TysBulklevel,v.Ten,v.TenBought,v.TenEff,v.TenBulklevel,v.HigherDigit,v.HigherDigitEff,v.HigherDigitBulklevel,v.MaxFirstDigit,v.MaxTeen,v.MaxTy,v.MaxHigherDigit]]))
}
,Load = n=>{
   var stream=localStorage.getItem(''+n),rev;
   if(stream) [LastUpdate,[v.UpdateInterval,v.AutoSave],[LastGame],[],v.MainNumber,[rev,v.One,v.OneBought,v.OneBulklevel,v.FirstDigit,v.FirstDigitBought,v.FirstDigitEff,v.FirstDigitBulklevel,v.Teens,v.TeensBought,v.TeensEff,v.TeensBulklevel,v.Tys,v.TysBought,v.TysEff,v.TysBulklevel,v.Ten,v.TenBought,v.TenEff,v.TenBulklevel,v.HigherDigit,v.HigherDigitEff,v.HigherDigitBulklevel,v.MaxFirstDigit,v.MaxTeen,v.MaxTy,v.MaxHigherDigit]]=FromStream(stream)
   v.RevFirstDigit=rev&1;
   v.RevTeens=rev&2;
   v.RevTys=rev&4;
   v.RevHigherDigit=rev&8
};
//Initialization
Load(0);
document.body.removeChild(document.getElementById('loading'));
Loop()
