function gatherHeaders(){var t,e,i;t=$("h1, h2, h3"),t.each(function(){i=$(this),e=i.html(),i.html(addSpan(e))})}function addSpan(t){return t.replace(/GET/,'<span class="get">GET</span>').replace(/PUT/,'<span class="put">PUT</span>').replace(/POST/,'<span class="post">POST</span>').replace(/DELETE/,'<span class="delete">DELETE</span>')}!function(){if("ontouchstart"in window){var t,e,i,n,s,r,o={};t=function(t,e){return Math.abs(t[0]-e[0])>5||Math.abs(t[1]-e[1])>5},e=function(t){this.startXY=[t.touches[0].clientX,t.touches[0].clientY],this.threshold=!1},i=function(e){return this.threshold?!1:void(this.threshold=t(this.startXY,[e.touches[0].clientX,e.touches[0].clientY]))},n=function(e){if(!this.threshold&&!t(this.startXY,[e.changedTouches[0].clientX,e.changedTouches[0].clientY])){var i=e.changedTouches[0],n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),n.simulated=!0,e.target.dispatchEvent(n)}},s=function(t){var e=Date.now(),i=e-o.time,n=t.clientX,s=t.clientY,a=[Math.abs(o.x-n),Math.abs(o.y-s)],h=r(t.target,"A")||t.target,l=h.nodeName,c="A"===l,u=window.navigator.standalone&&c&&t.target.getAttribute("href");return o.time=e,o.x=n,o.y=s,(!t.simulated&&(500>i||1500>i&&a[0]<50&&a[1]<50)||u)&&(t.preventDefault(),t.stopPropagation(),!u)?!1:(u&&(window.location=h.getAttribute("href")),void(h&&h.classList&&(h.classList.add("energize-focus"),window.setTimeout(function(){h.classList.remove("energize-focus")},150))))},r=function(t,e){for(var i=t;i!==document.body;){if(!i||i.nodeName===e)return i;i=i.parentNode}return null},document.addEventListener("touchstart",e,!1),document.addEventListener("touchmove",i,!1),document.addEventListener("touchend",n,!1),document.addEventListener("click",s,!0)}}(),/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
function(t){"use strict";function e(e){if(e&&""!==e){$(".lang-selector a").not("#codeToggle").removeClass("active"),$(".lang-selector a[data-language-name='"+e+"']").not("#codeToggle").addClass("active");for(var i=0;i<h.length;i++)$(".highlight."+h[i]).hide();$(".highlight."+e).show(),t.toc.calculateHeights(),$(window.location.hash).get(0)&&$(window.location.hash).get(0).scrollIntoView(!0)}}function i(t){return"string"!=typeof t?{}:(t=t.trim().replace(/^(\?|#|&)/,""),t?t.split("&").reduce(function(t,e){var i=e.replace(/\+/g," ").split("="),n=i[0],s=i[1];return n=decodeURIComponent(n),s=void 0===s?null:decodeURIComponent(s),t.hasOwnProperty(n)?Array.isArray(t[n])?t[n].push(s):t[n]=[t[n],s]:t[n]=s,t},{}):{})}function n(t){return t?Object.keys(t).sort().map(function(e){var i=t[e];return Array.isArray(i)?i.sort().map(function(t){return encodeURIComponent(e)+"="+encodeURIComponent(t)}).join("&"):encodeURIComponent(e)+"="+encodeURIComponent(i)}).join("&"):""}function s(){if(location.search.length>=1){var t=i(location.search).language;if(t)return t;if(-1!=jQuery.inArray(location.search.substr(1),h))return location.search.substr(1)}return!1}function r(t){var e=i(location.search);return e.language?(e.language=t,n(e)):t}function o(t){if(history){var e=window.location.hash;e&&(e=e.replace(/^#+/,"")),history.pushState({},"","?"+r(t)+"#"+e),localStorage.setItem("language",t)}}function a(t){var i=localStorage.getItem("language");h=t;var n=s();n?(e(n),localStorage.setItem("language",n)):e(null!==i&&-1!=jQuery.inArray(i,h)?i:h[0])}var h=[];t.setupLanguages=a,t.activateLanguage=e,$(function(){$(".lang-selector a").not("#codeToggle").on("click",function(){var t=$(this).data("language-name");return o(t),e(t),!1}),$("#codeToggle").click(function(t){t.preventDefault(),$("#fouc").toggleClass("wide")}),window.onpopstate=function(){e(s())}})}(window),/*! jQuery UI - v1.11.3 - 2015-02-12
 * http://jqueryui.com
 * Includes: widget.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){/*!
   * jQuery UI Widget 1.11.3
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/jQuery.widget/
   */
var e=0,i=Array.prototype.slice;t.cleanData=function(e){return function(i){var n,s,r;for(r=0;null!=(s=i[r]);r++)try{n=t._data(s,"events"),n&&n.remove&&t(s).triggerHandler("remove")}catch(o){}e(i)}}(t.cleanData),t.widget=function(e,i,n){var s,r,o,a,h={},l=e.split(".")[0];return e=e.split(".")[1],s=l+"-"+e,n||(n=i,i=t.Widget),t.expr[":"][s.toLowerCase()]=function(e){return!!t.data(e,s)},t[l]=t[l]||{},r=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?void(arguments.length&&this._createWidget(t,e)):new o(t,e)},t.extend(o,r,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(n,function(e,n){return t.isFunction(n)?void(h[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},s=function(t){return i.prototype[e].apply(this,t)};return function(){var e,i=this._super,r=this._superApply;return this._super=t,this._superApply=s,e=n.apply(this,arguments),this._super=i,this._superApply=r,e}}()):void(h[e]=n)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:r?a.widgetEventPrefix||e:e},h,{constructor:o,namespace:l,widgetName:e,widgetFullName:s}),r?(t.each(r._childConstructors,function(e,i){var n=i.prototype;t.widget(n.namespace+"."+n.widgetName,o,i._proto)}),delete r._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var n,s,r=i.call(arguments,1),o=0,a=r.length;a>o;o++)for(n in r[o])s=r[o][n],r[o].hasOwnProperty(n)&&void 0!==s&&(t.isPlainObject(s)?e[n]=t.isPlainObject(e[n])?t.widget.extend({},e[n],s):t.widget.extend({},s):e[n]=s);return e},t.widget.bridge=function(e,n){var s=n.prototype.widgetFullName||e;t.fn[e]=function(r){var o="string"==typeof r,a=i.call(arguments,1),h=this;return o?this.each(function(){var i,n=t.data(this,s);return"instance"===r?(h=n,!1):n?t.isFunction(n[r])&&"_"!==r.charAt(0)?(i=n[r].apply(n,a),i!==n&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+r+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+r+"'")}):(a.length&&(r=t.widget.extend.apply(null,[r].concat(a))),this.each(function(){var e=t.data(this,s);e?(e.option(r||{}),e._init&&e._init()):t.data(this,s,new n(r,this))})),h}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(i,n){n=t(n||this.defaultElement||this)[0],this.element=t(n),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),n!==this&&(t.data(n,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===n&&this.destroy()}}),this.document=t(n.style?n.ownerDocument:n.document||n),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var n,s,r,o=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(o={},n=e.split("."),e=n.shift(),n.length){for(s=o[e]=t.widget.extend({},this.options[e]),r=0;r<n.length-1;r++)s[n[r]]=s[n[r]]||{},s=s[n[r]];if(e=n.pop(),1===arguments.length)return void 0===s[e]?null:s[e];s[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];o[e]=i}return this._setOptions(o),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!e),e&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(e,i,n){var s,r=this;"boolean"!=typeof e&&(n=i,i=e,e=!1),n?(i=s=t(i),this.bindings=this.bindings.add(i)):(n=i,i=this.element,s=this.widget()),t.each(n,function(n,o){function a(){return e||r.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):void 0}"string"!=typeof o&&(a.guid=o.guid=o.guid||a.guid||t.guid++);var h=n.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+r.eventNamespace,c=h[2];c?s.delegate(c,l,a):i.bind(l,a)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(i).undelegate(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?n[t]:t).apply(n,arguments)}var n=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,n){var s,r,o=this.options[e];if(n=n||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],r=i.originalEvent)for(s in r)s in i||(i[s]=r[s]);return this.element.trigger(i,n),!(t.isFunction(o)&&o.apply(this.element[0],[i].concat(n))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(n,s,r){"string"==typeof s&&(s={effect:s});var o,a=s?s===!0||"number"==typeof s?i:s.effect||i:e;s=s||{},"number"==typeof s&&(s={duration:s}),o=!t.isEmptyObject(s),s.complete=r,s.delay&&n.delay(s.delay),o&&t.effects&&t.effects.effect[a]?n[e](s):a!==e&&n[a]?n[a](s.duration,s.easing,r):n.queue(function(i){t(this)[e](),r&&r.call(n[0]),i()})}});t.widget}),/* jquery Tocify - v1.8.0 - 2013-09-16
* http://www.gregfranko.com/jquery.tocify.js/
* Copyright (c) 2013 Greg Franko; Licensed MIT
* Modified lightly by Robert Lord to fix a bug I found,
* and also so it adds ids to headers
* also because I want height caching, since the
* height lookup for h1s and h2s was causing serious
* lag spikes below 30 fps */
function(t){"use strict";t(window.jQuery,window,document)}(function(t,e,i,n){"use strict";var s="tocify",r="tocify-focus",o="tocify-hover",a="tocify-hide",h="tocify-header",l="."+h,c="tocify-subheader",u="."+c,p="tocify-item",d="."+p,f="tocify-extend-page",g="."+f;t.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",headerLevels:{h1:1,h2:2,h3:3,h4:4,h5:5,h6:6},showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var i=this;i.tocifyWrapper=t(".tocify-wrapper"),i.extendPageScroll=!0,i.items=[],i._generateToc(),i.cachedHeights=[],i.cachedAnchors=[],i._addCSSClasses(),i.webkit=function(){for(var t in e)if(t&&-1!==t.toLowerCase().indexOf("webkit"))return!0;return!1}(),i._setEventHandlers(),t(e).load(function(){i._setActiveElement(!0),t("html, body").promise().done(function(){setTimeout(function(){i.extendPageScroll=!1},0)})})},_generateToc:function(){var e,i,n=this,r=n.options.ignoreSelector;return e=-1!==this.options.selectors.indexOf(",")?t(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(","))):t(this.options.context).find(this.options.selectors.replace(/ /g,"")),e.length?(n.element.addClass(s),void e.each(function(e){t(this).is(r)||(i=t("<ul/>",{id:h+e,"class":h}).append(n._nestElements(t(this),e)),n.element.append(i),t(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===t(this).find(n.options.selectors).length?t(this).filter(n.options.selectors).each(function(){t(this).is(r)||n._appendSubheaders.call(this,n,i)}):t(this).find(n.options.selectors).each(function(){t(this).is(r)||n._appendSubheaders.call(this,n,i)})}))})):void n.element.addClass(a)},_setActiveElement:function(t){var i=this,n=e.location.hash.substring(1),s=i.element.find("li[data-unique='"+n+"']");return n.length?(i.element.find("."+i.focusClass).removeClass(i.focusClass),s.addClass(i.focusClass),i.options.showAndHide&&s.click()):(i.element.find("."+i.focusClass).removeClass(i.focusClass),!n.length&&t&&i.options.highlightDefault&&i.element.find(d).first().addClass(i.focusClass)),i},_nestElements:function(e,i){function n(t){return t.replace(/GET/,'<span class="http-get">GET</span>').replace(/POST/,'<span class="http-post">POST</span>').replace(/PUT/,'<span class="http-put">PUT</span>').replace(/DELETE/,'<span class="http-delete">DELETE</span>')}var s,r,o,a,h;a=e.eq(0),h=+a.prop("tagName").charAt(1),s=t.grep(this.items,function(t){return t===e.text()}),s.length?this.items.push(e.text()+i):this.items.push(e.text()),o=this._generateHashValue(s,e,i);var l="<a>"+n(e.text())+"</a>";return r=1===h?t("<li/>",{"class":p+" main-header","data-unique":o}).append(l):t("<li/>",{"class":p,"data-unique":o}).append(l),e.before(t("<div/>",{name:o,"data-unique":o})),r},_generateHashValue:function(t,e,i){var n="",s=this.options.hashGenerator;if("pretty"===s){for(n=e.text().toLowerCase().replace(/\s/g,"-"),n=n.replace(/[^\x00-\x7F]/g,"");n.indexOf("--")>-1;)n=n.replace(/--/g,"-");for(;n.indexOf(":-")>-1;)n=n.replace(/:-/g,"-")}else n="function"==typeof s?s(e.text(),e):e.text().replace(/\s/g,"");return t.length&&(n+=""+i),n},_appendSubheaders:function(e,i){var n=t(this).index(e.options.selectors),s=t(e.options.selectors).eq(n-1),r=s.prop("tagName").toLowerCase(),o=+r.charAt(1),a=t(this).prop("tagName").toLowerCase(),h=+a.charAt(1),p=e.options.headerLevels,f=p[a]===p[r],g=o>h;g?e.element.find(l).last().append(e._nestElements(t(this),n)):f?i.find(d).last().after(e._nestElements(t(this),n)):i.find(d).last().after(t("<ul/>",{"class":c,"data-tag":h})).next(u).append(e._nestElements(t(this),n))},_setEventHandlers:function(){var s=this;this.element.on("click.tocify","li",function(i){if(s.options.history&&(e.location.hash=t(this).attr("data-unique")),s.element.find("."+s.focusClass).removeClass(s.focusClass),t(this).addClass(s.focusClass),s.options.showAndHide){var n=t('li[data-unique="'+t(this).attr("data-unique")+'"]');s._triggerShow(n)}s._scrollTo(t(this))}),this.element.find("li").on({"mouseenter.tocify":function(){t(this).addClass(s.hoverClass),t(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==s.options.theme&&t(this).removeClass(s.hoverClass)}}),t(e).on("resize",function(){s.calculateHeights()}),t(e).on("scroll.tocify",function(){t("html, body").promise().done(function(){var r,o,a,h,l=t(e).scrollTop(),c=t(e).height(),u=t(i).height(),p=t("body")[0].scrollHeight;if(s.options.extendPage&&(s.webkit&&l>=p-c-s.options.extendPageOffset||!s.webkit&&c+l>u-s.options.extendPageOffset)&&!t(g).length){if(o=t('div[data-unique="'+t(d).last().attr("data-unique")+'"]'),!o.length)return;a=o.offset().top,t(s.options.context).append(t("<div />",{"class":f,height:Math.abs(a-l)+"px","data-unique":f})),s.extendPageScroll&&(h=s.element.find("li.active"),s._scrollTo(t("div[data-unique="+h.attr("data-unique")+"]")))}setTimeout(function(){var o,a=null;0==s.cachedHeights.length&&s.calculateHeights();var h=t(e).scrollTop();if(s.cachedAnchors.each(function(t){return s.cachedHeights[t]-h<0?void(a=t):!1}),o=t(s.cachedAnchors[a]).attr("data-unique"),r=t('li[data-unique="'+o+'"]'),s.options.highlightOnScroll&&r.length&&!r.hasClass(s.focusClass)){s.element.find("."+s.focusClass).removeClass(s.focusClass),r.addClass(s.focusClass);var l=s.tocifyWrapper,c=t(r).closest(".tocify-header"),u=c.offset().top,p=l.offset().top,d=u-p;if(d>=t(e).height()){var f=d+l.scrollTop();l.scrollTop(f)}else 0>d&&l.scrollTop(0)}s.options.scrollHistory&&e.location.hash!=="#"+o&&o!==n&&(history.replaceState?history.replaceState({},"","#"+o):(scrollV=i.body.scrollTop,scrollH=i.body.scrollLeft,location.hash="#"+o,i.body.scrollTop=scrollV,i.body.scrollLeft=scrollH)),s.options.showAndHideOnScroll&&s.options.showAndHide&&s._triggerShow(r,!0)},0)})})},calculateHeights:function(){var e=this;e.cachedHeights=[],e.cachedAnchors=[];var i=t(e.options.context).find("div[data-unique]");i.each(function(i){var n=(t(this).next().length?t(this).next():t(this)).offset().top-e.options.highlightOffset;e.cachedHeights[i]=n}),e.cachedAnchors=i},show:function(e,i){var n=this;if(!e.is(":visible"))switch(e.find(u).length||e.parent().is(l)||e.parent().is(":visible")?e.children(u).length||e.parent().is(l)||(e=e.closest(u)):e=e.parents(u).add(e),n.options.showEffect){case"none":e.show();break;case"show":e.show(n.options.showEffectSpeed);break;case"slideDown":e.slideDown(n.options.showEffectSpeed);break;case"fadeIn":e.fadeIn(n.options.showEffectSpeed);break;default:e.show()}return e.parent().is(l)?n.hide(t(u).not(e)):n.hide(t(u).not(e.closest(l).find(u).not(e.siblings()))),n},hide:function(t){var e=this;switch(e.options.hideEffect){case"none":t.hide();break;case"hide":t.hide(e.options.hideEffectSpeed);break;case"slideUp":t.slideUp(e.options.hideEffectSpeed);break;case"fadeOut":t.fadeOut(e.options.hideEffectSpeed);break;default:t.hide()}return e},_triggerShow:function(t,e){var i=this;return t.parent().is(l)||t.next().is(u)?i.show(t.next(u),e):t.parent().is(u)&&i.show(t.parent(),e),i},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(l+","+u).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass=r,this.hoverClass=o),this},setOption:function(){t.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){t.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(e){var i=this,n=i.options.smoothScroll||0,s=i.options.scrollTo;return t("html, body").promise().done(function(){t("html, body").animate({scrollTop:t('div[data-unique="'+e.attr("data-unique")+'"]').next().offset().top-(t.isFunction(s)?s.call():s)+"px"},{duration:n})}),i}})}),/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var n=t.prototype,s=this,r=s.EventEmitter;n.getListeners=function(t){var e,i,n=this._getEvents();if("object"==typeof t){e={};for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])}else e=n[t]||(n[t]=[]);return e},n.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},n.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},n.addListener=function(t,i){var n,s=this.getListenersAsObject(t),r="object"==typeof i;for(n in s)s.hasOwnProperty(n)&&-1===e(s[n],i)&&s[n].push(r?i:{listener:i,once:!1});return this},n.on=i("addListener"),n.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},n.once=i("addOnceListener"),n.defineEvent=function(t){return this.getListeners(t),this},n.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},n.removeListener=function(t,i){var n,s,r=this.getListenersAsObject(t);for(s in r)r.hasOwnProperty(s)&&(n=e(r[s],i),-1!==n&&r[s].splice(n,1));return this},n.off=i("removeListener"),n.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},n.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},n.manipulateListeners=function(t,e,i){var n,s,r=t?this.removeListener:this.addListener,o=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)r.call(this,e,i[n]);else for(n in e)e.hasOwnProperty(n)&&(s=e[n])&&("function"==typeof s?r.call(this,n,s):o.call(this,n,s));return this},n.removeEvent=function(t){var e,i=typeof t,n=this._getEvents();if("string"===i)delete n[t];else if("object"===i)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},n.removeAllListeners=i("removeEvent"),n.emitEvent=function(t,e){var i,n,s,r,o=this.getListenersAsObject(t);for(s in o)if(o.hasOwnProperty(s))for(n=o[s].length;n--;)i=o[s][n],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},n.trigger=i("emitEvent"),n.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},n.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return s.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,n=function(){};i.addEventListener?n=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(n=function(t,i,n){t[i+n]=n.handleEvent?function(){var i=e(t);n.handleEvent.call(n,i)}:function(){var i=e(t);n.call(t,i)},t.attachEvent("on"+i,t[i+n])});var s=function(){};i.removeEventListener?s=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(s=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(n){t[e+i]=void 0}});var r={bind:n,unbind:s};"function"==typeof define&&define.amd?define("eventie/eventie",r):t.eventie=r}(this),function(t,e){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(i,n){return e(t,i,n)}):"object"==typeof exports?module.exports=e(t,require("wolfy87-eventemitter"),require("eventie")):t.imagesLoaded=e(t,t.EventEmitter,t.eventie)}(window,function(t,e,i){function n(t,e){for(var i in e)t[i]=e[i];return t}function s(t){return"[object Array]"===p.call(t)}function r(t){var e=[];if(s(t))e=t;else if("number"==typeof t.length)for(var i=0,n=t.length;n>i;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,i){if(!(this instanceof o))return new o(t,e);"string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=r(t),this.options=n({},this.options),"function"==typeof e?i=e:n(this.options,e),i&&this.on("always",i),this.getImages(),l&&(this.jqDeferred=new l.Deferred);var s=this;setTimeout(function(){s.check()})}function a(t){this.img=t}function h(t){this.src=t,d[t]=this}var l=t.jQuery,c=t.console,u=void 0!==c,p=Object.prototype.toString;o.prototype=new e,o.prototype.options={},o.prototype.getImages=function(){this.images=[];for(var t=0,e=this.elements.length;e>t;t++){var i=this.elements[t];"IMG"===i.nodeName&&this.addImage(i);var n=i.nodeType;if(n&&(1===n||9===n||11===n))for(var s=i.querySelectorAll("img"),r=0,o=s.length;o>r;r++){var a=s[r];this.addImage(a)}}},o.prototype.addImage=function(t){var e=new a(t);this.images.push(e)},o.prototype.check=function(){function t(t,s){return e.options.debug&&u&&c.log("confirm",t,s),e.progress(t),i++,i===n&&e.complete(),!0}var e=this,i=0,n=this.images.length;if(this.hasAnyBroken=!1,!n)return void this.complete();for(var s=0;n>s;s++){var r=this.images[s];r.on("confirm",t),r.check()}},o.prototype.progress=function(t){this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded;var e=this;setTimeout(function(){e.emit("progress",e,t),e.jqDeferred&&e.jqDeferred.notify&&e.jqDeferred.notify(e,t)})},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var e=this;setTimeout(function(){if(e.emit(t,e),e.emit("always",e),e.jqDeferred){var i=e.hasAnyBroken?"reject":"resolve";e.jqDeferred[i](e)}})},l&&(l.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(l(this))}),a.prototype=new e,a.prototype.check=function(){var t=d[this.img.src]||new h(this.img.src);if(t.isConfirmed)return void this.confirm(t.isLoaded,"cached was confirmed");if(this.img.complete&&void 0!==this.img.naturalWidth)return void this.confirm(0!==this.img.naturalWidth,"naturalWidth");var e=this;t.on("confirm",function(t,i){return e.confirm(t.isLoaded,i),!0}),t.check()},a.prototype.confirm=function(t,e){this.isLoaded=t,this.emit("confirm",this,e)};var d={};return h.prototype=new e,h.prototype.check=function(){if(!this.isChecked){var t=new Image;i.bind(t,"load",this),i.bind(t,"error",this),t.src=this.src,this.isChecked=!0}},h.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},h.prototype.onload=function(t){this.confirm(!0,"onload"),this.unbindProxyEvents(t)},h.prototype.onerror=function(t){this.confirm(!1,"onerror"),this.unbindProxyEvents(t)},h.prototype.confirm=function(t,e){this.isConfirmed=!0,this.isLoaded=t,this.emit("confirm",this,e)},h.prototype.unbindProxyEvents=function(t){i.unbind(t.target,"load",this),i.unbind(t.target,"error",this)},o}),function(t){"use strict";function e(){setTimeout(function(){toc.setOption("showEffectSpeed",180)},50)}var i=function(){$(".tocify-wrapper").removeClass("open"),$("#nav-button").removeClass("open")},n=function(){t.toc=$("#toc").tocify({selectors:"h1, h2, h3",headerLevels:{h1:1,h2:1,h3:2},extendPage:!1,theme:"none",smoothScroll:!1,showEffectSpeed:0,hideEffectSpeed:180,ignoreSelector:".toc-ignore",highlightOffset:60,scrollTo:-1,scrollHistory:!0,hashGenerator:function(t,e){return e.prop("id")}}).data("toc-tocify"),$("#nav-button").click(function(){return $(".tocify-wrapper").toggleClass("open"),$("#nav-button").toggleClass("open"),!1}),$(".page-wrapper").click(i),$(".tocify-item").click(i)};$(function(){n(),e(),$(".content").imagesLoaded(function(){t.toc.calculateHeights()})})}(window),$(gatherHeaders);