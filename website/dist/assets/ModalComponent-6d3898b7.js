import{bQ as a}from"./@codemirror-567a82bb.js";import{R as o,j as e}from"./react-bc4db9fe.js";import{T as n,S as l}from"./Forms-4afd8d76.js";import{L as m}from"./index-31462ae3.js";import{B as c,l as i}from"./App-4cb1d6bf.js";import"./@lezer-a76f72fe.js";import"./crelt-7bb88e1d.js";import"./style-mod-fd510d21.js";import"./w3c-keyname-9fb136d3.js";import"./prop-types-2b84e597.js";import"./react-dom-18e1a3a7.js";import"./scheduler-765c72db.js";/* empty css                      */import"./react-toastify-820401bd.js";import"./clsx-1229b3e0.js";import"./react-split-c360ae51.js";import"./split.js-822f4990.js";const p=o.lazy(()=>a(()=>import("./ModalView-f509eed6.js"),["assets/ModalView-f509eed6.js","assets/react-bc4db9fe.js","assets/prop-types-2b84e597.js","assets/react-icons-3de46a05.js","assets/Forms-4afd8d76.js","assets/App-4cb1d6bf.js","assets/@codemirror-567a82bb.js","assets/@lezer-a76f72fe.js","assets/crelt-7bb88e1d.js","assets/style-mod-fd510d21.js","assets/w3c-keyname-9fb136d3.js","assets/react-toastify-820401bd.js","assets/clsx-1229b3e0.js","assets/react-toastify-55fec1ff.css","assets/react-split-c360ae51.js","assets/split.js-822f4990.js","assets/index-31462ae3.js","assets/react-dom-18e1a3a7.js","assets/scheduler-765c72db.js","assets/index-9eaafecf.css","assets/normalize-9d9ae4af.css"]));function R(t){const s=o.useContext(c);return e.jsx(o.Suspense,{fallback:e.jsx(m,{}),children:e.jsxs(p,{title:i.settings,height:27,active:t.isOpenSettings,closeModal:t.toggleModalSettings,children:[e.jsx(n,{required:!1,name:"cssLinks",id:"cssLinksid",className:"no-resize",error:s.cssLinks.length>150?"error":"",onChange:r=>t.updateBin("cssLinks",r.target.value),placeholder:i.putyourlinks,value:s.cssLinks,label:i.csslinks,style:{height:"7rem"}}),e.jsx(n,{required:!1,className:"no-resize",name:"jsLinks",id:"jsLinksid",error:s.jsLinks.length>150?"error":"",onChange:r=>t.updateBin("jsLinks",r.target.value),placeholder:i.putyourlinks,value:s.jsLinks,label:i.jslinks,style:{height:"7rem"}}),e.jsx(l,{name:"public",ischecked:s.public?"on":"off",onChange:()=>t.updateBin("public",!s.public),title:i.publiccode}),e.jsx("a",{href:`${location.origin}/api/settings`,style:{color:"var(--light)"},children:i.moresettings})]})})}export{R as default};