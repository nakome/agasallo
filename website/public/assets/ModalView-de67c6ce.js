import{j as a,R as l}from"./index-c9450825.js";import{j as t}from"./index.esm-cc8f4076.js";import{B as c}from"./Forms-f65d8555.js";import{l as i}from"./App-bd67b125.js";import"https://unpkg.com/prettier@3.0.3/standalone.mjs";import"https://unpkg.com/prettier@3.0.3/plugins/babel.mjs";import"https://unpkg.com/prettier@3.0.3/plugins/estree.mjs";import"https://unpkg.com/prettier@3.0.3/plugins/html.mjs";import"https://unpkg.com/prettier@3.0.3/plugins/postcss.mjs";import"https://unpkg.com/prettier@3.0.3/plugins/typescript.mjs";import"https://unpkg.com/prettier@3.0.3/plugins/markdown.mjs";const d=e=>a.jsx("section",{className:"Modal-overlay",...e,children:e.children}),n=e=>a.jsx("section",{className:"modal",...e,children:e.children}),s=e=>a.jsx("section",{className:"modal-header-left",...e,children:e.children}),o=e=>a.jsx("section",{className:"modal-header-center",...e,children:e.children}),r=e=>a.jsx("section",{className:"modal-header-right",...e,children:e.children}),m=e=>a.jsx("header",{className:"modal-header",...e,children:e.children}),h=e=>a.jsx("h3",{className:"modal-header-title",...e,children:e.children}),x=e=>a.jsx("section",{className:"modal-main-content",...e,children:e.children});function B(e){return a.jsxs(l.Fragment,{children:[a.jsx(d,{className:e.active?"overlay overlay-active":"overlay",onClick:e.closeModal}),a.jsxs(n,{className:e.active?"modal modal-active":"modal",style:{maxHeight:e.height?`${e.height}rem`:"30rem"},children:[a.jsxs(m,{children:[a.jsx(s,{children:a.jsx(h,{children:e.title||i.defaulttitle})}),a.jsx(o,{}),a.jsx(r,{children:a.jsx(c,{className:"button button-close",onClick:e.closeModal,children:a.jsx(t,{})})})]}),a.jsx(x,{children:e.children})]})]})}export{B as default};
