const Pointer = a=>{
   var n,l=a.length-1,pointer=v;
   for(n=0;n<l;++n) pointer=pointer[a[n]];
   return [pointer,a[l]]
};
Vue.component('buy',{
   props:['info','amount','bought','mult']
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
         if(this.Costo[0]===v) v[this.Costo[1]]=Minus(v[this.Costo[1]],this.Cost);
         else Vue.set(this.Costo[0],this.Costo[1],Minus(this.Costo[0][this.Costo[1]],this.Cost));
         Vue.set(this.Amount[0],this.Amount[1],Natural(Plus(this.Amount[0][this.Amount[1]],1)));
         Vue.set(this.Bought[0],this.Bought[1],Natural(Plus(this.Bought[0][this.Bought[1]],1)))
      }
      ,BuyMax(){
         var delta=Floor(Minus(this.info.solve(Plus(this.Costo[0][this.Costo[1]],this.info.sum(this.Bought[0][this.Bought[1]]))),this.Bought[0][this.Bought[1]]));
         if(Sign(delta)<0) delta=0;
         if(this.Costo===v){
            v[this.Costo[1]]=Minus(v[this.Costo[1]],Minus(this.info.sum(Plus(this.Bought[0][this.Bought[1]],delta)),this.info.sum(this.Bought[0][this.Bought[1]])));
            if(Sign(v[this.Costo[1]])<0) v[this.Costo[1]]=0;
         }else{
            Vue.set(this.Costo[0],this.Costo[1],Minus(this.Costo[0][this.Costo[1]],Minus(this.info.sum(Plus(this.Bought[0][this.Bought[1]],delta)),this.info.sum(this.Bought[0][this.Bought[1]]))))
            if(Sign(this.Costo[0][this.Costo[1]])<0) Vue.set(this.Costo[0],this.Costo[1],0);
         }
         Vue.set(this.Amount[0],this.Amount[1],Natural(Plus(this.Amount[0][this.Amount[1]],delta)));
         Vue.set(this.Bought[0],this.Bought[1],Natural(Plus(this.Bought[0][this.Bought[1]],delta)))
      }
   }
   ,template:'<button class="cell" :disabled="Cant" @mousedown.stop="Buy()" @dblclick.stop="BuyMax()" :title="info.tooltip">\
      <span class="strong" v-show="info.text">{{info.text}}<br></span>\
      <span class="strong" v-show="Content">{{Content}}<br></span>\
      {{ShowAmount}}<br>\
      {{ShowMult}}×<br>\
      Cost: {{ShowCost}}\
   <slot></slot></button>'
});
Vue.component('bulk',{
   props:['info','bulkinfo','amount','bought']
   ,computed:{
      Amount(){return Pointer(this.amount)}
      ,Bought(){return Pointer(this.bought)}
      ,Costo(){return Pointer(this.info.costo)}
      ,Cost(){return Minus(this.info.sum(Times(Plus(Floor(Divide(this.Bought[0][this.Bought[1]],this.bulkinfo.number)),1),this.bulkinfo.number)),this.info.sum(this.Bought[0][this.Bought[1]]))}
      ,Cant(){return LessQ(this.Costo[0][this.Costo[1]],this.Cost)}
   }
   ,methods:{
      Buy(){
         if(this.Costo[0]===v) v[this.Costo[1]]=Minus(v[this.Costo[1]],this.Cost);
         else Vue.set(this.Costo[0],this.Costo[1],Minus(this.Costo[0][this.Costo[1]],this.Cost));
         var delta=Divide(this.Bought[0][this.Bought[1]],this.bulkinfo.number);
         delta=Times(Minus(Plus(Floor(delta),1),delta),this.bulkinfo.number);
         Vue.set(this.Amount[0],this.Amount[1],Natural(Plus(this.Amount[0][this.Amount[1]],delta)));
         Vue.set(this.Bought[0],this.Bought[1],Natural(Plus(this.Bought[0][this.Bought[1]],delta)))
      }
      ,BuyMax(){
         var delta=Minus(Times(Floor(Divide(this.info.solve(Plus(this.Costo[0][this.Costo[1]],this.info.sum(this.Bought[0][this.Bought[1]])))
            ,this.bulkinfo.number)),this.bulkinfo.number),this.Bought[0][this.Bought[1]]);
         if(Sign(delta)<0) delta=0;
         if(this.Costo===v){
            v[this.Costo[1]]=Minus(v[this.Costo[1]],Minus(this.info.sum(Plus(this.Bought[0][this.Bought[1]],delta)),this.info.sum(this.Bought[0][this.Bought[1]])));
            if(Sign(v[this.Costo[1]])<0) v[this.Costo[1]]=0;
         }else{
            Vue.set(this.Costo[0],this.Costo[1],Minus(this.Costo[0][this.Costo[1]],Minus(this.info.sum(Plus(this.Bought[0][this.Bought[1]],delta)),this.info.sum(this.Bought[0][this.Bought[1]]))))
            if(Sign(this.Costo[0][this.Costo[1]])<0) Vue.set(this.Costo[0],this.Costo[1],0);
         }
         Vue.set(this.Amount[0],this.Amount[1],Natural(Plus(this.Amount[0][this.Amount[1]],delta)));
         Vue.set(this.Bought[0],this.Bought[1],Natural(Plus(this.Bought[0][this.Bought[1]],delta)))
      }
   }
   ,template:'<button :disabled="Cant" @mousedown.stop="Buy()" @dblclick.stop="BuyMax()">{{bulkinfo.text}}</button>'
})
