/*can@2.3.0-pre.3#control/route/route*/
define("can@2.3.0-pre.3#control/route/route",["can/util/util","can/route/route","can/control/control"],function(t){return t.Control.processors.route=function(o,r,u,n,e){u=u||"",t.route.routes[u]||("/"===u[0]&&(u=u.substring(1)),t.route(u));var c,i=function(o,r,i){if(t.route.attr("route")===u&&(void 0===o.batchNum||o.batchNum!==c)){c=o.batchNum;var a=t.route.attr();delete a.route,t.isFunction(e[n])?e[n](a):e[e[n]](a)}};return t.route.bind("change",i),function(){t.route.unbind("change",i)}},t});
/*can@2.3.0-pre.3#model/model*/
define("can@2.3.0-pre.3#model/model",["can/util/util","can/map/map","can/list/list"],function(t){var e=function(e,r,i){var n=new t.Deferred;return e.then(function(){var e=t.makeArray(arguments),s=!0;try{e[0]=i.apply(r,e)}catch(o){s=!1,n.rejectWith(n,[o].concat(e))}s&&n.resolveWith(n,e)},function(){n.rejectWith(this,arguments)}),"function"==typeof e.abort&&(n.abort=function(){return e.abort()}),n},r=0,i=function(e){return t.__observe(e,e.constructor.id),e.___get(e.constructor.id)},n=function(e,r,i,n,s,o){var a={};if("string"==typeof e){var u=e.split(/\s+/);a.url=u.pop(),u.length&&(a.type=u.pop())}else t.extend(a,e);return a.data="object"!=typeof r||t.isArray(r)?r:t.extend(a.data||{},r),a.url=t.sub(a.url,a.data,!0),t.ajax(t.extend({type:i||"post",dataType:n||"json",success:s,error:o},a))},s=function(r,n,s,o,a){var u;t.isArray(r)?(u=r[1],r=r[0]):u=r.serialize(),u=[u];var c,l,d=r.constructor;return("update"===n||"destroy"===n)&&u.unshift(i(r)),l=d[n].apply(d,u),c=e(l,r,function(t){return r[a||n+"d"](t,l),r}),l.abort&&(c.abort=function(){l.abort()}),c.then(s,o),c},o={models:function(e,r,i){if(t.Model._reqs++,e){if(e instanceof this.List)return e;var n=this,s=[],o=n.List||f,a=r instanceof t.List?r:new o,u=e instanceof f,c=u?e.serialize():e;if(c=n.parseModels(c,i),c.data&&(e=c,c=c.data),"undefined"==typeof c||!t.isArray(c))throw new Error("Could not get any raw data while converting using .models");return a.length&&a.splice(0),t.each(c,function(t){s.push(n.model(t,i))}),a.push.apply(a,s),t.isArray(e)||t.each(e,function(t,e){"data"!==e&&a.attr(e,t)}),setTimeout(t.proxy(this._clean,this),1),a}},model:function(e,r,i){if(e){e="function"==typeof e.serialize?e.serialize():this.parseModel(e,i);var n=e[this.id];(n||0===n)&&this.store[n]&&(r=this.store[n]);var s=r&&t.isFunction(r.attr)?r.attr(e,this.removeAttr||!1):new this(e);return s}}},a={parseModel:function(e){return function(r){return e?t.getObject(e,r):r}},parseModels:function(e){return function(r){if(t.isArray(r))return r;e=e||"data";var i=t.getObject(e,r);if(!t.isArray(i))throw new Error("Could not get any raw data while converting using .models");return i}}},u={create:{url:"_shortName",type:"post"},update:{data:function(e,r){r=r||{};var i=this.id;return r[i]&&r[i]!==e&&(r["new"+t.capitalize(e)]=r[i],delete r[i]),r[i]=e,r},type:"put"},destroy:{type:"delete",data:function(t,e){return e=e||{},e.id=e[this.id]=t,e}},findAll:{url:"_shortName"},findOne:{}},c=function(t,e){return function(r){return r=t.data?t.data.apply(this,arguments):r,n(e||this[t.url||"_url"],r,t.type||"get")}},l=function(t,e){if(t.resource){var r=t.resource.replace(/\/+$/,"");return"findAll"===e||"create"===e?r:r+"/{"+t.id+"}"}};t.Model=t.Map.extend({fullName:"can.Model",_reqs:0,setup:function(e,i,n,s){if("string"!=typeof i&&(s=n,n=i),s||(s=n),this.store={},t.Map.setup.apply(this,arguments),t.Model){n&&n.List?(this.List=n.List,this.List.Map=this):this.List=e.List.extend({Map:this},{});var d=this,p=t.proxy(this._clean,d);t.each(u,function(r,i){if(n&&n[i]&&("string"==typeof n[i]||"object"==typeof n[i])?d[i]=c(r,n[i]):n&&n.resource&&!t.isFunction(n[i])&&(d[i]=c(r,l(d,i))),d["make"+t.capitalize(i)]){var s=d["make"+t.capitalize(i)](d[i]);t.Construct._overwrite(d,e,i,function(){t.Model._reqs++;var e=s.apply(this,arguments),r=e.then(p,p);return r.abort=e.abort,r})}});var h={};t.each(o,function(r,i){var s="parse"+t.capitalize(i),o=n&&n[i]||d[i];"string"==typeof o?(d[s]=o,t.Construct._overwrite(d,e,i,r)):n&&n[i]&&(h[s]=!0)}),t.each(a,function(r,i){var s=n&&n[i]||d[i];if("string"==typeof s)t.Construct._overwrite(d,e,i,r(s));else if(!(n&&t.isFunction(n[i])||d[i])){var o=r();o.useModelConverter=h[i],t.Construct._overwrite(d,e,i,o)}}),"can.Model"!==d.fullName&&d.fullName||(d.fullName="Model"+ ++r),t.Model._reqs=0,this._url=this._shortName+"/{"+this.id+"}"}},_ajax:c,_makeRequest:s,_clean:function(){if(t.Model._reqs--,!t.Model._reqs)for(var e in this.store)this.store[e]._bindings||delete this.store[e];return arguments[0]},models:o.models,model:o.model},{setup:function(e){var r=e&&e[this.constructor.id];t.Model._reqs&&null!=r&&(this.constructor.store[r]=this),t.Map.prototype.setup.apply(this,arguments)},isNew:function(){var t=i(this);return!(t||0===t)},save:function(t,e){return s(this,this.isNew()?"create":"update",t,e)},destroy:function(e,r){if(this.isNew()){var i=this,n=t.Deferred();return n.then(e,r),n.done(function(t){i.destroyed(t)}).resolve(i)}return s(this,"destroy",e,r,"destroyed")},_bindsetup:function(){var e=this.___get(this.constructor.id);return null!=e&&(this.constructor.store[e]=this),t.Map.prototype._bindsetup.apply(this,arguments)},_bindteardown:function(){return delete this.constructor.store[i(this)],t.Map.prototype._bindteardown.apply(this,arguments)},___set:function(e,r){t.Map.prototype.___set.call(this,e,r),e===this.constructor.id&&this._bindings&&(this.constructor.store[i(this)]=this)}});var d=function(t){return function(e,r,i){return this[t](e,null,i)}},p=function(t){return this.parseModel.useModelConverter?this.model(t):this.parseModel(t)},h={makeFindAll:d("models"),makeFindOne:d("model"),makeCreate:p,makeUpdate:p,makeDestroy:p};t.each(h,function(r,i){t.Model[i]=function(i){return function(){var n=t.makeArray(arguments),s=t.isFunction(n[1])?n.splice(0,1):n.splice(0,2),o=e(i.apply(this,s),this,r);return o.then(n[0],n[1]),o}}}),t.each(["created","updated","destroyed"],function(e){t.Model.prototype[e]=function(r){var i=this,n=i.constructor;r&&"object"==typeof r&&this.attr(t.isFunction(r.attr)?r.attr():r),t.dispatch.call(this,{type:e,target:this},[]),t.dispatch.call(n,e,[this])}});var f=t.Model.List=t.List.extend({_bubbleRule:function(e,r){var i=t.List._bubbleRule(e,r);return i.push("destroyed"),i}},{setup:function(e){t.isPlainObject(e)&&!t.isArray(e)?(t.List.prototype.setup.apply(this),this.replace(t.isDeferred(e)?e:this.constructor.Map.findAll(e))):t.List.prototype.setup.apply(this,arguments),this.bind("destroyed",t.proxy(this._destroyed,this))},_destroyed:function(t,e){if(/\w+/.test(e))for(var r;(r=this.indexOf(t.target))>-1;)this.splice(r,1)}});return t.Model});
/*can@2.3.0-pre.3#can*/
define("can@2.3.0-pre.3#can",["can/util/util","can/control/route/route","can/model/model","can/view/mustache/mustache","can/component/component"],function(n){return n});
/*bit-tabs@0.1.0-pre.1#util*/
define("bit-tabs@0.1.0-pre.1#util",function(t,e,i){i.exports={name:"util"}});
/*bit-tabs@0.1.0-pre.1#tabs.stache!can@2.3.0-pre.3#view/stache/system*/
define("bit-tabs@0.1.0-pre.1#tabs.stache!can@2.3.0-pre.3#view/stache/system",["module","can/view/stache/stache"],function(e,t){var a=t([{tokenType:"start",args:["ul",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"special",args:["tabsClass"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["ul",!1]},{tokenType:"special",args:["#panels"]},{tokenType:"chars",args:["\n    "]},{tokenType:"start",args:["li",!1]},{tokenType:"special",args:["#isActive"]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["active"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"special",args:["/isActive"]},{tokenType:"attrStart",args:["can-click"]},{tokenType:"attrValue",args:["makeActive"]},{tokenType:"attrEnd",args:["can-click"]},{tokenType:"end",args:["li",!1]},{tokenType:"chars",args:["\n		  "]},{tokenType:"start",args:["a",!1]},{tokenType:"attrStart",args:["href"]},{tokenType:"attrValue",args:["javascript://"]},{tokenType:"attrEnd",args:["href"]},{tokenType:"end",args:["a",!1]},{tokenType:"special",args:["title"]},{tokenType:"close",args:["a"]},{tokenType:"chars",args:["\n	"]},{tokenType:"close",args:["li"]},{tokenType:"special",args:["/panels"]},{tokenType:"chars",args:["\n"]},{tokenType:"close",args:["ul"]},{tokenType:"chars",args:["\n"]},{tokenType:"start",args:["content",!1]},{tokenType:"end",args:["content",!1]},{tokenType:"close",args:["content"]},{tokenType:"chars",args:["\n"]},{tokenType:"done",args:[]}]);return function(t,s){var r={module:e};return a(t,s?s.add(r):r)}});
/*bit-tabs@0.1.0-pre.1#panel.stache!can@2.3.0-pre.3#view/stache/system*/
define("bit-tabs@0.1.0-pre.1#panel.stache!can@2.3.0-pre.3#view/stache/system",["module","can/view/stache/stache"],function(e,t){var n=t([{tokenType:"special",args:["#if active"]},{tokenType:"start",args:["content",!1]},{tokenType:"end",args:["content",!1]},{tokenType:"close",args:["content"]},{tokenType:"special",args:["/if"]},{tokenType:"done",args:[]}]);return function(t,a){var s={module:e};return n(t,a?a.add(s):s)}});
/*bit-tabs@0.1.0-pre.1#bit-tabs*/
define("bit-tabs@0.1.0-pre.1#bit-tabs",["exports","can","can/view/stache/","./util","./tabs.stache!","./panel.stache!","./tabs.less!"],function(t,e,a,n,s,i,c){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},o=r(e),p=(r(a),r(n),r(s)),l=r(i),h=t.BitPanelVM=o.Map.extend({active:!1});o.Component.extend({tag:"bit-panel",template:l,scope:h,events:{inserted:function(){this.element.parent().scope().addPanel(this.scope)},removed:function(){this.element.parent().scope().removePanel(this.scope)}}});var v=t.BitTabsVM=o.Map.extend({panels:[],tabsClass:"",addPanel:function(t){0===this.attr("panels").length&&this.makeActive(t),this.attr("panels").push(t)},removePanel:function(t){var e=this.attr("panels");o.batch.start(),e.splice(e.indexOf(t),1),t===this.attr("active")&&(e.length?this.makeActive(e[0]):this.removeAttr("active")),o.batch.stop()},makeActive:function(t){this.attr("active",t),this.attr("panels").each(function(t){t.attr("active",!1)}),t.attr("active",!0)},isActive:function(t){return this.attr("active")===t}});o.Component.extend({tag:"bit-tabs",template:p,scope:v}),Object.defineProperty(t,"__esModule",{value:!0})});
/*dguide@0.0.0#order/details.component/template*/
define("dguide@0.0.0#order/details.component/template",["can/view/stache/stache","can/component/component"],function(e){return e([{tokenType:"special",args:["#order"]},{tokenType:"chars",args:["\n      "]},{tokenType:"start",args:["h3",!1]},{tokenType:"end",args:["h3",!1]},{tokenType:"chars",args:["Thanks for your order "]},{tokenType:"special",args:["name"]},{tokenType:"chars",args:["!"]},{tokenType:"close",args:["h3"]},{tokenType:"chars",args:["\n      "]},{tokenType:"start",args:["div",!1]},{tokenType:"end",args:["div",!1]},{tokenType:"start",args:["label",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["control-label"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["Confirmation Number: "]},{tokenType:"special",args:["_id"]},{tokenType:"close",args:["label"]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["\n\n      "]},{tokenType:"start",args:["h4",!1]},{tokenType:"end",args:["h4",!1]},{tokenType:"chars",args:["Items ordered:"]},{tokenType:"close",args:["h4"]},{tokenType:"chars",args:["\n      "]},{tokenType:"start",args:["ul",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["list-group panel"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["ul",!1]},{tokenType:"special",args:["#each items"]},{tokenType:"chars",args:["\n          "]},{tokenType:"start",args:["li",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["list-group-item"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["li",!1]},{tokenType:"chars",args:["\n            "]},{tokenType:"start",args:["label",!1]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["\n              "]},{tokenType:"special",args:["name"]},{tokenType:"chars",args:[" "]},{tokenType:"start",args:["span",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["badge"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["span",!1]},{tokenType:"chars",args:["$"]},{tokenType:"special",args:["price"]},{tokenType:"close",args:["span"]},{tokenType:"chars",args:["\n            "]},{tokenType:"close",args:["label"]},{tokenType:"chars",args:["\n          "]},{tokenType:"close",args:["li"]},{tokenType:"special",args:["/each"]},{tokenType:"chars",args:["\n\n        "]},{tokenType:"start",args:["li",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["list-group-item"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["li",!1]},{tokenType:"chars",args:["\n          "]},{tokenType:"start",args:["label",!1]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["Total "]},{tokenType:"start",args:["span",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["badge"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["span",!1]},{tokenType:"chars",args:["$"]},{tokenType:"special",args:["total"]},{tokenType:"close",args:["span"]},{tokenType:"close",args:["label"]},{tokenType:"chars",args:["\n        "]},{tokenType:"close",args:["li"]},{tokenType:"chars",args:["\n      "]},{tokenType:"close",args:["ul"]},{tokenType:"chars",args:["\n\n      "]},{tokenType:"start",args:["div",!1]},{tokenType:"end",args:["div",!1]},{tokenType:"start",args:["label",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["control-label"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["Phone: "]},{tokenType:"special",args:["phone"]},{tokenType:"close",args:["label"]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["\n      "]},{tokenType:"start",args:["div",!1]},{tokenType:"end",args:["div",!1]},{tokenType:"start",args:["label",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["control-label"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["Address: "]},{tokenType:"special",args:["address"]},{tokenType:"close",args:["label"]},{tokenType:"close",args:["div"]},{tokenType:"special",args:["/order"]},{tokenType:"chars",args:["\n  "]},{tokenType:"done",args:[]}])});
/*dguide@0.0.0#order/details.component!done-component@0.1.0#component*/
define("dguide@0.0.0#order/details.component!done-component@0.1.0#component",["can/component/component","dguide@0.0.0#order/details.component/template"],function(e,n){var o=function(e){return e&&e["default"]?e["default"]:e?e:void 0},d=o("undefined"!=typeof d?d:void 0),t=e.extend({tag:"pmo-order-details",template:o("undefined"!=typeof n?n:void 0),viewModel:d,events:o("undefined"!=typeof events?events:void 0),helpers:o("undefined"!=typeof helpers?helpers:void 0)});return{Component:t,ViewModel:t.Map,viewModel:d}});
/*dguide@0.0.0#order/new/new.stache!can@2.3.0-pre.3#view/stache/system*/
define("dguide@0.0.0#order/new/new.stache!can@2.3.0-pre.3#view/stache/system",["module","can/view/stache/stache","bit-tabs","dguide/order/details.component!"],function(e,t){var a=t([{tokenType:"start",args:["can-import",!0]},{tokenType:"attrStart",args:["from"]},{tokenType:"attrValue",args:["bit-tabs"]},{tokenType:"attrEnd",args:["from"]},{tokenType:"end",args:["can-import",!0]},{tokenType:"chars",args:["\n"]},{tokenType:"start",args:["can-import",!0]},{tokenType:"attrStart",args:["from"]},{tokenType:"attrValue",args:["dguide/order/details.component!"]},{tokenType:"attrEnd",args:["from"]},{tokenType:"end",args:["can-import",!0]},{tokenType:"chars",args:["\n\n"]},{tokenType:"start",args:["div",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["order-form"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["div",!1]},{tokenType:"chars",args:["\n  "]},{tokenType:"start",args:["restaurant-model",!1]},{tokenType:"attrStart",args:["get"]},{tokenType:"attrValue",args:["{ _id=slug }"]},{tokenType:"attrEnd",args:["get"]},{tokenType:"attrStart",args:["[restaurant]"]},{tokenType:"attrValue",args:["{value}"]},{tokenType:"attrEnd",args:["[restaurant]"]},{tokenType:"end",args:["restaurant-model",!1]},{tokenType:"special",args:["#if isPending"]},{tokenType:"chars",args:["\n      "]},{tokenType:"start",args:["div",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["loading"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["div",!1]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["    "]},{tokenType:"special",args:["else"]},{tokenType:"chars",args:["\n      "]},{tokenType:"special",args:["#value"]},{tokenType:"special",args:["#if saveStatus.isResolved"]},{tokenType:"chars",args:["\n          "]},{tokenType:"start",args:["pmo-order-details",!1]},{tokenType:"attrStart",args:["order"]},{tokenType:"attrValue",args:["{saveStatus.value}"]},{tokenType:"attrEnd",args:["order"]},{tokenType:"end",args:["pmo-order-details",!1]},{tokenType:"close",args:["pmo-order-details"]},{tokenType:"chars",args:["\n          "]},{tokenType:"start",args:["p",!1]},{tokenType:"end",args:["p",!1]},{tokenType:"start",args:["a",!1]},{tokenType:"attrStart",args:["href"]},{tokenType:"attrValue",args:["javascript://"]},{tokenType:"attrEnd",args:["href"]},{tokenType:"attrStart",args:["(click)"]},{tokenType:"attrValue",args:["{startNewOrder}"]},{tokenType:"attrEnd",args:["(click)"]},{tokenType:"end",args:["a",!1]},{tokenType:"chars",args:["Place another order"]},{tokenType:"close",args:["a"]},{tokenType:"close",args:["p"]},{tokenType:"chars",args:["        "]},{tokenType:"special",args:["else"]},{tokenType:"chars",args:["\n          "]},{tokenType:"start",args:["h3",!1]},{tokenType:"end",args:["h3",!1]},{tokenType:"chars",args:["Order from "]},{tokenType:"special",args:["name"]},{tokenType:"close",args:["h3"]},{tokenType:"chars",args:["\n\n          "]},{tokenType:"start",args:["form",!1]},{tokenType:"attrStart",args:["(submit)"]},{tokenType:"attrValue",args:["{placeOrder}"]},{tokenType:"attrEnd",args:["(submit)"]},{tokenType:"end",args:["form",!1]},{tokenType:"chars",args:["\n            "]},{tokenType:"start",args:["bit-tabs",!1]},{tokenType:"attrStart",args:["tabs-class"]},{tokenType:"attrValue",args:["nav nav-tabs"]},{tokenType:"attrEnd",args:["tabs-class"]},{tokenType:"end",args:["bit-tabs",!1]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["p",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["info "]},{tokenType:"special",args:["^if order.items.length"]},{tokenType:"attrValue",args:["text-error"]},{tokenType:"special",args:["else"]},{tokenType:"attrValue",args:["text-success"]},{tokenType:"special",args:["/if"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["p",!1]},{tokenType:"special",args:["^if order.items.length"]},{tokenType:"chars",args:["\n                  Please choose an item                "]},{tokenType:"special",args:["else"]},{tokenType:"chars",args:["\n                  "]},{tokenType:"special",args:["order.items.length"]},{tokenType:"chars",args:[" selected"]},{tokenType:"special",args:["/if"]},{tokenType:"chars",args:["\n              "]},{tokenType:"close",args:["p"]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["bit-panel",!1]},{tokenType:"attrStart",args:["title"]},{tokenType:"attrValue",args:["Lunch menu"]},{tokenType:"attrEnd",args:["title"]},{tokenType:"end",args:["bit-panel",!1]},{tokenType:"chars",args:["\n                "]},{tokenType:"start",args:["ul",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["list-group"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["ul",!1]},{tokenType:"special",args:["#each menu.lunch"]},{tokenType:"chars",args:["\n                    "]},{tokenType:"start",args:["li",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["list-group-item"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["li",!1]},{tokenType:"chars",args:["\n                      "]},{tokenType:"start",args:["label",!1]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["\n                        "]},{tokenType:"start",args:["input",!0]},{tokenType:"attrStart",args:["type"]},{tokenType:"attrValue",args:["checkbox"]},{tokenType:"attrEnd",args:["type"]},{tokenType:"attrStart",args:["(change)"]},{tokenType:"attrValue",args:["{order.items.toggle this}"]},{tokenType:"attrEnd",args:["(change)"]},{tokenType:"special",args:["#if order.items.has"]},{tokenType:"attrStart",args:["checked"]},{tokenType:"attrValue",args:["checked"]},{tokenType:"attrEnd",args:["checked"]},{tokenType:"special",args:["/if"]},{tokenType:"end",args:["input",!0]},{tokenType:"chars",args:["\n                        "]},{tokenType:"special",args:["name"]},{tokenType:"chars",args:[" "]},{tokenType:"start",args:["span",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["badge"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["span",!1]},{tokenType:"chars",args:["$"]},{tokenType:"special",args:["price"]},{tokenType:"close",args:["span"]},{tokenType:"chars",args:["\n                      "]},{tokenType:"close",args:["label"]},{tokenType:"chars",args:["\n                    "]},{tokenType:"close",args:["li"]},{tokenType:"special",args:["/each"]},{tokenType:"chars",args:["\n                "]},{tokenType:"close",args:["ul"]},{tokenType:"chars",args:["\n              "]},{tokenType:"close",args:["bit-panel"]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["bit-panel",!1]},{tokenType:"attrStart",args:["title"]},{tokenType:"attrValue",args:["Dinner menu"]},{tokenType:"attrEnd",args:["title"]},{tokenType:"end",args:["bit-panel",!1]},{tokenType:"chars",args:["\n                "]},{tokenType:"start",args:["ul",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["list-group"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["ul",!1]},{tokenType:"special",args:["#each menu.dinner"]},{tokenType:"chars",args:["\n                    "]},{tokenType:"start",args:["li",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["list-group-item"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["li",!1]},{tokenType:"chars",args:["\n                      "]},{tokenType:"start",args:["label",!1]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["\n                        "]},{tokenType:"start",args:["input",!0]},{tokenType:"attrStart",args:["type"]},{tokenType:"attrValue",args:["checkbox"]},{tokenType:"attrEnd",args:["type"]},{tokenType:"attrStart",args:["(change)"]},{tokenType:"attrValue",args:["{order.items.toggle this}"]},{tokenType:"attrEnd",args:["(change)"]},{tokenType:"special",args:["#if order.items.has"]},{tokenType:"attrStart",args:["checked"]},{tokenType:"attrValue",args:["checked"]},{tokenType:"attrEnd",args:["checked"]},{tokenType:"special",args:["/if"]},{tokenType:"end",args:["input",!0]},{tokenType:"chars",args:["\n                        "]},{tokenType:"special",args:["name"]},{tokenType:"chars",args:[" "]},{tokenType:"start",args:["span",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["badge"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["span",!1]},{tokenType:"chars",args:["$"]},{tokenType:"special",args:["price"]},{tokenType:"close",args:["span"]},{tokenType:"chars",args:["\n                      "]},{tokenType:"close",args:["label"]},{tokenType:"chars",args:["\n                    "]},{tokenType:"close",args:["li"]},{tokenType:"special",args:["/each"]},{tokenType:"chars",args:["\n                "]},{tokenType:"close",args:["ul"]},{tokenType:"chars",args:["\n              "]},{tokenType:"close",args:["bit-panel"]},{tokenType:"chars",args:["\n            "]},{tokenType:"close",args:["bit-tabs"]},{tokenType:"chars",args:["\n\n            "]},{tokenType:"start",args:["div",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["form-group"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["div",!1]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["label",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["control-label"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["Name:"]},{tokenType:"close",args:["label"]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["input",!0]},{tokenType:"attrStart",args:["name"]},{tokenType:"attrValue",args:["name"]},{tokenType:"attrEnd",args:["name"]},{tokenType:"attrStart",args:["type"]},{tokenType:"attrValue",args:["text"]},{tokenType:"attrEnd",args:["type"]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["form-control"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"attrStart",args:["can-value"]},{tokenType:"attrValue",args:["{order.name}"]},{tokenType:"attrEnd",args:["can-value"]},{tokenType:"end",args:["input",!0]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["p",!1]},{tokenType:"end",args:["p",!1]},{tokenType:"chars",args:["Please enter your name."]},{tokenType:"close",args:["p"]},{tokenType:"chars",args:["\n            "]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["\n            "]},{tokenType:"start",args:["div",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["form-group"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["div",!1]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["label",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["control-label"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["Address:"]},{tokenType:"close",args:["label"]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["input",!0]},{tokenType:"attrStart",args:["name"]},{tokenType:"attrValue",args:["address"]},{tokenType:"attrEnd",args:["name"]},{tokenType:"attrStart",args:["type"]},{tokenType:"attrValue",args:["text"]},{tokenType:"attrEnd",args:["type"]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["form-control"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"attrStart",args:["can-value"]},{tokenType:"attrValue",args:["{order.address}"]},{tokenType:"attrEnd",args:["can-value"]},{tokenType:"end",args:["input",!0]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["p",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["help-text"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["p",!1]},{tokenType:"chars",args:["Please enter your address."]},{tokenType:"close",args:["p"]},{tokenType:"chars",args:["\n            "]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["\n            "]},{tokenType:"start",args:["div",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["form-group"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["div",!1]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["label",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["control-label"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["label",!1]},{tokenType:"chars",args:["Phone:"]},{tokenType:"close",args:["label"]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["input",!0]},{tokenType:"attrStart",args:["name"]},{tokenType:"attrValue",args:["phone"]},{tokenType:"attrEnd",args:["name"]},{tokenType:"attrStart",args:["type"]},{tokenType:"attrValue",args:["text"]},{tokenType:"attrEnd",args:["type"]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["form-control"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"attrStart",args:["can-value"]},{tokenType:"attrValue",args:["{order.phone}"]},{tokenType:"attrEnd",args:["can-value"]},{tokenType:"end",args:["input",!0]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["p",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["help-text"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["p",!1]},{tokenType:"chars",args:["Please enter your phone number."]},{tokenType:"close",args:["p"]},{tokenType:"chars",args:["\n            "]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["\n            "]},{tokenType:"start",args:["div",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["submit"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["div",!1]},{tokenType:"chars",args:["\n              "]},{tokenType:"start",args:["h4",!1]},{tokenType:"end",args:["h4",!1]},{tokenType:"chars",args:["Total: $"]},{tokenType:"special",args:["order.total"]},{tokenType:"close",args:["h4"]},{tokenType:"special",args:["#if saveStatus.isPending"]},{tokenType:"chars",args:["\n                "]},{tokenType:"start",args:["div",!1]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["loading"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["div",!1]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["              "]},{tokenType:"special",args:["else"]},{tokenType:"chars",args:["\n                "]},{tokenType:"start",args:["button",!1]},{tokenType:"attrStart",args:["type"]},{tokenType:"attrValue",args:["submit"]},{tokenType:"attrEnd",args:["type"]},{tokenType:"special",args:["^if canPlaceOrder"]},{tokenType:"attrStart",args:["disabled"]},{tokenType:"attrValue",args:["disabled"]},{tokenType:"attrEnd",args:["disabled"]},{tokenType:"special",args:["/if"]},{tokenType:"attrStart",args:["class"]},{tokenType:"attrValue",args:["btn"]},{tokenType:"attrEnd",args:["class"]},{tokenType:"end",args:["button",!1]},{tokenType:"chars",args:["Place My Order!"]},{tokenType:"close",args:["button"]},{tokenType:"special",args:["/if"]},{tokenType:"chars",args:["\n            "]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["\n          "]},{tokenType:"close",args:["form"]},{tokenType:"special",args:["/if"]},{tokenType:"chars",args:["\n      "]},{tokenType:"special",args:["/value"]},{tokenType:"special",args:["/if"]},{tokenType:"chars",args:["\n  "]},{tokenType:"close",args:["restaurant-model"]},{tokenType:"chars",args:["\n"]},{tokenType:"close",args:["div"]},{tokenType:"chars",args:["\n"]},{tokenType:"done",args:[]}]);return function(t,r){var s={module:e};return a(t,r?r.add(s):s)}});
/*dguide@0.0.0#order/new/new*/
define("dguide@0.0.0#order/new/new",["exports","can/component/component","can/map/","can/map/define/","./new.stache!","dguide/models/restaurant","dguide/models/order"],function(e,t,r,a,n,d,s){"use strict";var u=function(e){return e&&e.__esModule?e["default"]:e},o=u(t),i=u(r),l=u(n),c=(u(d),u(s)),f=e.ViewModel=i.extend({define:{slug:{type:"string"},order:{Value:c},saveStatus:{Value:Object},canPlaceOrder:{get:function(){var e=this.attr("order.items");return e.attr("length")}}},placeOrder:function(){var e=this.attr("order");return e.attr("restaurant",this.attr("restaurant._id")),this.attr("saveStatus",e.save()),!1},startNewOrder:function(){return this.attr("order",new c),this.attr("saveStatus",null),!1}});e["default"]=o.extend({tag:"pmo-order-new",viewModel:f,template:l}),Object.defineProperty(e,"__esModule",{value:!0})});
/*done-css@1.1.5#css*/
define("done-css@1.1.5#css",function(e,t,n){function r(e){var t="undefined"!=typeof jQuery?jQuery:document.querySelectorAll.bind(document),n=t("[asset-id='"+e.name+"']");return n&&n[0]}var d=e("@loader"),a=d.has("asset-register")?d.get("asset-register")["default"]:function(){},o="object"==typeof process&&"[object process]"==={}.toString.call(process),s=function(){try{return"undefined"!==d._nodeRequire("nw.gui")}catch(e){return!1}}(),c=d.envMap&&d.envMap.production||"production"===d.env;c?t.fetch=function(e){var t,n=e.address;if(o&&!s){var c=d._nodeRequire("path");n=c.relative(d.baseURL,n);var u="/"+n;if(d.renderingLoader){var i=d.renderingLoader.baseURL;0===i.indexOf("http")&&(u=i+n.replace("dist/",""))}t=document.createElement("link"),t.setAttribute("rel","stylesheet"),t.setAttribute("href",u),a(e.name,"css",function(){return t.cloneNode(!0)})}else"undefined"!=typeof document&&(t=r(e),t||(t=document.createElement("link"),t.rel="stylesheet",t.href=n,document.head.appendChild(t)));return""}:t.instantiate=function(e){var t=this;e.metadata.deps=[],e.metadata.execute=function(){var n=e.source+"/*# sourceURL="+e.address+" */";if(n=n.replace(/url\(['"]?([^'"\)]*)['"]?\)/g,function(t,n){return"url("+steal.joinURIs(e.address,n)+")"}),e.source&&"undefined"!=typeof document){var d=document.head?document:document.getElementsByTagName?document:document.documentElement,o=d.head||d.getElementsByTagName("head")[0];if(!o){var s=d.documentElement||d;o=document.createElement("head"),s.insertBefore(o,s.firstChild)}var c=r(e);if(c||(c=document.createElement("style"),c.type="text/css",c.styleSheet?c.styleSheet.cssText=n:c.appendChild(document.createTextNode(n)),o.appendChild(c)),t.has("live-reload")){var u=t["import"]("live-reload",{name:"$css"});Promise.resolve(u).then(function(n){t["import"](e.name).then(function(){n.once(e.name,function(){o.removeChild(c)})})})}a(e.name,"css",function(){return c.cloneNode(!0)})}return System.newModule({source:n})},e.metadata.format="css"},t.buildType="css",t.includeInBuild=!0});
/*less*/
define('less', [], function(){ return {}; });
/*$less*/
define('$less', [], function(){ return {}; });