import{bQ as y}from"./@codemirror-de353bb9.js";import{j as c,R as n}from"./react-bc4db9fe.js";import{Q as u,k as H}from"./react-toastify-820401bd.js";import{S as I}from"./react-split-c360ae51.js";import{L as K}from"./index-dca5c9fa.js";const V=s=>c.jsx("main",{className:"app",children:s.children}),G=s=>c.jsx("main",{className:"app-content",children:s.children}),q=n.createContext(),Je=async()=>{try{let s=`${location.origin}/api`;return await(await fetch(s)).json()}catch(s){return JSON.stringify({success:!1,msg:s})}},F=async s=>{try{let e=`${location.origin}/api/${s}`;return await(await fetch(e)).json()}catch(e){return JSON.stringify({success:!1,msg:e})}},He=async s=>{try{let e=`${location.origin}/api/s/${s}`;return await(await fetch(e)).json()}catch(e){return JSON.stringify({success:!1,msg:e})}},Q=async s=>{try{const e=`${location.origin}/api`,r={method:"POST",body:JSON.stringify(s),headers:{"content-type":"application/json"}};return await(await fetch(e,r)).json()}catch(e){return JSON.stringify({success:!1,msg:e})}},W=async(s,e)=>{try{const r=`${location.origin}/api/${s}`,l={method:"PUT",body:JSON.stringify(e),headers:{"content-type":"application/json"}};return await(await fetch(r,l)).json()}catch(r){return JSON.stringify({success:!1,msg:r})}},Ke=async s=>{try{const e=`${location.origin}/api/${s}`;return await(await fetch(e,{method:"DELETE",headers:{"content-type":"application/json"}})).json()}catch(e){return JSON.stringify({success:!1,msg:e})}};function d(){let s=new Date;return s.setDate(s.getDate()),s.toISOString().split("T")[0]}const X="Agasallo",Y="Preview",Z="Edit Code",ee="Updated",te="The code has been removed!",se="Error on delete bin!",ne="Are you sure?",oe="Search bins",ae="Database is empty",ce="Default title",re="Open menu",ie="Title",le="Create new",pe="Save new",de="Update code",ue="Modal settings",ye="About Me",me="Use Ctrl+s to save or use button.",fe="Settings",he="Put your links separate by line",Ce="Css Links",je="Javascript Links",_e="Public code",ge="The code has been created!",ve="The code has been updated!",Te="Ups, error on updated!",be="Loading...",ke="Loading components...",Se="Convert code",we="Expand block",xe="If you need convert to Markdown\rselect Markdown type first.",Oe="If you need convert to Sass\rselect Sass type first.",De="If you need convert to Typescript\rselect Typescript type first.",Ee="More settings",v={appname:X,preview:Y,editcode:Z,delete:"Delete",lastupdate:ee,coderemoved:te,coderemovederr:se,areyousure:ne,searchtitle:oe,dbempty:ae,defaulttitle:ce,openmenu:re,title:ie,createnew:le,savenew:pe,updatecode:de,modalsettings:ue,aboutus:ye,infoframe:me,settings:fe,putyourlinks:he,csslinks:Ce,jslinks:je,publiccode:_e,successsave:ge,successupdated:ve,errorupdated:Te,loading:be,loadingcomponent:ke,convertcode:Se,expandblock:we,selectmdfirst:xe,selectsassfirst:Oe,selecttsfirst:De,moresettings:Ee},Ie=n.lazy(()=>y(()=>import("./HeaderConmponent-cab576b5.js"),["assets/HeaderConmponent-cab576b5.js","assets/react-bc4db9fe.js","assets/prop-types-2b84e597.js","assets/react-icons-3de46a05.js","assets/Forms-4afd8d76.js","assets/@codemirror-de353bb9.js","assets/@lezer-a76f72fe.js","assets/crelt-7bb88e1d.js","assets/style-mod-fd510d21.js","assets/w3c-keyname-9fb136d3.js","assets/react-toastify-820401bd.js","assets/clsx-1229b3e0.js","assets/react-toastify-55fec1ff.css","assets/react-split-c360ae51.js","assets/split.js-822f4990.js","assets/index-dca5c9fa.js","assets/react-dom-18e1a3a7.js","assets/scheduler-765c72db.js","assets/index-11539401.css","assets/normalize-9d9ae4af.css"])),Le=n.lazy(()=>y(()=>import("./DrawerComponent-42081e05.js"),["assets/DrawerComponent-42081e05.js","assets/react-bc4db9fe.js","assets/prop-types-2b84e597.js","assets/react-toastify-820401bd.js","assets/clsx-1229b3e0.js","assets/react-toastify-55fec1ff.css","assets/react-modern-drawer-24b299b5.js","assets/react-modern-drawer-c1062efa.css","assets/Forms-4afd8d76.js","assets/react-icons-3de46a05.js","assets/index-dca5c9fa.js","assets/@codemirror-de353bb9.js","assets/@lezer-a76f72fe.js","assets/crelt-7bb88e1d.js","assets/style-mod-fd510d21.js","assets/w3c-keyname-9fb136d3.js","assets/react-dom-18e1a3a7.js","assets/scheduler-765c72db.js","assets/index-11539401.css","assets/normalize-9d9ae4af.css","assets/react-split-c360ae51.js","assets/split.js-822f4990.js"])),Ne=n.lazy(()=>y(()=>import("./FrameComponent-dedb2efb.js"),["assets/FrameComponent-dedb2efb.js","assets/react-bc4db9fe.js","assets/prop-types-2b84e597.js","assets/index-dca5c9fa.js","assets/@codemirror-de353bb9.js","assets/@lezer-a76f72fe.js","assets/crelt-7bb88e1d.js","assets/style-mod-fd510d21.js","assets/w3c-keyname-9fb136d3.js","assets/react-dom-18e1a3a7.js","assets/scheduler-765c72db.js","assets/index-11539401.css","assets/normalize-9d9ae4af.css","assets/react-toastify-820401bd.js","assets/clsx-1229b3e0.js","assets/react-toastify-55fec1ff.css","assets/react-split-c360ae51.js","assets/split.js-822f4990.js"])),Pe=n.lazy(()=>y(()=>import("./ModalComponent-94c30518.js"),["assets/ModalComponent-94c30518.js","assets/@codemirror-de353bb9.js","assets/@lezer-a76f72fe.js","assets/crelt-7bb88e1d.js","assets/style-mod-fd510d21.js","assets/w3c-keyname-9fb136d3.js","assets/react-bc4db9fe.js","assets/prop-types-2b84e597.js","assets/Forms-4afd8d76.js","assets/index-dca5c9fa.js","assets/react-dom-18e1a3a7.js","assets/scheduler-765c72db.js","assets/index-11539401.css","assets/normalize-9d9ae4af.css","assets/react-toastify-820401bd.js","assets/clsx-1229b3e0.js","assets/react-toastify-55fec1ff.css","assets/react-split-c360ae51.js","assets/split.js-822f4990.js"])),$e=n.lazy(()=>y(()=>import("./CodeBlockComponent-40507cff.js"),["assets/CodeBlockComponent-40507cff.js","assets/react-bc4db9fe.js","assets/prop-types-2b84e597.js","assets/react-icons-3de46a05.js","assets/@uiw-21521cbd.js","assets/@babel-6c5c234b.js","assets/@codemirror-de353bb9.js","assets/@lezer-a76f72fe.js","assets/crelt-7bb88e1d.js","assets/style-mod-fd510d21.js","assets/w3c-keyname-9fb136d3.js","assets/codemirror-lang-mermaid-5a784a5f.js","assets/@replit-1d009374.js","assets/@nextjournal-246bc4f5.js","assets/Forms-4afd8d76.js","assets/react-toastify-820401bd.js","assets/clsx-1229b3e0.js","assets/react-toastify-55fec1ff.css","assets/react-split-c360ae51.js","assets/split.js-822f4990.js","assets/index-dca5c9fa.js","assets/react-dom-18e1a3a7.js","assets/scheduler-765c72db.js","assets/index-11539401.css","assets/normalize-9d9ae4af.css"]));function ze(){let s={key:"1234",title:`Untitled ${d()}`,public:!1,created:d(),cssLinks:"",jsLinks:"",htmlContent:"Empty Content",cssContent:"*{box-sizing:border-box}",jsContent:"console.log('ready')",htmlContentType:"html",cssContentType:"css",jsContentType:"javascript"};const[e,r]=n.useState(s),[l,m]=n.useState(!0),[C,j]=n.useState(!1),[_,L]=n.useState(!1),[p,N]=n.useState(!0),[P,T]=n.useState(""),[$,f]=n.useState(!1),[z,b]=n.useState(!1),k=n.useRef(null),U=n.useRef(null),S=n.useRef(null),B=[{key:e.key,public:e.public,name:"htmlfield",active:p,expand:()=>g(0),content:e.htmlContent,setContent:(t,a)=>i("htmlContent",t),type:e.htmlContentType||"html",setType:t=>i("htmlContentType",t.target.value),values:["html","markdown"]},{key:e.key,public:e.public,name:"cssfield",active:p,expand:()=>g(1),content:e.cssContent,setContent:(t,a)=>i("cssContent",t),type:e.cssContentType||"css",setType:t=>i("cssContentType",t.target.value),values:["css","sass"]},{key:e.key,public:e.public,name:"jsfield",active:p,expand:()=>g(2),content:e.jsContent,setContent:(t,a)=>i("jsContent",t),type:e.jsContentType||"javascript",setType:t=>i("jsContentType",t.target.value),values:["javascript","typescript"]}],w=n.useCallback(()=>{L(!_)},[_]),x=n.useCallback(()=>{j(!C)},[C]),R=n.useCallback(t=>{t.ctrlKey&&t.key==="s"&&(t.preventDefault(),h())},[h]),A=n.useCallback(t=>{t.key==="Enter"&&(t.preventDefault(),h())},[h]);function h(){l?D():E()}function M(){r(s),j(!1),m(!0),b(!0),T("")}function g(t){N(o=>!o);let a=[33.33,33.33,33.33];switch(t){case 0:a=p?[100,0,0]:[33.33,33.33,33.33];break;case 1:a=p?[0,100,0]:[33.33,33.33,33.33];break;case 2:a=p?[0,0,100]:[33.33,33.33,33.33];break}S.current.split.setSizes(a)}function i(t,a){r({...e,[t]:a})}async function O(t){j(!1),f(!0);const a=await F(t);if(a.success){let o=a.data,J={key:o.key,title:o.title||`Untitled ${d()}`,public:o.public||!1,created:o.create_at||d(),cssLinks:o.css_links||"",jsLinks:o.js_links||"",htmlContent:o.html_code||"Empty Content",cssContent:o.css_code||"*{box-sizing:border-box}",jsContent:o.js_code||"console.log('ready')",htmlContentType:o.html_type||"html",cssContentType:o.css_type||"css",jsContentType:o.js_type||"javascript"};r(J),b(!0),m(!1),f(!1),T(`${location.origin}/api/preview/${o.key}`)}}async function D(){const t=d(),a={title:e.title||`Untitled ${t}`,html_code:e.htmlContent,html_type:e.htmlContentType,css_code:e.cssContent,css_type:e.cssContentType,css_links:e.cssLinks,js_code:e.jsContent,js_type:e.jsContentType,js_links:e.jsLinks,public:e.public,create_at:t,update_at:t},o=await Q(a);o.success&&(u.success(v.successsave,{position:u.POSITION.BOTTOM_RIGHT}),i("title",""),m(!1),O(o.data.key))}async function E(){const t=d(),a={title:e.title||`Untitled ${t}`,html_code:e.htmlContent,html_type:e.htmlContentType,css_code:e.cssContent,css_type:e.cssContentType,css_links:e.cssLinks,js_code:e.jsContent,js_type:e.jsContentType,js_links:e.jsLinks,public:e.public,create_at:e.create_at,update_at:t};(await W(e.key,a)).success?(f(!0),k.current.contentWindow.location.reload(!0),setTimeout(()=>{f(!1),u.info(v.successupdated,{position:u.POSITION.BOTTOM_RIGHT})},800)):u.error(v.errorupdated)}return c.jsx(q.Provider,{value:e,children:c.jsx(n.Suspense,{fallback:c.jsx(K,{}),children:c.jsxs(V,{children:[c.jsx(Ie,{isNew:l,toggleDrawer:x,toggleToNewCode:M,saveDataOnKeyPressTitle:A,handleCreateNewCode:D,handleUpdateCode:E,toggleModalSettings:w,updateBin:i}),c.jsx(G,{children:c.jsxs(I,{sizes:[50,50],direction:"horizontal",className:"split-horizontal",minSize:1,onKeyDown:R,ref:U,children:[c.jsx("div",{className:"split-vertical",children:c.jsx(I,{sizes:[33.33,33.33,33.33],direction:"vertical",className:"split-vertical-code",minSize:1,ref:S,children:B.map((t,a)=>c.jsx($e,{idkey:t.key,isPublic:t.public,name:t.name,active:t.active,expand:t.expand,content:t.content,setContent:t.setContent,type:t.type,setType:t.setType,values:t.values},a))})}),c.jsx("div",{className:"split-vertical",style:{position:"relative"},children:c.jsx(Ne,{loadingFrame:z,refresh:$,iframSrc:P,myRef:k})})]})}),c.jsx(Le,{isOpen:C,toggleDrawer:x,handleOpenBin:O}),c.jsx(Pe,{isOpenSettings:_,toggleModalSettings:w,updateBin:i}),c.jsx(H,{theme:"dark"})]})})})}const Ve=Object.freeze(Object.defineProperty({__proto__:null,default:ze},Symbol.toStringTag,{value:"Module"}));export{Ve as A,q as B,Ke as D,Je as G,He as S,v as l};
