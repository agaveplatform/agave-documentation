/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*! autotrack.js v1.0.1 */
!function t(e,i,n){function s(r,a){if(!i[r]){if(!e[r]){var c="function"==typeof require&&require;if(!a&&c)return c(r,!0);if(o)return o(r,!0);var h=new Error("Cannot find module '"+r+"'");throw h.code="MODULE_NOT_FOUND",h}var l=i[r]={exports:{}};e[r][0].call(l.exports,function(t){var i=e[r][1][t];return s(i?i:t)},l,l.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r]);return s}({1:[function(t,e){e.exports={VERSION:"1.0.0",DEV_ID:"i5iSjo",VERSION_PARAM:"&_av",USAGE_PARAM:"&_au",NULL_DIMENSION:"(not set)"}},{}],2:[function(t){function e(){console.error("Requiring the `autotrack` plugin no longer requires all sub-plugins be default. See https://goo.gl/sZ2WrW for details.")}var i=t("../provide");i("autotrack",e)},{"../provide":12}],3:[function(t){function e(t,e){r.track(t,r.plugins.CLEAN_URL_TRACKER),this.opts=i({stripQuery:!1,queryDimensionIndex:null,indexFilename:null,trailingSlash:null},e),this.tracker=t,this.overrideTrackerBuildHitTask()}var i=t("object-assign"),n=t("dom-utils/lib/parse-url"),s=t("../constants"),o=t("../provide"),r=t("../usage");e.prototype.cleanUrlTask=function(t){var e=t.get("location"),i=t.get("page"),o=n(i||e),r=o.pathname,a=r;if(this.opts.indexFilename){var c=a.split("/");this.opts.indexFilename==c[c.length-1]&&(c[c.length-1]="",a=c.join("/"))}if("remove"==this.opts.trailingSlash)a=a.replace(/\/+$/,"");else if("add"==this.opts.trailingSlash){var h=/\.\w+$/.test(a);h||"/"==a.substr(-1)||(a+="/")}this.opts.stripQuery&&this.opts.queryDimensionIndex&&t.set("dimension"+this.opts.queryDimensionIndex,o.query||s.NULL_DIMENSION),t.set("page",a+(this.opts.stripQuery?"":o.search))},e.prototype.overrideTrackerBuildHitTask=function(){this.originalTrackerBuildHitTask=this.tracker.get("buildHitTask"),this.tracker.set("buildHitTask",function(t){this.cleanUrlTask(t),this.originalTrackerBuildHitTask(t)}.bind(this))},e.prototype.remove=function(){this.tracker.set("sendHitTask",this.originalTrackerSendHitTask)},o("cleanUrlTracker",e)},{"../constants":1,"../provide":12,"../usage":13,"dom-utils/lib/parse-url":22,"object-assign":23}],4:[function(t){function e(t,e){if(o.track(t,o.plugins.EVENT_TRACKER),window.addEventListener){this.opts=i({events:["click"],fieldsObj:{},attributePrefix:"ga-",hitFilter:null},e),this.tracker=t,this.handleEvents=this.handleEvents.bind(this);var s="["+this.opts.attributePrefix+"on]";this.delegates={},this.opts.events.forEach(function(t){this.delegates[t]=n(document,t,s,this.handleEvents,{deep:!0,useCapture:!0})}.bind(this))}}var i=t("object-assign"),n=t("dom-utils/lib/delegate"),s=t("../provide"),o=t("../usage"),r=t("../utilities").createFieldsObj,a=t("../utilities").getAttributeFields;e.prototype.handleEvents=function(t,e){var n=this.opts.attributePrefix;if(t.type==e.getAttribute(n+"on")){var s={transport:"beacon"},o=a(e,n),c=i({},this.opts.fieldsObj,o),h=o.hitType||"event";this.tracker.send(h,r(s,c,this.tracker,this.opts.hitFilter,e))}},e.prototype.remove=function(){Object.keys(this.delegates).forEach(function(t){this.delegates[t].destroy()}.bind(this))},s("eventTracker",e)},{"../provide":12,"../usage":13,"../utilities":14,"dom-utils/lib/delegate":18,"object-assign":23}],5:[function(t){function e(t,e){if(o.track(t,o.plugins.IMPRESSION_TRACKER),window.IntersectionObserver&&window.MutationObserver){this.opts=n({elements:[],rootMargin:"0px",fieldsObj:{},attributePrefix:"ga-",hitFilter:null},e),this.tracker=t,this.handleDomMutations=this.handleDomMutations.bind(this),this.walkNodeTree=this.walkNodeTree.bind(this),this.handleIntersectionChanges=this.handleIntersectionChanges.bind(this),this.startObserving=this.startObserving.bind(this),this.observeElement=this.observeElement.bind(this),this.handleDomElementRemoved=this.handleDomElementRemoved.bind(this);var i=this.deriveDataFromConfigOptions();this.items=i.items,this.elementMap=i.elementMap,this.threshold=i.threshold,this.intersectionObserver=this.initIntersectionObserver(),this.mutationObserver=this.initMutationObserver(),a(this.startObserving)}}function i(t,e){if(0===t){var i=e.intersectionRect;return i.top>0||i.bottom>0||i.left>0||i.right>0}return e.intersectionRatio>=t}var n=t("object-assign"),s=t("../provide"),o=t("../usage"),r=t("../utilities").createFieldsObj,a=t("../utilities").domReady,c=t("../utilities").getAttributeFields;e.prototype.deriveDataFromConfigOptions=function(){var t=[],e=[],i={};return this.opts.elements.forEach(function(s){"string"==typeof s&&(s={id:s}),t.push(s=n({threshold:0,trackFirstImpressionOnly:!0},s)),i[s.id]=null,e.push(s.threshold)}),{items:t,elementMap:i,threshold:e}},e.prototype.initMutationObserver=function(){return new MutationObserver(this.handleDomMutations)},e.prototype.initIntersectionObserver=function(){return new IntersectionObserver(this.handleIntersectionChanges,{rootMargin:this.opts.rootMargin,threshold:this.threshold})},e.prototype.startObserving=function(){Object.keys(this.elementMap).forEach(this.observeElement),this.mutationObserver.observe(document.body,{childList:!0,subtree:!0}),requestAnimationFrame(function(){})},e.prototype.observeElement=function(t){var e=this.elementMap[t]||(this.elementMap[t]=document.getElementById(t));e&&this.intersectionObserver.observe(e)},e.prototype.handleDomMutations=function(t){for(var e,i=0;e=t[i];i++){for(var n,s=0;n=e.removedNodes[s];s++)this.walkNodeTree(n,this.handleDomElementRemoved);for(var o,r=0;o=e.addedNodes[r];r++)this.walkNodeTree(o,this.observeElement)}},e.prototype.walkNodeTree=function(t,e){1==t.nodeType&&t.id in this.elementMap&&e(t.id);for(var i,n=0;i=t.childNodes[n];n++)this.walkNodeTree(i,e)},e.prototype.handleIntersectionChanges=function(t){for(var e,n=0;e=t[n];n++)for(var s,o=0;s=this.items[o];o++)e.target.id===s.id&&i(s.threshold,e)&&(this.handleImpression(s.id),s.trackFirstImpressionOnly&&(this.items.splice(o,1),o--,this.possiblyUnobserveElement(s.id)));0===this.items.length&&this.remove()},e.prototype.handleImpression=function(t){var e=document.getElementById(t),i={transport:"beacon",eventCategory:"Viewport",eventAction:"impression",eventLabel:t},s=n({},this.opts.fieldsObj,c(e,this.opts.attributePrefix));this.tracker.send("event",r(i,s,this.tracker,this.opts.hitFilter,e))},e.prototype.possiblyUnobserveElement=function(t){this.itemsIncludesId(t)||(this.intersectionObserver.unobserve(this.elementMap[t]),delete this.elementMap[t])},e.prototype.handleDomElementRemoved=function(t){this.intersectionObserver.unobserve(this.elementMap[t]),this.elementMap[t]=null},e.prototype.itemsIncludesId=function(t){return this.items.some(function(e){return t==e.id})},e.prototype.remove=function(){this.mutationObserver.disconnect(),this.intersectionObserver.disconnect()},s("impressionTracker",e)},{"../provide":12,"../usage":13,"../utilities":14,"object-assign":23}],6:[function(t){function e(t,e){a.track(t,a.plugins.MEDIA_QUERY_TRACKER),window.matchMedia&&(this.opts=n({definitions:null,changeTemplate:this.changeTemplate,changeTimeout:1e3,fieldsObj:{},hitFilter:null},e),h(this.opts.definitions)&&(this.opts.definitions=l(this.opts.definitions),this.tracker=t,this.changeListeners=[],this.processMediaQueries()))}function i(t){return u[t]?u[t]:(u[t]=window.matchMedia(t),u[t])}var n=t("object-assign"),s=t("debounce"),o=t("../constants"),r=t("../provide"),a=t("../usage"),c=t("../utilities").createFieldsObj,h=t("../utilities").isObject,l=t("../utilities").toArray,u={};e.prototype.processMediaQueries=function(){this.opts.definitions.forEach(function(t){if(t.name&&t.dimensionIndex){var e=this.getMatchName(t);this.tracker.set("dimension"+t.dimensionIndex,e),this.addChangeListeners(t)}}.bind(this))},e.prototype.getMatchName=function(t){var e;return t.items.forEach(function(t){i(t.media).matches&&(e=t)}),e?e.name:o.NULL_DIMENSION},e.prototype.addChangeListeners=function(t){t.items.forEach(function(e){var n=i(e.media),o=s(function(){this.handleChanges(t)}.bind(this),this.opts.changeTimeout);n.addListener(o),this.changeListeners.push({mql:n,fn:o})}.bind(this))},e.prototype.handleChanges=function(t){var e=this.getMatchName(t),i=this.tracker.get("dimension"+t.dimensionIndex);if(e!==i){this.tracker.set("dimension"+t.dimensionIndex,e);var n={eventCategory:t.name,eventAction:"change",eventLabel:this.opts.changeTemplate(i,e)};this.tracker.send("event",c(n,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))}},e.prototype.remove=function(){for(var t,e=0;t=this.changeListeners[e];e++)t.mql.removeListener(t.fn)},e.prototype.changeTemplate=function(t,e){return t+" => "+e},r("mediaQueryTracker",e)},{"../constants":1,"../provide":12,"../usage":13,"../utilities":14,debounce:16,"object-assign":23}],7:[function(t){function e(t,e){r.track(t,r.plugins.OUTBOUND_FORM_TRACKER),window.addEventListener&&(this.opts=i({formSelector:"form",shouldTrackOutboundForm:this.shouldTrackOutboundForm,fieldsObj:{},attributePrefix:"ga-",hitFilter:null},e),this.tracker=t,this.delegate=n(document,"submit","form",this.handleFormSubmits.bind(this),{deep:!0,useCapture:!0}))}var i=t("object-assign"),n=t("dom-utils/lib/delegate"),s=t("dom-utils/lib/parse-url"),o=t("../provide"),r=t("../usage"),a=t("../utilities").createFieldsObj,c=t("../utilities").getAttributeFields,h=t("../utilities").withTimeout;e.prototype.handleFormSubmits=function(t,e){var n=s(e.action).href,o={transport:"beacon",eventCategory:"Outbound Form",eventAction:"submit",eventLabel:n};if(this.opts.shouldTrackOutboundForm(e,s)){navigator.sendBeacon||(t.preventDefault(),o.hitCallback=h(function(){e.submit()}));var r=i({},this.opts.fieldsObj,c(e,this.opts.attributePrefix));this.tracker.send("event",a(o,r,this.tracker,this.opts.hitFilter,e))}},e.prototype.shouldTrackOutboundForm=function(t,e){var i=e(t.action);return i.hostname!=location.hostname&&"http"==i.protocol.slice(0,4)},e.prototype.remove=function(){this.delegate.destroy()},o("outboundFormTracker",e)},{"../provide":12,"../usage":13,"../utilities":14,"dom-utils/lib/delegate":18,"dom-utils/lib/parse-url":22,"object-assign":23}],8:[function(t){function e(t,e){r.track(t,r.plugins.OUTBOUND_LINK_TRACKER),window.addEventListener&&(this.opts=i({events:["click"],linkSelector:"a",shouldTrackOutboundLink:this.shouldTrackOutboundLink,fieldsObj:{},attributePrefix:"ga-",hitFilter:null},e),this.tracker=t,this.handleLinkInteractions=this.handleLinkInteractions.bind(this),this.delegates={},this.opts.events.forEach(function(t){this.delegates[t]=n(document,t,this.opts.linkSelector,this.handleLinkInteractions,{deep:!0,useCapture:!0})}.bind(this)))}var i=t("object-assign"),n=t("dom-utils/lib/delegate"),s=t("dom-utils/lib/parse-url"),o=t("../provide"),r=t("../usage"),a=t("../utilities").createFieldsObj,c=t("../utilities").getAttributeFields;e.prototype.handleLinkInteractions=function(t,e){if(this.opts.shouldTrackOutboundLink(e,s)){navigator.sendBeacon||(e.target="_blank");var n={transport:"beacon",eventCategory:"Outbound Link",eventAction:t.type,eventLabel:e.href},o=i({},this.opts.fieldsObj,c(e,this.opts.attributePrefix));this.tracker.send("event",a(n,o,this.tracker,this.opts.hitFilter,e))}},e.prototype.shouldTrackOutboundLink=function(t,e){var i=e(t.href);return i.hostname!=location.hostname&&"http"==i.protocol.slice(0,4)},e.prototype.remove=function(){Object.keys(this.delegates).forEach(function(t){this.delegates[t].destroy()}.bind(this))},o("outboundLinkTracker",e)},{"../provide":12,"../usage":13,"../utilities":14,"dom-utils/lib/delegate":18,"dom-utils/lib/parse-url":22,"object-assign":23}],9:[function(t){function e(t,e){s.track(t,s.plugins.PAGE_VISIBILITY_TRACKER),window.addEventListener&&(this.opts=i({sessionTimeout:a,changeTemplate:this.changeTemplate,hiddenMetricIndex:null,visibleMetricIndex:null,fieldsObj:{},hitFilter:null},e),this.tracker=t,this.visibilityState=document.visibilityState,this.lastVisibilityChangeTime=+new Date,this.handleVisibilityStateChange=this.handleVisibilityStateChange.bind(this),this.overrideTrackerSendMethod(),this.overrideTrackerSendHitTask(),document.addEventListener("visibilitychange",this.handleVisibilityStateChange))}var i=t("object-assign"),n=t("../provide"),s=t("../usage"),o=t("../utilities").createFieldsObj,r=t("../utilities").isObject,a=30;e.prototype.handleVisibilityStateChange=function(){var t;if(this.prevVisibilityState=this.visibilityState,this.visibilityState=document.visibilityState,this.sessionHasTimedOut()){if("hidden"==this.visibilityState)return;"visible"==this.visibilityState&&(t={transport:"beacon"},this.tracker.send("pageview",o(t,this.opts.fieldsObj,this.tracker,this.opts.hitFilter)))}else{var e=Math.round((new Date-this.lastVisibilityChangeTime)/1e3)||1;t={transport:"beacon",eventCategory:"Page Visibility",eventAction:"change",eventLabel:this.opts.changeTemplate(this.prevVisibilityState,this.visibilityState),eventValue:e},"hidden"==this.visibilityState&&(t.nonInteraction=!0);var i=this.opts[this.prevVisibilityState+"MetricIndex"];i&&(t["metric"+i]=e),this.tracker.send("event",o(t,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))}this.lastVisibilityChangeTime=+new Date},e.prototype.sessionHasTimedOut=function(){var t=(new Date-this.lastHitTime)/6e4;return this.opts.sessionTimeout<t},e.prototype.overrideTrackerSendMethod=function(){this.originalTrackerSendMethod=this.tracker.send,this.tracker.send=function(){var t=Array.prototype.slice.call(arguments),e=t[0],i=r(e)?e.hitType:e,n="pageview"==i;if(!n&&this.sessionHasTimedOut()){var s={transport:"beacon"};this.originalTrackerSendMethod.call(this.tracker,"pageview",o(s,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))}this.originalTrackerSendMethod.apply(this.tracker,t)}.bind(this)},e.prototype.overrideTrackerSendHitTask=function(){this.originalTrackerSendHitTask=this.tracker.get("sendHitTask"),this.lastHitTime=+new Date,this.tracker.set("sendHitTask",function(t){this.originalTrackerSendHitTask(t),this.lastHitTime=+new Date}.bind(this))},e.prototype.changeTemplate=function(t,e){return t+" => "+e},e.prototype.remove=function(){this.tracker.set("sendHitTask",this.originalTrackerSendHitTask),this.tracker.send=this.originalTrackerSendMethod,document.removeEventListener("visibilitychange",this.handleVisibilityStateChange)},n("pageVisibilityTracker",e)},{"../provide":12,"../usage":13,"../utilities":14,"object-assign":23}],10:[function(t){function e(t,e){s.track(t,s.plugins.SOCIAL_WIDGET_TRACKER),window.addEventListener&&(this.opts=i({fieldsObj:{},hitFilter:null},e),this.tracker=t,this.addWidgetListeners=this.addWidgetListeners.bind(this),this.addTwitterEventHandlers=this.addTwitterEventHandlers.bind(this),this.handleTweetEvents=this.handleTweetEvents.bind(this),this.handleFollowEvents=this.handleFollowEvents.bind(this),this.handleLikeEvents=this.handleLikeEvents.bind(this),this.handleUnlikeEvents=this.handleUnlikeEvents.bind(this),"complete"!=document.readyState?window.addEventListener("load",this.addWidgetListeners):this.addWidgetListeners())}var i=t("object-assign"),n=t("../provide"),s=t("../usage"),o=t("../utilities").createFieldsObj;e.prototype.addWidgetListeners=function(){window.FB&&this.addFacebookEventHandlers(),window.twttr&&this.addTwitterEventHandlers()},e.prototype.addTwitterEventHandlers=function(){try{twttr.ready(function(){twttr.events.bind("tweet",this.handleTweetEvents),twttr.events.bind("follow",this.handleFollowEvents)}.bind(this))}catch(t){}},e.prototype.removeTwitterEventHandlers=function(){try{twttr.ready(function(){twttr.events.unbind("tweet",this.handleTweetEvents),twttr.events.unbind("follow",this.handleFollowEvents)}.bind(this))}catch(t){}},e.prototype.addFacebookEventHandlers=function(){try{FB.Event.subscribe("edge.create",this.handleLikeEvents),FB.Event.subscribe("edge.remove",this.handleUnlikeEvents)}catch(t){}},e.prototype.removeFacebookEventHandlers=function(){try{FB.Event.unsubscribe("edge.create",this.handleLikeEvents),FB.Event.unsubscribe("edge.remove",this.handleUnlikeEvents)}catch(t){}},e.prototype.handleTweetEvents=function(t){if("tweet"==t.region){var e=t.data.url||t.target.getAttribute("data-url")||location.href,i={transport:"beacon",socialNetwork:"Twitter",socialAction:"tweet",socialTarget:e};this.tracker.send("social",o(i,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))}},e.prototype.handleFollowEvents=function(t){if("follow"==t.region){var e=t.data.screen_name||t.target.getAttribute("data-screen-name"),i={transport:"beacon",socialNetwork:"Twitter",socialAction:"follow",socialTarget:e};this.tracker.send("social",o(i,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))}},e.prototype.handleLikeEvents=function(t){var e={transport:"beacon",socialNetwork:"Facebook",socialAction:"like",socialTarget:t};this.tracker.send("social",o(e,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))},e.prototype.handleUnlikeEvents=function(t){var e={transport:"beacon",socialNetwork:"Facebook",socialAction:"unlike",socialTarget:t};this.tracker.send("social",o(e,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))},e.prototype.remove=function(){window.removeEventListener("load",this.addWidgetListeners),this.removeFacebookEventHandlers(),this.removeTwitterEventHandlers()},n("socialWidgetTracker",e)},{"../provide":12,"../usage":13,"../utilities":14,"object-assign":23}],11:[function(t){function e(t,e){o.track(t,o.plugins.URL_CHANGE_TRACKER),history.pushState&&window.addEventListener&&(this.opts=n({shouldTrackUrlChange:this.shouldTrackUrlChange,fieldsObj:{},hitFilter:null},e),this.tracker=t,this.path=i(),this.updateTrackerData=this.updateTrackerData.bind(this),this.originalPushState=history.pushState,history.pushState=function(t,e){a(t)&&e&&(t.title=e),this.originalPushState.apply(history,arguments),this.updateTrackerData()}.bind(this),this.originalReplaceState=history.replaceState,history.replaceState=function(t,e){a(t)&&e&&(t.title=e),this.originalReplaceState.apply(history,arguments),this.updateTrackerData(!1)}.bind(this),window.addEventListener("popstate",this.updateTrackerData))}function i(){return location.pathname+location.search}var n=t("object-assign"),s=t("../provide"),o=t("../usage"),r=t("../utilities").createFieldsObj,a=t("../utilities").isObject;e.prototype.updateTrackerData=function(t){t=t!==!1,setTimeout(function(){var e=this.path,n=i();if(e!=n&&this.opts.shouldTrackUrlChange.call(this,n,e)&&(this.path=n,this.tracker.set({page:n,title:a(history.state)&&history.state.title||document.title}),t)){var s={transport:"beacon"};this.tracker.send("pageview",r(s,this.opts.fieldsObj,this.tracker,this.opts.hitFilter))}}.bind(this),0)},e.prototype.shouldTrackUrlChange=function(t,e){return t&&e},e.prototype.remove=function(){window.removeEventListener("popstate",this.updateTrackerData),history.replaceState=this.originalReplaceState,history.pushState=this.originalPushState,this.tracker=null,this.opts=null,this.path=null,this.updateTrackerData=null,this.originalReplaceState=null,this.originalPushState=null},s("urlChangeTracker",e)},{"../provide":12,"../usage":13,"../utilities":14,"object-assign":23}],12:[function(t,e){var i=t("./constants"),n=t("./utilities");(window.gaDevIds=window.gaDevIds||[]).push(i.DEV_ID),e.exports=function(t,e){var i=window.GoogleAnalyticsObject||"ga";window[i]=window[i]||function(){(window[i].q=window[i].q||[]).push(arguments)},window[i]("provide",t,e),window.gaplugins=window.gaplugins||{},window.gaplugins[n.capitalize(t)]=e}},{"./constants":1,"./utilities":14}],13:[function(t,e){function i(t){return parseInt(t||"0",16).toString(2)}function n(t){return parseInt(t||"0",2).toString(16)}function s(t,e){if(t.length<e)for(var i=e-t.length;i;)t="0"+t,i--;return t}function o(t,e){return t.substr(0,e)+1+t.substr(e+1)}function r(t,e){var r=t.get(c.USAGE_PARAM),a=s(i(r),l);a=o(a,l-e),t.set(c.USAGE_PARAM,n(a))}function a(t){t.set(c.VERSION_PARAM,c.VERSION)}var c=t("./constants"),h={CLEAN_URL_TRACKER:1,EVENT_TRACKER:2,IMPRESSION_TRACKER:3,MEDIA_QUERY_TRACKER:4,OUTBOUND_FORM_TRACKER:5,OUTBOUND_LINK_TRACKER:6,PAGE_VISIBILITY_TRACKER:7,SOCIAL_WIDGET_TRACKER:8,URL_CHANGE_TRACKER:9},l=9;e.exports={track:function(t,e){a(t),r(t,e)},plugins:h}},{"./constants":1}],14:[function(t,e){var i=t("object-assign"),n=t("dom-utils/lib/get-attributes"),s={createFieldsObj:function(t,e,n,s,o){if("function"==typeof s){var r=n.get("buildHitTask");return{buildHitTask:function(i){i.set(t,null,!0),i.set(e,null,!0),s(i,o),r(i)}}}return i({},t,e)},getAttributeFields:function(t,e){var i=n(t),o={};return Object.keys(i).forEach(function(t){if(0===t.indexOf(e)&&t!=e+"on"){var n=i[t];"true"==n&&(n=!0),"false"==n&&(n=!1);var r=s.camelCase(t.slice(e.length));o[r]=n}}),o},domReady:function(t){"loading"==document.readyState?document.addEventListener("DOMContentLoaded",function e(){document.removeEventListener("DOMContentLoaded",e),t()}):t()},withTimeout:function(t,e){var i=!1;return setTimeout(t,e||2e3),function(){i||(i=!0,t())}},camelCase:function(t){return t.replace(/[\-\_]+(\w?)/g,function(t,e){return e.toUpperCase()})},capitalize:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},isObject:function(t){return"object"==typeof t&&null!==t},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},toArray:function(t){return s.isArray(t)?t:[t]}};e.exports=s},{"dom-utils/lib/get-attributes":19,"object-assign":23}],15:[function(t,e){function i(){return(new Date).getTime()}e.exports=Date.now||i},{}],16:[function(t,e){var i=t("date-now");e.exports=function(t,e,n){function s(){var l=i()-c;e>l&&l>0?o=setTimeout(s,e-l):(o=null,n||(h=t.apply(a,r),o||(a=r=null)))}var o,r,a,c,h;return null==e&&(e=100),function(){a=this,r=arguments,c=i();var l=n&&!o;return o||(o=setTimeout(s,e)),l&&(h=t.apply(a,r),a=r=null),h}}},{"date-now":15}],17:[function(t,e){var i=t("./matches"),n=t("./parents");e.exports=function(t,e,s){if(t&&1==t.nodeType&&e)for(var o,r=(s?[t]:[]).concat(n(t)),a=0;o=r[a];a++)if(i(o,e))return o}},{"./matches":20,"./parents":21}],18:[function(t,e){var i=t("./closest"),n=t("./matches");e.exports=function(t,e,s,o,r){r=r||{};var a=function(t){if(r.deep&&"function"==typeof t.deepPath)for(var e,a=t.deepPath(),c=0;e=a[c];c++)1==e.nodeType&&n(e,s)&&(h=e);else var h=i(t.target,s,!0);h&&o.call(h,t,h)};return t.addEventListener(e,a,r.useCapture),{destroy:function(){t.removeEventListener(e,a,r.useCapture)}}}},{"./closest":17,"./matches":20}],19:[function(t,e){e.exports=function(t){var e={};if(!t||1!=t.nodeType)return e;var i=t.attributes;if(0===i.length)return{};for(var n,s=0;n=i[s];s++)e[n.name]=n.value;return e}},{}],20:[function(t,e){function i(t,e){if("string"!=typeof e)return!1;if(s)return s.call(t,e);for(var i,n=t.parentNode.querySelectorAll(e),o=0;i=n[o];o++)if(i==t)return!0;return!1}var n=window.Element.prototype,s=n.matches||n.matchesSelector||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector;e.exports=function(t,e){if(t&&1==t.nodeType&&e){if("string"==typeof e||1==e.nodeType)return t==e||i(t,e);if("length"in e)for(var n,s=0;n=e[s];s++)if(t==n||i(t,n))return!0}return!1}},{}],21:[function(t,e){e.exports=function(t){for(var e=[];t&&t.parentNode&&1==t.parentNode.nodeType;)e.push(t=t.parentNode);return e}},{}],22:[function(t,e){var i="80",n="443",s=RegExp(":("+i+"|"+n+")$"),o=document.createElement("a"),r={};e.exports=function a(t){if(t=t&&"."!=t?t:location.href,r[t])return r[t];if(o.href=t,"."==t.charAt(0))return a(o.href);var e=o.protocol&&":"!=o.protocol?o.protocol:location.protocol,c=o.port==i||o.port==n?"":o.port;c="0"==c?"":c;var h=""==o.host?location.host:o.host,l=""==o.hostname?location.hostname:o.hostname;h=h.replace(s,"");var u=o.origin?o.origin:e+"//"+h,d="/"==o.pathname.charAt(0)?o.pathname:"/"+o.pathname;return r[t]={hash:o.hash,host:h,hostname:l,href:o.href,origin:u,pathname:d,port:c,protocol:e,search:o.search,fragment:o.hash.slice(1),path:d+o.search,query:o.search.slice(1)}}},{}],23:[function(t,e){"use strict";function i(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function n(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},i=0;10>i;i++)e["_"+String.fromCharCode(i)]=i;var n=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if("0123456789"!==n.join(""))return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(t){s[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},s)).join("")}catch(t){return!1}}var s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=n()?Object.assign:function(t){for(var e,n,r=i(t),a=1;a<arguments.length;a++){e=Object(arguments[a]);for(var c in e)s.call(e,c)&&(r[c]=e[c]);if(Object.getOwnPropertySymbols){n=Object.getOwnPropertySymbols(e);for(var h=0;h<n.length;h++)o.call(e,n[h])&&(r[n[h]]=e[n[h]])}}return r}},{}],24:[function(t){t("./plugins/clean-url-tracker"),t("./plugins/event-tracker"),t("./plugins/impression-tracker"),t("./plugins/media-query-tracker"),t("./plugins/outbound-form-tracker"),t("./plugins/outbound-link-tracker"),t("./plugins/page-visibility-tracker"),t("./plugins/social-widget-tracker"),t("./plugins/url-change-tracker"),t("./plugins/autotrack")},{"./plugins/autotrack":2,"./plugins/clean-url-tracker":3,"./plugins/event-tracker":4,"./plugins/impression-tracker":5,"./plugins/media-query-tracker":6,"./plugins/outbound-form-tracker":7,"./plugins/outbound-link-tracker":8,"./plugins/page-visibility-tracker":9,"./plugins/social-widget-tracker":10,"./plugins/url-change-tracker":11}]},{},[24]);