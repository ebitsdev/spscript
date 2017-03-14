!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){(function(t){var r=n(55);t.Promise||(t.Promise=r);var o={};o.RestDao=n(24),o.queryString=n(9),o.utils=n(1),o.ajax=n(7),o.CSR=n(19),o.headers=n(2),e.exports=t.SPScript=o}).call(t,function(){return this}())},function(e,t){"use strict";var n=(t.isBrowser=function(){return!("undefined"==typeof window)},t.parseJSON=function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(t){return null}return e}),r=(t.validateODataV2=function(e){var e=n(e),t=null;return e.d&&e.d.results&&null!=e.d.results.length?t=e.d.results:e.d&&(t=e.d),t||e},t.arrayFromBitMask=function(e){"string"==typeof e&&(e=parseInt(e));for(var t=e,n=[];t;n.push(Boolean(1&t)),t>>>=1);return n},function s(e,t){var n=e.filter(function(e){return!i(e)});0===n.length?t():setTimeout(function(){return s(e,t)},25)}),o=t.waitForLibraries=function(e){return new Promise(function(t,n){return r(e,t)})},i=(t.waitForLibrary=function(e){return o([e])},t.validateNamespace=function(e){for(var t=window,n=e.split("."),r=n.length,o=0;r>o;o++){var i=n[o];if(!(i in t))return!1;t=t[i]}return!0}),a=(t.getScripts=function(e){return Promise.all(e.map(a))},t.getScript=function(e){return new Promise(function(t,n){var r=window.document.createElement("script"),o=document.getElementsByTagName("script")[0];r.async=1,o.parentNode.insertBefore(r,o),r.onload=r.onreadystatechange=function(e,n){(n||!r.readyState||/loaded|complete/.test(r.readyState))&&(r.onload=r.onreadystatechange=null,r=void 0,n||t())},r.src=e})});t.getArrayBuffer=function(e){if(e&&e instanceof File)return new Promise(function(t,n){var r=new FileReader;r.onload=function(e){t(e.target.result)},r.readAsArrayBuffer(e)});throw"SPScript.utils.getArrayBuffer: Cant get ArrayBuffer if you don't pass in a file"},t.loadCss=function(e){var t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("href",e),document.querySelector("head").appendChild(t)},t.handleErrorResponse=function(e,t){console.log("REQUEST ERROR - "+e.statusCode||e.code);var n=e.body;try{var r=e.body;"string"==typeof r&&(r=JSON.parse(e.body)),r.error&&(n=r.error.message.value)}catch(o){}return console.log(n),e}},function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=(n(1),t.jsonMimeType="application/json;odata=verbose"),i=t.getStandardHeaders=function(e){var t={Accept:o,"Content-Type":o};return e&&(t["X-RequestDigest"]=e),t};t.getAddHeaders=i;var a=(t.getFilestreamHeaders=function(e){return{Accept:o,"X-RequestDigest":e,"Content-Type":"application/octet-stream",binaryStringRequestBody:"true"}},t.getActionHeaders=function(e,t){return e?r({},i(t),{"X-HTTP-Method":e}):i(t)}),s=function(e,t){return t&&(e["If-Match"]=t),e};t.getUpdateHeaders=function(e,t){return s(a("MERGE",e),t)},t.getDeleteHeaders=function(e,t){return s(a("DELETE",e),t)}},,,,function(e,t,n){(function(e,r){function o(e,t){this._id=e,this._clearFn=t}var i=n(59).nextTick,a=Function.prototype.apply,s=Array.prototype.slice,u={},l=0;t.setTimeout=function(){return new o(a.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new o(a.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},t.setImmediate="function"==typeof e?e:function(e){var n=l++,r=arguments.length<2?!1:s.call(arguments,1);return u[n]=!0,i(function(){u[n]&&(r?e.apply(null,r):e.call(null),t.clearImmediate(n))}),n},t.clearImmediate="function"==typeof r?r:function(e){delete u[e]}}).call(t,n(6).setImmediate,n(6).clearImmediate)},function(e,t){"use strict";var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},r={method:"GET",async:!0,type:"json",data:void 0},o=["GET","POST","PUT","HEAD","DELETE","PATCH"],i=[],a=function(e){return e&&e.url&&!(o.indexOf(e.method)<0)},s=function(e,t){t&&Object.keys(t).forEach(function(n){e.setRequestHeader(n,t[n])})},u=function(e){var t=n({},r,e);if(!a(e))return Promise.reject(new Error("Invalid options passed into ajax call."));var o=new XMLHttpRequest;return null==o?Promise.reject(new Error("Your browser doesn't support XMLHttpRequest (ajax).")):(o.open(t.method,t.url,t.async),s(o,t.headers),o.responseType=t.type,new Promise(function(e,n){o.onreadystatechange=function(){if(4===o.readyState)if(o.status<400&&o.status>=100)e(o.response||o.responseText);else{var t=new Error("AJAX Request Error: Response Code = "+o.status);t.statusCode=o.status,t.body=o.response,i.forEach(function(e){return e(t,o)}),n(t)}},o.send(t.data)}))};u.addErrorHandler=function(e){return i.push(e)},u.setDefaults=function(e){return n(r,e)},e.exports=u},function(e,t,n){"use strict";var r=n(1),o=function(e,t){this._dao=t,this.baseUrl=e};o.prototype.getRoleAssignments=function(){var e=this.baseUrl+"/RoleAssignments?$expand=Member,RoleDefinitionBindings";return this._dao.get(e).then(r.validateODataV2).then(function(e){return e.map(i.roleAssignment)})},o.prototype.check=function(e){var t=this,n=function(e){var n=encodeURIComponent(e.LoginName),o=t.baseUrl+"/getusereffectivepermissions(@v)?@v='"+n+"'";return t._dao.get(o).then(r.validateODataV2)};if(!e&&!r.isBrowser())return Promise.reject("Can't Check Permissions.  No email passed and no current user");var o=e?this._dao.web.getUser(e):this._dao.get("/web/getuserbyid("+_spPageContextInfo.userId+")").then(function(e){return e.d});return o.then(n).then(function(e){return a(e.GetUserEffectivePermissions.Low,e.GetUserEffectivePermissions.High)})};var i={roleAssignment:function(e){var t={member:{login:e.Member.LoginName,name:e.Member.Title,id:e.Member.Id}};return t.roles=e.RoleDefinitionBindings.results.map(function(e){return{name:e.Name,description:e.Description,basePermissions:a(e.BasePermissions.Low,e.BasePermissions.High)}}),t}},a=function(e,t){var n=[];return s.forEach(function(r){((r.low&e)>0||(r.high&t)>0)&&n.push(r.name)}),n},s=[{name:"emptyMask",low:0,high:0},{name:"viewListItems",low:1,high:0},{name:"addListItems",low:2,high:0},{name:"editListItems",low:4,high:0},{name:"deleteListItems",low:8,high:0},{name:"approveItems",low:16,high:0},{name:"openItems",low:32,high:0},{name:"viewVersions",low:64,high:0},{name:"deleteVersions",low:128,high:0},{name:"cancelCheckout",low:256,high:0},{name:"managePersonalViews",low:512,high:0},{name:"manageLists",low:2048,high:0},{name:"viewFormPages",low:4096,high:0},{name:"anonymousSearchAccessList",low:8192,high:0},{name:"open",low:65536,high:0},{name:"viewPages",low:131072,high:0},{name:"addAndCustomizePages",low:262144,high:0},{name:"applyThemeAndBorder",low:524288,high:0},{name:"applyStyleSheets",low:1048576,high:0},{name:"viewUsageData",low:2097152,high:0},{name:"createSSCSite",low:4194304,high:0},{name:"manageSubwebs",low:8388608,high:0},{name:"createGroups",low:16777216,high:0},{name:"managePermissions",low:33554432,high:0},{name:"browseDirectories",low:67108864,high:0},{name:"browseUserInfo",low:134217728,high:0},{name:"addDelPrivateWebParts",low:268435456,high:0},{name:"updatePersonalWebParts",low:536870912,high:0},{name:"manageWeb",low:1073741824,high:0},{name:"anonymousSearchAccessWebLists",low:-2147483648,high:0},{name:"useClientIntegration",low:0,high:16},{name:"useRemoteAPIs",low:0,high:32},{name:"manageAlerts",low:0,high:64},{name:"createAlerts",low:0,high:128},{name:"editMyUserInfo",low:0,high:256},{name:"enumeratePermissions",low:0,high:1073741824}];e.exports=o},function(e,t,n){"use strict";var r=n(58),o=(t.fromObj=function(e,t){var n=function(n){var r=(e[n]+"").trim();return(r.indexOf(" ")>-1||t)&&(r="'"+r+"'"),n+"="+r},r=Object.keys(e).map(n).join("&");return r},t.toObj=function(e){return void 0===e&&window&&window.location&&window.location.search&&(e=window.location.search),e?("?"===e[0]&&(e=e.substr(1)),r.parse(e)):{}});t.contains=function(e,t){return o(t).hasOwnProperty(e)},t.getValue=function(e,t){return o(t)[e]||""}},,,,,,,,function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(22),i=n(26),a=n(23),s=n(25),u=n(1),l=n(20),c=n(2),d=function(){this.web=new i(this),this.search=new s(this),this.profiles=new a(this),this.customActions=new l(this)};d.prototype.executeRequest=function(){throw"Not implemented exception"},d.prototype.get=function(e,t){var n=r({},{method:"GET"},t);return this.executeRequest(e,n).then(u.parseJSON)},d.prototype.getRequestDigest=function(){return this.post("/contextinfo",{}).then(function(e){return e.d.GetContextWebInformation.FormDigestValue})},d.prototype.lists=function(e){return e?new o(e,this):this.get("/web/lists").then(u.validateODataV2)},d.prototype.post=function(e,t,n){t=h(t,n);var o={method:"POST",data:t};return o=r({},o,n),this.executeRequest(e,o).then(u.parseJSON)},d.prototype.authorizedPost=function(e,t,n){var r=this;return this.getRequestDigest().then(function(e){return c.getActionHeaders(n,e)}).then(function(n){return r.post(e,t,{headers:n})})},d.prototype.ensureRequestDigest=function(e){return e?Promise.resolve(e):this.getRequestDigest()};var h=function(e,t){return"string"==typeof e?e:t&&t.headers&&t.headers["Content-Type"]&&-1===t.headers["Content-Type"].indexOf("json")?e:JSON.stringify(e)};e.exports=d},function(e,t){"use strict";function n(e){return function(t){var n=t.FormContext;return e.onReady&&(n?n.registerInitCallback(e.name,e.onReady.bind(null,t)):setTimeout(e.onReady.bind(null,t),100)),e.getValue&&n&&n.registerGetValueCallback(e.name,e.getValue.bind(null,t)),n&&n.updateControlValue&&(e.setValue=function(t){n.updateControlValue(e.name,t)}),e.render(t)}}function r(e){return function(t){var n=t.FormContext;return n&&n.registerInitCallback&&e.onReady&&n.registerInitCallback(e.name,e.onReady),e.render(t)}}var o={formField:{create:n},displayField:{create:r}};e.exports=o},function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=t.renderers=n(18),i=(t.registerFormField=function(e,t){var n=o.formField.create(e);return e.locations=e.locations||["NewForm","EditForm"],i(e,n,t)},t.registerDisplayField=function(e,t){var n=o.displayField.create(e);return e.locations=e.locations||["View","DisplayForm"],i(e,n,t)},t.registerField=function(e,t,n){var o={};e.locations.forEach(function(e){return o[e]=t});var i={Templates:{Fields:{}}},a=r({},i,n);return a.Templates.Fields[e.name]=o,SPClientTemplates.TemplateManager.RegisterTemplateOverrides(a),e});t.registerView=function(e,t){var n={Templates:{Header:function(){return""},Footer:function(){return""}}},o=r({},n,t);o.Templates=r({},o.Templates,e),SPClientTemplates.TemplateManager.RegisterTemplateOverrides(o)}},function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(1),i=n(2),a={__metadata:{type:"SP.UserCustomAction"}},s=function(e){var t=this;this._dao=e,this.scopes={Web:{id:3,name:"Web",url:"/web/usercustomactions"},Site:{id:2,name:"Site",url:"/site/usercustomactions"}},this.scopes.getById=function(e){return 2===e?t.scopes.Site:t.scopes.Web}};s.prototype.get=function(e){var t=this;return this._dao.get(this.scopes.Site.url).then(o.validateODataV2).then(function(e){return t._dao.get(t.scopes.Web.url).then(o.validateODataV2).then(function(t){return e.concat(t)})}).then(function(t){if(e){var n=t.filter(function(t){return t.Name===e});if(n.length)return n[0];throw new Error("Unable to find Custom Action with name: "+e)}return t})},s.prototype._getUrl=function(e){var t=this;return this.get(e).then(function(e){return t.scopes.getById(e.Scope).url+"('"+e.Id+"')"})},s.prototype._getUrlAndDigest=function(e){var t=this,n={};return this._getUrl(e).then(function(e){return n.url=e,t._dao.getRequestDigest()}).then(function(e){return n.digest=e,n})},s.prototype.update=function(e){var t=this;if(!e||!e.Name)throw new Error("You must at least pass a Custom Action 'Name'");return this._getUrlAndDigest(e.Name).then(function(n){e=r({},a,e);var o={headers:i.getUpdateHeaders(n.digest)};return t._dao.post(n.url,e,o)})},s.prototype.remove=function(e){var t=this;if(!e)throw new Error("You must at least pass a Custom Action 'Name'");return this._getUrlAndDigest(e).then(function(e){var n={headers:i.getDeleteHeaders(e.digest)};return t._dao.post(e.url,{},n)})},s.prototype.add=function(e){var t=this;if(!e||!e.Name||!e.Location)throw new Error("You must at least pass a Custom Action 'Name' and 'Location'");return e.Scope=e.Scope||"Web",this._dao.getRequestDigest().then(function(n){e=r({},a,e);var o=t.scopes[e.Scope];e.Scope=o.id;var s={headers:i.getAddHeaders(n)};return t._dao.post(o.url,e,s)})},s.prototype.addScriptLink=function(e,t,n){var o={Name:e,Title:e,Description:e,Group:e,Sequence:100,Scope:"Web",Location:"ScriptLink",ScriptSrc:t};return o=r({},o,n||{}),this.add(o)},s.prototype.addCSSLink=function(e,t,n){var o='\n		(function() {\n			var head = document.querySelector("head");\n			var styleTag = document.createElement("style");\n			styleTag.appendChild(document.createTextNode("body { opacity: 0 }"));\n			\n			var linkTag = document.createElement("link");\n			linkTag.rel = "stylesheet";	linkTag.href = "'+t+'"; linkTag.type = "text/css";\n			linkTag.addEventListener("load", function() {\n				head.removeChild(styleTag);\n			});\n\n			head.appendChild(styleTag);\n			head.appendChild(linkTag);\n		})();',i={Name:e,Title:e,Description:e,Group:e,Sequence:100,Scope:"Web",Location:"ScriptLink",ScriptBlock:o};return i=r({},i,n||{}),this.add(i)},s.metadata=a,e.exports=s},function(e,t,n){"use strict";var r=(n(1),function(e){this.mapProperties(e),this.populateChildren(e)});r.prototype.populateChildren=function(e){e&&e.Folders&&e.Folders.results&&(this.folders=e.Folders.results.map(function(e){return new r(e)})),e&&e.Files&&e.Files.results&&(this.files=e.Files.results.map(function(e){return new o(e)}))},r.prototype.mapProperties=function(e){this.name=e.Name,this.serverRelativeUrl=e.ServerRelativeUrl,this.itemCount=e.ItemCount,this.guid=e.UniqueId,this.uri=e.__metadata.uri};var o=function(e){this.mapProperties(e)};o.prototype.mapProperties=function(e){this.name=e.Name,this.title=e.Title,this.checkoutType=e.CheckOutType,this.byteLength=e.Length,this.majorVersion=e.MajorVersion,this.minorVersion=e.MinorVersion,this.serverRelativeUrl=e.ServerRelativeUrl,this.uri=e.__metadata.uri},e.exports={File:o,Folder:r}},function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(1),i=n(8),a=n(2),s=function(e,t){this.listname=e,this.baseUrl="/web/lists/getbytitle('"+e+"')",this._dao=t,this.permissions=new i(this.baseUrl,this._dao)};s.prototype.getFields=function(e){var t=this.baseUrl+"/fields"+u(e);return this._dao.get(t).then(o.validateODataV2)},s.prototype.getField=function(e){return this.getFields("$filter=InternalName eq '"+e+"'").then(function(t){if(t.length)return t[0];throw new Error("Unable to find field: "+e)})},s.prototype.updateField=function(e,t){var n=this;this.getField(e).then(function(e){var r=n.baseUrl+"/Fields(guid'"+e.Id+"')";return t.__metadata={type:"SP.Field"},n._dao.authorizedPost(r,t,"MERGE")})},s.prototype.getItems=function(e){return this._dao.get(this.baseUrl+"/items"+u(e)).then(o.validateODataV2)},s.prototype.getItemById=function(e,t){var n=this.baseUrl+"/items("+e+")"+u(t);return this._dao.get(n).then(o.validateODataV2)},s.prototype.info=function(){return this._dao.get(this.baseUrl).then(o.validateODataV2)},s.prototype.addItem=function(e,t){var n=this;return this._dao.ensureRequestDigest(t).then(function(t){return n._dao.get(n.baseUrl).then(function(o){e=r({},{__metadata:{type:o.d.ListItemEntityTypeFullName}},e);var i={headers:a.getAddHeaders(t)};return n._dao.post(n.baseUrl+"/items",e,i)}).then(o.validateODataV2)})},s.prototype.updateItem=function(e,t,n){var o=this;return this._dao.ensureRequestDigest(n).then(function(n){return o.getItemById(e).then(function(e){t=r({},{__metadata:{type:e.__metadata.type}},t);var i={headers:a.getUpdateHeaders(n,e.__metadata.etag)};return o._dao.post(e.__metadata.uri,t,i)})})},s.prototype.deleteItem=function(e,t){var n=this;return this._dao.ensureRequestDigest(t).then(function(t){return n.getItemById(e).then(function(e){var r={headers:a.getDeleteHeaders(t,e.__metadata.etag)};return n._dao.post(e.__metadata.uri,"",r)})})},s.prototype.addAttachment=function(e,t,n,r){var o=this;return r?this._addAttachment(e,t,n,r):this._dao.getRequestDigest().then(function(r){return o._addAttachment(e,t,n,r)})},s.prototype._addAttachment=function(e,t,n,r){var o={headers:a.getFilestreamHeaders(r),data:n};return this._dao.post(this.baseUrl+"/items("+e+")/AttachmentFiles/add(FileName='"+t+"')",null,o)},s.prototype.deleteAttachment=function(e,t,n){var r=this;return n?this._deleteAttachment(e,t,n):this._dao.getRequestDigest().then(function(n){return r._deleteAttachment(e,t,n)})},s.prototype._deleteAttachment=function(e,t,n){var r=this;return this._dao.get(this.baseUrl).then(function(o){var i={headers:{Accept:"application/json;odata=verbose","X-RequestDigest":n,"X-HTTP-Method":"DELETE"}};return r._dao.post(r.baseUrl+"/items("+e+")/AttachmentFiles('"+t+"')",null,i)})},s.prototype.findItems=function(e,t,n){var r="string"==typeof t?"'"+t+"'":t,o="$filter="+e+" eq "+r+u(n,"&");return this.getItems(o)},s.prototype.findItem=function(e,t,n){return this.findItems(e,t,n).then(function(e){return e&&e.length&&e.length>0?e[0]:null})};var u=function(e,t){return t=t||"?",e?t+e:""};e.exports=s},function(e,t,n){"use strict";var r=n(1),o=n(2),i=function(e){this._dao=e,this.baseUrl="/SP.UserProfiles.PeopleManager"},a=function(e){return e.UserProfileProperties.results.forEach(function(t){e[t.Key]=t.Value}),e};i.prototype.current=function(){var e=this.baseUrl+"/GetMyProperties";return this._dao.get(e).then(r.validateODataV2).then(a)},i.prototype.setProperty=function(e,t,n,r){var i=this;return this._dao.ensureRequestDigest(r).then(function(r){var a=i.baseUrl+"/SetSingleValueProfileProperty",s={propertyName:t,propertyValue:n},u={headers:o.getStandardHeaders(r)};return"string"==typeof e?i.getByEmail(e).then(function(e){return s.accountName=e.AccountName,i._dao.post(a,s,u)}):(s.accountName=e.LoginName||e.AccountName,i._dao.post(a,s,u))})},i.prototype.getProfile=function(e){var t=encodeURIComponent(e.LoginName),n=this.baseUrl+"/GetPropertiesFor(accountName=@v)?@v='"+t+"'";return this._dao.get(n).then(r.validateODataV2).then(a)},i.prototype.getByEmail=function(e){var t=this;return this._dao.web.getUser(e).then(function(e){return t.getProfile(e)})},e.exports=i},function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(17),i=n(7),a=n(1),s=function(e){o.call(this),this.webUrl=e||_spPageContextInfo.webAbsoluteUrl};s.prototype=Object.create(o.prototype),s.prototype.executeRequest=function(e,t){var n=/^http/i.test(e)?e:this.webUrl+"/_api"+e,o={url:n,method:"GET",headers:{Accept:"application/json; odata=verbose","Content-Type":"application/json; odata=verbose"}},s=r({},o,t);return i(s)["catch"](a.handleErrorResponse)},e.exports=s},function(e,t,n){"use strict";var r=n(9),o=n(1),i=function(e){this._dao=e};i.QueryOptions=function(){this.sourceid=null,this.startrow=null,this.rowlimit=30,this.selectedproperties=null,this.refiners=null,this.refinementfilters=null,this.hiddenconstraints=null,this.sortlist=null};var a=function(e){for(var t=[],n=0;n<e.length;n++){for(var r=e[n],o={},i=0;i<r.Cells.results.length;i++)o[r.Cells.results[i].Key]=r.Cells.results[i].Value;t.push(o)}return t},s=function(e){this.elapsedTime=e.ElapsedTime,this.suggestion=e.SpellingSuggestion,this.resultsCount=e.PrimaryQueryResult.RelevantResults.RowCount,this.totalResults=e.PrimaryQueryResult.RelevantResults.TotalRows,this.totalResultsIncludingDuplicates=e.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates,this.items=a(e.PrimaryQueryResult.RelevantResults.Table.Rows.results),this.refiners=u(e.PrimaryQueryResult.RefinementResults)},u=function(e){var t=[];return e&&e.Refiners&&e.Refiners.results&&(t=e.Refiners.results.map(function(e){return{RefinerName:e.Name,RefinerOptions:e.Entries.results}})),t};i.prototype.query=function(e,t){var n=null!=t?"&"+r.fromObj(t,!0):"",i="/search/query?querytext='"+e+"'"+n;return this._dao.get(i).then(o.validateODataV2).then(function(e){if(e.query)return new s(e.query);throw new Error("Invalid response back from search service")})},i.prototype.people=function(e,t){var n=t||{};return n.sourceid="b09a7990-05ea-4af9-81ef-edfab16c4e31",this.query(e,n)},i.prototype.sites=function(e,t){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];e=e||"",t=t?"Path:"+t+"*":"";var r=(e+" contentclass:STS_Web "+t).trim();return n.rowlimit=n.rowlimit||499,this.query(r,n)},e.exports=i},function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(1),i=n(8),a=n(2),s=n(21).Folder,u=function(e){this._dao=e,this.baseUrl="/web",this.permissions=new i(this.baseUrl,this._dao)};u.prototype.info=function(){return this._dao.get(this.baseUrl).then(o.validateODataV2)},u.prototype.subsites=function(){return this._dao.get(this.baseUrl+"/webinfos").then(o.validateODataV2)},u.prototype.getRequestDigest=function(){return this._dao.getRequestDigest()},u.prototype.getFolder=function(e){"/"===e.charAt(0)&&(e=e.substr(1));var t="/web/GetFolderByServerRelativeUrl('"+e+"')?$expand=Folders,Files";return this._dao.get(t).then(o.validateODataV2).then(function(e){var t=new s(e);return t.populateChildren(e),t})},u.prototype.uploadFile=function(e,t,n,r){var o=this;return r?this._uploadFile(e,t,n,r):this.getRequestDigest().then(function(r){return o._uploadFile(e,t,n,r)})},u.prototype._uploadFile=function(e,t,n,r){var i=this;return n=n||{},"string"==typeof e?(n.name=n.name||"NewFile.txt",this._uploadBinaryData(e,t,n,r)):e instanceof File?(n.name=n.name||e.name,o.getArrayBuffer(e).then(function(e){return i._uploadBinaryData(e,t,n,r)})):void 0},u.prototype._setFileFields=function(e,t,n){var i=this;return this._dao.get(e.__metadata.uri+"/ListItemAllFields?$expand=ParentList").then(o.validateODataV2).then(function(o){return delete t.name,0===Object.keys(t).length?{item:o,file:e}:i._dao.lists(o.ParentList.Title).updateItem(o.Id,t,n).then(function(){return o=r({},o,t),{item:o,file:e}})})},u.prototype._uploadBinaryData=function(e,t,n,r){var i=this,s="/web/GetFolderByServerRelativeUrl('"+t+"')/Files/Add(url='"+n.name+"',overwrite=true)",u={headers:a.getFilestreamHeaders(r)};return this._dao.post(s,e,u).then(o.validateODataV2).then(function(e){return i._setFileFields(e,n,r)})},u.prototype.getFile=function(e){var e="/web/getfilebyserverrelativeurl('"+e+"')";return this._dao.get(e).then(o.validateODataV2)},u.prototype.copyFile=function(e,t,n){var r=this;return n?this._copyFile(e,t,n):this.getRequestDigest().then(function(n){return r._copyFile(e,t,n)})},u.prototype._copyFile=function(e,t,n){var r="/web/getfilebyserverrelativeurl('"+e+"')/CopyTo",o={headers:a.getAddHeaders(n)},i={strNewUrl:t,bOverWrite:!0};return this._dao.post(r,i,o)},u.prototype.fileAction=function(e,t){var n=this,r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],o=arguments[3];return o&&this._fileAction(e,t,r,o),this.getRequestDigest().then(function(o){return n._fileAction(e,t,r,o)})},u.prototype._fileAction=function(e,t,n,r){var o="/web/getfilebyserverrelativeurl('"+e+"')/"+t,i={headers:a.getAddHeaders(r)};return this._dao.post(o,n,i)},u.prototype.deleteFile=function(e,t){var n=this;return t?this._deleteFile(e,t):this.getRequestDigest().then(function(t){return n._deleteFile(e,t)})},u.prototype._deleteFile=function(e,t){var n="/web/getfilebyserverrelativeurl(@url)/?@Url='"+e+"'",r={headers:a.getDeleteHeaders(t)};return this._dao.post(n,{},r)},u.prototype.getUser=function(e){var t=this.baseUrl+"/SiteUsers/GetByEmail('"+e+"')";return this._dao.get(t).then(o.validateODataV2)},u.prototype.ensureUser=function(e){return this._dao.post("/web/ensureUser('"+e+"')").then(o.validateODataV2)},e.exports=u},,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,n){(function(t){!function(n){function r(){}function o(e,t){return function(){e.apply(t,arguments)}}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],d(e,this)}function a(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void i._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null===n)return void(1===e._state?s:u)(t.promise,e._value);var r;try{r=n(e._value)}catch(o){return void u(t.promise,o)}s(t.promise,r)}))}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof i)return e._state=3,e._value=t,void l(e);if("function"==typeof n)return void d(o(n,t),e)}e._state=1,e._value=t,l(e)}catch(r){u(e,r)}}function u(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;n>t;t++)a(e,e._deferreds[t]);e._deferreds=null}function c(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function d(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,u(t,e))})}catch(r){if(n)return;n=!0,u(t,r)}}var h=setTimeout;i.prototype["catch"]=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(r);return a(this,new c(e,t,n)),n},i.all=function(e){var t=Array.prototype.slice.call(e);return new i(function(e,n){function r(i,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(e){r(i,e)},n)}t[i]=a,0===--o&&e(t)}catch(u){n(u)}}if(0===t.length)return e([]);for(var o=t.length,i=0;i<t.length;i++)r(i,t[i])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,n){n(e)})},i.race=function(e){return new i(function(t,n){for(var r=0,o=e.length;o>r;r++)e[r].then(t,n)})},i._immediateFn="function"==typeof t&&function(e){t(e)}||function(e){h(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},i._setImmediateFn=function(e){i._immediateFn=e},i._setUnhandledRejectionFn=function(e){i._unhandledRejectionFn=e},"undefined"!=typeof e&&e.exports?e.exports=i:n.Promise||(n.Promise=i)}(this)}).call(t,n(6).setImmediate)},function(e,t){"use strict";function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,r,o){t=t||"&",r=r||"=";var i={};if("string"!=typeof e||0===e.length)return i;var a=/\+/g;e=e.split(t);var s=1e3;o&&"number"==typeof o.maxKeys&&(s=o.maxKeys);var u=e.length;s>0&&u>s&&(u=s);for(var l=0;u>l;++l){var c,d,h,f,p=e[l].replace(a,"%20"),m=p.indexOf(r);m>=0?(c=p.substr(0,m),d=p.substr(m+1)):(c=p,d=""),h=decodeURIComponent(c),f=decodeURIComponent(d),n(i,h)?Array.isArray(i[h])?i[h].push(f):i[h]=[i[h],f]:i[h]=f}return i}},function(e,t){"use strict";var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,o){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map(function(o){var i=encodeURIComponent(n(o))+r;return Array.isArray(e[o])?e[o].map(function(e){return i+encodeURIComponent(n(e))}).join(t):i+encodeURIComponent(n(e[o]))}).join(t):o?encodeURIComponent(n(o))+r+encodeURIComponent(n(e)):""}},function(e,t,n){"use strict";t.decode=t.parse=n(56),t.encode=t.stringify=n(57)},function(e,t){function n(){l=!1,a.length?u=a.concat(u):c=-1,u.length&&r()}function r(){if(!l){var e=setTimeout(n);l=!0;for(var t=u.length;t;){for(a=u,u=[];++c<t;)a&&a[c].run();c=-1,t=u.length}a=null,l=!1,clearTimeout(e)}}function o(e,t){this.fun=e,this.array=t}function i(){}var a,s=e.exports={},u=[],l=!1,c=-1;s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new o(e,t)),1!==u.length||l||setTimeout(r,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=i,s.addListener=i,s.once=i,s.off=i,s.removeListener=i,s.removeAllListeners=i,s.emit=i,s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}}]);