!function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);class s{constructor(e,t){this.callback=e,this.options=t,this.index=0}element(e){this.callback(e),this.index+=1}}class n{constructor(e){this._request=e,this.chain=[],this.has_finished=!1}find(e,t){return this.chain.push({type:"target",selector:e,options:Object.assign({},t)}),this}setClass(e){return this.chain.push({type:"transform",function:t=>{t.setAttribute("class",e||"")}}),this}removeClass(e,t){return this.chain.push({type:"transform",function:i=>{i.setAttribute("class",element.getAttribute("class").replace(e,t.replace||""))}}),this}addClass(e,t){var i="append"==((t=t||{}).mode||"append");return this.chain.push({type:"transform",function:t=>{var s=t.getAttribute("class")||""+e;i||(s=e+t.getAttribute("class")||""),t.setAttribute("class",s)}}),this}setContent(e,t){return this.chain.push({type:"transform",function:i=>{i.setInnerContent(e,t)}}),this}_directTransform(e,t,i){return this.chain.push({type:"transform",function:s=>{s[e](t,i)}}),this}append(e,t){return this.chain.push({type:"transform",function:i=>{i.append(e,t)}}),this}prepend(e,t){return this.chain.push({type:"transform",function:i=>{i.prepend(e,t)}}),this}before(e,t){return this._directTransform("before",e,t)}after(e,t){return this._directTransform("after",e,t)}setAttribute(e,t,i){return this.chain.push({type:"transform",function:i=>{i.setAttribute(e,t)}}),this}commit(){var e=this.execute();return this._request=e,this.chain=[],this.has_finished=!1,this}execute(e){e=e||{};var t=0,i=new HTMLRewriter;return this.chain.forEach(e=>{if("transform"==e.type){var n="*",r={};this.chain.slice(0,t).forEach(e=>{"target"==e.type&&(n=e.selector,r=e.options)}),i.on(n,new s(e.function,{selectorOptions:r}))}t+=1}),this.has_finished=!0,i.transform(this._request)}}addEventListener("fetch",e=>{e.respondWith(async function(e){return new n(await fetch("https://example.com")).find("head").append('<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">',{html:!0}).append('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">',{html:!0}).append("<style>* {font-family: 'Inter', sans-serif;!important}</style>",{html:!0}).find("h1").addClass("text-4xl mb-6 font-bold text-center").setContent("CFW: Easy HTML").find("p:nth-of-type(1)").setContent("This lib makes using Cloudflares high speed HTMLRewriter a breeze. Easily change attributes, remove elements, or add new ones without having to write hundreds of lines. ").find("p:nth-of-type(2)").setContent("This page is actually example.com, but its been modified with 12 lines of EasyHTML code to insert and change the content!",{html:!0}).addClass("mt-4 block").after('<div id="example"><h1>hi</h1></div>',{html:!0}).commit().find("div[id=example]").addClass("bg-indigo-400").setAttribute("style","white-space: pre-line; width:unset;").setContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor id ipsum sed tincidunt. Duis iaculis volutpat blandit. Proin dignissim est vitae ipsum iaculis, a tincidunt purus dignissim. Pellentesque consectetur libero imperdiet sem dictum venenatis quis ut arcu. Fusce ultricies dui ante, eget bibendum lorem vulputate non. Nunc posuere augue lacus, vel ultricies sapien vulputate at. In tempus dui lacus, eget rutrum eros sagittis id. Suspendisse quis malesuada dui, eget pretium elit. Nullam quis lacinia sem. Integer feugiat malesuada cursus. Quisque id elit imperdiet, tristique nulla nec, condimentum orci. Integer cursus nulla vel nisl tincidunt varius. Curabitur quis malesuada mi. Morbi cursus, tortor non eleifend ultrices, risus sapien molestie augue, tincidunt condimentum eros lectus non tortor. Aliquam ultricies pharetra metus, sed vestibulum augue posuere in.<br/>Quisque nec auctor turpis, non molestie purus. Aliquam luctus auctor dictum. Duis nec dictum tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam pharetra sem augue, sit amet aliquet est tincidunt vel. Quisque scelerisque massa varius odio tempor fermentum. Proin feugiat nisi sapien, at euismod felis molestie sit amet. Proin erat risus, placerat non augue at, gravida lacinia arcu. Aliquam mollis nibh turpis, nec fringilla massa iaculis non. Aliquam eleifend, diam sit amet aliquet ultrices, urna dui tempor est, in fringilla dui purus in erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget sapien nec erat luctus tempus ut ullamcorper ex. ").execute()}(e.request))})}]);