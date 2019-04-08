const Loop = ()=>{
   var dt=(Date.now()-LastUpdate)*0.001;
   LastUpdate=Date.now();
   Game.MainNumber=Plus(Game.MainNumber,Times(Game.TotalProduce,dt));
   if(Game.AutoSave&&LastUpdate-LastSave>=Game.AutoSave){
      LastSave=LastUpdate;
      Save(0)
   }
   setTimeout(Loop,Game.UpdateInterval)
};
var LastUpdate=Date.now()
,LastSave=Date.now()
,LastGame=Date.now()
,Game = new Vue({
   el:'#game'
   ,data:{
      UpdateInterval:67
      ,AutoSave:20000
      ,ExportBox:false
      ,ExportContent:''
      ,Stage:0
      ,MainNumber:1
      ,CurrentTab:0
      ,Digits:[1]
      ,BulkDigitFrac:[]
   }
   ,computed:{
      ShowMainNumber:function(){return DisplayHi(this.MainNumber)}
      ,TotalProduce:function(){
         var n,l=this.Digits.length,sum=0;
         for(n=0;n<l;++n) sum=Plus(sum,Times(Floor(Times(this.Digits[n],0.9)),this.DigitProduce(n)));
         return sum
      }
      ,ShowTotalProduce:function(){return Display(this.TotalProduce)}
      ,DigitValue:function(){
         var v=[],i,len=this.Digits.length;
         for(i=0;i<len;++i) v.push(Natural(Times(this.Digits[i]||1,Power(10,i))));
         v[len]=Power(10,len);
         return v
      }
   }
   ,methods:{
      Save:n=>Save(n)
      ,Load:n=>Load(n)
      ,Export:function(){
         Save(0);
         this.ExportContent=localStorage.getItem('0').split('').map(x=>String.fromCharCode(174+(x.charCodeAt(0)>>8),174+(x.charCodeAt(0)&255))).join('');
         this.ExportBox=true
      }
      ,Import:function(){
         var arr=this.ExportContent.split(''),i;
         for(i=0;i<arr.length;++i) arr.splice(i,2,String.fromCharCode((arr[i].charCodeAt(0)-174<<8)+arr[i+1].charCodeAt(0)-174));
         localStorage.setItem('0',arr.join(''));
         this.ExportBox=false;
         Load(0)
      }
      ,Reset:function(){
         if(!confirm('Unlike other resets, you will lose all the process WITHOUT ANY BONUS OR REWARD.\nDo you really want a FULL reset?')) return;
         LastGame=Date.now();
         this.Stage=0;
         this.MainNumber=1;
         this.CurrentTab=0;
         this.Digits=[1];
         this.BulkDigitFrac=[]
      }
      ,DigitName:function(n){return UpperFirst(ShortScaleName(this.DigitValue[n]))}
      ,DigitCost:function(n){return LessQ(this.DigitValue[n],this.DigitValue[n+1])?
         this.DigitValue[n]
         :Power(this.DigitValue[n+1],Divide(this.DigitValue[n],this.DigitValue[n+1]))}
      ,ShowDigitCost:function(n){return DisplayDec(this.DigitCost(n))}
      ,CantDigitQ:function(n){return LessQ(this.MainNumber,this.DigitCost(n))}
      ,BuyDigit:function(n){
         var i;
         this.MainNumber=Minus(this.MainNumber,this.DigitCost(n));
         for(i=n;i--;) this.Digits[i]=1;
         Vue.set(this.Digits,n,Plus(this.Digits[n],Number.isFinite(this.Digits[n])&&this.Digits[n]%10==9?2:1))
      }
      ,BulkDigit:function(n){
         const s1=(m,dm)=>Times(Times(0.5,Power(10,m)),Times(dm,Plus(dm,1)))
         ,cost1=dn=>Minus(s1(n,dn-1),s1(n+1,Floor(Times(dn,0.1))))
         ,a=Power(this.DigitValue[n+1],Divide(0.1,this.Digits[n+1]))
         ,am=Power1(this.DigitValue[n+1],Divide(0.1,this.Digits[n+1]))
         ,a10=Power(this.DigitValue[n+1],Recip(this.Digits[n+1]))
         ,a10m=Power1(this.DigitValue[n+1],Recip(this.Digits[n+1]))
         ,cost2=dn=>Minus(Times(Divide(Power1(this.DigitValue[n+1],Divide(Times(Plus(dn,-1),0.1),this.Digits[n+1])),am),a),
         Times(Divide(Power1(this.DigitValue[n+1],Divide(Floor(Times(dn,0.1)),this.Digits[n+1])),a10m),a10))
         ,threshold=cost1(Plus(Times(10,this.Digits[n+1]),1))
         ,cost=dn=>LessQ(Times(10,this.Digits[n+1]),dn)?Plus(Minus(threshold,cost2(Plus(Times(10,this.Digits[n+1]),1))),cost2(dn)):cost1(dn);
         var keep,already,available,dn,prev;
         if(!this.BulkDigitFrac[n]) return;
         keep=Times(this.MainNumber,1-this.BulkDigitFrac[n]);
         available=Plus(already=cost(this.Digits[n]),Times(this.MainNumber,this.BulkDigitFrac[n]));
         if(LessQ(available,threshold)){
            dn=Floor(Power(Divide(available,Times(Power(10,n),0.45)),0.5))
         }else{
            available=Plus(available,Minus(cost2(Plus(Times(10,this.Digits[n+1]),1)),threshold));
            dn=Floor(Divide(Times(Minus(
               Ln(Plus(available,Minus(Divide(a,am),Divide(a10,a10m)))),
               Ln(Minus(Recip(am),Divide(a,a10m)))
               ),Times(this.Digits[n+1],10)),Ln(this.DigitValue[n+1])))
         }
         this.MainNumber=Plus(Minus(this.MainNumber,cost(dn)),already);
         Vue.set(this.Digits,n,Number.isFinite(dn)&&dn%10==0?dn+1:dn);
         prev=0;
         while(!EqualQ(prev,this.MainNumber)&&GreaterEqualQ(Minus(this.MainNumber,keep),this.DigitCost(n))){
            prev=this.MainNumber;
            this.BuyDigit(n)
         }
      }
      ,DigitIdx:n=>Toth(n+1)
      ,DigitProduce:n=>n+1
      ,ShowDigitProduce:n=>Display(n+1)
   }
   ,watch:{
      MainNumber:function(x){
         var d=Plus(Floor(Log(10,x)),1);
         if(this.Stage<1&&LessQ(6,x)) this.Stage=1;
         if(this.Stage<2&&LessQ(10,x)) this.Stage=2;
         while(this.Digits.length<d) this.Digits.push(1)
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
      sign=x>0;
      expo=Math.floor(Math.log2(x))+1023;
      frac=x/Math.pow(2,expo-1075)-4503599627370496
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
   return Math.pow(2,expo-1075)*(4503599627370496+frac)
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
,Save = n=>localStorage.setItem(''+n,ToStream([LastUpdate,[Game.UpdateInterval,Game.AutoSave],[LastGame],[],Game.Stage,Game.MainNumber,[Game.Digits,Game.BulkDigitFrac]]))
,Load = n=>{
   var stream=localStorage.getItem(''+n);
   if(stream) [LastUpdate,[Game.UpdateInterval,Game.AutoSave],[LastGame],[],Game.Stage,Game.MainNumber,[Game.Digits,Game.BulkDigitFrac]]=FromStream(stream)
};
//Initialization
Load(0);
document.body.removeChild(document.getElementById('loading'));
Loop()
