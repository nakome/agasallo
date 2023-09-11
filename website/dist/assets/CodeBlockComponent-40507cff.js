import{R as c,j as s}from"./react-bc4db9fe.js";import{f as v,i as f,j as w,k,l as g}from"./react-icons-3de46a05.js";import{C as d,l as u,a as p}from"./@uiw-21521cbd.js";import{b,B as h}from"./Forms-4afd8d76.js";import{l as o}from"./App-ee1ef5a8.js";import"./prop-types-2b84e597.js";import"./@babel-6c5c234b.js";import"./@codemirror-de353bb9.js";import"./@lezer-a76f72fe.js";import"./crelt-7bb88e1d.js";import"./style-mod-fd510d21.js";import"./w3c-keyname-9fb136d3.js";import"./codemirror-lang-mermaid-5a784a5f.js";import"./@replit-1d009374.js";import"./@nextjournal-246bc4f5.js";import"./react-toastify-820401bd.js";import"./clsx-1229b3e0.js";import"./react-split-c360ae51.js";import"./split.js-822f4990.js";import"./index-dca5c9fa.js";import"./react-dom-18e1a3a7.js";import"./scheduler-765c72db.js";/* empty css                      */const C=async t=>{try{const e=await await l("/api/convert/to/md",{html_code:t});return e.status?e.data:"Error: "+JSON.stringify(e)}catch(a){return a}},S=async t=>{try{const e=await await l("/api/convert/to/scss",{css_code:t});return e.status?e.data:"Error: "+JSON.stringify(e)}catch(a){return a}},N=async t=>{try{const e=await await l("/api/convert/to/ts",{js_code:t});return e.status?e.data:"Error: "+JSON.stringify(e)}catch(a){return a}};async function l(t,a){let e={method:"POST",body:JSON.stringify(a),headers:{"content-type":"application/json"}};return await(await fetch(t,e)).json()}function V(t){const[a,e]=c.useState(""),[n,m]=c.useState(!1),[y,x]=c.useState("html"),j=async()=>{if(m(!n),e(o.loading),!n){let i,r;switch(t.type){case"markdown":i="markdown",r=await C(t.content);break;case"html":r=o.selectmdfirst;break;case"sass":i="sass",r=await S(t.content);break;case"css":r=o.selectsassfirst;break;case"typescript":i="typescript",r=await N(t.content);break;case"javascript":r=o.selecttsfirst;break}x(i||t.type),e(r)}};return s.jsxs("div",{className:"code",children:[s.jsxs("div",{className:"code-header",children:[s.jsx(b,{name:t.name,id:t.name,value:t.type,onChange:t.setType,values:t.values}),s.jsxs("div",{className:"code-header-right",children:[t.isPublic&&s.jsx("a",{rel:"noopener",target:"_blank",href:`${location.origin}/api/share/${t.idkey}/${t.type}`,children:s.jsx(v,{})}),s.jsx(h,{onClick:j,className:n?"button-active":"",title:o.convertcode,children:n?s.jsx(f,{}):s.jsx(w,{})}),s.jsx(h,{onClick:t.expand,title:o.expandblock,children:t.active?s.jsx(k,{}):s.jsx(g,{})})]})]}),s.jsx("div",{className:"code-body",children:n?s.jsx(d,{readOnly:!0,value:a,height:"100%",extensions:[u(y)],theme:p}):s.jsx(d,{value:t.content,height:"100%",extensions:[u(t.type)],theme:p,onChange:t.setContent})})]})}export{V as default};
