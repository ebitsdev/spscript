!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){(function(t){"use strict";var r=n(16),o=n(7);t.Promise||(t.Promise=r.default),e.exports=o.default}).call(t,function(){return this}())},function(e,t,n){"use strict";function r(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return null}return e}function o(e){e=r(e);var t=null;return e.d&&e.d.results&&null!=e.d.results.length?t=e.d.results:e.d&&(t=e.d),t||e}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),u={parseJSON:r,validateODataV2:o,qs:{toObj:i.toObj,fromObj:i.fromObj}};t.default=u},function(e,t){"use strict";function n(e){var t={Accept:o,"Content-Type":o};return e&&(t["X-RequestDigest"]=e),t}var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};Object.defineProperty(t,"__esModule",{value:!0});var o="application/json;odata=verbose",i=n,u=function(e){return{Accept:o,"X-RequestDigest":e,"Content-Type":"application/octet-stream",binaryStringRequestBody:"true"}},a=function(e,t){return r({},n(t),{"X-HTTP-Method":e})},s=function(e,t){return t&&(e["If-Match"]=t),e},c=function(e,t){return s(a("MERGE",e),t)},l=function(e,t){return s(a("DELETE",e),t)},f={getStandardHeaders:n,getAddHeaders:i,getFilestreamHeaders:u,getActionHeaders:a,getUpdateHeaders:c,getDeleteHeaders:l};t.default=f},,,,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=n(2),s=function(){function e(t,n){r(this,e),this.listName=t,this.baseUrl="/web/lists/getbytitle('"+this.listName+"')",this._dao=n}return i(e,[{key:"getItems",value:function(e){return this._dao.get(this.baseUrl+"/items"+c(e)).then(u.default.validateODataV2)}},{key:"getItemById",value:function(e,t){var n=this.baseUrl+"/items("+e+")"+c(t);return this._dao.get(n).then(u.default.validateODataV2)}},{key:"findItems",value:function(e,t,n){var r="string"==typeof t?"'"+t+"'":t;return n="$filter="+e+" eq "+r+c(n,"&"),this.getItems(n)}},{key:"findItem",value:function(e,t,n){return this.findItems(e,t,n).then(function(e){return e&&e.length&&e.length>0?e[0]:null})}},{key:"getInfo",value:function(){return this._dao.get(this.baseUrl).then(u.default.validateODataV2)}},{key:"addItem",value:function(e,t){var n=this;return this._dao.ensureRequestDigest(t).then(function(t){return n._dao.get(n.baseUrl).then(function(r){e=o({},{__metadata:{type:r.d.ListItemEntityTypeFullName}},e);var i={headers:a.default.getAddHeaders(t)};return n._dao.post(n.baseUrl+"/items",e,i)}).then(u.default.validateODataV2)})}},{key:"updateItem",value:function(e,t,n){var r=this;return this._dao.ensureRequestDigest(n).then(function(n){return r.getItemById(e).then(function(e){t=o({},{__metadata:{type:e.__metadata.type}},t);var i={headers:a.default.getUpdateHeaders(n,e.__metadata.etag)};return r._dao.post(e.__metadata.uri,t,i)})})}},{key:"deleteItem",value:function(e,t){var n=this;return this._dao.ensureRequestDigest(t).then(function(t){return n.getItemById(e).then(function(e){var r={headers:a.default.getDeleteHeaders(t,e.__metadata.etag)};return n._dao.post(e.__metadata.uri,"",r)})})}}]),e}();t.default=s;var c=function(e,t){return t=t||"?",e?t+e:""}},function(e,t,n){(function(e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),o=n(8),i=n(2),u={utils:r.default,headers:i.default,createContext:function(t,n,r){try{return!t&&e._spPageContextInfo&&(t=e._spPageContextInfo.webAbsoluteUrl),new o.default(t)}catch(e){throw new Error("Unable to create SPScript Context: "+e.message)}}};t.default=u}).call(t,function(){return this}())},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var u=n(9),a=n(1),s=n(2),c=n(6),l=n(11),f=function(){function e(t,n,o){r(this,e),this.webUrl=t,this.clientId=n,this.clientSecret=o,this.ensureToken=n?Promise.resolve():Promise.resolve(),this.search=new l.default(this)}return i(e,[{key:"executeRequest",value:function(e,t){var n=/^http/i.test(e)?e:this.webUrl+"/_api"+e,r={url:n,method:"GET",headers:{Accept:"application/json; odata=verbose","Content-Type":"application/json; odata=verbose"}};this.accessToken&&(r.headers.Authorization="Bearer "+this.accessToken);var i=o({},r,t);return u.default(i)}},{key:"get",value:function(e,t){var n=o({},{method:"GET"},t);return this.executeRequest(e,n).then(a.default.parseJSON)}},{key:"post",value:function(e,t,n){t=this._packagePostBody(t,n);var r={method:"POST",data:t};return r=o({},r,n),this.executeRequest(e,r).then(a.default.parseJSON)}},{key:"authorizedPost",value:function(e,t,n){var r=this;return this.getRequestDigest().then(function(e){return s.default.getActionHeaders(n,e)}).then(function(n){return r.post(e,t,{headers:n})})}},{key:"ensureRequestDigest",value:function(e){return e?Promise.resolve(e):this.getRequestDigest()}},{key:"getRequestDigest",value:function(){return this.post("/contextInfo",{}).then(function(e){return e.d.GetContextWebInformation.FormDigestValue})}},{key:"lists",value:function(e){return new c.default(e,this)}},{key:"_packagePostBody",value:function(e,t){return"string"==typeof e?e:t&&t.headers&&t.headers["Content-Type"]&&t.headers["Content-Type"].indexOf("json")===-1?e:JSON.stringify(e)}}]),e}();t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(10),o=function(e){if("undefined"==typeof window)throw new Error("No Node.js HTTP request module available yet.");return r.default(e)};t.default=o},function(e,t){"use strict";var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};Object.defineProperty(t,"__esModule",{value:!0});var r={method:"GET",async:!0,data:void 0},o=["GET","POST","PUT","HEAD","DELETE","PATCH"],i=[],u=function(e){return!(!e||!e.url||o.indexOf(e.method)<0)},a=function(e,t){t&&Object.keys(t).forEach(function(n){e.setRequestHeader(n,t[n])})},s=function e(t){var o=n({},r,t);if(!u(t))return Promise.reject(new Error("Invalid options passed into ajax call."));var e=new XMLHttpRequest;return null==e?Promise.reject(new Error("Your browser doesn't support XMLHttpRequest (ajax).")):(e.open(o.method,o.url,o.async),a(e,o.headers),e.responseType="json",new Promise(function(t,n){e.onreadystatechange=function(){if(4===e.readyState)if(e.status<400&&e.status>=100)t(e.status>=200&&e.status<300&&204!==e.status?e.response||e.status+"":e.response);else{var r={message:"AJAX Request Error: Response Code = "+e.status};r.statusCode=e.status,r.body=e.response,i.forEach(function(t){return t(r,e)}),n(r)}},e.send(o.data)}))};s.addErrorHandler=function(e){return i.push(e)},s.setDefaults=function(e){return n(r,e)},t.default=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),u=n(12),a=function(){function e(t){r(this,e),this._dao=t}return o(e,[{key:"query",value:function(e,t){console.log(i.default);var n=t?"&"+i.default.qs.fromObj(t,!0):"",r="/search/query?querytext='"+e+"'"+n;return this._dao.get(r).then(i.default.validateODataV2).then(function(e){if(e.query)return u.mapResponse(e.query);throw new Error("Invalid response back from search service")})}},{key:"people",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.sourceid="b09a7990-05ea-4af9-81ef-edfab16c4e31",this.query(e,t)}},{key:"sites",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t?"Path:"+t+"*":"";var r=(e+" contentclass:STS_Web "+t).trim();return n.rowlimit=n.rowlimit||499,this.query(r,n)}},{key:"defaultQueryOptions",get:function(){return{sourceid:null,startrow:null,rowlimit:100,selectedproperties:null,refiners:null,refinementfilters:null,hiddencontstraints:null,sortlist:null}}}]),e}();t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.mapResponse=function(e){return{elapsedTime:e.ElapsedTime,suggestion:e.SpellingSuggestion,resultsCount:e.PrimaryQueryResult.RelevantResults.RowCount,totalResults:e.PrimaryQueryResult.RelevantResults.TotalRows,totalResultsIncludingDuplicates:e.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates,items:t.mapItems(e.PrimaryQueryResult.RelevantResults.Table.Rows.results),refiners:t.mapRefiners(e.PrimaryQueryResult.RefinementResults)}},t.mapRefiners=function(e){var t=[];return e&&e.Refiners&&e.Refiners.results&&(t=e.Refiners.results.map(function(e){return{RefinerName:e.Name,RefinerOptions:e.Entries.results}})),t},t.mapItems=function(e){for(var t=[],n=0;n<e.length;n++){for(var r=e[n],o={},i=0;i<r.Cells.results.length;i++)o[r.Cells.results[i].Key]=r.Cells.results[i].Value;t.push(o)}return t}},function(e,t,n){"use strict";function r(e,t){var n=function(n){var r=(e[n]+"").trim();return(r.indexOf(" ")>-1||t)&&(r="'"+r+"'"),n+"="+r},r=Object.keys(e).map(n).join("&");return r}function o(e){return void 0===e&&window&&window.location&&window.location.search&&(e=window.location.search),e?("?"===e[0]&&(e=e.substr(1)),i.parse(e)):{}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(19);t.fromObj=r,t.toObj=o},,function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function i(e){if(f===clearTimeout)return clearTimeout(e);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(e);try{return f(e)}catch(t){try{return f.call(null,e)}catch(t){return f.call(this,e)}}}function u(){v&&p&&(v=!1,p.length?h=p.concat(h):m=-1,h.length&&a())}function a(){if(!v){var e=o(u);v=!0;for(var t=h.length;t;){for(p=h,h=[];++m<t;)p&&p[m].run();m=-1,t=h.length}p=null,v=!1,i(e)}}function s(e,t){this.fun=e,this.array=t}function c(){}var l,f,d=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(e){f=r}}();var p,h=[],v=!1,m=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];h.push(new s(e,t)),1!==h.length||v||o(a)},s.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=c,d.addListener=c,d.once=c,d.off=c,d.removeListener=c,d.removeAllListeners=c,d.emit=c,d.prependListener=c,d.prependOnceListener=c,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t,n){(function(t){!function(n){function r(){}function o(e,t){return function(){e.apply(t,arguments)}}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)}function u(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void i._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?a:s)(t.promise,e._value);var r;try{r=n(e._value)}catch(e){return void s(t.promise,e)}a(t.promise,r)}))}function a(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof i)return e._state=3,e._value=t,void c(e);if("function"==typeof n)return void f(o(n,t),e)}e._state=1,e._value=t,c(e)}catch(t){s(e,t)}}function s(e,t){e._state=2,e._value=t,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)u(e,e._deferreds[t]);e._deferreds=null}function l(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function f(e,t){var n=!1;try{e(function(e){n||(n=!0,a(t,e))},function(e){n||(n=!0,s(t,e))})}catch(e){if(n)return;n=!0,s(t,e)}}var d=setTimeout;i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(r);return u(this,new l(e,t,n)),n},i.all=function(e){var t=Array.prototype.slice.call(e);return new i(function(e,n){function r(i,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var a=u.then;if("function"==typeof a)return void a.call(u,function(e){r(i,e)},n)}t[i]=u,0===--o&&e(t)}catch(e){n(e)}}if(0===t.length)return e([]);for(var o=t.length,i=0;i<t.length;i++)r(i,t[i])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,n){n(e)})},i.race=function(e){return new i(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},i._immediateFn="function"==typeof t&&function(e){t(e)}||function(e){d(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},i._setImmediateFn=function(e){i._immediateFn=e},i._setUnhandledRejectionFn=function(e){i._unhandledRejectionFn=e},"undefined"!=typeof e&&e.exports?e.exports=i:n.Promise||(n.Promise=i)}(this)}).call(t,n(21).setImmediate)},function(e,t){"use strict";function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,r,o){t=t||"&",r=r||"=";var i={};if("string"!=typeof e||0===e.length)return i;var u=/\+/g;e=e.split(t);var a=1e3;o&&"number"==typeof o.maxKeys&&(a=o.maxKeys);var s=e.length;a>0&&s>a&&(s=a);for(var c=0;c<s;++c){var l,f,d,p,h=e[c].replace(u,"%20"),v=h.indexOf(r);v>=0?(l=h.substr(0,v),f=h.substr(v+1)):(l=h,f=""),d=decodeURIComponent(l),p=decodeURIComponent(f),n(i,d)?Array.isArray(i[d])?i[d].push(p):i[d]=[i[d],p]:i[d]=p}return i}},function(e,t){"use strict";var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,o){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(o){var i=encodeURIComponent(n(o))+r;return Array.isArray(e[o])?e[o].map(function(e){return i+encodeURIComponent(n(e))}).join(t):i+encodeURIComponent(n(e[o]))}).join(t):o?encodeURIComponent(n(o))+r+encodeURIComponent(n(e)):""}},function(e,t,n){"use strict";t.decode=t.parse=n(17),t.encode=t.stringify=n(18)},function(e,t,n){(function(e,t){!function(e,n){"use strict";function r(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var r={callback:e,args:t};return v[h]=r,p(h),h++}function o(e){delete v[e]}function i(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}function u(e){if(m)setTimeout(u,0,e);else{var t=v[e];if(t){m=!0;try{i(t)}finally{o(e),m=!1}}}}function a(){p=function(e){t.nextTick(function(){u(e)})}}function s(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}function c(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"==typeof n.data&&0===n.data.indexOf(t)&&u(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),p=function(n){e.postMessage(t+n,"*")}}function l(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;u(t)},p=function(t){e.port2.postMessage(t)}}function f(){var e=y.documentElement;p=function(t){var n=y.createElement("script");n.onreadystatechange=function(){u(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}function d(){p=function(e){setTimeout(u,0,e)}}if(!e.setImmediate){var p,h=1,v={},m=!1,y=e.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(e);g=g&&g.setTimeout?g:e,"[object process]"==={}.toString.call(e.process)?a():s()?c():e.MessageChannel?l():y&&"onreadystatechange"in y.createElement("script")?f():d(),g.setImmediate=r,g.clearImmediate=o}}("undefined"==typeof self?"undefined"==typeof e?this:e:self)}).call(t,function(){return this}(),n(15))},function(e,t,n){function r(e,t){this._id=e,this._clearFn=t}var o=Function.prototype.apply;t.setTimeout=function(){return new r(o.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new r(o.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(20),t.setImmediate=setImmediate,t.clearImmediate=clearImmediate}]);
//# sourceMappingURL=spscript.js.map