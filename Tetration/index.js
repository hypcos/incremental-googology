'use strict';
const Version=0
,Grow = (dt)=>{
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
   ,Precision:5
   ,CurrentTab:0
   ,MainNumber:4
   ,BMSStage:0
   ,BM0etc:[[0]]
   ,BM0etcBought:[[0]]
   ,BM0etcLength:[3]
   ,BM0etcLengthEver:[3]
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
      ,BM0etcInfo(){
         var b16,n,n1=this.BM0etcLengthEver.length,arr,arr1=[];
         while(n1--){
            arr=[];
            for(n=this.BM0etcLengthEver[n1];n--;){
               b16=Power(n1+2,Power(2,Plus(Plus(n1,2),n)));
               arr[n]={
                  text:((n1,n)=>()=>'(0)'.repeat(n)+'['+this.ShowInt(n1)+']')(n1+2,n+1+n1)
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
         var bought,len,unlockereff,n,n1=this.BM0etcBought.length,arr,arr1=[];
         while(n1--){
            n=(bought=this.BM0etcBought[n1]).length;
            len=this.BM0etcLength[n1];
            unlockereff=this.BM0etcUnlockerEff[n1];
            arr=[];
            while(n--) arr[n]=Times(bought[n]?Power(n1+2,Plus(bought[n],-1)):1,Power(unlockereff,Max(len-3-n,0)));
            arr1[n1]=arr
         }
         return arr1
      }
      ,BM0etcUnlockText(){return this.BM0etcLength.map((x,n)=>'(0)'.repeat(x+n)+'['+this.ShowInt(n+2)+']')}
      ,BM0etcCantUnlock(){return this.BM0etc.map((x,n)=>LessQ(x[x.length-1]||0,n+2))}
      ,BM0etcUnlockerEff(){
         var BM0etcLength=this.BM0etcLength,n=BM0etcLength.length-1,arr=[];
         arr[n]=1;
         while(n--) arr[n]=Plus(Times(Plus(BM0etcLength[n+1],-3),arr[n+1]),1);
         return arr.map(x=>Power(2,x))
      }
      ,BM0c1Cost(){
         var BM0c1=this.BM0c1;
         return Power(BM0c1,Power(2,Plus(Times(BM0c1,BM0c1),2)))
      }
      ,BM0c1Cant(){return LessQ(this.MainNumber,this.BM0c1Cost)}
   }
   ,methods:{
      Show(x){return Show(this.Precision,3,Math.pow(10,this.Precision+1))(x)}
      ,ShowInt(x){return Show(this.Precision,0,Math.pow(10,this.Precision+1))(x)}
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
         var init=InitialData();
         Object.getOwnPropertyNames(init).map(x=>v[x]=init[x]);
         LastGame=Date.now();
         Save(0)
      }
      ,BM0etcMaxall:()=>{
         var r=v.$refs.BM0etc,n=r.length;
         while(n--) r[n].BuyMax();
      }
      ,BM0etcUnlock:n1=>{
         var BM0etcLength=v.BM0etcLength;
         Vue.set(BM0etcLength,n1,BM0etcLength[n1]+1);
         if(v.BM0etcLengthEver[n1]<BM0etcLength[n1]) Vue.set(v.BM0etcLengthEver,n1,BM0etcLength[n1]);
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
,Loop = ()=>{
   setTimeout(Loop,v.UpdateInterval);
   var dt=(Date.now()-LastUpdate)*0.001;
   LastUpdate=Date.now();
   Grow(dt);
   if(v.AutoSave&&LastUpdate-LastSave>=v.AutoSave){
      LastSave=LastUpdate;
      Save(0)
   }
};
var LastSave=Date.now()
,LastUpdate=Date.now()
,LastGame=Date.now();
v.$watch('MainNumber',x=>{
   var amount=v.BM0etc,bought=v.BM0etcBought,lens=v.BM0etcLength,n,n1=amount.length,m=lens.length;
   if(v.BMSStage<2&&LessEqualQ(18446744073709551616,x)) v.BMSStage=2;
   if(v.BMSStage<1&&LessEqualQ(16777216,x)) v.BMSStage=1;
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
//Valid historical versions
DataList[0]=['UpdateInterval','AutoSave','Precision','MainNumber','BMSStage'
,'BM0etc','BM0etcBought','BM0etcLength','BM0etcLengthEver','BM0c1'];
//Initialization
Load(0);
{
   let DeltaT=(Date.now()-LastUpdate)*0.001;
   LastUpdate=Date.now();
   let n=Math.ceil(Math.sqrt(DeltaT*3))
   ,dt=DeltaT/n;
   while(n--) Grow(dt);
}
Save(0);
document.body.removeChild(document.getElementById('loading'));
Loop()
