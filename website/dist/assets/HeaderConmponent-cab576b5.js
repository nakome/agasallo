import{R as s,j as e}from"./react-bc4db9fe.js";import{B as l,a as o,b as c,c as d,d as h,e as m}from"./react-icons-3de46a05.js";import{B as n,I as x}from"./Forms-4afd8d76.js";import{B as p,l as i}from"./App-ee1ef5a8.js";import"./prop-types-2b84e597.js";import"./@codemirror-de353bb9.js";import"./@lezer-a76f72fe.js";import"./crelt-7bb88e1d.js";import"./style-mod-fd510d21.js";import"./w3c-keyname-9fb136d3.js";import"./react-toastify-820401bd.js";import"./clsx-1229b3e0.js";import"./react-split-c360ae51.js";import"./split.js-822f4990.js";import"./index-dca5c9fa.js";import"./react-dom-18e1a3a7.js";import"./scheduler-765c72db.js";/* empty css                      */const u=t=>e.jsx("header",{className:"app-header",children:t.children}),j=t=>e.jsx("section",{className:"app-header-left",children:t.children}),g=t=>e.jsx("section",{className:"app-header-center",children:t.children}),C=t=>e.jsx("section",{className:"app-header-right",children:t.children});function T(t){const a=s.useContext(p);return e.jsxs(u,{children:[e.jsxs(j,{children:[e.jsx(n,{onClick:t.toggleDrawer,title:i.openmenu,children:e.jsx(l,{})}),e.jsx(x,{name:"title",id:"title",required:!0,type:"text",value:a.title,onChange:r=>t.updateBin("title",r.target.value),placeholder:i.title,onKeyDown:t.saveDataOnKeyPressTitle})]}),e.jsx(g,{children:e.jsx("h3",{children:i.appname})}),e.jsxs(C,{children:[e.jsx(n,{onClick:t.toggleToNewCode,title:i.createnew,children:e.jsx(o,{})}),t.isNew?e.jsx(n,{title:i.savenew,className:"button-warning",onClick:t.handleCreateNewCode,children:e.jsx(c,{})}):e.jsx(n,{title:i.updatecode,onClick:t.handleUpdateCode,children:e.jsx(d,{})}),e.jsx(n,{onClick:t.toggleModalSettings,title:i.modalsettings,children:e.jsx(h,{})}),e.jsx("a",{rel:"noopener",target:"_blank",className:"button",href:"https://github.com/nakome/agasallo",title:"Github",children:e.jsx(m,{})})]})]})}export{T as default};
