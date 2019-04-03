const Show = function(precision,fixed,expo){//Only show numbers "large" enough, work for fixed<308<expo and 10^precision<expo
   var lo = Math.pow(10,precision-fixed);
   return function(x){
      var etop,str,eff;
      if(typeof x=='object'){
         if(x.recip) return (0).toFixed(fixed);
         etop = x.val*Math.LOG10E-(x.pt===1?0:0.36221568869946321);//lg(lg(e)) = -0.36221568869946321
         if(etop>=expo) return (x.neg?'-':'')+'e'.repeat(x.pt)+etop.toPrecision(precision).replace('+','');
         eff = Math.min(Math.ceil(Math.log10(expo/etop)),precision);
         str = Math.pow(10,etop-Math.floor(etop)).toPrecision(eff);
         str = str[1]==='0'||str[1]==='e' ? (eff===1?'9':'9.'+'9'.repeat(eff-1))+'e'+Math.floor(etop) : str+'e'+Math.floor(etop);
         return (x.neg?'-':'')+'e'.repeat(x.pt-1)+str
      }
      return Math.abs(x)>=lo?x.toPrecision(precision).replace('+',''):x.toFixed(fixed)
   }
}
,ShowExE = function(precision,fixed,expo){
   var lo = Math.pow(10,precision-fixed);
   return function(x){
      var etop,str,eff;
      if(typeof x=='object'){
         if(x.recip) return (0).toFixed(fixed);
         etop = x.val*Math.LOG10E-(x.pt===1?0:0.36221568869946321);
         if(etop>=expo) return (x.neg?'-':'')+'E('+etop.toPrecision(precision).replace('+','')+(x.pt===1?')':')#'+x.pt).replace('+','');
         eff = Math.min(Math.ceil(Math.log10(expo/etop)),precision);
         str = Math.pow(10,etop-Math.floor(etop)).toPrecision(eff);
         str = str[1]==='0'||str[1]==='e' ? (eff===1?'9':'9.'+'9'.repeat(eff-1))+'e'+Math.floor(etop) : str+'e'+Math.floor(etop);
         return (x.neg?'-':'')+(x.pt===1?str:'E('+str+(x.pt===2?')':')#'+(x.pt-1)).replace('+',''))
      }
      return Math.abs(x)>=lo?x.toPrecision(precision).replace('+',''):x.toFixed(fixed)
   }
}
,DisplayLong = Show(12,4,1e14)
,DisplayLongInt = Show(12,0,1e13)
,Display = Show(6,3,1e13)
,DisplayDec = Show(6,1,1e13)
,Toth = function(x){
   var nx = Natural(x);
   if(typeof nx=='object') return DisplayLongInt(nx)+'th';
   switch(nx%10){
      case 1: return DisplayLongInt(nx)+(nx%100===11?'th':'st');
      case 2: return DisplayLongInt(nx)+(nx%100===12?'th':'nd');
      case 3: return DisplayLongInt(nx)+(nx%100===13?'th':'rd');
      default: return DisplayLongInt(nx)+'th'
   }
}
