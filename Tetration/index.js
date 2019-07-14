'use strict';
const Grow = dt=>{
   var AutoPool=v.AutoPool;
   v.AutoActive.map(x=>AutoPool[x].act());
   var Challenge=v.Challenge
   ,a1,a2,a3,n,n1;
   v.SinceFGHPrestige+=dt;
   n1=v.FGH2f1.length;
   while(n1--){
      n=(a1=v.FGH2f1[n1]).length;
      a2=v.FGH2f1Mult[n1];
      while(--n) a1[n-1]=Plus(a1[n-1],Times(Times(a1[n],a2[n]),dt*0.2))
   }
   Vue.set(v.FGH2f1,0,v.FGH2f1[0]);
   if(v.AlphaSeries&16){
      v.FGHNumber=Plus(v.FGHNumber,Times(v.BalumEff,dt));
      FGHNumberUpdate()
   }
   n1=v.BM0etc.length;
   if(Challenge&252){
      if(Challenge&24) v.SinceBought+=dt;
      if(Challenge&8) v.Chal8Eff=Math.min(v.SinceBought/60,1);
      if(Challenge&16) v.Chal16Eff=Power(v.Chal16Base,v.SinceBought);
      if(Challenge&32) v.Chal32Eff=Power(v.Chal32Base,v.SinceBM0etcUnlock+=dt);
      var Chal8Eff=v.Chal8Eff;
      if(Challenge&244)
         while(n1--){
            n=(a1=v.BM0etc[n1]).length;
            a2=v.BM0etcMult[n1];
            a3=v.BM0etcDivider[n1];
            while(--n) a1[n-1]=Plus(a1[n-1],Times(Divide(Power(Times(a1[n],a2[n]),Challenge&8?Chal8Eff:1),a3[n]),dt*0.2))
         }
      else
         while(n1--){
            n=(a1=v.BM0etc[n1]).length;
            a2=v.BM0etcMult[n1];
            while(--n) a1[n-1]=Plus(a1[n-1],Times(Power(Times(a1[n],a2[n]),Challenge&8?Chal8Eff:1),dt*0.2))
         }
   }else
      while(n1--){
         n=(a1=v.BM0etc[n1]).length;
         a2=v.BM0etcMult[n1];
         while(--n) a1[n-1]=Plus(a1[n-1],Times(Times(a1[n],a2[n]),dt*0.2))
      }
   Vue.set(v.BM0etc,0,v.BM0etc[0]);
   v.MainNumber=Plus(v.MainNumber,Times(v.Growth,dt));
   var MainNumber=v.MainNumber,amount=v.BM0etc,bought=v.BM0etcBought,lens=v.BM0etcLength,m=lens.length;
   n1=amount.length;
   if(LessQ(v.MainNumberEver,MainNumber)) v.MainNumberEver=MainNumber;
   if(v.BMSStage<2){
      if(LessEqualQ(18446744073709551616,MainNumber)) v.BMSStage=2;
      else if(v.BMSStage<1&&LessEqualQ(v.FGHChal&16?4096:16777216,MainNumber)) v.BMSStage=1;
   }
   while(LessQ(MainNumber,Power(--m+2,Power(2,m+1))));
   while(n1<=m){
      Vue.set(amount,n1,[]);
      Vue.set(bought,n1,[]);
      ++n1
   }
   while(n1--){
      amount=v.BM0etc[n1];
      bought=v.BM0etcBought[n1];
      lens=v.BM0etcLength[n1];
      while((n=amount.length)<lens&&LessEqualQ(Power(n1+2,Power(2,Plus(Plus(n1,1),n))),MainNumber)){
         Vue.set(amount,n,0);
         Vue.set(bought,n,0)
      }
   }
   if(LessQ(v.FGHGainPeak,a3=Divide(v.FGHNumberToGet,Min(v.SinceFGHPrestige,(Date.now()-Time.LastGame)*0.001)))){
      v.FGHGainPeak=a3;
      v.FGHGainPeakAt=MainNumber
   }
   if(Challenge&2){
      var BM0etcInfo=v.BM0etcInfo;
      amount=v.BM0etc,bought=v.BM0etcBought;
      q:for(n1=0;n1<amount.length;++n1)
         for(n=0;n<amount[n1].length;++n)
            if(LessEqualQ(BM0etcInfo[n1][n].cost(bought[n1][n]),Challenge&1&&n?amount[n1][n-1]:v.MainNumber)){
               Vue.set(amount[n1],n,Plus(amount[n1][n],1));
               Vue.set(bought[n1],n,Plus(bought[n1][n],1));
               v.BM0etcBuying(n1,n,1);
               break q
            }
   }
}
,TimeRaw = ()=>({
   LastUpdate:Date.now()
   ,LastGame:Date.now()
})
,InitialData = ()=>({
   ExportBox:false
   ,ExportContent:''
   ,UpdateInterval:62
   ,AutoSave:10000
   ,NumberBase:10
   ,Precision:4
   ,Hotkey:1
   ,CurrentTab:3
   ,Achievement:[0]
   ,Ach2r16:[0,0]
   ,AutoActive:[]
   ,AutoBM0etcUnlockThreshold:[]
   ,AutoFGHPrestigeThreshold:0
   ,Challenge:0 //auto max all:4, auto unlock:32, auto (0)(1)[n]:8, auto FGH-prestige:16, start with:2, FGHN:1, iterated:128, multiordinal:64
   ,Chal4Eff:[[]]
   ,Chal8Eff:1
   ,Chal16Eff:1
   ,Chal32Eff:1
   ,Chal16Base:1
   ,Chal32Base:1
   ,SinceBought:0
   ,SinceBM0etcUnlock:0
   ,MainNumber:4
   ,MainNumberEver:4
   ,BMSStage:0
   ,BM0etc:[[0,0,0]]
   ,BM0etcBought:[[0,0,0]]
   ,BM0etcLength:[3]
   ,BM0etcLengthEver:[3]
   ,BM0etcUnlockTotal:0
   ,BM0c1:2
   ,FGHGainPeak:0
   ,FGHGainPeakAt:0
   ,SinceFGHPrestige:Infinity
   ,FGHNumber:0
   ,FGHPrestige:0
   ,FGHPrestigeFastest:Infinity
   ,FGHNumberRate:0
   ,FGHTab:0
   ,AlphaSeries:0 //1 bit for every item
   ,FGHChal:0 //1 bit for every item
   ,FGHChal6Eff:1
   ,FGH2f1:[[0]]
   ,FGH2f1Bought:[[0]]
   ,FGH2f1Length:[3]
   ,FGH2f1LengthEver:[3]
   ,FGH3:0
})
,vPre = InitialData()
,show = x=>Show(x,vPre.Precision,vPre.NumberBase)
,showInt = x=>Show(x,vPre.Precision,vPre.NumberBase,true);
Vue.filter('show',show);
Vue.filter('showInt',showInt);
function FGHText(x){
   var len=arguments.length,n=0,s=typeof x=='string'?x:showInt(x);
   while(++n<len)
      if(arguments[n])
         s='f<sub>'+showInt(n-1)+'</sub>'+
            (typeof arguments[n]=='string'?'<sup>'+arguments[n]+'</sup>':arguments[n]===1?'':'<sup>'+showInt(arguments[n])+'</sup>')+
            '('+s+')';
   return s
}
const BM0etcText = (x,n)=>LessQ(x,14)?'(0)'.repeat(x)+'['+showInt(n)+']':'(0)...(0)['+showInt(n)+'] with '+showInt(x)+" (0)'s"
,v = new Vue({
   el:'#game'
   ,data:vPre
   ,computed:{
      Growth(){
         var BM0etc=this.BM0etc,BM0etcMult=this.BM0etcMult,n=BM0etc.length,Challenge=this.Challenge,s; 
         if(Challenge&252){
            var Chal8Eff=this.Chal8Eff,BM0etcDivider=this.BM0etcDivider;
            s=Times(BM0etc[0][0],Divide(Power(BM0etcMult[0][0],Challenge&8?Chal8Eff:1),Challenge&244?BM0etcDivider[0][0]:1))||0;
            while(--n) s=Times(s,Plus(Times(BM0etc[n][0],Divide(Power(BM0etcMult[n][0],Challenge&8?Chal8Eff:1),Challenge&244?BM0etcDivider[n][0]:1))||0,1));
         }else{
            s=Times(BM0etc[0][0],BM0etcMult[0][0])||0;
            while(--n) s=Times(s,Plus(Times(BM0etc[n][0],BM0etcMult[n][0])||0,1));
         }
         return Times(s,this.AchieveRowEff)
      }
      ,AchievementName:GetAchievementName
      ,AchievementTooltip:GetAchievementTooltip
      ,AchieveSingle(){
         var Achievement=this.Achievement,x,y=9,arr,arr1=[];
         while(y--){
            arr=[];
            for(x=9;x--;) arr[x]=Achievement[y]>>x&1;
            arr1[y]=arr
         }
         return arr1
      }
      ,AchieveCell(){
         var Achievement=this.Achievement,x,y,x1,y1=3,tmp,arr=[];
         for(x=9;x--;) arr[x]=[];
         while(y1--){
            for(x1=3;x1--;){
               tmp=((Achievement[3*y1]&Achievement[3*y1+1]&Achievement[3*y1+2])>>3*x1&7)==7;
               for(y=3;y--;)
                  for(x=3;x--;) arr[3*y1+y][3*x1+x]=tmp
            }
         }
         return arr
      }
      ,AchieveRow(){return this.Achievement.map(x=>(x&511)==511)}
      ,AchieveColumn(){
         var Achievement=this.Achievement,x=9,y,tmp,arr=[];
         while(x--){
            tmp=1;
            for(y=9;y--;) tmp&=Achievement[y]>>x&1;
            arr[x]=tmp
         }
         return arr
      }
      ,AchieveCellN(){
         var AchieveCell=this.AchieveCell,x,y=3,s=0;
         while(y--)
            for(x=3;x--;) s+=AchieveCell[3*y][3*x];
         return s
      }
      ,AchieveRowN(){return this.AchieveRow.reduce((x,y)=>x+y,0)}
      ,AchieveColumnN(){return this.AchieveColumn.reduce((x,y)=>x+y)}
      ,AchieveCellEff(){return Math.pow(1.3333333333333333,this.AchieveCellN)}
      ,AchieveRowEff(){return Math.pow(1.2,this.AchieveRowN)}
      ,AutoPool:()=>[null
         ,{text:'Buy max all zero-only BM',act:()=>v.BM0etcMaxall()}
         ,{text:'Unlock zero-only BM',act:()=>{
            var BM0etcCantUnlock=v.BM0etcCantUnlock,BM0etcLength=v.BM0etcLength,n=BM0etcLength.length;
            if(v.FGHChal&256){
               var BM0etcLengthStart=v.BM0etcLengthStart,threshold=v.AutoBM0etcUnlockThreshold;
               while(n--) if(BM0etcCantUnlock[n]===false&&!LessEqualQ(threshold[n],Minus(BM0etcLength[n],BM0etcLengthStart))) v.BM0etcUnlock(n)
            }else{
               while(n--) if(BM0etcCantUnlock[n]===false) v.BM0etcUnlock(n)
            }
         }}
         ,{text:'Buy (0)(1)[n]', act:()=>v.BM0c1Cant||v.BM0c1Buy()}
         ,{text:'FGH-prestige',act:()=>v.FGHPrestigeCant||(!(v.FGHChal&512)||LessEqualQ(v.AutoFGHPrestigeThreshold,v.MainNumber))&&v.FGHPrestigeDo()}
      ]
      ,AutoAvailable(){
         var FGHChal=this.FGHChal,arr=[];
         if(FGHChal&1) arr.push(1);
         if(FGHChal&2) arr.push(2);
         if(FGHChal&4) arr.push(3);
         if(FGHChal&8) arr.push(4);
         return arr
      }
      ,AutoBM0etcUnlockThresholdInput(){return this.AutoBM0etcUnlockThreshold.map(showInt)}
      ,AutoFGHPrestigeThresholdInput(){return [show(this.AutoFGHPrestigeThreshold)]}
      ,ChallengeGoal(){return {128:Power(10,600),64:Power(10,3003)}}
      ,BM0etcInfo(){
         var Challenge=this.Challenge,b16,n,n1=this.BM0etcLengthEver.length,arr,arr1=[];
         while(n1--){
            arr=[];
            for(n=this.BM0etcLengthEver[n1];n--;){
               b16=Power(n1+2,Power(2,Plus(Plus(n1,2),n)));
               arr[n]={
                  text:((n1,n)=>LessQ(n,14)?(()=>'(0)'.repeat(n)+'['+showInt(n1)+']'):(()=>'(0)...(0)['+showInt(n1)+'] with '+showInt(n)+" (0)'s"))(n1+2,n+1+n1)
                  ,tooltip:n?'Generate '+BM0etcText(n+n1,n1+2):'Make your number grow'
                  ,costo:Challenge&1&&n?['BM0etc',n1,n-1]:['MainNumber']
                  ,cost:(b16=>x=>Natural(Power(b16,Plus(x,0.5))))(b16)
                  ,sum:((b16,sumk)=>x=>Natural(Times(sumk,Plus(Power(b16,x),-1))))(b16,Divide(Power(n1+2,Power(2,Plus(Plus(n1,1),n))),Plus(b16,-1)))
                  ,solve:((b16,solvek)=>Y=>Log(b16,Plus(Times(solvek,Y),1)))(b16,Divide(Plus(b16,-1),Power(n1+2,Power(2,Plus(Plus(n1,1),n)))))
               }
            }
            arr1[n1]=arr
         }
         return arr1
      }
      ,BM0etcMult_Ach(){
         var Achievement=this.Achievement,BM0etcLengthEver=this.BM0etcLengthEver,n,n1=BM0etcLengthEver.length,arr,arr1=[]
         ,Overall=this.AchieveCellEff*(this.AchieveRowN>=2?this.AchieveRowEff:1)*(Achievement[1]&8?1.01:1)//Overall bonus to all (0)...(0)[x]
         ,BaseMult;
         while(n1--){
            switch(n1){//Bonus to (0)...(0)[n1+2] for certain base number
               case 0:
               BaseMult=(Achievement[0]&64?1.02:1)*(Achievement[0]&128?1.05:1)*(Achievement[0]&256?1.1:1)*(Achievement[1]&256?1.7:1);
               break;
               case 1:
               BaseMult=(Achievement[2]&4?1.02:1)*(Achievement[2]&8?1.05:1)*(Achievement[2]&16?1.1:1);
               break;
               default:
               BaseMult=1
            }
            arr=[];
            n=BM0etcLengthEver[n1];
            while(n--) arr[n]=Times(Overall,BaseMult);
            arr1[n1]=arr
         }
         //Single BM specific bonus
         if(Achievement[0]&8) arr1[0][0]=Times(arr1[0][0],1.05);
         if(Achievement[3]&32) arr1[0][0]=Times(arr1[0][0],2.5);
         if(arr1[0][1]&&Achievement[1]&128) arr1[0][1]=Times(arr1[0][1],1.1);
         if(arr1[0][2]&&Achievement[0]&16) arr1[0][2]=Times(arr1[0][2],1.1);
         if(arr1[0][3]&&Achievement[1]&16) arr1[0][3]=Times(arr1[0][3],1.1);
         if(arr1[0][6]&&Achievement[1]&64) arr1[0][6]=Times(arr1[0][6],1.2);
         if(arr1[1]&&Achievement[2]&32){
            if(arr1[1][0]) arr1[1][0]=Times(arr1[1][0],1.2);
            if(arr1[1][1]) arr1[1][1]=Times(arr1[1][1],1.2)
         }
         return arr1
      }
      ,BM0etcMult_Bought(){
         var BM0etcBought=this.BM0etcBought,bought
         ,n,n1=BM0etcBought.length,arr,arr1=[]
         ,Base3Incr=2+(this.Achievement[2]&64?0.1:0);
         while(n1--){
            arr=[];
            n=(bought=BM0etcBought[n1]).length;
            while(n--) arr[n]=bought[n]?Power(n1==1?Base3Incr:n1+2,Plus(bought[n],-1)):1;
            arr1[n1]=arr
         }
         return arr1
      }
      ,BM0etcMult_Unlocker(){
         var BM0etcLength=this.BM0etcLength,BM0etcLengthStart=this.BM0etcLengthStart,BM0etcUnlockerEff=this.BM0etcUnlockerEff
         ,top,unlockereff
         ,n,n1=BM0etcLength.length,arr,arr1=[];
         while(n1--){
            top=(n=BM0etcLength[n1])-BM0etcLengthStart;
            unlockereff=BM0etcUnlockerEff[n1];
            arr=[];
            while(n--) arr[n]=Power(unlockereff,Max(top-n,0));
            arr1[n1]=arr
         }
         return arr1
      }
      ,BM0etcMult_FGHPres(){
         var BM0etcLengthEver=this.BM0etcLengthEver
         ,Overall=this.AlphaSeries&1?this.FGH00Eff:1
         ,n=BM0etcLengthEver.length,arr=[];
         while(n--) arr[n]=Overall;
         if(this.AlphaSeries&2) arr[0]=Times(arr[0],this.FGHbase1Eff);
         return arr
      }
      ,BM0etcMult(){
         var Ach=this.BM0etcMult_Ach,Bought=this.BM0etcMult_Bought,Unlocker=this.BM0etcMult_Unlocker
         ,FGHPres=this.BM0etcMult_FGHPres,FGH=Plus(Times(this.FGH2f1[0][0],this.FGH2f1Mult[0][0]),1)
         ,ach,bought,unlocker,fghpres
         ,n,n1=Bought.length,arr,arr1=[];
         while(n1--){
            arr=[];
            ach=Ach[n1];
            n=(bought=Bought[n1]).length;
            unlocker=Unlocker[n1];
            fghpres=FGHPres[n1];
            while(n--) arr[n]=Times(Times(Times(ach[n],bought[n]),unlocker[n]),Times(fghpres,FGH));
            arr1[n1]=arr
         }
         if(this.AlphaSeries&4) arr1[0][0]=Times(arr1[0][0],this.ZeralumEff);
         return arr1
      }
      ,BM0etcDivider(){
         var Challenge=this.Challenge;
         if(!(Challenge&252)) return;
         var BM0etc=this.BM0etc,Chal4Eff=this.Chal4Eff,Chal16Eff=this.Chal16Eff,Chal32Eff=this.Chal32Eff
         ,n,n1=BM0etc.length,i1,arr,arr1=[];
         while(n1--){
            arr=[];
            n=BM0etc[n1].length;
            while(n--){
               arr[n]=Challenge&64?Plus(BM0etc[n1][n+1]||0,1):1;
               if(Challenge&128) for(i1=BM0etc.length;i1--;) i1===n1||(arr[n]=Times(arr[n],Plus(BM0etc[i1][n-i1+n1]||0,1)));
               if(Challenge&4) arr[n]=Times(arr[n],Chal4Eff[n1]&&Chal4Eff[n1][n]||1);
               if(Challenge&16) arr[n]=Times(arr[n],Chal16Eff);
               if(Challenge&32) arr[n]=Times(arr[n],Chal32Eff)
            }
            arr1[n1]=arr
         }
         return arr1
      }
      ,BM0etcModifierHtml(){
         var Challenge=this.Challenge;
         if(!(Challenge&252)) return;
         var Chal8Eff=this.Chal8Eff,BM0etcDivider=this.BM0etcDivider,n,n1=BM0etcDivider.length,arr,arr1=[];
         while(n1--){
            arr=[];
            n=BM0etcDivider[n1].length;
            while(n--) arr[n]=(Challenge&8?'^'+show(Chal8Eff):'')+(Challenge&244?' /'+show(BM0etcDivider[n1][n]):'')
            arr1[n1]=arr
         }
         return arr1
      }
      ,BM0etcLengthStart(){return this.FGHChal&16?2:this.AlphaSeries&8?4:3}
      ,BM0etcUnlockText(){return this.BM0etcLength.map((x,n)=>BM0etcText(x+n+1,n+2))}
      ,BM0etcUnlockText1(){return this.BM0etcLengthEver.map((x,n)=>n?'and base-'+showInt(n+1)+' unlocker ':'')}
      ,BM0etcUnlockText2(){return this.BM0etcLength.map((x,n)=>BM0etcText(x+n,n+2))}
      ,BM0etcUnlockTooltip(){return this.BM0etcLengthEver.map((x,n)=>'Reset your number'+(n?', all zero-only BM and previous unlockers':' and all zero-only BM'))}
      ,BM0etcUnlockCost(){return this.BM0etcLengthEver.map((x,n)=>n+2)}
      ,BM0etcCantUnlock(){
         var BM0etcUnlockCost=this.BM0etcUnlockCost,BM0etcLength=this.BM0etcLength;
         return this.BM0etc.map((x,n)=>LessQ(x[BM0etcLength[n]-1]||0,BM0etcUnlockCost[n]))
      }
      ,BM0etcUnlockerEff(){
         var BM0etcLength=this.BM0etcLength,BM0etcLengthStart=this.BM0etcLengthStart,n=BM0etcLength.length-1,arr=[]
         ,AchieveRowEff=this.AchieveRowN>=3?this.AchieveRowEff:1
         ,Overall=this.Achievement[2]&256?1.02:1;
         arr[n]=Overall;
         while(n--) arr[n]=Times(Plus(Times(Minus(BM0etcLength[n+1],BM0etcLengthStart),arr[n+1]),1),Overall);
         return arr.map(x=>Times(Power(2,x),AchieveRowEff))
      }
      ,BM0etcUnlockEverText(){return this.BM0etcLengthEver.map((x,n)=>BM0etcText(x+n,n+2))}
      ,BM0c1Cost(){
         var BM0c1=this.BM0c1;
         return Natural(Power(BM0c1,Power(2,Plus(Times(BM0c1,BM0c1),2))))
      }
      ,BM0c1Cant(){return LessQ(this.MainNumber,this.BM0c1Cost)}
      ,FGHPrestigeCant(){return LessQ(this.MainNumber,this.Challenge&&this.ChallengeGoal[this.Challenge&255]||1e100)}
      ,FGHNumberToGet(){
         if(this.FGHPrestigeCant) return 0;
         var x=Ln(this.MainNumber),ach=this.Achievement[3];
         return Times(Times(Floor(Plus(Exp(Times(x,Power(Ln(x),-3.25))),-1.5522390492173715)),(this.Challenge&255)==1?1:this.FGHChal6Eff)
         ,(this.AchieveRowN>=4?this.AchieveRowEff:1)*(ach&4?1.02:1)*(ach&16?1.05:1)*(ach&64?1.1:1)*(ach&128?1.2:1)*(ach&256?1.5:1))
      }
      ,FGH00Cant(){return this.AlphaSeries&1||LessQ(this.FGHNumber,1)}
      ,FGHbase1Cant(){return this.AlphaSeries&2||LessQ(this.FGHNumber,2)}
      ,ZeralumCant(){return this.AlphaSeries&4||LessQ(this.FGHNumber,11)}
      ,UnalumCant(){return this.AlphaSeries&8||LessQ(this.FGHNumber,20)}
      ,BalumCant(){return this.AlphaSeries&16||LessQ(this.FGHNumber,10240)}
      ,FGH00Eff(){return Power(Plus(this.FGHPrestige,1),0.5)}
      ,FGHbase1Eff(){return Math.min(1+42*Math.pow(this.FGHPrestigeFastest,-0.5),160)}
      ,ZeralumEff(){return Plus(Times(this.FGHNumber,0.25),1)}
      ,BalumEff(){return Times(0.1,this.FGHNumberRate)}
      ,FGH2f1Info(){
         var p2,b41,n,n1=this.FGH2f1LengthEver.length,arr,arr1=[];
         while(n1--){
            arr=[];
            n=this.FGH2f1LengthEver[n1];
            while(n--){
               p2=Power(2,n);
               b41=Plus(Power(2,p2),-1);
               arr[n]={
                  text:((n,n1)=>x=>FGHText(Plus(x,2),0,n,n1))(n,n1+1)
                  ,tooltip:n?'Generate '+FGHText('n',0,n-1,n1+1)
                     :'Boost '+(n1?FGHText('n',0,'m',n1):'all zero-only BM')
                  ,costo:['FGHNumber']
                  ,cost:((n1,p2)=>x=>Natural(IteratedFGH2(Times(Plus(x,2),p2),n1)))(n1+1,p2)
                  ,sum:n1?((n1,p2)=>x=>x?Natural(IteratedFGH2(Times(Plus(x,1),p2),n1)):0)(n1+1,p2)
                     :((b4,b41,offset,factor)=>x=>Natural(Times(Plus(Times(Power(b4,Plus(x,2)),Plus(Times(Plus(x,1),b41),-1)),offset),factor)))(
                     Power(2,p2),b41,Minus(Power(2,Plus(Power(2,Plus(n,1)),1)),Power(2,Times(p2,3))),Divide(p2,Times(b41,b41)))
                  ,solve:n1?((n1,p2)=>Y=>{
                     var y=Y,i=n1;
                     while(i--) y=Times(LambertW(Times(y,Math.LN2)),Math.LOG2E);
                     y=Plus(Times(y,p2),-1);
                     return Sign(y)>0?y:0
                  })(n1+1,Recip(p2))
                     :((inoffset,infactor,factor,offset)=>Y=>Plus(Times(LambertW(Times(Plus(Y,inoffset),infactor)),factor),offset))(
                     Times(Minus(Power(2,Times(p2,3)),Power(2,Plus(Power(2,Plus(n,1)),1))),Divide(p2,Times(b41,b41)))
                     ,Times(Times(b41,Math.LN2),Power(2,Neg(Divide(Times(p2,Power(2,p2)),b41))))
                     ,Divide(Math.LOG2E,p2),Plus(Recip(b41),-1))
               }
            }
            arr1[n1]=arr
         }
         return arr1
      }
      ,FGH2f1Mult(){
         var FGH2f1=this.FGH2f1,FGH2f1Bought=this.FGH2f1Bought,bought
         ,FGH2Eff=1
         ,n,n1=FGH2f1Bought.length,arr,arr1=[];
         while(n1--){
            arr=[];
            n=(bought=FGH2f1Bought[n1]).length;
            while(n--) arr[n]=Times(bought[n]?Power(2,Plus(bought[n],-1)):1,FGH2Eff);
            arr1[n1]=arr;
            FGH2Eff=Plus(Times(FGH2f1[n1][0],arr[0]),1)
         }
         return arr1
      }
   }
   ,methods:{
      Save:n=>Save(n)
      ,Load:n=>Load(n)
      ,Export:()=>{
         Save(0);
         v.ExportContent=localStorage.getItem('0').split('').map(x=>String.fromCharCode(174+(x.charCodeAt(0)>>8),174+(x.charCodeAt(0)&255))).join('');
         v.ExportBox=true
      }
      ,Import:()=>{
         var arr=v.ExportContent.split(''),i;
         for(i=0;i<arr.length;++i) arr.splice(i,2,String.fromCharCode((arr[i].charCodeAt(0)-174<<8)+arr[i+1].charCodeAt(0)-174));
         localStorage.setItem('0',arr.join(''));
         v.ExportBox=false;
         Load(0)
      }
      ,Reset:()=>{
         if(!confirm('Unlike other resets, you will lose all the progress WITHOUT ANY BONUS OR REWARD.\nDo you really want a FULL reset?')) return;
         AchievementOff();
         var init=InitialData();
         Object.getOwnPropertyNames(init).map(x=>v[x]=init[x]);
         Time=TimeRaw();
         AchievementOn();
         Save(0)
      }
      ,GamePlayed:()=>show((Date.now()-Time.LastGame)*0.001)
      ,AutoBM0etcUnlockThresholdChange:n=>{
         var input=v.AutoBM0etcUnlockThresholdInput[n],threshold=v.AutoBM0etcUnlockThreshold,s;
         if(typeof input!='string'||input==='') return Vue.set(threshold,n,Infinity);
         s=AntiShow(input,v.NumberBase,true);
         if(!Number.isNaN(s)) Vue.set(threshold,n,s)
      }
      ,AutoFGHPrestigeThresholdChange:()=>{
         var input=v.AutoFGHPrestigeThresholdInput[0],s;
         if(typeof input!='string'||input==='') return v.AutoFGHPrestigeThreshold=0;
         s=AntiShow(input,v.NumberBase);
         if(!Number.isNaN(s)) v.AutoFGHPrestigeThreshold=s
      }
      ,BM0etcBuying:(n1,n,delta)=>{
         var Challenge=v.Challenge,BM0etcBought=v.BM0etcBought,BM0etcInfo,Chal4Eff
         ,amount,bought,b16,excess,i,i1;
         if(Challenge&2){
            v.MainNumber=4;
            amount=v.BM0etc[n1];
            bought=BM0etcBought[n1];
            for(i=n;i--;){
               amount[i]=0;
               bought[i]=0
            }
            Vue.set(amount,0,amount[0]);
            Vue.set(bought,0,bought[0])
         }
         if(Challenge&4){
            bought=Minus(BM0etcBought[n1][n],delta);
            b16=Power(n1+2,Power(2,Plus(Plus(n1,2),n)));
            BM0etcInfo=v.BM0etcInfo;
            Chal4Eff=v.Chal4Eff;
            for(i1=BM0etcBought.length;i1--;){
               if(!Chal4Eff[i1]) Chal4Eff[i1]=[];
               for(i=BM0etcBought[i1].length;i--;){
                  if(i1===n1&&i===n) continue;
                  excess=Min(Natural(Minus(Log(b16,BM0etcInfo[i1][i].cost(BM0etcBought[i1][i])),bought)),delta);
                  if(Sign(excess)>0) Chal4Eff[i1][i]=Times(Chal4Eff[i1][i]||1,Power(2,excess))
               }
            }
            Vue.set(Chal4Eff,0,Chal4Eff[0])
         }
         if(Challenge&24){
            if(Challenge&16) v.Chal16Base=Exp(Divide(10,LessQ(delta,1.01)?0.016+v.SinceBought:0.016));
            v.SinceBought=0;
         }
      }
      ,BM0etcMaxall:()=>{
         var BM0etc=v.BM0etc,BM0etcInfo=v.BM0etcInfo,n,n1=BM0etc.length
         ,Challenge=v.Challenge,BM0etcBought,delta;
         if(Challenge&31){
            if(Challenge&2){
               BM0etcBought=v.BM0etcBought;
               q:while(n1--)
                  for(n=BM0etc[n1].length;n--;)
                     if(LessEqualQ(BM0etcInfo[n1][n].cost(BM0etcBought[n1][n]),Challenge&1&&n?BM0etc[n1][n-1]:v.MainNumber)){
                        Vue.set(BM0etc[n1],n,Plus(BM0etc[n1][n],1));
                        Vue.set(BM0etcBought[n1],n,Plus(BM0etcBought[n1][n],1));
                        v.BM0etcBuying(n1,n,1);
                        break q
                     }
               return
            }
            while(n1--)
               for(n=BM0etc[n1].length;n--;){
                  delta=BuyMax(['BM0etc',n1,n],['BM0etcBought',n1,n],Challenge&1&&n?['BM0etc',n1,n-1]:['MainNumber'],BM0etcInfo[n1][n].sum,BM0etcInfo[n1][n].solve);
                  delta&&Challenge&30&&v.BM0etcBuying(n1,n,delta)
               }
            return
         }
         while(n1--)
            for(n=BM0etc[n1].length;n--;)
               BuyMax(['BM0etc',n1,n],['BM0etcBought',n1,n],['MainNumber'],BM0etcInfo[n1][n].sum,BM0etcInfo[n1][n].solve)
      }
      ,BM0etcUnlock:n1=>{
         var BM0etcLength=v.BM0etcLength;
         Vue.set(BM0etcLength,n1,BM0etcLength[n1]+1);
         if(v.BM0etcLengthEver[n1]<BM0etcLength[n1]) Vue.set(v.BM0etcLengthEver,n1,BM0etcLength[n1]);
         if(!(v.Achievement[2]&16)&&n1<2) Vue.set(v.Ach2r16,n1,v.Ach2r16[n1]+1);
         ++v.BM0etcUnlockTotal;
         BM0etcReset(n1)
      }
      ,BM0c1Buy:()=>{
         var n=(++v.BM0c1)-2;
         if(v.BM0etcLengthEver.length<=n) Vue.set(v.BM0etcLengthEver,n,v.BM0etcLengthStart);
         BM0etcReset(n+1)
      }
      ,FGHPrestigeDo:()=>{
         var t=Min(v.SinceFGHPrestige,(Date.now()-Time.LastGame)*0.001);
         v.SinceFGHPrestige=0;
         v.FGHNumber=Plus(v.FGHNumber,v.FGHNumberToGet);
         v.FGHPrestige++;
         v.FGHPrestigeFastest=Min(v.FGHPrestigeFastest,t);
         v.FGHNumberRate=Max(v.FGHNumberRate,Divide(v.FGHNumberToGet,t));
         if(v.Challenge&255){
            switch(v.Challenge&255){
               case 4: v.FGHChal|=1; break;
               case 32: v.FGHChal|=2; break;
               case 8: v.FGHChal|=4; break;
               case 16: v.FGHChal|=8; break;
               case 2:
               v.AlphaSeries&=~8;
               v.FGHChal|=16;
               break;
               case 1:
               v.FGHChal6Eff=Max(v.FGHChal6Eff,v.FGHNumberToGet);
               break;
               case 128: v.FGHChal|=64; break;
               case 64: v.FGHChal|=128; break;
               case 40: v.FGHChal|=256; break;
               case 24: v.FGHChal|=512; break;
            }
            v.FGHChalExit()
         }
         FGHNumberUpdate();
         FGHErase();
         BMSReset()
      }
      ,FGHChalEnter:n=>{
         v.SinceFGHPrestige=0;
         FGHErase();
         BMSReset();
         v.Challenge|=n
      }
      ,FGHChalExit:()=>{
         if(v.Challenge&4) v.Chal4Eff=[[]];
         if(v.Challenge&24) v.SinceBought=0;
         if(v.Challenge&16) v.Chal16Base=1;
         if(v.Challenge&32){
            v.Chal32Base=1;
            v.SinceBM0etcUnlock=0
         }
         v.Challenge&=~255
      }
      ,AlphaSeriesBuy:n=>{
         v.FGHNumber=Minus(v.FGHNumber,[1,2,11,20,10240][n]);
         v.AlphaSeries|=1<<n;
         if(n===3) v.FGHChal&=~16;
      }
   }
})
,BMSReset = ()=>{
   v.Ach2r16=[0,0];
   v.MainNumber=4;
   v.FGHGainPeak=0;
   v.FGHGainPeakAt=0;
   v.BMSStage=0;
   v.BM0etc=[[0]];
   v.BM0etcBought=[[0]];
   v.BM0etcLength=[v.BM0etcLengthStart];
   v.BM0c1=2
}
,BM0etcReset = n=>{
   var BM0etcLength=v.BM0etcLength,BM0etcLengthStart=v.BM0etcLengthStart
   ,Challenge=v.Challenge;
   if(Challenge&36){
      if(Challenge&32){
         v.Chal32Base=Root(Max(Times(v.MainNumber,0.25),1),v.SinceBM0etcUnlock);
         v.SinceBM0etcUnlock=0
      }
      if(Challenge&4) v.Chal4Eff=[[]];
   }
   while(n--) BM0etcLength[n]=BM0etcLengthStart;
   Vue.set(BM0etcLength,0,BM0etcLength[0]);
   v.MainNumber=4;
   v.BM0etc=[[0]];
   v.BM0etcBought=[[0]]
}
,FGHNumberUpdate = ()=>{
   var FGHNumber=v.FGHNumber,amount,bought,lens,lensever,n,n1;
   n=(FGHNumber.pt||0)+1;
   while(LessQ(FGHNumber,IteratedFGH2(8,n))&&n>0) --n;
   n1=(amount=v.FGH2f1).length;
   bought=v.FGH2f1Bought;
   lens=v.FGH2f1Length;
   lensever=v.FGH2f1LengthEver;
   while(n>=n1){
      lensever[n]||Vue.set(lensever,n,3);
      Vue.set(lens,n,3);
      Vue.set(amount,n,[0]);
      Vue.set(bought,n,[0]);
      --n
   }
   n1=v.FGH2f1.length;
   while(n1--){
      amount=v.FGH2f1[n1];
      bought=v.FGH2f1Bought[n1];
      lens=v.FGH2f1Length[n1];
      while((n=amount.length)<lens&&LessEqualQ(IteratedFGH2(Power(2,n+1),n1+1),FGHNumber)){
         Vue.set(amount,n,0);
         Vue.set(bought,n,0)
      }
   }
}
,FGHErase = ()=>{
   var FGH2f1=v.FGH2f1,FGH2f1Bought=v.FGH2f1Bought,n,n1;
   n1=FGH2f1.length;
   while(n1--) for(n=FGH2f1[n1].length;n--;) FGH2f1[n1][n]=FGH2f1Bought[n1][n];
   Vue.set(FGH2f1,0,FGH2f1[0])
}
,Buymax = (Amount,Costo,sum,solve)=>{
   const amount=Pointer(v,Amount),costo=Pointer(v,Costo);
   var delta=Floor(Minus(solve(Plus(costo[0][costo[1]],sum(amount[0][amount[1]]))),amount[0][amount[1]]));
   if(Sign(delta)<=0) return 0;
   if(costo[0]===v){
      v[costo[1]]=Minus(v[costo[1]],Minus(sum(Plus(amount[0][amount[1]],delta)),sum(amount[0][amount[1]])));
      if(Sign(v[costo[1]])<0) v[costo[1]]=0;
   }else{
      Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],Minus(sum(Plus(amount[0][amount[1]],delta)),sum(amount[0][amount[1]]))))
      if(Sign(costo[0][costo[1]])<0) Vue.set(costo[0],costo[1],0);
   }
   Vue.set(amount[0],amount[1],Plus(amount[0][amount[1]],delta));
   return delta
}
,BuyMax = (Amount,Bought,Costo,sum,solve)=>{
   const amount=Pointer(v,Amount),bought=Pointer(v,Bought),costo=Pointer(v,Costo);
   var delta=Floor(Minus(solve(Plus(costo[0][costo[1]],sum(bought[0][bought[1]]))),bought[0][bought[1]]));
   if(Sign(delta)<=0) return 0;
   if(costo[0]===v){
      v[costo[1]]=Minus(v[costo[1]],Minus(sum(Plus(bought[0][bought[1]],delta)),sum(bought[0][bought[1]])));
      if(Sign(v[costo[1]])<0) v[costo[1]]=0;
   }else{
      Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],Minus(sum(Plus(bought[0][bought[1]],delta)),sum(bought[0][bought[1]]))))
      if(Sign(costo[0][costo[1]])<0) Vue.set(costo[0],costo[1],0);
   }
   Vue.set(amount[0],amount[1],Plus(amount[0][amount[1]],delta));
   Vue.set(bought[0],bought[1],Plus(bought[0][bought[1]],delta));
   return delta
}
,Loop = ()=>{
   setTimeout(Loop,v.UpdateInterval);
   var dt=(Date.now()-Time.LastUpdate)*0.001;
   Time.LastUpdate=Date.now();
   Grow(dt);
   if(v.AutoSave&&Time.LastUpdate-LastSave>=v.AutoSave){
      LastSave=Time.LastUpdate;
      Save(0)
   }
};
var LastSave=Date.now()
,Time=TimeRaw();
v.$watch('NumberBase',x=>{
   var pmax=29.9336062089226/Math.log(x);
   if(pmax<v.Precision) v.Precision=Math.floor(pmax)
});
window.addEventListener('keydown',e=>{
   if(!v.Hotkey||e.ctrlKey||e.altKey||e.shiftKey||e.metaKey) return;
   var k=e.keyCode;
   if(k>=96&&k<=105) k-=48;
   if(k>=50&&k<=57){
      if(v.BM0etcCantUnlock[k-50]===false) v.BM0etcUnlock(k-50);
      return
   }
   switch(k){
      case 48: return v.BM0etcMaxall();
      case 49: return v.BM0c1Cant||v.BM0c1Buy();
      case 80: return v.FGHPrestigeCant||v.FGHPrestigeDo();
   }
});
//Initialization
Load(0);
{
   let DeltaT=(Date.now()-Time.LastUpdate)*0.001;
   Time.LastUpdate=Date.now();
   let n=Math.ceil(Math.sqrt(DeltaT*3))
   ,dt=DeltaT/n;
   while(n--) Grow(dt);
}
Save(0);
document.getElementById('game').style.minHeight=(window.innerHeight-7)+'px';
document.body.removeChild(document.getElementById('loading'));
Loop()