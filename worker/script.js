!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";n.r(e),n.d(e,"Renderer",(function(){return v})),n.d(e,"compile",(function(){return g})),n.d(e,"get",(function(){return m})),n.d(e,"render",(function(){return w})),n.d(e,"renderFn",(function(){return b})),n.d(e,"renderFnAsync",(function(){return x})),n.d(e,"tokenize",(function(){return y}));var r=(0).constructor,i=r.isFinite,s=(r.isInteger,[].constructor.isArray);function o(t){return null!==t&&"object"==typeof t}function a(t,e){return void 0===e&&(e=0),"string"==typeof t&&t.length>=e}function h(t){return i(t)}function c(t){return s(t)}function u(t,e){return o(t)&&e in t}var f=new(function(){function t(t){this.size=t,this.reset()}return t.prototype.reset=function(){this.oldestIndex=0,this.map={},this.cachedKeys=new Array(this.size)},t.prototype.get=function(t){return this.map[t]},t.prototype.set=function(t,e){this.map[t]=e;var n=this.cachedKeys[this.oldestIndex];void 0!==n&&delete this.map[n],this.cachedKeys[this.oldestIndex]=t,this.oldestIndex++,this.oldestIndex%=this.size},t}())(1e3);function p(t){var e=t.charAt(0),n=t.substr(-1);if("'\"`".includes(e)||"'\"`".includes(n)){if(t.length<2||e!==n)throw new SyntaxError('Mismatching string quotation: "'+t+'"');return t.substring(1,t.length-1)}if(t.includes("["))throw new SyntaxError('Missing ] in varName "'+t+'"');return"+"===e?t.substr(1):t}function d(t,e,n){var r=e.trim();if(""===r)return t;if(r.startsWith(".")){if(!n)throw new SyntaxError('Unexpected . at the start of "'+e+'"');if(""===(r=r.substr(1).trim()))return t}else if(n)throw new SyntaxError('Missing . at the start of "'+e+'"');if(r.endsWith("."))throw new SyntaxError('Unexpected "." at the end of "'+e+'"');for(var i=0,s=r.split(".");i<s.length;i++){var o=s[i].trim();if(""===o)throw new SyntaxError('Empty prop name when parsing "'+e+'"');t.push(o)}return t}function l(t){if(!a(t))throw new TypeError("Cannot parse path. Expected string. Got a "+typeof t);for(var e,n,r=0,i=!1,s=new Array(0),o=0;o<t.length&&-1!==(e=t.indexOf("[",o));o=r){if(-1===(r=t.indexOf("]",e)))throw new SyntaxError('Missing ] in varName "'+t+'"');if(0===(n=t.substring(e+1,r).trim()).length)throw new SyntaxError("Unexpected token ]");r++,d(s,t.substring(o,e),i),s.push(p(n)),i=!0}return d(s,t.substring(r),i)}function m(t,e,n){if(void 0===n&&(n={}),!o(n))throw new TypeError("get expects an object option. Got "+typeof n);var r=n.depth,i=void 0===r?10:r;if(!h(i)||i<=0)throw new RangeError("Expected a positive number for depth. Got "+i);var s=Array.isArray(e)?e:l.cached(e),a=function(){return s.join(" > ")};if(s.length>i)throw new ReferenceError("The path cannot be deeper than "+i+' levels. Got "'+a()+'"');for(var c=t,f=0,p=s;f<p.length;f++){var d=p[f];if(!u(c,d)){if(n.propsExist)throw new ReferenceError(d+' is not defined in the scope at path: "'+a()+'"');return}c=c[d]}return c}l.cached=function(t){var e=f.get(t);return void 0===e&&(e=l(t),f.set(t,e)),e};var v=function(){function t(t,e){var n=this;if(void 0===e&&(e={}),this.tokens=t,this.options=e,this.render=function(t){void 0===t&&(t={});var e=n.tokens.varNames.length;n.cacheParsedPaths();for(var r=new Array(e),i=0;i<e;i++)r[i]=m(t,n.toPathCache[i],n.options);return n.stringify(r)},this.renderFn=function(t,e){void 0===e&&(e={});var r=n.resolveVarNames(t,e);return n.stringify(r)},this.renderFnAsync=function(t,e){return void 0===e&&(e={}),Promise.all(n.resolveVarNames(t,e)).then((function(t){return n.stringify(t)}))},!o(t)||!c(t.strings)||!c(t.varNames)||t.strings.length!==t.varNames.length+1)throw new TypeError("Invalid tokens object");if(!o(e))throw new TypeError("Options should be an object. Got a "+typeof e);e.validateVarNames&&this.cacheParsedPaths()}return t.prototype.cacheParsedPaths=function(){var t=this.tokens.varNames;if(void 0===this.toPathCache){this.toPathCache=new Array(t.length);for(var e=0;e<t.length;e++)this.toPathCache[e]=l.cached(t[e])}},t.prototype.resolveVarNames=function(t,e){void 0===e&&(e={});var n=this.tokens.varNames;if("function"!=typeof t)throw new TypeError("Expected a resolver function. Got "+String(t));for(var r=n.length,i=new Array(r),s=0;s<r;s++)i[s]=t.call(null,n[s],e);return i},t.prototype.stringify=function(t){for(var e=this.tokens.strings,n=this.options.explicit,r=t.length,i="",s=0;s<r;s++){i+=e[s];var o=t[s];(n||null!=o)&&(i+=o)}return i+=e[r]},t}();function y(t,e){if(void 0===e&&(e={}),!a(t))throw new TypeError("The template parameter must be a string. Got a "+typeof t);if(!o(e))throw new TypeError("Options should be an object. Got a "+typeof e);var n=e.tags,r=void 0===n?["{{","}}"]:n,i=e.maxVarNameLength,s=void 0===i?1e3:i;if(!c(r)||2!==r.length)throw TypeError("tags should be an array of two elements. Got "+String(r));var u=r[0],f=r[1];if(!a(u,1)||!a(f,1)||u===f)throw new TypeError('The open and close symbols should be two distinct non-empty strings. Got "'+u+'" and "'+f+'"');if(!h(s)||s<=0)throw new Error("Expected a positive number for maxVarNameLength. Got "+s);for(var p,d,l=u.length,m=f.length,v=0,y=[],g=[],w=0;w<t.length&&-1!==(p=t.indexOf(u,w));){var b=p+l;if(-1===(v=t.substr(b,s+m).indexOf(f)))throw new SyntaxError('Missing "'+f+'" in the template for the "'+u+'" at position '+p+" within "+s+" characters");if(v+=b,0===(d=t.substring(b,v).trim()).length)throw new SyntaxError('Unexpected "'+f+'" tag found at position '+p);if(d.includes(u))throw new SyntaxError('Variable names cannot have "'+u+'". But at position '+p+'. Got "'+d+'"');g.push(d),v+=m,y.push(t.substring(w,p)),w=v}return y.push(t.substring(v)),{strings:y,varNames:g}}function g(t,e){void 0===e&&(e={});var n=y(t,e);return new v(n,e)}function w(t,e,n){return g(t,n).render(e)}function b(t,e,n,r){return g(t,r).renderFn(e,n)}function x(t,e,n,r){return g(t,r).renderFnAsync(e,n)}},function(t,e,n){"use strict";n.r(e);class r{constructor(t,e){this.callback=t,this.options=e,this.index=0}async element(t){var e=this.callback;console.log(e),"function"==typeof e?e(t):await e(t),await Promise.resolve(e(t)),console.log(e),this.index+=1}}class i{constructor(t){this._request="string"==typeof t?new Response((new TextEncoder).encode(t)):t,this.chain=[],this.has_finished=!1}find(t,e){return this.chain.push({type:"target",selector:t,options:Object.assign({},e)}),this}setClass(t){return this.chain.push({type:"transform",function:e=>{e.setAttribute("class",t||"")}}),this}removeClass(t,e){return this.chain.push({type:"transform",function:n=>{n.setAttribute("class",element.getAttribute("class").replace(t,e.replace||""))}}),this}addClass(t,e){var n="append"==((e=e||{}).mode||"append");return this.chain.push({type:"transform",function:e=>{var r=e.getAttribute("class")||""+t;n||(r=t+e.getAttribute("class")||""),e.setAttribute("class",r)}}),this}setContent(t,e){return this.chain.push({type:"transform",function:n=>{n.setInnerContent(t,e)}}),this}removeContent(){return this.chain.push({type:"transform",function:t=>{t.setInnerContent("")}}),this}_directTransform(t,e,n){return this.chain.push({type:"transform",function:r=>{r[t](e,n)}}),this}append(t,e){return this.chain.push({type:"transform",function:n=>{n.append(t,e)}}),this}prepend(t,e){return this.chain.push({type:"transform",function:n=>{n.prepend(t,e)}}),this}before(t,e){return this._directTransform("before",t,e)}after(t,e){return this._directTransform("after",t,e)}removeElement(){return this._directTransform("remove","")}setAttribute(t,e,n){return this.chain.push({type:"transform",function:n=>{n.setAttribute(t,e)}}),this}run(t){return this.chain.push({type:"transform",function:t}),this}commit(){var t=this.execute();return this._request=t,this.chain=[],this.has_finished=!1,this}execute(t){t=t||{};var e=0,n=new HTMLRewriter;return this.chain.forEach(t=>{if("transform"==t.type){var i="*",s={};this.chain.slice(0,e).forEach(t=>{"target"==t.type&&(i=t.selector,s=t.options)}),n.on(i,new r(t.function,{selectorOptions:s}))}e+=1}),this.has_finished=!0,n.transform(this._request)}}const{render:s}=n(0);addEventListener("fetch",t=>{t.respondWith(async function(t){return new i(await fetch("https://example.com")).find("head").append('<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">',{html:!0}).append('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">',{html:!0}).append("<style>* {font-family: 'Inter', sans-serif;!important}</style>",{html:!0}).find("style").removeElement().find("h1").addClass("text-4xl mb-6 font-bold text-center block mt-6 mb-12").setContent("CFW: Easy HTML").find("p").run(async t=>{var e=await fetch("https://randomuser.me/api/"),n=await e.json();n=n.results[0],t.setInnerContent(s('\n<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">\n  <div class="md:flex">\n    <div class="md:flex-shrink-0">\n      <img class="h-48 w-full object-cover md:w-48" src="{{person.picture.large}}" alt="Man looking at item at a store">\n    </div>\n    <div class="p-8">\n      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Person</div>\n      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{{person.login.username}}</a>\n      <p class="mt-2 text-gray-500">\n        {{person.login.sha256}}\n      </p>\n    </div>\n  </div>\n</div>\n',{person:n}),{html:!0})}).execute()}(t.request))})}]);