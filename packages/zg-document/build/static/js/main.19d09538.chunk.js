(this["webpackJsonpzg-document"]=this["webpackJsonpzg-document"]||[]).push([[0],{12:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),i=n(5),a=n.n(i),l=(n(12),n(2)),c=n(1),u=function(){function t(){Object(l.a)(this,t),this.cntr="",this.rules={}}return Object(c.a)(t,null,[{key:"gen",value:function(e,n){var r=new t;r.cntr=e,r.rules=n,t.rules.push(r),t.inject()}}]),t}();u.rules=[],u.node=document.createElement("style"),u.inject=function(){u.node.innerHTML=u.rules.flatMap((function(t){return e=t.cntr,n=t.rules,Object.keys(n).map((function(t){return"\n    .".concat(e).concat("$"===t[0]?"":" ").concat((r=t,r.split("").filter((function(t){return"$"!==t})).join(""))," {\n        ").concat(Object.keys(n[t]).map((function(e){return"".concat(function(t){return t.split("").map((function(t){return t.toLocaleLowerCase()===t?t:"-"+t.toLocaleLowerCase()})).join("").replace("css-","")}(e),":").concat(n[t][e])})).join(";\n        "),"\n    }\n    \n");var r}));var e,n})).join(""),document.head.appendChild(u.node)};var s=n(3),d=function(){function t(){Object(l.a)(this,t),this.listeners=[],this.listeners=[]}return Object(c.a)(t,null,[{key:"gen",value:function(){return new t}}]),Object(c.a)(t,[{key:"map",value:function(e){var n=t.gen();return this.on((function(t){n.emit(e(t))})),n}},{key:"emit",value:function(t){this.listeners.forEach((function(e){return e(t)}))}},{key:"on",value:function(t){this.listeners=this.listeners.concat([t])}},{key:"off",value:function(t){this.listeners=this.listeners.filter((function(e){return e!==t}))}}]),t}(),f=function(t){var e=d.gen();return Object(r.useEffect)((function(){var n=function(t){e.emit(t)};return t.on(n),function(){t.off(n)}})),e},h=function(){function t(e){Object(l.a)(this,t),this.id=void 0,this.v=void 0,this.children=void 0,this.v=e,this.children=[],this.id=Math.random().toString()}return Object(c.a)(t,[{key:"get",value:function(){return this.v}},{key:"getId",value:function(){return this.id}},{key:"map",value:function(e){var n=t.gen(e(this.v));return n.children=this.children.map((function(t){return t.map(e)})),n}},{key:"forEach",value:function(t){var e=t(this);return this.children.map((function(e){return e.forEach(t)})),e}},{key:"getValue",value:function(){return this.v}},{key:"getChildren",value:function(){return this.children}},{key:"pushChildren",value:function(t){this.children.push(t)}},{key:"exist",value:function(t){return this===t||!!this.children.find((function(e){return e.exist(t)}))}}],[{key:"gen",value:function(e){return new t(e)}},{key:"prase",value:function(e){var n=t.gen(Object.assign({},e,{children:null}));return n.children=e.children?e.children.map((function(e){return t.prase(e)})):[],n}}]),t}(),m=h.prase({title:"\u6982\u8ff0",url:".md/tool/index.md"}),g=h.prase({title:"\u6982\u8ff0",url:"./md/component/index.md",children:[{title:"HTML \u539f\u751f\u7ec4\u4ef6",url:"./md/component/html.md"},{title:"miniUI \u7ec4\u4ef6",url:"./md/index.md"},{title:"shelf \u81ea\u7814\u7ec4\u4ef6",url:"./md/index.md"}]}),p=h.prase({title:"\u6982\u8ff0",url:"./md/tool/index.md"}),x=h.prase({title:"\u6982\u8ff0",url:"./md/tool/index.md"}),v=h.prase({title:"\u6982\u8ff0",url:"./md/tool/index.md"}),b=n(6),k=n.n(b),w=(n(13),new k.a.Converter),y=(new Map,function(t){return new Promise((function(e,n){var r=[];t.forEach((function(t){var e=t.getValue().url;r.push(function(t){return fetch(t).then((function(t){return t.text()})).then((function(t){return{html:w.makeHtml(t),md:t}}))}(e).then((function(t){var n=t.html,r=t.md;return{url:e,html:n,md:r}})))})),Promise.all(r).then((function(e){return t.map((function(t){var n=t.title,r=t.url;return{title:n,data:e.find((function(t){return t.url===r}))}})).map((function(t){var e=t.data;return{title:t.title,html:e?e.html:""}})).map((function(t){var e=t.title,n=t.html,r=document.createElement("div");return r.className="markdown-body",r.innerHTML=n,{title:e,doc:r,target:null}}))})).then((function(t){return t.forEach((function(t){Array.from(t.getValue().doc.querySelectorAll(".ifr")).forEach((function(t){var e=t;(e.dataset.src||"").indexOf("")<0&&(e.dataset.src=e.dataset.src?""+e.dataset.src:"")})),t.getChildren().length>0||t.get().target||Array.from(t.getValue().doc.querySelectorAll("h2")).map((function(e){return h.gen({title:e.innerHTML,doc:t.getValue().doc,target:e})})).forEach((function(e){return t.pushChildren(e)}))})),t})).then((function(t){e(t)}))}))}),E={index:"./md/index.md",current:null,tabs:[{key:"tool",text:"\u5de5\u5177\u5e93",url:v,tree:h.gen({title:"",doc:document.createElement("div"),target:null})},{key:"component",text:"\u7ec4\u4ef6",url:g,tree:h.gen({title:"",doc:document.createElement("div"),target:null})},{key:"layout",text:"\u5e03\u5c40",url:p,tree:h.gen({title:"",doc:document.createElement("div"),target:null})},{key:"issue",text:"\u8ba8\u8bba",url:x,tree:h.gen({title:"",doc:document.createElement("div"),target:null})},{key:"blog",text:"\u535a\u5ba2",url:m,tree:h.gen({title:"",doc:document.createElement("div"),target:null})}]},S=d.gen();Promise.all(E.tabs.map((function(t){return t.url})).map((function(t){return y(t)}))).then((function(t){t.forEach((function(t,e){E.tabs[e].tree=t})),S.emit(E),console.log(E)}));u.gen("tab_title",{"":{float:"left",height:"60px",lineHeight:"60px",listStyle:"none",color:"white",margin:"0",padding:"0 20px"},li:{float:"left",margin:"0",padding:"0 20px",height:"60px",lineHeight:"65px",listStyle:"none",color:"rgba(255,255,255,1)",cursor:"pointer",fontSize:"18px",transition:"all 0.2s ease-out",position:"relative",fontWeight:"bold",textShadow:"0 3px 3px rgba(0,0,0,0.2)",backgroundColor:"rgba(255,255,255,0)"},"li.tab_title--li__check":{color:"#393e46",lineHeight:"60px",backgroundColor:"rgba(255,255,255,0.5)"},"li.tab_title--li::after":{content:'""',position:"absolute",bottom:"0",left:"0",right:"0",transition:"all 0.2s ease-out",height:"0",backgroundColor:"#393e46",boxShadow:"0 1px 3px 0 rgba(0,0,0,0.5)"},"li.tab_title--li__check::after":{height:"4px",borderRadius:"2px 2px 0 0"}});var j=function(t){var e=t.cur,n=t.list,r=t.changeTo;return o.a.createElement("ol",{className:"tab_title"},n.map((function(t){return o.a.createElement("li",{key:t.key,className:"tab_title--li"+(t.tree.exist(e)?" tab_title--li__check":""),onClick:function(){r(t.tree)}},t.text)})))};u.gen("topBar",{"":{height:"60px",width:"100%",position:"fixed",padding:"0 40px",top:"0",zIndex:"2",backgroundColor:"#d6e5fa"},".logo":{height:"60px",float:"left",fontSize:"75px",lineHeight:"72px",color:"#333",padding:"0 20px",fontWeight:"normal",transition:"all 0.3s ease-out",textShadow:"0 3px 3px rgba(0,0,0,0.3)",cursor:"pointer"},".logo.focus":{fontWeight:"bold",color:"#445",textShadow:"3px 3px 0 rgba(0,0,0,0.3)"}});var C=function(){var t=Object(r.useState)(E.current),e=Object(s.a)(t,2),n=e[0],i=e[1],a=E.tabs,l=function(t){E.current=t,S.emit(E)};return f(S).map((function(t){return t.current})).on((function(t){return i(t)})),o.a.createElement("div",{className:"topBar"},o.a.createElement("i",{className:"zg zg-zglogo logo "+(n?"":"focus"),onClick:function(){return l(null)}}),o.a.createElement(j,{cur:n,list:a,changeTo:l}))};u.gen("document",{"":{width:"100%",overflowY:"hidden",minHeight:"100%"},".content":{minHeight:"100%",position:"relative",marginRight:"500px",zIndex:"1",padding:"60px",transition:"all 0.3s ease-out"},".content.focus":{marginRight:"0"},".background":{transition:"all 0.3s ease-out",position:"fixed",left:"0",top:"0",bottom:"0",right:"500px",backgroundColor:"rgba(255,255,255,1)",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},".content.focus + .background":{right:"0",backgroundColor:"rgba(255,255,255,0)",boxShadow:"0 2px 4px rgba(0,0,0,0)"},".ifr":{height:"320px",width:"400px"}});var _=function(){var t=Object(r.useState)(!0),e=Object(s.a)(t,2),n=e[0],i=e[1],a=Object(r.useRef)(document.createElement("div"));return f(S).map((function(t){return t.current})).map((function(t){return t?t.get().doc:t})).on((function(t){t?(a.current.innerHTML="",a.current.appendChild(t),Array.from(t.querySelectorAll(".ifr")).forEach((function(t){t.innerHTML="",setTimeout((function(){t.innerHTML='<iframe style="height:100%;width:100%" src= '.concat(t.dataset.src,"></iframe>")}),300)})),i(!1)):i(!0)})),o.a.createElement("div",{className:"document"},o.a.createElement("div",{className:"markdown-body content"+(n?" focus":""),ref:a}),o.a.createElement("div",{className:"background"}))},O=function t(e){var n=e.list,i=e.level,a=void 0===i?0:i,l=e.focus;return Object(r.useEffect)((function(){var t=E.current?E.current.get().target:null;t&&function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=document.documentElement.scrollTop,o=document.documentElement.scrollHeight-window.innerHeight+document.documentElement.scrollTop;(0===r||n>20||0===o||e===r)&&0!==n||(document.documentElement.scrollTop=(e+r)/2,requestAnimationFrame((function(r){return t(e,n+1)})))}(t.offsetTop),document.title="You clicked ".concat(" times")})),o.a.createElement("ol",{className:"cl_tree"},n.map((function(e){var n=e.get(),r=e.getChildren();return o.a.createElement("li",{key:e.getId(),"data-focus":l===e},o.a.createElement("div",{style:{paddingLeft:20*a+20+"px"},className:"cl_tree-title",onClick:function(){E.current=e,S.emit(E)}},n.title),0===r.length?"":o.a.createElement(t,{focus:l,list:r,level:a+1}))})))};u.gen("calalog",{"":{position:"fixed",right:"200px",height:"100%",top:"60px",overflow:"hidden",width:"300px"},".calalog-title":{fontWeight:"bold",fontSize:"18px",cursor:"pointer",display:"inline-block",position:"relative",padding:"8px 0",color:"#333",transition:"all 0.2s ease-out",textShadow:"0 0 0 rgba(0,0,0,0.2)"},".calalog-title::after":{content:'""',width:"0",position:"absolute",bottom:"0",height:"3px",transition:"all 0.2s ease-out",backgroundColor:"#666",left:"0",boxShadow:"0 0 0 rgba(0,0,0,0.2)"},".calalog-title.focus":{textShadow:"0 3px 2px rgba(0,0,0,0.2)"},".calalog-title.focus::after":{width:"100%",boxShadow:"0 2px 4px rgba(0,0,0,0.2)"},".calalog-hidden_scrollbar":{height:"100%",overflowY:"auto",marginRight:"-17px",padding:"50px"},".cl_tree":{listStyle:"none",padding:"0"},".cl_tree-title":{padding:"4px 0",cursor:"pointer",position:"relative",textShadow:"0 0 0 rgba(0,0,0,0.2)"},'li[data-focus="true"] > .cl_tree-title':{fontWeight:"bolder",textShadow:"0 3px 3px rgba(0,0,0,0.2)"},".cl_tree-title::after":{content:'""',position:"absolute",left:"0",top:"0",bottom:"0",width:"20px",backgroundColor:"#666",opacity:"0",transition:"all 0.2s ease-out"},'li[data-focus="true"] > .cl_tree-title::after':{width:"4px",opacity:"1",boxShadow:"0 3px 3px rgba(0,0,0,0.2)"}});var H=function(){var t=Object(r.useState)(E.current),e=Object(s.a)(t,2),n=e[0],i=e[1],a=E.tabs.find((function(t){return t.tree.exist(n)}));return f(S).map((function(t){return t.current})).on((function(t){return i(t)})),o.a.createElement("div",{className:"calalog"},o.a.createElement("div",{className:"calalog-hidden_scrollbar"},a?o.a.createElement("div",{onClick:function(){E.current=a.tree,S.emit(E)},className:"calalog-title"+(n===a.tree?" focus":"")},a.tree.get().title):"",o.a.createElement(O,{focus:n,list:a?a.tree.getChildren():[]})))};u.gen("App",{"":{height:"100%",width:"100%",display:"flex",flexDirection:"column"}});var N=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(C,null),o.a.createElement(_,null),o.a.createElement(H,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(o.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},7:function(t,e,n){t.exports=n(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.19d09538.chunk.js.map