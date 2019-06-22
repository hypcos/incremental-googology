'use strict';
const _ShowNum = (x,precision,base,integer=false)=>{
   if(!(x&&Number.isFinite(x))) return x.toString(base);
   if(base==10){
      if(integer) return Math.abs(x)<=Math.pow(10,precision-1)?''+Math.round(x):x.toPrecision(precision).replace('+','');
      if(Math.abs(x)>=0.001||Math.abs(x)<9.5e-7) return x.toPrecision(precision).replace('+','')
   }
   var x1,x2=Math.floor((Math.log(Math.abs(x))-Math.log(1-0.5*Math.pow(base,-precision)))/Math.log(base));
   if(integer&&x2<precision||x2==precision-1) return Math.round(x).toString(base);
   x1=Math.round(x*Math.pow(base,precision-1-x2)).toString(base);
   if(x2<0){
      if(x2>=-3) return x<0?'-0.'+'0'.repeat(-x2-1)+x1.substr(1):'0.'+'0'.repeat(-x2-1)+x1
   }else{
      if(x2<precision) return x<0?x1.substr(0,x2+2)+'.'+x1.substr(x2+2):x1.substr(0,x2+1)+'.'+x1.substr(x2+1)
   }
   return x<0?x1.substr(0,2)+(x1.length>2?'.'+x1.substr(2):'')+'e'+x2.toString(base):x1[0]+(x1.length>1?'.'+x1.substr(1):'')+'e'+x2.toString(base)
}
,_ShowN = (x,precision,base)=>{//Only deal with pt=1; precision including precision in mantissa and exponent
   var x1,x2,prec,lnb=Math.log(base),n=Math.ceil((Math.log(x.val)-Math.log(lnb))/lnb);
   if(x.recip?x.val>=lnb*(Math.pow(base,n)-1)-Math.log(1-0.5*Math.pow(base,1+n-precision)):x.val>=lnb*Math.pow(base,n)+Math.log(1-0.5*Math.pow(base,n-precision)))
      ++n;
   prec=precision-n;
   if(prec<1) prec=1;
   x2=Math.floor(((x.recip?-x.val:x.val)-Math.log(1-0.5*Math.pow(base,-prec)))/Math.log(base));
   x1=Natural(Times(x,Power(base,Minus(prec-1,x2)))).toString(base);
   return (x.neg?'-':'')+x1[0]+(x1.length>1?'.'+x1.substr(1):'')+'e'+x2.toString(base)
}
,Show = (x,precision,base,integer=false)=>{
   var str,lnb;
   if(typeof x=='object'){
      lnb=Math.log(base);
      if(x.recip){
         if(integer) return '0';
         if(x.pt===1) str = x.val<lnb*(Math.pow(base,precision-1)-1)+Math.LN2?
            _ShowN(x,precision,base):'e-'+_ShowNum(x.val/lnb,precision,base);
         else str = x.val<lnb*Math.pow(base,precision-1)+Math.log(1-0.5/base)+Math.log(lnb)?
            'e-'+'e'.repeat(x.pt-2)+_ShowN(Divide({neg:false,recip:false,val:x.val,pt:1},lnb),precision,base)
            :'e-'+'e'.repeat(x.pt-1)+_ShowNum((x.val-Math.log(lnb))/lnb,precision,base)
      }else{
         if(x.pt===1) str = x.val<lnb*Math.pow(base,precision-1)+Math.log(1-0.5/base)?
            _ShowN(x,precision,base):'e'+_ShowNum(x.val/lnb,precision,base);
         else str = x.val<lnb*Math.pow(base,precision-1)+Math.log(1-0.5/base)+Math.log(lnb)?
            'e'.repeat(x.pt-1)+_ShowN(Divide({neg:false,recip:false,val:x.val,pt:1},lnb),precision,base)
            :'e'.repeat(x.pt)+_ShowNum((x.val-Math.log(lnb))/lnb,precision,base)
      }
      return (x.neg?'-':'')+str
   }
   return _ShowNum(x,precision,base,integer)
}
,ShowExE = (precision,fixed,expo)=>{
   var lo = Math.pow(10,precision-fixed);
   return x=>{
      var etop,str,eff;
      if(typeof x=='object'){
         if(x.recip) return (0).toFixed(fixed);
         etop = x.val*Math.LOG10E-(x.pt===1?0:0.36221568869946321);
         if(etop>=expo) return (x.neg?'-':'')+'E('+etop.toPrecision(precision).replace('+','')+(x.pt===1?')':')#'+x.pt).replace('+','');
         eff = Math.min(Math.ceil(Math.log10(expo/etop)),precision);
         str = Math.pow(10,etop-Math.floor(etop)).toPrecision(eff);
         str = str[1]=='0'||str[1]=='e' ? (eff==1?'9':'9.'+'9'.repeat(eff-1))+'e'+Math.floor(etop) : str+'e'+Math.floor(etop);
         return (x.neg?'-':'')+(x.pt===1?str:'E('+str+(x.pt===2?')':')#'+(x.pt-1)).replace('+',''))
      }
      return Math.abs(x)>=lo?x.toPrecision(precision).replace('+',''):x.toFixed(fixed)
   }
}
,Toth = (display,x)=>{
   var nx = Natural(x);
   if(typeof nx=='object') return display(nx)+'th';
   switch(nx%10){
      case 1: return display(nx)+(nx%100==11?'th':'st');
      case 2: return display(nx)+(nx%100==12?'th':'nd');
      case 3: return display(nx)+(nx%100==13?'th':'rd');
      default: return display(nx)+'th'
   }
}
