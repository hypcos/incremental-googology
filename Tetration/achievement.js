'use strict';
const Cancel=[]
,RowCancel=[]
,GetAchievementName = ()=>[
   [
      'The beginning'
      ,'16 seconds of waiting'
      ,'Cubic growth'
      ,'I want to buy max'
      ,'Where is my (0)(0)(0)(0)[2]'
      ,'This notation sucks'
      ,'What does the INCREMENT mean'
      ,'That is what INCREMENT means'
      ,'Multiplier is the main concept'
   ],[
      'Now I get it'
      ,'And there are more'
      ,'Is it the last one'
      ,'It seems far away'
      ,'It seems farther away'
      ,'What is the difference'
      ,"But why they're all base-2"
      ,'Skip'
      ,'Equality'
   ],[
      'So here is the base-3'
      ,'This unlocker also works'
      ,'2 < 3'
      ,'2 < 3 means the amounts'
      ,'My target is base-3'
      ,'Skip to base-3'
      ,'Base-3 also wants equality'
      ,'More bases'
      ,'Base-4 also wants equality'
   ],[
      'Googol: next level'
      ,'Can I AFK'
      ,'Speedrun'
      ,'Nerfed by a googol'
      ,'Arabian number'
      ,'The only item'
      ,'I forgot to discard it'
      ,'Waiting is no fun'
      ,'Bonus equality'
   ]
]
,GetAchievementTooltip = ()=>[
   [
      'Buy a (0)[2].'
      ,'Buy a (0)(0)[2].'
      ,'Buy a (0)(0)(0)[2].'
      ,"Buy 4 (0)[2]'s at once. Reward: (0)[2] is 5% stronger"
      ,"Have 4 (0)(0)(0)[2]'s without seeing (0)(0)(0)(0)[2].<br>Reward: (0)(0)(0)[2] is 10% stronger"
      ,'Display your number as "ee...e" without other symbol.'
      ,'Get multipliers of (0)[2] < (0)(0)[2] < (0)(0)(0)[2] < ...<br>Reward: zero-only base-2 BM are 2% stronger'
      ,'Get amounts of (0)[2] < (0)(0)[2] < (0)(0)(0)[2] < ...<br>Reward: zero-only base-2 BM are 5% stronger'
      ,'Have multiplier exceeding amount of every zero-only base-2 BM over 2.<br>Reward: zero-only base-2 BM are 10% stronger'
   ],[
      'Buy a (0)(0)(0)(0)[2].'
      ,'Buy a (0)(0)(0)(0)(0)(0)[2].'
      ,'Buy a (0)(0)(0)(0)(0)(0)(0)(0)[2].'
      ,'Have 16 different kinds of zero-only BM.<br>Reward: zero-only BM are 1% stronger'
      ,'Unlock 16 times in total.<br>Reward: (0)(0)(0)(0)[2] is 10% stronger'
      ,'Boost (0)[2] by 65536× from unlocker.'
      ,'Buy a (0)(0)(0)(0)(0)(0)(0)[2] without seeing (0)(0)[3].<br>Reward: (0)(0)(0)(0)(0)(0)(0)[2] is 20% stronger'
      ,'Unlock with only (0)[2] and highest zero-only base-2 BM bought.<br>Reward: (0)(0)[2] is 10% stronger'
      ,'Get multipliers of all zero-only base-2 BM (at least 4 of them) equal (1% margin).<br>Reward: zero-only base-2 BM are 70% stronger'
   ],[
      'Buy a (0)(0)[3].'
      ,'Buy a (0)(0)(0)(0)(0)[3].'
      ,'Make the least multiplier of zero-only base-3 BM larger than any zero-only base-2 BM.<br>Reward: zero-only base-3 BM are 2% stronger'
      ,'Make the least amount of zero-only base-3 BM larger than any zero-only base-2 BM.<br>Reward: zero-only base-3 BM are 5% stronger'
      ,'Unlock zero-only base-3 BM more times than base-2.<br>Reward: zero-only base-3 BM are 10% stronger'
      ,'Unlock zero-only base-3 BM with only (0)[2] and highest zero-only base-3 BM bought.<br>Reward: (0)(0)[3] and (0)(0)(0)[3] are 20% stronger'
      ,'Get multipliers of all zero-only base-2 and base-3 BM (at least 7 of them) equal (1% margin).<br>Reward: multipliers when buying base-3 BM increase by 0.1'
      ,'Buy a (0)(0)(0)[4].'
      ,'Get multipliers of all zero-only base-2 and base-4 BM (at least 7 of them) equal (1% margin).<br>Reward: Power up unlock multipliers by ^1.02'
   ],[
      'FGH-prestige.'
      ,'Get the 4 automatons from FGH challenge.'
      ,'Get ×160 from f<sub>0</sub><sup>m</sup>(n).<br>Reward: get 2% more FGH number'
      ,'Make your number grow less than 1e-100 (but not zero) per second.'
      ,'FGH-prestige with number between e1000 (including) and e1001.<br>Reward: get 5% more FGH number'
      ,'FGH-prestige with only (0)[2].<br>Reward: (0)[2] is 150% stronger'
      ,'Complete FGH challenge 5 while unalum is bought.<br>Reward: get 10% more FGH number'
      ,'Complete FGH challenge 3 under one minute.<br>Reward: get 20% more FGH number'
      ,'Get equal (1% margin) bonus from f<sub>2</sub>(n) and all bought f<sub>1</sub><sup>m</sup>(n).<br>Reward: get 50% more FGH number'
   ]
]
,AchievementOn = ()=>{
   var len=v.Achievement.length;
   Row0watch();
   if(len<=1){
      if(v.BMSStage>=1){
         Vue.set(v.Achievement,1,0);
         Row1watch()
      }else
         RowCancel[0] = v.$watch(()=>LessEqualQ(16777216,v.MainNumber),x=>{
            if(!x) return;
            RowCancel[0]();
            Vue.set(v.Achievement,1,0);
            Row1watch()
         })
   }else Row1watch();
   if(len<=2){
      if(v.BMSStage>=2){
         Vue.set(v.Achievement,2,0);
         Row2watch()
      }else
         RowCancel[1] = v.$watch(()=>LessEqualQ(18446744073709551616,v.MainNumber),x=>{
            if(!x) return;
            RowCancel[1]();
            Vue.set(v.Achievement,2,0);
            Row2watch()
         })
   }else Row2watch();
   if(len<=3){
      RowCancel[2] = v.$watch(()=>LessEqualQ(1e100,v.MainNumber),x=>{
         if(!x) return;
         RowCancel[2]();
         Vue.set(v.Achievement,3,0);
         Row3watch()
      })
   }else Row3watch();
   if(len<=4){
      RowCancel[3] = v.$watch(()=>LessQ(7.999999999999,v.FGHNumber),x=>{
         if(!x) return;
         RowCancel[3]();
         Vue.set(v.Achievement,4,0);
         Row4watch()
      })
   }else Row4watch();
}
,AchievementOff = ()=>{
   Cancel.map(x=>x());
   RowCancel.map(x=>x());
}
,Row0watch = ()=>{
   var Achievement=v.Achievement;
   if(!(Achievement[0]&1))
      Cancel[0]=v.$watch(()=>v.BM0etcBought[0][0],x=>{
         if(!x) return;
         Cancel[0]();
         Vue.set(Achievement,0,Achievement[0]|1)
      })
   if(!(Achievement[0]&2))
      Cancel[1]=v.$watch(()=>v.BM0etcBought[0][1],x=>{
         if(!x) return;
         Cancel[1]();
         Vue.set(Achievement,0,Achievement[0]|2)
      })
   if(!(Achievement[0]&4))
      Cancel[2]=v.$watch(()=>v.BM0etcBought[0][2],x=>{
         if(!x) return;
         Cancel[2]();
         Vue.set(Achievement,0,Achievement[0]|4)
      })
   if(!(Achievement[0]&8))
      Cancel[3]=v.$watch(()=>v.BM0etcBought[0][0],(x,x0)=>{
         if(LessQ(3.999999999999,Minus(x,x0))){
            Cancel[3]();
            Vue.set(Achievement,0,Achievement[0]|8)
         }
      })
   if(!(Achievement[0]&16))
      Cancel[4]=v.$watch(()=>{
         var base2=v.BM0etc[0];
         return base2.length<=3&&LessQ(3.999999999999,base2[2])
      },x=>{
         if(!x) return;
         Cancel[4]();
         Vue.set(Achievement,0,Achievement[0]|16)
      })
   if(!(Achievement[0]&32))
      Cancel[5]=v.$watch(()=>{
         var str=show(v.MainNumber),len=str.length;
         return len>=3&&'e'.repeat(len)===str
      },x=>{
         if(!x) return;
         Cancel[5]();
         Vue.set(Achievement,0,Achievement[0]|32)
      })
   if(!(Achievement[0]&64))
      Cancel[6]=v.$watch(()=>{
         var base2=v.BM0etcMult[0],n=base2.length;
         if(n<3) return false;
         while(--n) if(!LessQ(base2[n-1],base2[n])) return false;
         return true
      },x=>{
         if(!x) return;
         Cancel[6]();
         Vue.set(Achievement,0,Achievement[0]|64)
      })
   if(!(Achievement[0]&128))
      Cancel[7]=v.$watch(()=>{
         var base2=v.BM0etc[0],n=base2.length;
         if(n<3) return false;
         while(--n) if(!LessQ(base2[n-1],base2[n])) return false;
         return true
      },x=>{
         if(!x) return;
         Cancel[7]();
         Vue.set(Achievement,0,Achievement[0]|128)
      })
   if(!(Achievement[0]&256))
      Cancel[8]=v.$watch(()=>{
         var amount=v.BM0etc[0],mult=v.BM0etcMult[0],n=amount.length;
         while(n--) if(!(LessQ(2.000000000001,amount[n])&&LessQ(amount[n],mult[n]))) return false;
         return true
      },x=>{
         if(!x) return;
         Cancel[8]();
         Vue.set(Achievement,0,Achievement[0]|256)
      })
}
,Row1watch = ()=>{
   var Achievement=v.Achievement;
   if(!(Achievement[1]&1))
      Cancel[9]=v.$watch(()=>v.BM0etcBought[0][3],x=>{
         if(!x) return;
         Cancel[9]();
         Vue.set(Achievement,1,Achievement[1]|1)
      })
   if(!(Achievement[1]&2))
      Cancel[10]=v.$watch(()=>v.BM0etcBought[0][5],x=>{
         if(!x) return;
         Cancel[10]();
         Vue.set(Achievement,1,Achievement[1]|2)
      })
   if(!(Achievement[1]&4))
      Cancel[11]=v.$watch(()=>v.BM0etcBought[0][7],x=>{
         if(!x) return;
         Cancel[11]();
         Vue.set(Achievement,1,Achievement[1]|4)
      })
   if(!(Achievement[1]&8))
      Cancel[12]=v.$watch(()=>{
         var amount=v.BM0etc,sum=0,n,n1=amount.length;
         while(n1--)
            for(n=amount[n1].length;n--;)
               if(amount[n1][n]) ++sum;
         return LessEqualQ(16,sum)
      },x=>{
         if(!x) return;
         Cancel[12]();
         Vue.set(Achievement,1,Achievement[1]|8)
      })
   if(!(Achievement[1]&16))
      Cancel[13]=v.$watch(()=>v.BM0etcUnlockTotal>=16,x=>{
         if(!x) return;
         Cancel[13]();
         Vue.set(Achievement,1,Achievement[1]|16)
      })
   if(!(Achievement[1]&32))
      Cancel[14]=v.$watch(()=>LessQ(65535.99999999,Power(v.BM0etcUnlockerEff[0],v.BM0etcLength[0]-3)),x=>{
         if(!x) return;
         Cancel[14]();
         Vue.set(Achievement,1,Achievement[1]|32)
      })
   if(!(Achievement[1]&64))
      Cancel[15]=v.$watch(()=>{
         var base3=v.BM0etc[1];
         return !(base3&&base3.length)&&v.BM0etcBought[0][6]
      },x=>{
         if(!x) return;
         Cancel[15]();
         Vue.set(Achievement,1,Achievement[1]|64)
      })
   if(!(Achievement[1]&128))
      Cancel[16]=v.$watch(()=>[v.BM0etcLength[0],v.BM0etcBought],(x,x0)=>{
         if(x[0]!=x0[0]+1) return;
         var BM0etcBought=x0[1],base2Bought=BM0etcBought[0],n=base2Bought.length-1,n1;
         while(--n) if(base2Bought[n]) return;
         for(n1=BM0etcBought.length;--n1;)
            for(n=BM0etcBought[n1].length;n--;)
               if(BM0etcBought[n1][n]) return;
         Cancel[16]();
         Vue.set(Achievement,1,Achievement[1]|128)
      })
   if(!(Achievement[1]&256))
      Cancel[17]=v.$watch(()=>{
         var base2Mult=v.BM0etcMult[0],n=base2Mult.length-1,min,max;
         if(n<3) return false;
         min=base2Mult[n];
         max=base2Mult[n];
         while(n--){
            min=Min(min,base2Mult[n]);
            max=Max(max,base2Mult[n])
         }
         return LessQ(Minus(Ln(max),Ln(min)),0.01)
      },x=>{
         if(!x) return;
         Cancel[17]();
         Vue.set(Achievement,1,Achievement[1]|256)
      })
}
,Row2watch = ()=>{
   var Achievement=v.Achievement;
   if(!(Achievement[2]&1))
      Cancel[18]=v.$watch(()=>v.BM0etcBought[1]&&v.BM0etcBought[1][0],x=>{
         if(!x) return;
         Cancel[18]();
         Vue.set(Achievement,2,Achievement[2]|1)
      })
   if(!(Achievement[2]&2))
      Cancel[19]=v.$watch(()=>v.BM0etcBought[1]&&v.BM0etcBought[1][3],x=>{
         if(!x) return;
         Cancel[19]();
         Vue.set(Achievement,2,Achievement[2]|2)
      })
   if(!(Achievement[2]&4))
      Cancel[20]=v.$watch(()=>{
         var mult=v.BM0etcMult[1],n,min;
         if(!mult) return false;
         n=mult.length-1;
         min=mult[n];
         while(n--) min=Min(min,mult[n]);
         mult=v.BM0etcMult[0];
         for(n=mult.length;n--;) if(LessEqualQ(min,mult[n])) return false;
         return true
      },x=>{
         if(!x) return;
         Cancel[20]();
         Vue.set(Achievement,2,Achievement[2]|4)
      })
   if(!(Achievement[2]&8))
      Cancel[21]=v.$watch(()=>{
         var amount=v.BM0etc[1],n,min;
         if(!amount) return false;
         n=amount.length-1;
         min=amount[n];
         while(n--) min=Min(min,amount[n]);
         amount=v.BM0etc[0];
         for(n=amount.length;n--;) if(LessEqualQ(min,amount[n])) return false;
         return true
      },x=>{
         if(!x) return;
         Cancel[21]();
         Vue.set(Achievement,2,Achievement[2]|8)
      })
   if(!(Achievement[2]&16))
      Cancel[22]=v.$watch(()=>v.Ach2r16[0]<v.Ach2r16[1],x=>{
         if(!x) return;
         Cancel[22]();
         Vue.set(Achievement,2,Achievement[2]|16)
      })
   if(!(Achievement[2]&32))
      Cancel[23]=v.$watch(()=>[v.BM0etcLength[1],v.BM0etcBought],(x,x0)=>{
         if(x[0]!=x0[0]+1) return;
         var BM0etcBought=x0[1],n,n1=BM0etcBought.length;
         while(--n1>1)
            for(n=BM0etcBought[n1].length;n--;)
               if(BM0etcBought[n1][n]) return;
         for(n=BM0etcBought[1].length-1;n--;)
            if(BM0etcBought[1][n]) return;
         for(n=BM0etcBought[0].length;--n;)
            if(BM0etcBought[0][n]) return;
         Cancel[23]();
         Vue.set(Achievement,2,Achievement[2]|32)
      })
   if(!(Achievement[2]&64))
      Cancel[24]=v.$watch(()=>{
         var mult=v.BM0etcMult[1],n,min,max;
         if(!mult||mult.length+v.BM0etcMult[0].length<7) return false;
         n=mult.length-1;
         min=mult[n];
         max=mult[n];
         while(n--){
            min=Min(min,mult[n]);
            max=Max(max,mult[n])
         }
         mult=v.BM0etcMult[0];
         for(n=mult.length;n--;){
            min=Min(min,mult[n]);
            max=Max(max,mult[n])
         }
         return LessQ(Minus(Ln(max),Ln(min)),0.01)
      },x=>{
         if(!x) return;
         Cancel[24]();
         Vue.set(Achievement,2,Achievement[2]|64)
      })
   if(!(Achievement[2]&128))
      Cancel[25]=v.$watch(()=>v.BM0etcBought[2]&&v.BM0etcBought[2][0],x=>{
         if(!x) return;
         Cancel[25]();
         Vue.set(Achievement,2,Achievement[2]|128)
      })
   if(!(Achievement[2]&256))
      Cancel[26]=v.$watch(()=>{
         var mult=v.BM0etcMult[2],n,min,max;
         if(!mult||mult.length+v.BM0etcMult[0].length<7) return false;
         n=mult.length-1;
         min=mult[n];
         max=mult[n];
         while(n--){
            min=Min(min,mult[n]);
            max=Max(max,mult[n])
         }
         mult=v.BM0etcMult[0];
         for(n=mult.length;n--;){
            min=Min(min,mult[n]);
            max=Max(max,mult[n])
         }
         return LessQ(Minus(Ln(max),Ln(min)),0.01)
      },x=>{
         if(!x) return;
         Cancel[26]();
         Vue.set(Achievement,2,Achievement[2]|256)
      })
}
,Row3watch = ()=>{/*
   var Achievement=v.Achievement;
   if(!(Achievement[3]&1))
      Cancel[27]=v.$watch(()=>v.FGHPrestige,x=>{
         if(!x) return;
         Cancel[27]();
         Vue.set(Achievement,3,Achievement[3]|1)
      })
   if(!(Achievement[3]&2))
      Cancel[28]=v.$watch(()=>(v.FGHChal&15)==15,x=>{
         if(!x) return;
         Cancel[28]();
         Vue.set(Achievement,3,Achievement[3]|2)
      })
   if(!(Achievement[3]&4))
      Cancel[29]=v.$watch(()=>LessQ(159.9999999999,v.FGH0Eff),x=>{
         if(!x) return;
         Cancel[29]();
         Vue.set(Achievement,3,Achievement[3]|4)
      })
   if(!(Achievement[3]&8))
      Cancel[30]=v.$watch(()=>Sign(v.Growth)>0&&LessQ(v.Growth,1e-100),x=>{
         if(!x) return;
         Cancel[30]();
         Vue.set(Achievement,3,Achievement[3]|8)
      })
   if(!(Achievement[3]&16))
      Cancel[31]=v.$watch(()=>{
         var lgn=Log(10,v.MainNumber);
         return [v.FGHPrestige,LessEqualQ(1000,lgn)&&LessQ(lgn,1001)]
      },(x,x0)=>{
         if(LessQ(x0[0],x[0])&&x0[1]){
            Cancel[31]();
            Vue.set(Achievement,3,Achievement[3]|16)
         }
      })
   if(!(Achievement[3]&32))
      Cancel[32]=v.$watch(()=>{
         var BM0etc=v.BM0etc,n,n1=BM0etc.length;
         while(n1--)
            for(n=BM0etc[n1].length;n--;)
               if((n1||n)&&BM0etc[n1][n]) return [v.FGHPrestige,false];
         return [v.FGHPrestige,true]
      },(x,x0)=>{
         if(LessQ(x0[0],x[0])&&x0[1]){
            Cancel[32]();
            Vue.set(Achievement,3,Achievement[3]|32)
         }
      })
   if(!(Achievement[3]&64))
      Cancel[33]=v.$watch(()=>[v.FGHPrestige,(v.Challenge&255)==2&&v.AlphaSeries&8],(x,x0)=>{
         if(LessQ(x0[0],x[0])&&x0[1]){
            Cancel[33]();
            Vue.set(Achievement,3,Achievement[3]|64)
         }
      })
   if(!(Achievement[3]&128))
      Cancel[34]=v.$watch(()=>[v.FGHPrestige,(v.Challenge&255)==8&&LessQ(v.SinceFGHPrestige,60)],(x,x0)=>{
         if(LessQ(x0[0],x[0])&&x0[1]){
            Cancel[34]();
            Vue.set(Achievement,3,Achievement[3]|128)
         }
      })
   if(!(Achievement[3]&256))
      Cancel[35]=v.$watch(()=>{
         var FGH2iter1Eff=v.FGH2iter1Eff,FGH1Eff=v.FGH1Eff,n,min,max,fl=true;
         if(FGH2iter1Eff===1) return false;
         for(n=FGH1Eff.length-1;n--;) fl&=FGH1Eff[n]===1;
         if(fl) return false;
         min=FGH2iter1Eff;
         max=FGH2iter1Eff;
         for(n=FGH1Eff.length-1;n--;){
            if(FGH1Eff[n]===1) continue;
            min=Min(min,FGH1Eff[n]);
            max=Max(max,FGH1Eff[n])
         }
         return LessQ(Minus(Ln(max),Ln(min)),0.01)
      },x=>{
         if(!x) return;
         Cancel[35]();
         Vue.set(Achievement,3,Achievement[3]|256)
      })*/
}
,Row4watch = ()=>{}