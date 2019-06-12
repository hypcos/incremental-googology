'use strict';
const Pointer = a=>{
   var n,l=a.length-1,pointer=v;
   for(n=0;n<l;++n) pointer=pointer[a[n]];
   return [pointer,a[l]]
};
Vue.component('buy',{
   props:['info','amount','bought','mult','textsize']
   ,computed:{
      Amount(){return Pointer(this.amount)}
      ,Bought(){return Pointer(this.bought)}
      ,Costo(){return Pointer(this.info.costo)}
      ,Content(){return this.info.content(this.Bought[0][this.Bought[1]])}
      ,Cost(){return this.info.cost(this.Bought[0][this.Bought[1]])}
      ,Cant(){return LessQ(this.Costo[0][this.Costo[1]],this.Cost)||!v.Count&&this.info.costo[0]=='MainNumber'}
      ,ShowAmount(){return Show(9,3,1e10)(this.Amount[0][this.Amount[1]])}
      ,ShowMult(){
         var a=Pointer(this.mult);
         return Show(9,3,1e10)(a[0][a[1]])
      }
      ,ShowCost(){return Show(9,0,1e10)(this.Cost)}
   }
   ,methods:{
      Buy(){
         const amount=this.Amount,bought=this.Bought,costo=this.Costo;
         if(costo[0]===v) v[costo[1]]=Minus(v[costo[1]],this.Cost);
         else Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],this.Cost));
         Vue.set(amount[0],amount[1],Natural(Plus(amount[0][amount[1]],1)));
         Vue.set(bought[0],bought[1],Natural(Plus(bought[0][bought[1]],1)))
      }
      ,BuyMax(){
         const amount=this.Amount,bought=this.Bought,costo=this.Costo,infosum=this.info.sum;
         var delta=Floor(Minus(this.info.solve(Plus(costo[0][costo[1]],infosum(bought[0][bought[1]]))),bought[0][bought[1]]));
         if(Sign(delta)<0) delta=0;
         if(costo===v){
            v[costo[1]]=Minus(v[costo[1]],Minus(infosum(Plus(bought[0][bought[1]],delta)),infosum(bought[0][bought[1]])));
            if(Sign(v[costo[1]])<0) v[costo[1]]=0;
         }else{
            Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],Minus(infosum(Plus(bought[0][bought[1]],delta)),infosum(bought[0][bought[1]]))))
            if(Sign(costo[0][costo[1]])<0) Vue.set(costo[0],costo[1],0);
         }
         Vue.set(amount[0],amount[1],Natural(Plus(amount[0][amount[1]],delta)));
         Vue.set(bought[0],bought[1],Natural(Plus(bought[0][bought[1]],delta)))
      }
   }
   ,template:'<button class="cell" :disabled="Cant" @mousedown.stop="Buy()" @dblclick.stop="BuyMax()" :title="info.tooltip">\
      <b :style="{\'font-size\':textsize+\'px\'}" v-show="info.text">{{info.text}}<br></b>\
      <b :style="{\'font-size\':textsize+\'px\'}" v-show="Content">{{Content}}<br></b>\
      {{ShowAmount}}<br>\
      {{ShowMult}}×<br>\
      Cost: {{ShowCost}}\
   <slot></slot></button>'
});
Vue.component('bulk',{
   props:['bulkinfo']
   ,computed:{
      Cost(){
         var parentsum=this.$parent.info.sum,bought=this.$parent.Bought;
         bought=bought[0][bought[1]];
         return Minus(parentsum(Times(Plus(Floor(Divide(bought,this.bulkinfo.number)),1),this.bulkinfo.number)),parentsum(bought))
      }
      ,Cant(){
         const costo=this.$parent.Costo;
         return LessQ(costo[0][costo[1]],this.Cost)
      }
   }
   ,methods:{
      Buy(){
         const amount=this.$parent.Amount,bought=this.$parent.Bought,costo=this.$parent.Costo;
         if(costo[0]===v) v[costo[1]]=Minus(v[costo[1]],this.Cost);
         else Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],this.Cost));
         var delta=Divide(bought[0][bought[1]],this.bulkinfo.number);
         delta=Times(Minus(Plus(Floor(delta),1),delta),this.bulkinfo.number);
         Vue.set(amount[0],amount[1],Natural(Plus(amount[0][amount[1]],delta)));
         Vue.set(bought[0],bought[1],Natural(Plus(bought[0][bought[1]],delta)))
      }
      ,BuyMax(){
         const amount=this.$parent.Amount,bought=this.$parent.Bought,costo=this.$parent.Costo,parentsum=this.$parent.info.sum;
         var delta=Minus(Times(Floor(Divide(this.$parent.info.solve(Plus(costo[0][costo[1]],parentsum(bought[0][bought[1]])))
            ,this.bulkinfo.number)),this.bulkinfo.number),bought[0][bought[1]]);
         if(Sign(delta)<0) delta=0;
         if(costo===v){
            v[costo[1]]=Minus(v[costo[1]],Minus(parentsum(Plus(bought[0][bought[1]],delta)),parentsum(bought[0][bought[1]])));
            if(Sign(v[costo[1]])<0) v[costo[1]]=0;
         }else{
            Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],Minus(parentsum(Plus(bought[0][bought[1]],delta)),parentsum(bought[0][bought[1]]))))
            if(Sign(costo[0][costo[1]])<0) Vue.set(costo[0],costo[1],0);
         }
         Vue.set(amount[0],amount[1],Natural(Plus(amount[0][amount[1]],delta)));
         Vue.set(bought[0],bought[1],Natural(Plus(bought[0][bought[1]],delta)))
      }
   }
   ,template:'<button :disabled="Cant" @mousedown.stop="Buy()" @dblclick.stop="BuyMax()">{{bulkinfo.text}}</button>'
})
