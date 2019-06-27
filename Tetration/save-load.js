'use strict';
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
   var i,a1=[],a2=[],hidden=TimeList[Version],data=DataList[Version];
   for(i=hidden.length;i--;) a1[i]=Time[hidden[i]];
   for(i=data.length;i--;) a2[i]=v[data[i]];
   localStorage.setItem(''+n,ToStream([Version,a1,a2]))
}
,Load = n=>{
   var i,stream=localStorage.getItem(''+n),hidden,current_hidden,data,version;
   AchievementOff();
   if(!stream) return AchievementOn();
   stream=FromStream(stream);
   version=Natural(stream[0]);
   if(!(version<=Version)) return AchievementOn();
   hidden=TimeList[version];
   for(i=hidden.length;i--;) Time[hidden[i]]=stream[1][i];
   current_hidden=TimeList[Version];
   for(i=hidden.length;i<current_hidden.length;++i) Time[current_hidden[i]]=Time[current_hidden[1]];
   data=InitialData();
   DataList[Version].map(x=>v[x]=data[x]);
   data=DataList[version];
   for(i=data.length;i--;) v[data[i]]=stream[2][i];
   AchievementOn()
}