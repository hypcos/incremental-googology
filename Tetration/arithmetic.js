'use strict';
/*
Encoding: {neg,recip,val,pt} = (neg?-1:1)*(exp(exp(...exp(val)...)))^(recip?-1:1) with pt exp's
Normal form:
   1. 1/MAX_VALUE < abs(x) <= MAX_VALUE, or 0 or Infinity or -Infinity or NaN: x (is Number)
      1/(1/MAX_VALUE) get Infinity so we do not use "1/MAX_VALUE <= abs(x) <= MAX_VALUE"
   2. Otherwise: {neg,recip,val,pt} with ln(MAX_VALUE) < val <= MAX_VALUE and pt>0
*/
//Note: other .js files in "Tetration" folder use functions from this file
const LnMaxValue = Math.log(Number.MAX_VALUE)
,RecipMaxValue = 1/Number.MAX_VALUE
,Normal = x=>{
   if(Number.isFinite(x)) return Math.abs(x)>RecipMaxValue||x===0 ? x : ({neg:Math.sign(x)==-1,recip:true,val:-Math.log(Math.abs(x)),pt:1});
   if(typeof x=='object'){
      if(Number.isFinite(x.val)) return x.pt ? x.val<=LnMaxValue ? x.val<0&&x.pt===1?Normal({neg:x.neg,recip:!(x.recip),val:-x.val,pt:1}):Normal({neg:x.neg,recip:x.recip,val:Math.exp(x.val),pt:x.pt-1}) : x : x.recip? x.neg?-1/x.val:1/x.val : x.neg?-x.val:x.val;
      if(x.val==Infinity) return x.recip? 0 : x.neg?-Infinity:Infinity;
      if(x.val==-Infinity) return x.pt ? Normal({neg:x.neg,recip:x.recip,val:0,pt:x.pt-1}) : x.recip? 0 : x.neg?Infinity:-Infinity;
      return x
   }
   return x
}//The following functions assume inputs are already normalized
,EqualQ = (x,y)=> typeof x=='object' ? x.neg===y.neg&&x.recip===y.recip&&x.val===y.val&&x.pt===y.pt : x===y
,LessQ = (x,y)=>{
   var x01,y01;// {true,false,?,?}:0, {true,true,?,?}:1, {false,true,?,?}:2, {false,false,?,?}:3
   if(Number.isNaN(x)||Number.isNaN(y)) return false;
   if(typeof x=='object'){
      x01 = x.recip? x.neg?1:2 : x.neg?0:3;
      if(typeof y=='object'){
         y01 = y.recip? y.neg?1:2 : y.neg?0:3;
         return x01<y01 || x01==y01 && (x01&1 ? x.pt<y.pt||x.pt===y.pt&&x.val<y.val : x.pt>y.pt||x.pt===y.pt&&x.val>y.val)
      }else{
         y01 = Number.isFinite(y) ? y? y<0?0.5:2.5 : 1.5 : y<0?-1:4;
         return x01<y01
      }
   }else{
      if(typeof y=='object'){
         y01 = y.recip? y.neg?1:2 : y.neg?0:3;
         x01 = Number.isFinite(x) ? x? x<0?0.5:2.5 : 1.5 : x<0?-1:4;
         return x01<y01
      }else{
         return x<y
      }
   }
}
,GreaterQ = (x,y)=> LessQ(y,x)
,LessEqualQ = (x,y)=> LessQ(x,y)||EqualQ(x,y)
,GreaterEqualQ = (x,y)=> LessQ(y,x)||EqualQ(x,y)
,Min = (x,y)=> LessQ(x,y)||Number.isNaN(x)?x:y
,Max = (x,y)=> LessQ(x,y)||Number.isNaN(y)?y:x
,Exp = x=>{//If input is normalized, it does not change Object into Number
   var abx;
   if(typeof x=='object') return x.recip? 1 : ({neg:false,recip:x.neg,val:x.val,pt:x.pt+1});//No need of Normal
   if((abx=Math.abs(x))>LnMaxValue) return Normal({neg:false,recip:x<0,val:abx,pt:1});
   return Normal(Math.exp(x))
}
,Ln = x=> typeof x=='object' ? x.neg?NaN:Normal({neg:x.recip,recip:false,val:x.val,pt:x.pt-1}) : Normal(Math.log(x))
,Abs = x=> typeof x=='object' ? ({neg:false,recip:x.recip,val:x.val,pt:x.pt}) : Math.abs(x)
,Neg = x=> typeof x=='object' ? ({neg:!(x.neg),recip:x.recip,val:x.val,pt:x.pt}) : -x
,Sign = x=> typeof x=='object' ? x.neg?-1:1 : Math.sign(x)//Do not return object
,LessAbsQ = (x,y)=>{
   var bac;
   if(typeof x=='object'){
      if(typeof y=='object'){
         return x.recip&&!y.recip || x.recip===y.recip &&(x.recip? x.pt>y.pt||x.pt===y.pt&&x.val>y.val : x.pt<y.pt||x.pt===y.pt&&x.val<y.val)
      }else{
         bac = Number.isFinite(y) ? y?0.5:2 :-1;
         return x.recip>bac
      }
   }else{
      if(typeof y=='object'){
         bac = Number.isFinite(x) ? x?0.5:2 :-1;
         return bac>y.recip
      }else{
         return Math.abs(x)<Math.abs(y)
      }
   }
}
,Plus = (x,y)=>{
   var big,small,res,a,diff;
   if(Number.isFinite(x)&&Number.isFinite(y)&&Number.isFinite(res=x+y)) return Normal(res);
   if((typeof x=='object'||Number.isFinite(x))&&(typeof y=='object'||Number.isFinite(y))){
      if(LessAbsQ(x,y)){
         big=y;
         small=x
      }else if(EqualQ(x,Neg(y))){
         return 0
      }else{
         big=x;
         small=y
      }
      if(big.pt>1||small.pt>1) return big;
      //After that, we only consider Number or pt=1
      //exp(a)+-exp(b) = exp(a+ln(1+-exp(b-a))), where diff = b-a
      a = typeof big=='object'? big.recip?-big.val:big.val : Math.log(Math.abs(big));
      if((diff = (typeof small=='object'? small.recip?-small.val:small.val : Math.log(Math.abs(small))) - a) < -37) return big;
      return Normal({neg:Sign(big)<0,recip:false,val:a+Math.log((Sign(big)<0)^(Sign(small)<0)?1-Math.exp(diff):1+Math.exp(diff)),pt:1})
   }
   if(typeof x=='object') return y;
   if(typeof y=='object') return x;
   return Normal(x+y)
}
,Minus = (x,y)=> Plus(x,Neg(y))
,Recip = x=> typeof x=='object'?({neg:x.neg,recip:!(x.recip),val:x.val,pt:x.pt}):1/x
,Times = (x,y)=>{
   var res;
   if(x===0||y===0) return 0;
   if(Number.isFinite(x)&&Number.isFinite(y)&&(res=x*y)&&Number.isFinite(res)) return Normal(res);
   res = Exp(Plus(Ln(Abs(x)),Ln(Abs(y))));
   return typeof res=='object'?({neg:!!((Sign(x)<0)^(Sign(y)<0)),recip:res.recip,val:res.val,pt:res.pt}):res*Sign(x)*Sign(y)
}
,Divide = (x,y)=> Times(x,Recip(y))
,Power = (x,y)=>{
   var res;
   if(Number.isFinite(x)&&Number.isFinite(y)&&(res=Math.pow(x,y))&&Number.isFinite(res)) return Normal(res);
   if(Sign(x)<0){
      if(Number.isFinite(y)){
         if(y!==Math.round(y)) return NaN;
         if(y*0.5!==Math.round(y*0.5)) return Neg(Exp(Times(Ln(Neg(x)),y)))
      }
      return Exp(Times(Ln(Neg(x)),y))
   }
   if(y.pt>=3&&(x.pt<=y.pt&&!x.recip||Number.isFinite(x)&&x>1)) return Exp(y);//Special case: base number does not affect
   return Exp(Times(Ln(x),y))
}
,Root = (x,y)=> Power(x,Recip(y))
,Log = (x,y)=> Times(Ln(y),Recip(Ln(x)))
,Power1 = (x,y)=>{//x^y-1 should be consider specially where x^y very close to 1
   var temp=Power(x,y);
   if(Number.isFinite(temp)&&x!==1&&y!==0&&Sign(x)>0&&temp<1.0018&&temp>0.9982){
      temp=Times(Ln(x),y);
      return Times(Plus(Times(Plus(Times(Plus(Times(temp,0.25),1),Times(temp,0.333333333333333333)),1),Times(temp,0.5)),1),temp)
   }
   return Plus(temp,-1)
}
,Exp1 = x=> LessQ(Abs(x),0.0018)?typeof x=='object'?x:Times(Plus(Times(Plus(Times(Plus(Times(x,0.25),1),Times(x,0.333333333333333333)),1),Times(x,0.5)),1),x):Plus(Exp(x),-1)
,Ln1 = x=> LessQ(Abs(x),0.003)?typeof x=='object'?x:Times(Plus(Times(Plus(Times(Plus(Times(Plus(Times(0.2,x),-0.25),x),0.333333333333333333),x),-0.5),x),1),x):Ln(Plus(x,1)) //ln(1+x) should be consider specially where x very close to 0
,Floor = x=> typeof x=='object'?x.recip?x.neg?-1:0:x:Math.floor(x)
,Natural = x=> Sign(x)<0||x.recip?0:Number.isFinite(x)?Math.round(x):x
,BinSolve = (f,y,a,b)=>{//Assuming f is unary and increasing
   var x1=a,x2=b,x=Times(Plus(x1,x2),0.5),fx;
   while(!(EqualQ(x1,x)||EqualQ(x2,x))){
      fx=f(x);
      if(EqualQ(y,fx)) return x;
      if(LessQ(y,fx)) x2=x;
      else x1=x;
      x=Times(Plus(x1,x2),0.5)
   }
   return x
}
,BinFloorSolve = (f,y,a,b)=>{
   var x1=Floor(a),x2=Floor(b),x=Floor(Times(Plus(x1,x2),0.5)),fx;
   while(!(EqualQ(x1,x)||EqualQ(x2,x))){
      fx=f(x);
      if(EqualQ(y,fx)) return x;
      if(LessQ(y,fx)) x2=x;
      else x1=x;
      x=Floor(Times(Plus(x1,x2),0.5))
   }
   return x1
}
//Library of googological functions, mainly on natural numbers
,IteratedPower = (base,height,tailend)=>{//base^base^...base^tailend with height base's
   var b = Natural(height);//Naturalize height, but base and tailend could be non-natural
   var i,n,n1=tailend,n2=tailend;
   if(b===0) return tailend;
   n=Power(base,tailend);
   for(i=1;LessQ(i,b);++i){
      if(EqualQ(n,n1)||Number.isNaN(n)&&Number.isNaN(n1)) return n;
      if(EqualQ(n,n2)) return (typeof b=='object'?i%2:(b-i)%2) ? n1 : n;
      if(typeof n1=='object'&&n.neg===n1.neg&&n.recip===n1.recip&&n.val===n1.val&&n.pt===n1.pt+1) return ({neg:n.neg,recip:n.recip,val:n.val,pt:Plus(n.pt-i,b)});
      n2=n1;
      n1=n;
      n=Power(base,n)
   }
   return n
}
,Tetrate = (a,b)=> IteratedPower(a,b,1)
,Factorial = (()=>{
   var a=[1],temp;
   while(Number.isFinite(temp=a[a.length-1]*a.length))a.push(temp);
   return x=>{
      var n=Natural(x);//Not considering non-natural factorial (gamma function)
      if(LessQ(n,171)) return a[n];
      if(Number.isFinite(n)) return Exp(Plus(Times(n+0.5,Math.log(n)),0.918938533204672742-n+(0.0833333333333333333-0.00277777777777777778/n/n)/n));
      return Exp(Times(n,Plus(Ln(n),-1)))
   }
})()
,Simplex = (m,n)=>{// Simplex(m,n) = C(m+n,m) = (m+n)!/(m!*n!)
   var i,product=1;
   if(LessQ(n,m)) return Simplex(n,m);
   if(Sign(m)<0) return 0;
   if(LessQ(m,17)){
      for(i=0;++i<=m;) product=Times(product,Plus(n,i));
      return Natural(Divide(product,Factorial(m)))
   }
   if(LessQ(n,171)) return Natural(Divide(Divide(Factorial(Plus(m,n)),Factorial(n)),Factorial(m)));
   return Natural(Exp(Plus(Plus(Times(m,Ln1(Divide(n,m))),Times(n,Ln1(Divide(m,n)))),
      Plus(Plus(Times(0.5,Ln(Plus(Recip(n),Recip(m)))),-0.918938533204672742),
      Plus(Plus(Times(0.0833333333333333333,Minus(Recip(Plus(m,n)),Plus(Recip(n),Recip(m)))),
      Times(-0.00277777777777777778,Minus(Power(Plus(m,n),-3),Plus(Power(n,-3),Power(m,-3))))),
      Times(0.00079365079365079365,Minus(Power(Plus(m,n),-5),Plus(Power(n,-5),Power(m,-5)))))))))
}
,SimpDiff = (m,n,dn)=>{// SimpDiff(m,n,dn) = Simplex(m-1,n+1) + Simplex(m-1,n+2) + ... + Simplex(m-1,n+dn)
   var i,sum=0,sm,sd,m1=Plus(m,-1);
   if(LessQ(dn,17)){
      for(i=0;++i<=dn;) sum=Plus(sum,Simplex(m1,Plus(n,i)));
      return sum
   }
   if(LessQ(Plus(n,n),Times(m,dn))) return Minus(Simplex(m,Plus(n,dn)),Simplex(m,n));
   sm=Plus(n,m);
   sd=Plus(n,dn);
   sum=Plus(sm,dn);
   return Times(Exp1(Plus(Minus(Plus(Times(m,Ln1(Divide(dn,sm))),Times(dn,Ln1(Divide(m,sd)))),
      Times(Plus(n,0.5),Ln1(Divide(Times(m,dn),Times(sum,n))))),
      Plus(Times(0.0833333333333333333,Plus(Minus(Recip(sum),Recip(sm)),Minus(Recip(n),Recip(sd)))),
      Times(-0.00277777777777777778,Plus(Minus(Power(sum,-3),Power(sm,-3)),Minus(Power(n,-3),Power(sd,-3))))))
      ),Simplex(m,n))
}
,LambertW = x=>{
   if(!LessQ(-0.36787944117144232,x)) return NaN;
   if(x===Infinity) return Infinity;
   var x1,x2,ex,mi;
   if(LessQ(x,1.571)) x1=Times(Plus(Times(Plus(Times(1.5,x),-1),x),1),x);
   else{
      x1=Ln(x);
      x2=Ln(x1);
      x1=Plus(Times(Plus(Divide(Plus(Times(x2,0.5),-1),x1),1),Divide(x2,x1)),Minus(x1,x2))
   }
   ex=Exp(x1);
   x2=Plus(x1,Divide(Minus(x,Times(x1,ex)),Times(Plus(x1,1),ex)));
   mi=Times(0.5,Plus(x1,x2));
   while(!EqualQ(x1,mi)&&!EqualQ(x2,mi)){
      x1=x2;
      ex=Exp(x1);
      x2=Plus(x1,Divide(Minus(x,Times(x1,ex)),Times(Plus(x1,1),ex)));
      mi=Times(0.5,Plus(x1,x2))
   }
   return x2
}
,IteratedFGH2 = (x,iter)=>{
   var b = Natural(iter);
   if(b===0) return x;
   var i,n,n1=x,n2=x;
   n=Times(x,Power(2,x));
   for(i=1;LessQ(i,b);++i){
      if(EqualQ(n,n1)||Number.isNaN(n)&&Number.isNaN(n1)) return n;
      if(EqualQ(n,n2)) return (typeof b=='object'?i%2:(b-i)%2) ? n1 : n;
      if(typeof n1=='object'&&n.neg===n1.neg&&n.recip===n1.recip&&n.val===n1.val&&n.pt===n1.pt+1) return ({neg:n.neg,recip:n.recip,val:n.val,pt:Plus(n.pt-i,b)});
      n2=n1;
      n1=n;
      n=Times(n,Power(2,n))
   }
   return n
}
//TODO: More googological functions may join