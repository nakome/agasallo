import{_ as Y,a as U}from"./@babel-6c5c234b.js";import{r as c,j as Z}from"./react-bc4db9fe.js";import{p as $,q as ee,r as ae,u as te,v as se,w as ie,x as re,y as ne,z as oe,A as le,B as fe,C as ce,D as de,F as ue,G as T,H as he,I as _,J as ge,K as me,M as pe,N as be,O as ye,P as ve,Q as ke,R as Se,T as xe,U as V,E as m,V as Ce,W as Ee,X as Le,Y as je,Z as We,_ as Be,S as e,$ as He,a0 as Ke,a1 as Me,a2 as Ne,a3 as we,a4 as Oe,a5 as Ae,a6 as Fe,a7 as Te,a8 as ze,a9 as qe,aa as De,ab as Ie,ac as Ge,ad as Re,ae as Qe,af as Ue,ag as _e,ah as Ve,ai as Je,aj as Pe,ak as Xe,al as Ye,am as Ze,an as $e,ao as ea,ap as aa,aq as ta,ar as sa,as as ia,at as ra,au as na,av as oa,aw as la,ax as fa,ay as ca,az as da,aA as ua,aB as ha,aC as ga,aD as ma,aE as pa,aF as ba,aG as ya,aH as va,aI as ka,aJ as Sa,aK as xa,aL as Ca,aM as Ea,aN as La,aO as ja,aP as Wa,aQ as Ba,aR as Ha,aS as Ka,aT as Ma,aU as Na,aV as wa,aW as Oa,aX as Aa,aY as Fa,aZ as Ta,a_ as za,a$ as qa,b0 as Da,b1 as Ia,b2 as Ga,b3 as Ra,b4 as Qa,b5 as Ua,b6 as _a,b7 as Va,b8 as Ja,b9 as Pa,k as F,ba as Xa,bb as Ya,bc as Za,bd as $a,l as et,be as at,bf as tt,bg as st,bh as I,bi as it,bj as rt,bk as nt,bl as ot,bm as lt,bn as ft,bo as ct,bp as dt,bq as ut,br as ht,bs as gt,bt as mt,bu as pt,bv as bt,bw as yt,bx as vt,by as kt,bz as St,bA as xt,bB as Ct,bC as Et,bD as Lt,bE as jt,bF as Wt,bG as Bt,bH as Ht,bI as Kt,bJ as Mt,bK as Nt,bL as wt,bM as Ot,bN as At,bO as Ft}from"./@codemirror-567a82bb.js";import{t as s}from"./@lezer-a76f72fe.js";import{m as Tt}from"./codemirror-lang-mermaid-f33b1201.js";import{c as zt,s as qt,n as Dt,a as It}from"./@replit-fad80cbf.js";import{c as Gt}from"./@nextjournal-bd92cc22.js";var G=function(t){t===void 0&&(t={});var a=[];t.closeBracketsKeymap!==!1&&(a=a.concat($)),t.defaultKeymap!==!1&&(a=a.concat(ee)),t.searchKeymap!==!1&&(a=a.concat(ae)),t.historyKeymap!==!1&&(a=a.concat(te)),t.foldKeymap!==!1&&(a=a.concat(se)),t.completionKeymap!==!1&&(a=a.concat(ie)),t.lintKeymap!==!1&&(a=a.concat(re));var i=[];return t.lineNumbers!==!1&&i.push(ne()),t.highlightActiveLineGutter!==!1&&i.push(oe()),t.highlightSpecialChars!==!1&&i.push(le()),t.history!==!1&&i.push(fe()),t.foldGutter!==!1&&i.push(ce()),t.drawSelection!==!1&&i.push(de()),t.dropCursor!==!1&&i.push(ue()),t.allowMultipleSelections!==!1&&i.push(T.allowMultipleSelections.of(!0)),t.indentOnInput!==!1&&i.push(he()),t.syntaxHighlighting!==!1&&i.push(_(ge,{fallback:!0})),t.bracketMatching!==!1&&i.push(me()),t.closeBrackets!==!1&&i.push(pe()),t.autocompletion!==!1&&i.push(be()),t.rectangularSelection!==!1&&i.push(ye()),t.crosshairCursor!==!1&&i.push(ve()),t.highlightActiveLine!==!1&&i.push(ke()),t.highlightSelectionMatches!==!1&&i.push(Se()),t.tabSize&&typeof t.tabSize=="number"&&i.push(xe.of(" ".repeat(t.tabSize))),i.concat([V.of(a.flat())]).filter(Boolean)},Rt=m.theme({"&":{backgroundColor:"#fff"}},{dark:!1}),Qt=function(t){t===void 0&&(t={});var{indentWithTab:a=!0,editable:i=!0,readOnly:n=!1,theme:d="light",placeholder:f="",basicSetup:h=!0}=t,l=[];switch(a&&l.unshift(V.of([Ce])),h&&(typeof h=="boolean"?l.unshift(G()):l.unshift(G(h))),f&&l.unshift(Ee(f)),d){case"light":l.push(Rt);break;case"dark":l.push(Le);break;case"none":break;default:l.push(d);break}return i===!1&&l.push(m.editable.of(!1)),n&&l.push(T.readOnly.of(!0)),[...l]},Ut=r=>({line:r.state.doc.lineAt(r.state.selection.main.from),lineCount:r.state.doc.lines,lineBreak:r.state.lineBreak,length:r.state.doc.length,readOnly:r.state.readOnly,tabSize:r.state.tabSize,selection:r.state.selection,selectionAsSingle:r.state.selection.asSingle().main,ranges:r.state.selection.ranges,selectionCode:r.state.sliceDoc(r.state.selection.main.from,r.state.selection.main.to),selections:r.state.selection.ranges.map(t=>r.state.sliceDoc(t.from,t.to)),selectedText:r.state.selection.ranges.some(t=>!t.empty)}),R=je.define(),_t=[];function Vt(r){var{value:t,selection:a,onChange:i,onStatistics:n,onCreateEditor:d,onUpdate:f,extensions:h=_t,autoFocus:l,theme:p="light",height:E="",minHeight:b="",maxHeight:L="",placeholder:j="",width:W="",minWidth:B="",maxWidth:H="",editable:K=!0,readOnly:M=!1,indentWithTab:N=!0,basicSetup:w=!0,root:z,initialState:S}=r,[y,O]=c.useState(),[o,g]=c.useState(),[v,k]=c.useState(),q=m.theme({"&":{height:E,minHeight:b,maxHeight:L,width:W,minWidth:B,maxWidth:H},"& .cm-scroller":{height:"100% !important"}}),D=m.updateListener.of(u=>{if(u.docChanged&&typeof i=="function"&&!u.transactions.some(X=>X.annotation(R))){var C=u.state.doc,A=C.toString();i(A,u)}n&&n(Ut(u))}),P=Qt({theme:p,editable:K,readOnly:M,placeholder:j,indentWithTab:N,basicSetup:w}),x=[D,q,...P];return f&&typeof f=="function"&&x.push(m.updateListener.of(f)),x=x.concat(h),c.useEffect(()=>{if(y&&!v){var u={doc:t,selection:a,extensions:x},C=S?T.fromJSON(S.json,u,S.fields):T.create(u);if(k(C),!o){var A=new m({state:C,parent:y,root:z});g(A),d&&d(A,C)}}return()=>{o&&(k(void 0),g(void 0))}},[y,v]),c.useEffect(()=>O(r.container),[r.container]),c.useEffect(()=>()=>{o&&(o.destroy(),g(void 0))},[o]),c.useEffect(()=>{l&&o&&o.focus()},[l,o]),c.useEffect(()=>{o&&o.dispatch({effects:We.reconfigure.of(x)})},[p,h,E,b,L,W,B,H,j,K,M,N,w,i,f]),c.useEffect(()=>{if(t!==void 0){var u=o?o.state.doc.toString():"";o&&t!==u&&o.dispatch({changes:{from:0,to:u.length,insert:t||""},annotations:[R.of(!0)]})}},[t,o]),{state:v,setState:k,view:o,setView:g,container:y,setContainer:O}}var Jt=["className","value","selection","extensions","onChange","onStatistics","onCreateEditor","onUpdate","autoFocus","theme","height","minHeight","maxHeight","width","minWidth","maxWidth","basicSetup","placeholder","indentWithTab","editable","readOnly","root","initialState"],J=c.forwardRef((r,t)=>{var{className:a,value:i="",selection:n,extensions:d=[],onChange:f,onStatistics:h,onCreateEditor:l,onUpdate:p,autoFocus:E,theme:b="light",height:L,minHeight:j,maxHeight:W,width:B,minWidth:H,maxWidth:K,basicSetup:M,placeholder:N,indentWithTab:w,editable:z,readOnly:S,root:y,initialState:O}=r,o=Y(r,Jt),g=c.useRef(null),{state:v,view:k,container:q}=Vt({container:g.current,root:y,value:i,autoFocus:E,theme:b,height:L,minHeight:j,maxHeight:W,width:B,minWidth:H,maxWidth:K,basicSetup:M,placeholder:N,indentWithTab:w,editable:z,readOnly:S,selection:n,onChange:f,onStatistics:h,onCreateEditor:l,onUpdate:p,extensions:d,initialState:O});if(c.useImperativeHandle(t,()=>({editor:g.current,state:v,view:k}),[g,q,v,k]),typeof i!="string")throw new Error("value must be typeof string but got "+typeof i);var D=typeof b=="string"?"cm-theme-"+b:"cm-theme";return Z.jsx("div",U({ref:g,className:""+D+(a?" "+a:"")},o))});J.displayName="CodeMirror";const rs=J;var Pt=r=>{var{theme:t,settings:a={},styles:i=[]}=r,n={".cm-gutters":{}},d={};a.background&&(d.backgroundColor=a.background),a.foreground&&(d.color=a.foreground),(a.background||a.foreground)&&(n["&"]=d),a.fontFamily&&(n["&.cm-editor .cm-scroller"]={fontFamily:a.fontFamily}),a.gutterBackground&&(n[".cm-gutters"].backgroundColor=a.gutterBackground),a.gutterForeground&&(n[".cm-gutters"].color=a.gutterForeground),a.gutterBorder&&(n[".cm-gutters"].borderRightColor=a.gutterBorder),a.caret&&(n[".cm-content"]={caretColor:a.caret},n[".cm-cursor, .cm-dropCursor"]={borderLeftColor:a.caret});var f={};a.gutterActiveForeground&&(f.color=a.gutterActiveForeground),a.lineHighlight&&(n[".cm-activeLine"]={backgroundColor:a.lineHighlight},f.backgroundColor=a.lineHighlight),n[".cm-activeLineGutter"]=f,a.selection&&(n["&.cm-focused .cm-selectionBackground, &.cm-focused .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"]={background:a.selection+" !important"}),a.selectionMatch&&(n["& .cm-selectionMatch"]={backgroundColor:a.selectionMatch});var h=m.theme(n,{dark:t==="dark"}),l=Be.define(i),p=[h,_(l)];return p},Xt={background:"#21202e",foreground:"#edecee",caret:"#a277ff",selection:"#3d375e7f",selectionMatch:"#3d375e7f",gutterBackground:"#21202e",gutterForeground:"#edecee",gutterBorder:"transparent",lineHighlight:"#a394f033"},Yt=r=>{var{theme:t="dark",settings:a={},styles:i=[]}=r||{};return Pt({theme:t,settings:U({},Xt,a),styles:[{tag:s.keyword,color:"#a277ff"},{tag:[s.name,s.deleted,s.character,s.macroName],color:"#edecee"},{tag:[s.propertyName],color:"#ffca85"},{tag:[s.processingInstruction,s.string,s.inserted,s.special(s.string)],color:"#61ffca"},{tag:[s.function(s.variableName),s.labelName],color:"#ffca85"},{tag:[s.color,s.constant(s.name),s.standard(s.name)],color:"#61ffca"},{tag:[s.definition(s.name),s.separator],color:"#edecee"},{tag:[s.className],color:"#82e2ff"},{tag:[s.number,s.changed,s.annotation,s.modifier,s.self,s.namespace],color:"#61ffca"},{tag:[s.typeName],color:"#82e2ff"},{tag:[s.operator,s.operatorKeyword],color:"#a277ff"},{tag:[s.url,s.escape,s.regexp,s.link],color:"#61ffca"},{tag:[s.meta,s.comment],color:"#6d6d6d"},{tag:s.strong,fontWeight:"bold"},{tag:s.emphasis,fontStyle:"italic"},{tag:s.link,textDecoration:"underline"},{tag:s.heading,fontWeight:"bold",color:"#a277ff"},{tag:[s.atom,s.bool,s.special(s.variableName)],color:"#edecee"},{tag:s.invalid,color:"#ff6767"},{tag:s.strikethrough,textDecoration:"line-through"},...i]})},ns=Yt(),Q={apl:()=>e.define(He),asciiArmor:()=>e.define(Ke),asterisk:()=>e.define(Me),c:()=>e.define(Ne),csharp:()=>zt(),scala:()=>e.define(we),solidity:()=>qt,kotlin:()=>e.define(Oe),shader:()=>e.define(Ae),nesC:()=>e.define(Fe),objectiveC:()=>e.define(Te),objectiveCpp:()=>e.define(ze),squirrel:()=>e.define(qe),ceylon:()=>e.define(De),dart:()=>e.define(Ie),cmake:()=>e.define(Ge),cobol:()=>e.define(Re),commonLisp:()=>e.define(Qe),crystal:()=>e.define(Ue),cypher:()=>e.define(_e),d:()=>e.define(Ve),diff:()=>e.define(Je),dtd:()=>e.define(Pe),dylan:()=>e.define(Xe),ebnf:()=>e.define(Ye),ecl:()=>e.define(Ze),eiffel:()=>e.define($e),elm:()=>e.define(ea),factor:()=>e.define(aa),fcl:()=>e.define(ta),forth:()=>e.define(sa),fortran:()=>e.define(ia),gas:()=>e.define(ra),gherkin:()=>e.define(na),groovy:()=>e.define(oa),haskell:()=>e.define(la),haxe:()=>e.define(fa),http:()=>e.define(ca),idl:()=>e.define(da),jinja2:()=>e.define(ua),mathematica:()=>e.define(ha),mbox:()=>e.define(ga),mirc:()=>e.define(ma),modelica:()=>e.define(pa),mscgen:()=>e.define(ba),mumps:()=>e.define(ya),nsis:()=>e.define(va),ntriples:()=>e.define(ka),octave:()=>e.define(Sa),oz:()=>e.define(xa),pig:()=>e.define(Ca),properties:()=>e.define(Ea),protobuf:()=>e.define(La),puppet:()=>e.define(ja),q:()=>e.define(Wa),sas:()=>e.define(Ba),sass:()=>Ha(),mermaid:()=>Tt(),nix:()=>Dt(),svelte:()=>It(),sieve:()=>e.define(Ka),smalltalk:()=>e.define(Ma),solr:()=>e.define(Na),sparql:()=>e.define(wa),spreadsheet:()=>e.define(Oa),stex:()=>e.define(Aa),textile:()=>e.define(Fa),tiddlyWiki:()=>e.define(Ta),tiki:()=>e.define(za),troff:()=>e.define(qa),ttcn:()=>e.define(Da),turtle:()=>e.define(Ia),velocity:()=>e.define(Ga),verilog:()=>e.define(Ra),vhdl:()=>e.define(Qa),webIDL:()=>e.define(Ua),xQuery:()=>e.define(_a),yacas:()=>e.define(Va),z80:()=>e.define(Ja),wast:Pa,javascript:F,jsx:()=>F({jsx:!0}),typescript:()=>F({typescript:!0}),tsx:()=>F({jsx:!0,typescript:!0}),vue:()=>Xa(),angular:()=>Ya(),json:Za,html:$a,css:et,python:at,markdown:()=>tt({base:wt,codeLanguages:Ot}),xml:st,sql:I,mysql:()=>I({dialect:At}),pgsql:()=>I({dialect:Ft}),java:it,rust:rt,cpp:nt,lezer:ot,php:lt,go:()=>e.define(ft),shell:()=>e.define(ct),lua:()=>e.define(dt),swift:()=>e.define(ut),tcl:()=>e.define(ht),yaml:()=>e.define(gt),vb:()=>e.define(mt),powershell:()=>e.define(pt),brainfuck:()=>e.define(bt),stylus:()=>e.define(yt),erlang:()=>e.define(vt),nginx:()=>e.define(kt),perl:()=>e.define(St),ruby:()=>e.define(xt),pascal:()=>e.define(Ct),livescript:()=>e.define(Et),less:()=>Lt(),scheme:()=>e.define(jt),toml:()=>e.define(Wt),vbscript:()=>e.define(Bt),clojure:()=>Gt(),coffeescript:()=>e.define(Ht),julia:()=>e.define(Kt),dockerfile:()=>e.define(Mt),r:()=>e.define(Nt)};function os(r){return Q[r]?Q[r]():null}export{rs as C,ns as a,os as l};
