import{d as h,u as y,r as u,o as l,c as g,a as s,F as k,b as w,t as d,e as N,f as I,g as S,p as L,h as B,_ as x,i as A,j as D,k as R}from"./index-2a6b24ed.js";const V=t=>(L("data-v-4b801c25"),t=t(),B(),t),z={class:"page-wrapper"},C={class:"gap-margin-left-right card-wrapper-outer driver-card-wrapper"},F={class:"driver-card card-wrapper-inner"},j={class:"card-padding"},E=S('<div class="title-container" data-v-4b801c25><div class="title" data-v-4b801c25><span class="left" data-v-4b801c25>投票开始：</span><span class="right" data-v-4b801c25>2023-06-05 18:00:00</span></div><div class="title" data-v-4b801c25><span class="left" data-v-4b801c25>投票结束：</span><span class="right" data-v-4b801c25>2023-07-01 22:00:00</span></div><div class="title" data-v-4b801c25><span class="left" data-v-4b801c25>投票规则：</span><span class="right" data-v-4b801c25>每个微信每天可以投票4次，每天可为同一选手投票1次</span></div></div><div class="item-header rank-item" data-v-4b801c25><span class="col1" data-v-4b801c25>排名</span><span class="col2" style="text-align:left;" data-v-4b801c25>参与选手</span><span class="col3" data-v-4b801c25>投票数</span></div>',2),H={class:"col1"},M={class:"col2 detail"},P=V(()=>s("img",{src:x,alt:"",srcset:""},null,-1)),T={class:"name-no"},$={class:"no"},q={class:"name"},G={class:"col3"},J=h({name:"Home"}),K=h({...J,setup(t){y();const f={no:1,avatar:"",name:"张三李四",company:"~~张三李四运输有限责任公司~~",voteNum:55,id:1};let i=Array.from({length:10}).fill({...f});i=i.map((n,e)=>{const a={...n};return a.id=e+1,a.voteNum=123*(e+1),a.name="张三李四"+e,a});const r=u(!1),p=u({pageNo:1,pageSize:10,total:32}),c=u(i),b=async()=>{if(console.log("load more"),r.value)return;r.value=!0;const{pageNo:n,pageSize:e}=D(p);p.value.pageNo+=1;const a=n*e;let v=new Array(10).fill({no:1,avatar:"",name:"张三李四",company:"~~张三李四运输有限责任公司~~",voteNum:55,id:1});v=v.map((_,m)=>{const o={..._};return o.id=m+1+a,o.voteNum=123*(m+1)+a,o.name="张三李四"+(a+m),o}),await new Promise(_=>{setTimeout(()=>{_()},1e3)}),c.value=[...c.value,...v],r.value=!1};return(n,e)=>(l(),g("div",z,[s("div",C,[s("div",F,[s("div",j,[E,(l(!0),g(k,null,w(c.value,a=>(l(),g("div",{class:"item-content rank-item",key:a.id},[s("span",H,d(a.id),1),s("div",M,[P,s("div",T,[s("div",$,d(a.id)+"号",1),s("div",q,d(a.name),1)])]),s("span",G,d(a.voteNum),1)]))),128))])])]),c.value.length<p.value.total?(l(),N(A,{key:0,onLoadMore:b})):I("",!0)]))}});const U=R(K,[["__scopeId","data-v-4b801c25"]]);export{U as default};
