import{j as a,R as l}from"./react-bc4db9fe.js";import{i as t}from"./react-icons-3de46a05.js";import{B as i}from"./Forms-4afd8d76.js";import{l as c}from"./App-ee1ef5a8.js";import"./prop-types-2b84e597.js";import"./@codemirror-de353bb9.js";import"./@lezer-a76f72fe.js";import"./crelt-7bb88e1d.js";import"./style-mod-fd510d21.js";import"./w3c-keyname-9fb136d3.js";import"./react-toastify-820401bd.js";import"./clsx-1229b3e0.js";import"./react-split-c360ae51.js";import"./split.js-822f4990.js";import"./index-dca5c9fa.js";import"./react-dom-18e1a3a7.js";import"./scheduler-765c72db.js";/* empty css                      */const d=e=>a.jsx("section",{className:"Modal-overlay",...e,children:e.children}),o=e=>a.jsx("section",{className:"modal",...e,children:e.children}),n=e=>a.jsx("section",{className:"modal-header-left",...e,children:e.children}),r=e=>a.jsx("section",{className:"modal-header-center",...e,children:e.children}),s=e=>a.jsx("section",{className:"modal-header-right",...e,children:e.children}),m=e=>a.jsx("header",{className:"modal-header",...e,children:e.children}),h=e=>a.jsx("h3",{className:"modal-header-title",...e,children:e.children}),x=e=>a.jsx("section",{className:"modal-main-content",...e,children:e.children});function O(e){return a.jsxs(l.Fragment,{children:[a.jsx(d,{className:e.active?"overlay overlay-active":"overlay",onClick:e.closeModal}),a.jsxs(o,{className:e.active?"modal modal-active":"modal",style:{maxHeight:e.height?`${e.height}rem`:"30rem"},children:[a.jsxs(m,{children:[a.jsx(n,{children:a.jsx(h,{children:e.title||c.defaulttitle})}),a.jsx(r,{}),a.jsx(s,{children:a.jsx(i,{className:"button button-close",onClick:e.closeModal,children:a.jsx(t,{})})})]}),a.jsx(x,{children:e.children})]})]})}export{O as default};
