'use strict';
const Pointer = (v,a)=>{
   var n,l=a.length-1,pointer=v;
   for(n=0;n<l;++n) pointer=pointer[a[n]];
   return [pointer,a[l]]
};
Vue.component('buy',{
   props:['info','amount','bought','mult','textsize']
   ,data(){return{
      inf:this.info
      ,amo:this.amount
      ,bou:this.bought
      ,mul:this.mult
      ,tex:this.textsize
   }}
   ,computed:{
      Amount(){return Pointer(this.$root,this.amo)}
      ,Bought(){return Pointer(this.$root,this.bou)}
      ,Costo(){return Pointer(this.$root,this.inf.costo)}
      ,Text(){return this.inf.text(this.Bought[0][this.Bought[1]])}
      ,Cost(){return this.inf.cost(this.Bought[0][this.Bought[1]])}
      ,Cant(){return LessQ(this.Costo[0][this.Costo[1]],this.Cost)}
      ,ShowAmount(){return show(this.Amount[0][this.Amount[1]])}
      ,ShowMult(){
         var a=Pointer(this.$root,this.mul);
         return show(a[0][a[1]])
      }
      ,ShowCost(){return showInt(this.Cost)}
   }
   ,methods:{
      Buy(){
         const amount=this.Amount,bought=this.Bought,costo=this.Costo;
         if(costo[0]===v) v[costo[1]]=Minus(v[costo[1]],this.Cost);
         else Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],this.Cost));
         Vue.set(amount[0],amount[1],Plus(amount[0][amount[1]],1));
         Vue.set(bought[0],bought[1],Plus(bought[0][bought[1]],1))
      }
      ,BuyMax(){
         const amount=this.Amount,bought=this.Bought,costo=this.Costo,infosum=this.inf.sum;
         var delta=Floor(Minus(this.inf.solve(Plus(costo[0][costo[1]],infosum(bought[0][bought[1]]))),bought[0][bought[1]]));
         if(Sign(delta)<0) delta=0;
         if(costo[0]===v){
            v[costo[1]]=Minus(v[costo[1]],Minus(infosum(Plus(bought[0][bought[1]],delta)),infosum(bought[0][bought[1]])));
            if(Sign(v[costo[1]])<0) v[costo[1]]=0;
         }else{
            Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],Minus(infosum(Plus(bought[0][bought[1]],delta)),infosum(bought[0][bought[1]]))))
            if(Sign(costo[0][costo[1]])<0) Vue.set(costo[0],costo[1],0);
         }
         Vue.set(amount[0],amount[1],Plus(amount[0][amount[1]],delta));
         Vue.set(bought[0],bought[1],Plus(bought[0][bought[1]],delta))
      }
   }
   ,template:'<button class="cell" :disabled="Cant" @mousedown.stop="Buy()" @dblclick.stop="BuyMax()" :title="inf.tooltip">\
      <b :style="{\'font-size\':tex+\'px\'}" v-html="Text"></b><br>\
      {{ShowAmount}}<br>\
      {{ShowMult}}×<br>\
      Cost: {{ShowCost}}\
   <slot></slot></button>'
})