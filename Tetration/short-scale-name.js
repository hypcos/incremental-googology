'use strict';
//This file use functions in display-number.js
//Standard -illion seires go up to centillion
const _tier0=['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
,_ty0=['twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']
,ConvertTier0 = n=>{// 1 <= n <= 999
   var d21=n%100;
   return (n>=100?_tier0[Math.floor(n/100)-1]+' hundred'+(d21?' and ':''):'')+(d21?d21<20?_tier0[d21-1]:_ty0[Math.floor(d21/10)-2]+(n%10?'-'+_tier0[n%10-1]:''):'')
}
,_tier1f=['thousand','million','billion','trillion','quadrillion','quintillion','sextillion','septillion','octillion','nonillion']
,_tier1=['','un','duo','tre','quattuor','quin','sex','septen','octo','novem']
,_ty1f=['decillion','vigintillion','trigintillion','quadragintillion','quinquagintillion','sexagintillion','septuagintillion','octogintillion','nonagintillion']
,ConvertStdIllion = n=> n<100?n>=10?_tier1[n%10]+_ty1f[Math.floor(n/10)-1]:_tier1f[n]:n==100?'centillion':'('+n+')illion'// 0 <= n <= 100
,ShortScaleName = x=>{
   var nx = Natural(x),inp,str='',fl,expo;
   if(nx===0) return 'zero';
   if(LessQ(nx,{neg:false,recip:false,val:230258509299.4044,pt:1})){
      inp=Show(9,0,1e10)(nx);
      if(LessQ(nx,1e15)){// nx < 10^15
         fl=Math.floor(nx/1e12);
         if(fl) str+=ConvertTier0(fl)+' trillion, ';
         fl=Math.floor(nx%1e12/1e9);
         if(fl) str+=ConvertTier0(fl)+' billion, ';
         fl=Math.floor(nx%1e9/1e6);
         if(fl) str+=ConvertTier0(fl)+' million, ';
         fl=Math.floor(nx%1e6/1000);
         if(fl) str+=ConvertTier0(fl)+' thousand, ';
         fl=nx%1000;
         if(fl) str+=ConvertTier0(fl);
         return str.endsWith(', ')?str.slice(0,-2):str
      }// 10^15 <= nx < 10^10^11
      expo= +inp.substr(inp.lastIndexOf('e')+1);
      inp=inp.substr(0,inp.lastIndexOf('e')).replace('.','');
      fl= +inp.substr(0,expo%3+1);
      inp=inp.substr(expo%3+1);
      if(fl) str+=ConvertTier0(fl)+' '+ConvertStdIllion(Math.floor(expo/3-1))+', ';
      while(inp.length){
         fl=inp.length<3?inp*(inp.length==2?10:100):+inp.substr(0,3);
         inp=inp.substr(3);
         expo-=3;
         if(fl) str+=ConvertTier0(fl)+' '+ConvertStdIllion(Math.floor(expo/3-1))+', '
      }
      return str.endsWith(', ')?str.slice(0,-2):str
   }
   return Show(9,0,1e10)(nx);
}
,UpperFirst = x=>x[0].toUpperCase()+x.substr(1)