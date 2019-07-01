'use strict';
const Pointer = (v,a)=>{
   var n,l=a.length-1,pointer=v;
   for(n=0;n<l;++n) pointer=pointer[a[n]];
   return [pointer,a[l]]
};
Vue.component('buy',{
   props:['info','amount','bought','mult','modifier','textsize']
   ,data(){return{
      bou:this.bought
      ,mul:this.mult
      ,tex:this.textsize
   }}
   ,computed:{
      Amount(){return Pointer(this.$root,this.amount)}
      ,Bought(){return Pointer(this.$root,this.bou)}
      ,Costo(){return Pointer(this.$root,this.info.costo)}
      ,Text(){return this.info.text(this.Bought[0][this.Bought[1]])}
      ,Cost(){return this.info.cost(this.Bought[0][this.Bought[1]])}
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
         Vue.set(bought[0],bought[1],Plus(bought[0][bought[1]],1));
         this.$emit('buying',1)
      }
      ,BuyMax(){
         const amount=this.Amount,bought=this.Bought,costo=this.Costo,infosum=this.info.sum;
         var delta=Floor(Minus(this.info.solve(Plus(costo[0][costo[1]],infosum(bought[0][bought[1]]))),bought[0][bought[1]]));
         if(Sign(delta)<0) delta=0;
         if(costo[0]===v){
            v[costo[1]]=Minus(v[costo[1]],Minus(infosum(Plus(bought[0][bought[1]],delta)),infosum(bought[0][bought[1]])));
            if(Sign(v[costo[1]])<0) v[costo[1]]=0;
         }else{
            Vue.set(costo[0],costo[1],Minus(costo[0][costo[1]],Minus(infosum(Plus(bought[0][bought[1]],delta)),infosum(bought[0][bought[1]]))))
            if(Sign(costo[0][costo[1]])<0) Vue.set(costo[0],costo[1],0);
         }
         Vue.set(amount[0],amount[1],Plus(amount[0][amount[1]],delta));
         Vue.set(bought[0],bought[1],Plus(bought[0][bought[1]],delta));
         delta&&this.$emit('buying',delta)
      }
   }
   ,template:`<button class="cell" :disabled="Cant" @mousedown.stop="Buy()" @dblclick.stop="BuyMax()">
      <b :style="{'font-size':tex+'px'}" v-html="Text"></b><br>
      {{ShowAmount}}<br>
      ×{{ShowMult}}<span v-html="modifier"></span><br>
      Cost: {{ShowCost}}
   <slot></slot><span class="tooltip" v-html="info.tooltip"></span></button>`
});
Vue.component('automaton-select',{
   data(){return{
      AvailableSelected:undefined
      ,ActiveSelected:undefined
   }}
   ,computed:{
      AutoPool(){return this.$root.AutoPool}
      ,AutoAvailable(){return this.$root.AutoAvailable}
      ,AutoActive(){return this.$root.AutoActive}
   }
   ,methods:{
      EnableItem(){
         var AvailableSelected=this.AvailableSelected,AutoActive;
         if(!AvailableSelected) return;
         AutoActive=this.$root.AutoActive;
         if(AutoActive.indexOf(AvailableSelected)==-1) AutoActive.push(AvailableSelected)
      }
      ,EnableAll(){
         var AutoAvailable=this.$root.AutoAvailable,AutoActive=this.$root.AutoActive,l=AutoAvailable.length,n;
         for(n=0;n<l;++n) if(AutoActive.indexOf(AutoAvailable[n])==-1) AutoActive.push(AutoAvailable[n])
      }
      ,DisableItem(){
         var ActiveSelected=this.ActiveSelected,AutoActive,idx;
         if(!ActiveSelected) return;
         AutoActive=this.$root.AutoActive;
         idx=AutoActive.indexOf(ActiveSelected);
         if(idx==-1) return;
         AutoActive.splice(idx,1)
      }
      ,DisableAll(){this.$root.AutoActive=[]}
      ,ItemTop(){
         var ActiveSelected=this.ActiveSelected,AutoActive,idx;
         if(!ActiveSelected) return;
         AutoActive=this.$root.AutoActive;
         idx=AutoActive.indexOf(ActiveSelected);
         if(idx==-1) return;
         AutoActive.splice(idx,1);
         AutoActive.unshift(ActiveSelected)
      }
      ,ItemBottom(){
         var ActiveSelected=this.ActiveSelected,AutoActive,idx;
         if(!ActiveSelected) return;
         AutoActive=this.$root.AutoActive;
         idx=AutoActive.indexOf(ActiveSelected);
         if(idx==-1) return;
         AutoActive.splice(idx,1);
         AutoActive.push(ActiveSelected)
      }
      ,ItemUp(){
         var ActiveSelected=this.ActiveSelected,AutoActive,idx;
         if(!ActiveSelected) return;
         AutoActive=this.$root.AutoActive;
         idx=AutoActive.indexOf(ActiveSelected);
         if(idx==-1||idx==0) return;
         AutoActive.splice(idx,1);
         AutoActive.splice(idx-1,0,ActiveSelected)
      }
      ,ItemDown(){
         var ActiveSelected=this.ActiveSelected,AutoActive,idx;
         if(!ActiveSelected) return;
         AutoActive=this.$root.AutoActive;
         idx=AutoActive.indexOf(ActiveSelected);
         if(idx==-1||idx==AutoActive.length-1) return;
         AutoActive.splice(idx,1);
         AutoActive.splice(idx+1,0,ActiveSelected)
      }
   }
   ,template:`<div><div class="column2">
      <select class="column2" size="18" style="height:220px" v-model="AvailableSelected">
         <option v-for="item in AutoAvailable" :value="item">{{AutoPool[item].text}}</option>
      </select><br>
      <button class="cell3 column4" @mousedown="EnableItem()">Enable</button><br>
      <button class="cell3 column4" @mousedown="EnableAll()">Enable All</button>
   </div><div class="column2">
      <select class="column2" size="18" style="height:220px" v-model="ActiveSelected">
         <option v-for="item in AutoActive" :value="item">{{AutoPool[item].text}}</option>
      </select><br>
      <button class="cell3" @mousedown="ItemTop()">Priority Top</button>
      <button class="cell3" @mousedown="ItemUp()">Priority Up</button>
      <button class="cell3" @mousedown="ItemDown()">Priority Down</button>
      <button class="cell3" @mousedown="ItemBottom()">Priority Bottom</button><br>
      <button class="cell3" @mousedown="DisableItem()">Disable</button>
      <button class="cell3" @mousedown="DisableAll()">Disable All</button>
   </div></div>`
})