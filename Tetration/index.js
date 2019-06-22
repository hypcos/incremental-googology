'use strict';
const Grow = (dt)=>{
   var a1,a2,n,n1=v.BM0etc.length;
   while(n1--){
      n=(a1=v.BM0etc[n1]).length;
      a2=v.BM0etcMult[n1];
      while(--n) a1[n-1]=Plus(a1[n-1],Times(Times(a1[n],a2[n]),dt*0.2))
   }
   Vue.set(v.BM0etc,0,v.BM0etc[0]);
   v.MainNumber=Plus(v.MainNumber,Times(v.Growth,dt))
}
,InitialData = ()=>({
   ExportBox:false
   ,ExportContent:''
   ,UpdateInterval:62
   ,AutoSave:10000
   ,NumberBase:10
   ,Precision:4
   ,Hotkey:1
   ,CurrentTab:0
   ,Achievement:[0]
   ,MainNumber:4
   ,MainNumberEver:4
   ,BMSStage:0
   ,BM0etc:[[0,0,0]]
   ,BM0etcBought:[[0,0,0]]
   ,BM0etcLength:[3]
   ,BM0etcLengthEver:[3]
   ,BM0etcUnlockCount:[0,0,0]
   ,BM0c1:2
})
,v = new Vue({
   el:'#game'
   ,data:InitialData()
   ,computed:{
      Growth(){
         var BM0etc=this.BM0etc,BM0etcMult=this.BM0etcMult,n=BM0etc.length,s=Times(BM0etc[0][0],BM0etcMult[0][0]);
         while(--n) s=Times(s,Plus(Times(BM0etc[n][0],BM0etcMult[n][0])||0,1));
         return s
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
      ,BM0etcInfo(){
         var b16,n,n1=this.BM0etcLengthEver.length,arr,arr1=[];
         while(n1--){
            arr=[];
            for(n=this.BM0etcLengthEver[n1];n--;){
               b16=Power(n1+2,Power(2,Plus(Plus(n1,2),n)));
               arr[n]={
                  text:((n1,n)=>()=>'(0)'.repeat(n)+'['+this.ShowInt(n1)+']')(n1+2,n+1+n1)
                  ,tooltip:n?'Generate '+'(0)'.repeat(n+n1)+'['+this.ShowInt(n1+2)+']':'Make your number grow'
                  ,costo:['MainNumber']
                  ,cost:(b16=>x=>Power(b16,Plus(x,0.5)))(b16)
                  ,sum:((b16,sumk)=>x=>Times(sumk,Plus(Power(b16,x),-1)))(b16,Divide(Power(n1+2,Power(2,Plus(Plus(n1,1),n))),Plus(b16,-1)))
                  ,solve:((b16,solvek)=>Y=>Log(b16,Plus(Times(solvek,Y),1)))(b16,Divide(Plus(b16,-1),Power(n1+2,Power(2,Plus(Plus(n1,1),n)))))
               }
            }
            arr1[n1]=arr
         }
         return arr1
      }
      ,BM0etcMult(){
         var bought,len,unlockereff,n,n1=this.BM0etcBought.length,arr,arr1=[]
         ,Achievement=this.Achievement
         ,Overall=this.AchieveCellEff*(Achievement[1]&8?1.01:1)//Overall bonus to all (0)...(0)[x]
         ,BaseMult
         ,Base3Incr=2+(Achievement[2]&64?0.1:0);
         while(n1--){
            n=(bought=this.BM0etcBought[n1]).length;
            len=this.BM0etcLength[n1];
            unlockereff=this.BM0etcUnlockerEff[n1];
            arr=[];
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
            while(n--)
               arr[n]=Times(Times(bought[n]?Power(n1==1?Base3Incr:n1+2,Plus(bought[n],-1)):1,Power(unlockereff,Max(len-3-n,0))),Times(Overall,BaseMult));
            arr1[n1]=arr
         }
         //Single BM specific bonus
         if(Achievement[0]&8) arr1[0][0]=Times(arr1[0][0],1.05);
         if(arr1[0][1]&&Achievement[1]&128) arr1[0][1]=Times(arr1[0][1],1.1);
         if(arr1[0][2]&&Achievement[0]&16) arr1[0][2]=Times(arr1[0][2],1.05);
         if(arr1[0][3]&&Achievement[1]&16) arr1[0][3]=Times(arr1[0][3],1.05);
         if(arr1[0][6]&&Achievement[1]&64) arr1[0][6]=Times(arr1[0][6],1.2);
         if(arr1[1]&&Achievement[2]&32){
            if(arr1[1][0]) arr1[1][0]=Times(arr1[1][0],1.2);
            if(arr1[1][1]) arr1[1][1]=Times(arr1[1][1],1.2)
         }
         return arr1
      }
      ,BM0etcUnlockText(){return this.BM0etcLength.map((x,n)=>'(0)'.repeat(x+n)+'['+this.ShowInt(n+2)+']')}
      ,BM0etcCantUnlock(){return this.BM0etc.map((x,n)=>LessQ(x[x.length-1]||0,n+2))}
      ,BM0etcUnlockerEff(){
         var BM0etcLength=this.BM0etcLength,n=BM0etcLength.length-1,arr=[]
         ,Overall=this.Achievement[2]&256?1.02:1;
         arr[n]=Overall;
         while(n--) arr[n]=Times(Plus(Times(Plus(BM0etcLength[n+1],-3),arr[n+1]),1),Overall);
         return arr.map(x=>Power(2,x))
      }
      ,BM0c1Cost(){
         var BM0c1=this.BM0c1;
         return Power(BM0c1,Power(2,Plus(Times(BM0c1,BM0c1),2)))
      }
      ,BM0c1Cant(){return LessQ(this.MainNumber,this.BM0c1Cost)}
   }
   ,methods:{
      Show(x){return Show(x,this.Precision,this.NumberBase)}
      ,ShowInt(x){return Show(x,this.Precision,this.NumberBase,true)}
      ,Save:n=>Save(n)
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
         Cancel.map(x=>x());
         RowCancel.map(x=>x());
         var init=InitialData();
         Object.getOwnPropertyNames(init).map(x=>v[x]=init[x]);
         Hidden=HiddenRaw();
         Achievementwatch();
         Save(0)
      }
      ,BM0etcMaxall:()=>{
         var BM0etc=v.BM0etc,BM0etcInfo=v.BM0etcInfo,n,n1=BM0etc.length;
         while(n1--)
            for(n=BM0etc[n1].length;n--;)
               BuyMax(['BM0etc',n1,n],['BM0etcBought',n1,n],['MainNumber'],BM0etcInfo[n1][n].sum,BM0etcInfo[n1][n].solve)
      }
      ,BM0etcUnlock:n1=>{
         var BM0etcLength=v.BM0etcLength,i;
         Vue.set(BM0etcLength,n1,BM0etcLength[n1]+1);
         if(v.BM0etcLengthEver[n1]<BM0etcLength[n1]) Vue.set(v.BM0etcLengthEver,n1,BM0etcLength[n1]);
         Vue.set(v.BM0etcUnlockCount,i=n1<2?n1:2,v.BM0etcUnlockCount[i]+1);
         BM0etcReset(n1)
      }
      ,BM0c1Buy:()=>{
         var n=(++v.BM0c1)-2;
         Vue.set(v.BM0etcLengthEver,n,3);
         BM0etcReset(n+1)
      }
   }
})
,BM0etcReset = n=>{
   var BM0etcLength=v.BM0etcLength;
   while(n--) BM0etcLength[n]=3;
   Vue.set(BM0etcLength,0,BM0etcLength[0]);
   v.MainNumber=4;
   v.BM0etc=[[0]];
   v.BM0etcBought=[[0]]
}
,BuyMax = (Amount,Bought,Costo,sum,solve)=>{
   const amount=Pointer(v,Amount),bought=Pointer(v,Bought),costo=Pointer(v,Costo);
   var delta=Floor(Minus(solve(Plus(costo[0][costo[1]],sum(bought[0][bought[1]]))),bought[0][bought[1]]));
   if(Sign(delta)<0) delta=0;
   if(costo[0]===v){
      v[costo[1]]=Minus(v[costo[1]],Minus(sum(Plus(bought[0][bought[1]],delta)),sum(bought[0][bought[1]])));
      if(Sign(v[costo[1]])<0) v[costo[1]]=0;
   }else{
      Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],Minus(sum(Plus(bought[0][bought[1]],delta)),sum(bought[0][bought[1]]))))
      if(Sign(costo[0][costo[1]])<0) Vue.set(costo[0],costo[1],0);
   }
   Vue.set(amount[0],amount[1],Plus(amount[0][amount[1]],delta));
   Vue.set(bought[0],bought[1],Plus(bought[0][bought[1]],delta))
}
,Loop = ()=>{
   setTimeout(Loop,v.UpdateInterval);
   var dt=(Date.now()-Hidden.LastUpdate)*0.001;
   Hidden.LastUpdate=Date.now();
   Grow(dt);
   if(v.AutoSave&&Hidden.LastUpdate-LastSave>=v.AutoSave){
      LastSave=Hidden.LastUpdate;
      Save(0)
   }
}
,HiddenRaw = ()=>({
   LastUpdate:Date.now()
   ,LastGame:Date.now()
});
var LastSave=Date.now()
,Hidden=HiddenRaw();
v.$watch('NumberBase',x=>{
   var pmax=29.9336062089226/Math.log(x);
   if(pmax<v.Precision) v.Precision=Math.floor(pmax)
});
v.$watch('MainNumber',x=>{
   var amount=v.BM0etc,bought=v.BM0etcBought,lens=v.BM0etcLength,n,n1=amount.length,m=lens.length;
   if(LessQ(v.MainNumberEver,x)) v.MainNumberEver=x;
   if(v.BMSStage<2){
      if(LessEqualQ(18446744073709551616,x)) v.BMSStage=2;
      else if(v.BMSStage<1&&LessEqualQ(16777216,x)) v.BMSStage=1;
   }
   while(LessQ(x,Power(--m+2,Power(2,m+1))));
   while(n1<=m){
      Vue.set(amount,n1,[]);
      Vue.set(bought,n1,[]);
      ++n1
   }
   while(n1--){
      amount=v.BM0etc[n1];
      bought=v.BM0etcBought[n1];
      lens=v.BM0etcLength[n1];
      while((n=amount.length)<lens&&LessEqualQ(Power(n1+2,Power(2,Plus(Plus(n1,1),n))),x)){
         Vue.set(amount,n,0);
         Vue.set(bought,n,0)
      }
   }
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
      case 48: v.BM0etcMaxall(); return;
      case 49: if(v.BM0c1Cant===false) v.BM0c1Buy(); return;
   }
});
//Initialization
Load(0);
{
   let DeltaT=(Date.now()-Hidden.LastUpdate)*0.001;
   Hidden.LastUpdate=Date.now();
   let n=Math.ceil(Math.sqrt(DeltaT*3))
   ,dt=DeltaT/n;
   while(n--) Grow(dt);
}
Save(0);
document.getElementById('game').style.minHeight=(window.innerHeight-7)+'px';
document.body.removeChild(document.getElementById('loading'));
Loop()
