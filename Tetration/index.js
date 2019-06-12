'use strict';
const Grow = (dt)=>{
   var n;
   if(v.DigitOrdering.length){
      for(n=v.DigitOrdering.length;--n;) v.Digit[n-1]=Plus(v.Digit[n-1],Times(Times(v.Digit[n],v.DigitMult[n]),dt));
      v.DigitEff=Plus(v.DigitEff,Times(Times(v.Digit[0],v.DigitMult[0]),dt))
   }
   v.MainNumber=Plus(v.MainNumber,Times(v.Growth,dt))
}
,InitialData = ()=>({
   UpdateInterval:62
   ,AutoSave:10000
   ,ExportBox:false
   ,ExportContent:''
   ,MainNumber:1
   ,Count:0
   ,CurrentTab:0
   ,DigitEff:1
   ,DigitInfo:[
      {
         text:"D'ni digits"
         ,content:n=>LessQ(n,6)?['fa','fasE','fara','falen','famel','fablo'][n]:''
         ,costo:['MainNumber']
         ,cost:n=>Power(25,n)
         ,sum:n=>Divide(Plus(Power(25,n),-1),24)
         ,solve:Y=>Log(25,Plus(Times(24,Y),1))
         ,mult:n=>Times(Times(Power(7.25,Floor(Divide(n,25))),Power(157.25,Floor(Divide(n,625)))),
            Times(Power(3907.25,Floor(Divide(n,15625))),Times(Power(97657.25,Floor(Divide(n,390625))),Power(2441407.25,Floor(Divide(n,9765625))))))
         ,tooltip:'boost by +625% every fasE purchases\nboost by +15625% every fara purchases\n\
boost by +390625% every falen purchases\nboost by +9765625% every famel purchases\nboost by +244140625% every fablo purchases'
      },{
         text:'Muplo digits'
         ,content:n=>LessQ(n,7)?['jah','tus','flah','juun','ttit','iaq','klos'][n]:''
         ,costo:['MainNumber']
         ,cost:n=>Power(17,n)
         ,sum:n=>Divide(Plus(Power(17,n),-1),16)
         ,solve:Y=>Log(17,Plus(Times(16,Y),1))
         ,mult:n=>Times(Times(Power(3.89,Floor(Divide(n,17))),Times(Power(50.13,Floor(Divide(n,289))),Power(836.21,Floor(Divide(n,4913)))))
            ,Times(Power(14199.57,Floor(Divide(n,83521))),Times(Power(241376.69,Floor(Divide(n,1419857))),Power(4103387.73,Floor(Divide(n,24137569))))))
         ,tooltip:'boost by +289% every tus purchases\nboost by +4913% every flah purchases\nboost by +83521% every juun purchases\n\
boost by +1419857% every ttit purchases\nboost by +24137569% every iaq purchases\nboost by +410338673% every klos purchases'
      },{
         text:'Qohenje digits'
         ,content:n=>LessQ(n,11)?['nym','sjyp','kaŋ','myul','tjega','maha',"ma'asjyp","ma'akaŋ","ma'amul","ma'adjega",'kyran'][n]:''
         ,costo:['MainNumber']
         ,cost:n=>Plus(Power(4,Plus(n,0.207518749639421909)),-0.333333333333333333)
         ,sum:n=>Plus(Power(4,Plus(n,-0.584962500721156181)),Plus(Times(n,-0.333333333333333333),-0.444444444444444444))
         ,solve:Y=>Plus(Log(4,Plus(Y,0.7777)),0.584962500721156181)//not exact
         ,mult:n=>Times(Times(Times(Power(1.21,Floor(Divide(n,5))),Power(1.85,Floor(Divide(n,21))))
            ,Times(Power(4.41,Floor(Divide(n,85))),Power(14.65,Floor(Divide(n,341)))))
            ,Times(Times(Power(55.61,Floor(Divide(n,1365))),Power(219.45,Floor(Divide(n,5461))))
            ,Times(Times(Power(874.81,Floor(Divide(n,21845))),Power(3496.25,Floor(Divide(n,87381))))
            ,Times(Power(13982.01,Floor(Divide(n,349525))),Power(55925.05,Floor(Divide(n,1398101)))))))
         ,tooltip:"boost by +21% every sjyp purchases\nboost by +85% every kaŋ purchases\n\
boost by +341% every myul purchases\nboost by +1365% every tjega purchases\n\
boost by +5461% every maha purchases\nboost by +21845% every ma'asjyp purchases\nboost by +87381% every ma'akaŋ purchases\n\
boost by +349525% every ma'amul purchases\nboost by +1398101% every ma'adjega purchases\nboost by +5592405% every kyran purchases"
      },{
         text:'Dzongkha digits'
         ,content:n=>LessQ(n,5)?['ciː','kʰe','ɲiɕu','kʰecʰe','jãːcʰe'][n]:''
         ,costo:['MainNumber']
         ,cost:n=>Power(20,n)
         ,sum:n=>Divide(Plus(Power(20,n),-1),19)
         ,solve:Y=>Log(20,Plus(Times(19,Y),1))
         ,mult:n=>Times(Times(Power(5,Floor(Divide(n,20))),Power(81,Floor(Divide(n,400))))
            ,Times(Power(1601,Floor(Divide(n,8000))),Power(32001,Floor(Divide(n,160000)))))
         ,tooltip:'boost by +400% every kʰe purchases\nboost by +8000% every ɲiɕu purchases\n\
boost by +160000% every kʰecʰe purchases\nboost by +3200000% every jãːcʰe purchases'
      },{
         text:'Hawaiian digits'
         ,content:n=>LessQ(n,7)?['ha','kanaha','lau','mano','kini','lehu','nalowale'][n]:''
         ,costo:['MainNumber']
         ,cost:n=>Times(Power(10,n),4)
         ,sum:n=>Times(Plus(Power(10,n),-1),0.444444444444444444)
         ,solve:Y=>Log(10,Plus(Times(2.25,Y),1))
         ,mult:n=>Times(Times(Power(1.4,Floor(Divide(n,4))),Times(Power(5,Floor(Divide(n,40))),Power(41,Floor(Divide(n,400)))))
            ,Times(Times(Power(401,Floor(Divide(n,4e3))),Power(4001,Floor(Divide(n,4e4))))
            ,Times(Power(40001,Floor(Divide(n,4e5))),Power(400001,Floor(Divide(n,4e6))))))
         ,tooltip:'boost by +40% every ha purchases\nboost by +400% every kanaha purchases\nboost by +4000% every lau purchases\n\
boost by +40000% every mano purchases\nboost by +400000% every kini purchases\n\
boost by +4000000% every lehu purchases\nboost by +40000000% every nalowale purchases'
      },{
         text:'Kómnzo digits'
         ,content:n=>LessQ(n,7)?['nämbi','nimbo','féta','tarumba','ntamno','wärämäkä','wi'][n]:''
         ,costo:['MainNumber']
         ,cost:n=>Power(6,n)
         ,sum:n=>Divide(Plus(Power(6,n),-1),5)
         ,solve:Y=>Log(6,Plus(Times(5,Y),1))
         ,mult:n=>Times(Times(Power(1.36,Floor(Divide(n,6))),Times(Power(3.16,Floor(Divide(n,36))),Power(13.96,Floor(Divide(n,216)))))
            ,Times(Power(78.76,Floor(Divide(n,1296))),Times(Power(467.56,Floor(Divide(n,7776))),Power(2800.36,Floor(Divide(n,46656))))))
         ,tooltip:'boost by +36% every nimbo purchases\nboost by +216% every féta purchases\nboost by +1296% every tarumba purchases\n\
boost by +7776% every ntamno purchases\nboost by +46656% every wärämäkä purchases\nboost by +279936% every wi purchases'
      },{
         text:'Nahuatl digits'
         ,content:n=>LessQ(n,4)?['ce','cempohualli','centzontli','cenxiquipilli'][n]:''
         ,costo:['MainNumber']
         ,cost:n=>Power(20,n)
         ,sum:n=>Divide(Plus(Power(20,n),-1),19)
         ,solve:Y=>Log(20,Plus(Times(19,Y),1))
         ,mult:n=>Times(Power(5,Floor(Divide(n,20))),Times(Power(81,Floor(Divide(n,400))),Power(1601,Floor(Divide(n,8000)))))
         ,tooltip:'boost by +400% every cempohualli purchases\nboost by +8000% every centzontli purchases\nboost by +160000% every cenxiquipilli purchases'
      },{
         text:'Misalian seximal digits'
         ,content:n=>{
            if(LessQ(406239826673664,n)) return '';
            var arr,i,n1=Times(n,0.25),n4=Floor(n1);
            n1=Times(Minus(n1,n4),4);
            if(Sign(n1)<0) n1=0;
            else if(LessQ(3,n1)) n1=3;
            if(!n4) return ['one','six','nif','six nif'][n1];
            arr=n4.toString(6).split('').map(n=>['nil','un','bi','tri','quad','pent'][n]);
            for(i=0;i<arr.length-1;++i){
               switch(arr[i]){
                  case 'un':
                     if(arr[i+1]==='bi'||arr[i+1]==='pent') arr[i]='um';
                     break;
                  case 'pent':
                  case 'quad':
                     if(arr[i+1]!='un') arr[i]+='a';
               }
            }
            return ['','six ','nif ','six nif '][n1]+arr.join('')+'exian'
         }
         ,costo:['MainNumber']
         ,cost:n=>Power(6,n)
         ,sum:n=>Divide(Plus(Power(6,n),-1),5)
         ,solve:Y=>Log(6,Plus(Times(5,Y),1))
         ,mult:n=>Times(Power(1.36,Floor(Divide(n,6))),Times(Power(3.16,Floor(Divide(n,36))),Power(13.96,Floor(Divide(n,216)))))
         ,tooltip:'boost by +36% every six purchases\nboost by +216% every nif purchases\nboost by +1296% every six nif purchases'
      },{
         text:'normal digits'
         ,content:n=>LessQ(n,3e9)?ShortScaleName(Power(10,n)):'('+Show(9,0,1e10)(Times(n,0.333333333333333333))+')illion'
         ,costo:['MainNumber']
         ,cost:n=>Power(10,n)
         ,sum:n=>Divide(Plus(Power(10,n),-1),9)
         ,solve:Y=>Log(10,Plus(Times(9,Y),1))
         ,mult:n=>Times(Power(2,Floor(Divide(n,10))),Power(11,Floor(Divide(n,100))))
         ,tooltip:'boost by +100% every ten purchases\nboost by +1000% every hundred purchases'
      }
   ]
   ,DigitOrdering:[]
   ,Digit:[0,0,0,0,0,0,0,0,0]
   ,DigitBought:[0,0,0,0,0,0,0,0,0]
   ,DigitBulkInfo:[
      {number:25,text:'Until fasE'}
      ,{number:17,text:'Until tus'}
      ,{number:5,text:'Until sjyp'}
      ,{number:20,text:'Until kʰe'}
      ,{number:4,text:'Until ha'}
      ,{number:6,text:'Until nimbo'}
      ,{number:20,text:'Until cempohualli'}
      ,{number:6,text:'Until six'}
      ,{number:10,text:'Until ten'}
   ]
})
,v = new Vue({
   el:'#game'
   ,data:InitialData()
   ,computed:{
      Growth(){return Times(this.Count,this.DigitEff)}
      ,CountCost(){return Plus(this.Count,1)}
      ,CantCount(){return LessQ(this.MainNumber,this.CountCost)}
      ,DigitMult(){
         var n,arr=[];
         for(n=this.DigitOrdering.length;n--;) arr[n]=this.DigitInfo[this.DigitOrdering[n]].mult(this.DigitBought[n]);
         return arr
      }
      ,DigitLocked(){
         var n,arr=[];
         const base=['base-25','base-17','base-4x+1','base-20','base-4·10^n','base-6','base-20','','']
         ,requirement=[24.9,16.9,4.9,19.9,3.9,5.9,19.9,5.9,9.9];
         for(n=0;n<9;++n) if(this.DigitOrdering.indexOf(n)==-1) arr.push({text:base[n]+' '+this.DigitInfo[n].text,index:n,requirement:requirement[n]});
         return arr
      }
      ,CantUnlockDigit(){return this.DigitLocked.map(digit=>LessQ(this.DigitOrdering.length?this.Digit[this.DigitOrdering.length-1]:this.Count,digit.requirement))}
      ,ShowUnlockDigitCosto(){return this.DigitOrdering.length?this.DigitInfo[this.DigitOrdering[this.DigitOrdering.length-1]].text:'counts'}
   }
   ,methods:{
      Save:n=>Save(n)
      ,Load:n=>Load(n)
      ,Export(){
         Save(0);
         this.ExportContent=localStorage.getItem('0').split('').map(x=>String.fromCharCode(174+(x.charCodeAt(0)>>8),174+(x.charCodeAt(0)&255))).join('');
         this.ExportBox=true
      }
      ,Import(){
         var arr=this.ExportContent.split(''),i;
         for(i=0;i<arr.length;++i) arr.splice(i,2,String.fromCharCode((arr[i].charCodeAt(0)-174<<8)+arr[i+1].charCodeAt(0)-174));
         localStorage.setItem('0',arr.join(''));
         this.ExportBox=false;
         Load(0)
      }
      ,Reset(){
         if(!confirm('Unlike other resets, you will lose all the progress WITHOUT ANY BONUS OR REWARD.\nDo you really want a FULL reset?')) return;
         var init=InitialData();
         Object.getOwnPropertyNames(init).map(x=>v[x]=init[x]);
         LastGame=Date.now();
         Save(0)
      }
      ,shortScaleName:x=>ShortScaleName(x)
      ,ShortScaleName:x=>UpperFirst(ShortScaleName(x))
      ,Show:(n,x)=>Show(n,3,Math.pow(10,n+1))(x)
      ,ShowInt:(n,x)=>Show(n,0,Math.pow(10,n+1))(x)
      ,BuyCount(){
         this.MainNumber=Minus(this.MainNumber,this.CountCost);
         this.Count=Plus(this.Count,1)
      }
      ,BuyMaxCount(){
         const f=x=>Times(Times(x,Plus(x,1)),0.5)
         ,solve=Y=>Plus(Power(Plus(Plus(Y,Y),0.25),0.5),-0.5);
         var delta=Floor(Minus(solve(Plus(this.MainNumber,f(this.Count))),this.Count));
         if(Sign(delta)<0) delta=0;
         this.MainNumber=Minus(this.MainNumber,Minus(f(Plus(this.Count,delta)),f(this.Count)));
         if(Sign(this.MainNumber)<0) this.MainNumber=0;
         this.Count=Plus(this.Count,delta)
      }
      ,UnlockDigit(n){return this.DigitOrdering.push(n)}
   }
})
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
//Save and load
//Deal with Number (length 4 stream, start<=65520), N (big number representation, length 9 stream, start>=65528), Array (start 65526, end 65527).
const NumberToStream = x=>{//Works for 4/MAX <= x <= MAX
   var sign,expo,frac;
   if(x==0){
      sign=0;
      expo=0;
      frac=0
   }else if(isFinite(x)){
      sign=x<0;
      expo=Math.floor(Math.log2(Math.abs(x)))+1023;
      frac=Math.abs(x)/Math.pow(2,expo-1075)-4503599627370496
   }else if(x==Infinity){
      sign=0;
      expo=2047;
      frac=0
   }else if(x==-Infinity){
      sign=1;
      expo=2047;
      frac=0
   }else{
      sign=0;
      expo=2047;
      frac=1
   }
   return String.fromCharCode((sign<<15)+(expo<<4)+Math.floor(frac/281474976710656),Math.floor(frac/4294967296)&65535,Math.floor(frac/65536)&65535,frac&65535)
}
,StreamToNumber = x=>{
   var sign=x.charCodeAt(0)>>15
   ,expo=x.charCodeAt(0)>>4&2047
   ,frac=(x.charCodeAt(0)&15)*281474976710656+x.charCodeAt(1)*4294967296+x.charCodeAt(2)*65536+x.charCodeAt(3);
   if(expo==0) return 0;
   if(expo==2047) return frac?NaN:sign?-Infinity:Infinity;
   return Math.pow(2,expo-1075)*(4503599627370496+frac)*(sign?-1:1)
}
,NToStream = x=>String.fromCharCode(65528+(x.neg<<1)+x.recip)+NumberToStream(x.val)+NumberToStream(x.pt)
,StreamToN = x=>({neg:x.charCodeAt(0)&2,recip:x.charCodeAt(0)&1,val:StreamToNumber(x.substr(1,4)),pt:StreamToNumber(x.substr(5,4))})
,ToStream = x=>{
   var str,i;
   if(Array.isArray(x)){
      str=String.fromCharCode(65526);
      for(i=0;i<x.length;++i) str+=ToStream(x[i]);
      return str+String.fromCharCode(65527)
   }
   return typeof x=='object'&&x.hasOwnProperty('neg')?NToStream(x):NumberToStream(+x)
}
,FromStream = x=>{
   var xleft,stack;
   if(x.charCodeAt(0)<=65520) return StreamToNumber(x);
   if(x.charCodeAt(0)>=65528) return StreamToN(x);
   if(x.charCodeAt(0)!=65526) return;
   stack=[[]];
   xleft=x.substr(1);
   while(xleft.length){
      if(xleft.charCodeAt(0)<=65520){
         stack[stack.length-1].push(StreamToNumber(xleft.substr(0,4)));
         xleft=xleft.substr(4)
      }else if(xleft.charCodeAt(0)>=65528){
         stack[stack.length-1].push(StreamToN(xleft.substr(0,9)));
         xleft=xleft.substr(9)
      }else if(xleft.charCodeAt(0)==65526){
         stack.push([]);
         xleft=xleft.substr(1)
      }else if(stack.length==1){
         return stack[0]
      }else{
         stack[stack.length-2].push(stack[stack.length-1]);
         stack.pop();
         xleft=xleft.substr(1)
      }
   }
}
,DataName = ['UpdateInterval','AutoSave','MainNumber','Count','DigitEff','DigitOrdering','Digit','DigitBought']
,Save = n=>{
   var i,a=[];
   for(i=DataName.length;i--;) a[i]=v[DataName[i]];
   localStorage.setItem(''+n,ToStream([[LastUpdate,LastGame],a]))
}
,Load = n=>{
   var i,a=[],stream=localStorage.getItem(''+n);
   if(!stream) return;
   stream=FromStream(stream);
   [LastUpdate,LastGame]=stream[0];
   for(i=DataName.length;i--;) v[DataName[i]]=stream[1][i];
};
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
