(function(){var t=this,e=t._,n=Array.prototype,i=Object.prototype,r=Function.prototype,s=n.push,o=n.slice,a=n.concat,l=i.toString,h=i.hasOwnProperty,u=Array.isArray,c=Object.keys,p=r.bind,d=function(t){return t instanceof d?t:this instanceof d?void(this._wrapped=t):new d(t)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=d),exports._=d):t._=d,d.VERSION="1.7.0";var f=function(t,e,n){if(void 0===e)return t;switch(null==n?3:n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)};case 4:return function(n,i,r,s){return t.call(e,n,i,r,s)}}return function(){return t.apply(e,arguments)}};d.iteratee=function(t,e,n){return null==t?d.identity:d.isFunction(t)?f(t,e,n):d.isObject(t)?d.matches(t):d.property(t)},d.each=d.forEach=function(t,e,n){if(null==t)return t;e=f(e,n);var i,r=t.length;if(r===+r)for(i=0;r>i;i++)e(t[i],i,t);else{var s=d.keys(t);for(i=0,r=s.length;r>i;i++)e(t[s[i]],s[i],t)}return t},d.map=d.collect=function(t,e,n){if(null==t)return[];e=d.iteratee(e,n);for(var i,r=t.length!==+t.length&&d.keys(t),s=(r||t).length,o=Array(s),a=0;s>a;a++)i=r?r[a]:a,o[a]=e(t[i],i,t);return o};var g="Reduce of empty array with no initial value";d.reduce=d.foldl=d.inject=function(t,e,n,i){null==t&&(t=[]),e=f(e,i,4);var r,s=t.length!==+t.length&&d.keys(t),o=(s||t).length,a=0;if(arguments.length<3){if(!o)throw new TypeError(g);n=t[s?s[a++]:a++]}for(;o>a;a++)r=s?s[a]:a,n=e(n,t[r],r,t);return n},d.reduceRight=d.foldr=function(t,e,n,i){null==t&&(t=[]),e=f(e,i,4);var r,s=t.length!==+t.length&&d.keys(t),o=(s||t).length;if(arguments.length<3){if(!o)throw new TypeError(g);n=t[s?s[--o]:--o]}for(;o--;)r=s?s[o]:o,n=e(n,t[r],r,t);return n},d.find=d.detect=function(t,e,n){var i;return e=d.iteratee(e,n),d.some(t,function(t,n,r){return e(t,n,r)?(i=t,!0):void 0}),i},d.filter=d.select=function(t,e,n){var i=[];return null==t?i:(e=d.iteratee(e,n),d.each(t,function(t,n,r){e(t,n,r)&&i.push(t)}),i)},d.reject=function(t,e,n){return d.filter(t,d.negate(d.iteratee(e)),n)},d.every=d.all=function(t,e,n){if(null==t)return!0;e=d.iteratee(e,n);var i,r,s=t.length!==+t.length&&d.keys(t),o=(s||t).length;for(i=0;o>i;i++)if(r=s?s[i]:i,!e(t[r],r,t))return!1;return!0},d.some=d.any=function(t,e,n){if(null==t)return!1;e=d.iteratee(e,n);var i,r,s=t.length!==+t.length&&d.keys(t),o=(s||t).length;for(i=0;o>i;i++)if(r=s?s[i]:i,e(t[r],r,t))return!0;return!1},d.contains=d.include=function(t,e){return null==t?!1:(t.length!==+t.length&&(t=d.values(t)),d.indexOf(t,e)>=0)},d.invoke=function(t,e){var n=o.call(arguments,2),i=d.isFunction(e);return d.map(t,function(t){return(i?e:t[e]).apply(t,n)})},d.pluck=function(t,e){return d.map(t,d.property(e))},d.where=function(t,e){return d.filter(t,d.matches(e))},d.findWhere=function(t,e){return d.find(t,d.matches(e))},d.max=function(t,e,n){var i,r,s=-1/0,o=-1/0;if(null==e&&null!=t){t=t.length===+t.length?t:d.values(t);for(var a=0,l=t.length;l>a;a++)i=t[a],i>s&&(s=i)}else e=d.iteratee(e,n),d.each(t,function(t,n,i){r=e(t,n,i),(r>o||r===-1/0&&s===-1/0)&&(s=t,o=r)});return s},d.min=function(t,e,n){var i,r,s=1/0,o=1/0;if(null==e&&null!=t){t=t.length===+t.length?t:d.values(t);for(var a=0,l=t.length;l>a;a++)i=t[a],s>i&&(s=i)}else e=d.iteratee(e,n),d.each(t,function(t,n,i){r=e(t,n,i),(o>r||1/0===r&&1/0===s)&&(s=t,o=r)});return s},d.shuffle=function(t){for(var e,n=t&&t.length===+t.length?t:d.values(t),i=n.length,r=Array(i),s=0;i>s;s++)e=d.random(0,s),e!==s&&(r[s]=r[e]),r[e]=n[s];return r},d.sample=function(t,e,n){return null==e||n?(t.length!==+t.length&&(t=d.values(t)),t[d.random(t.length-1)]):d.shuffle(t).slice(0,Math.max(0,e))},d.sortBy=function(t,e,n){return e=d.iteratee(e,n),d.pluck(d.map(t,function(t,n,i){return{value:t,index:n,criteria:e(t,n,i)}}).sort(function(t,e){var n=t.criteria,i=e.criteria;if(n!==i){if(n>i||void 0===n)return 1;if(i>n||void 0===i)return-1}return t.index-e.index}),"value")};var m=function(t){return function(e,n,i){var r={};return n=d.iteratee(n,i),d.each(e,function(i,s){var o=n(i,s,e);t(r,i,o)}),r}};d.groupBy=m(function(t,e,n){d.has(t,n)?t[n].push(e):t[n]=[e]}),d.indexBy=m(function(t,e,n){t[n]=e}),d.countBy=m(function(t,e,n){d.has(t,n)?t[n]++:t[n]=1}),d.sortedIndex=function(t,e,n,i){n=d.iteratee(n,i,1);for(var r=n(e),s=0,o=t.length;o>s;){var a=s+o>>>1;n(t[a])<r?s=a+1:o=a}return s},d.toArray=function(t){return t?d.isArray(t)?o.call(t):t.length===+t.length?d.map(t,d.identity):d.values(t):[]},d.size=function(t){return null==t?0:t.length===+t.length?t.length:d.keys(t).length},d.partition=function(t,e,n){e=d.iteratee(e,n);var i=[],r=[];return d.each(t,function(t,n,s){(e(t,n,s)?i:r).push(t)}),[i,r]},d.first=d.head=d.take=function(t,e,n){return null==t?void 0:null==e||n?t[0]:0>e?[]:o.call(t,0,e)},d.initial=function(t,e,n){return o.call(t,0,Math.max(0,t.length-(null==e||n?1:e)))},d.last=function(t,e,n){return null==t?void 0:null==e||n?t[t.length-1]:o.call(t,Math.max(t.length-e,0))},d.rest=d.tail=d.drop=function(t,e,n){return o.call(t,null==e||n?1:e)},d.compact=function(t){return d.filter(t,d.identity)};var v=function(t,e,n,i){if(e&&d.every(t,d.isArray))return a.apply(i,t);for(var r=0,o=t.length;o>r;r++){var l=t[r];d.isArray(l)||d.isArguments(l)?e?s.apply(i,l):v(l,e,n,i):n||i.push(l)}return i};d.flatten=function(t,e){return v(t,e,!1,[])},d.without=function(t){return d.difference(t,o.call(arguments,1))},d.uniq=d.unique=function(t,e,n,i){if(null==t)return[];d.isBoolean(e)||(i=n,n=e,e=!1),null!=n&&(n=d.iteratee(n,i));for(var r=[],s=[],o=0,a=t.length;a>o;o++){var l=t[o];if(e)o&&s===l||r.push(l),s=l;else if(n){var h=n(l,o,t);d.indexOf(s,h)<0&&(s.push(h),r.push(l))}else d.indexOf(r,l)<0&&r.push(l)}return r},d.union=function(){return d.uniq(v(arguments,!0,!0,[]))},d.intersection=function(t){if(null==t)return[];for(var e=[],n=arguments.length,i=0,r=t.length;r>i;i++){var s=t[i];if(!d.contains(e,s)){for(var o=1;n>o&&d.contains(arguments[o],s);o++);o===n&&e.push(s)}}return e},d.difference=function(t){var e=v(o.call(arguments,1),!0,!0,[]);return d.filter(t,function(t){return!d.contains(e,t)})},d.zip=function(t){if(null==t)return[];for(var e=d.max(arguments,"length").length,n=Array(e),i=0;e>i;i++)n[i]=d.pluck(arguments,i);return n},d.object=function(t,e){if(null==t)return{};for(var n={},i=0,r=t.length;r>i;i++)e?n[t[i]]=e[i]:n[t[i][0]]=t[i][1];return n},d.indexOf=function(t,e,n){if(null==t)return-1;var i=0,r=t.length;if(n){if("number"!=typeof n)return i=d.sortedIndex(t,e),t[i]===e?i:-1;i=0>n?Math.max(0,r+n):n}for(;r>i;i++)if(t[i]===e)return i;return-1},d.lastIndexOf=function(t,e,n){if(null==t)return-1;var i=t.length;for("number"==typeof n&&(i=0>n?i+n+1:Math.min(i,n+1));--i>=0;)if(t[i]===e)return i;return-1},d.range=function(t,e,n){arguments.length<=1&&(e=t||0,t=0),n=n||1;for(var i=Math.max(Math.ceil((e-t)/n),0),r=Array(i),s=0;i>s;s++,t+=n)r[s]=t;return r};var b=function(){};d.bind=function(t,e){var n,i;if(p&&t.bind===p)return p.apply(t,o.call(arguments,1));if(!d.isFunction(t))throw new TypeError("Bind must be called on a function");return n=o.call(arguments,2),i=function(){if(!(this instanceof i))return t.apply(e,n.concat(o.call(arguments)));b.prototype=t.prototype;var r=new b;b.prototype=null;var s=t.apply(r,n.concat(o.call(arguments)));return d.isObject(s)?s:r}},d.partial=function(t){var e=o.call(arguments,1);return function(){for(var n=0,i=e.slice(),r=0,s=i.length;s>r;r++)i[r]===d&&(i[r]=arguments[n++]);for(;n<arguments.length;)i.push(arguments[n++]);return t.apply(this,i)}},d.bindAll=function(t){var e,n,i=arguments.length;if(1>=i)throw new Error("bindAll must be passed function names");for(e=1;i>e;e++)n=arguments[e],t[n]=d.bind(t[n],t);return t},d.memoize=function(t,e){var n=function(i){var r=n.cache,s=e?e.apply(this,arguments):i;return d.has(r,s)||(r[s]=t.apply(this,arguments)),r[s]};return n.cache={},n},d.delay=function(t,e){var n=o.call(arguments,2);return setTimeout(function(){return t.apply(null,n)},e)},d.defer=function(t){return d.delay.apply(d,[t,1].concat(o.call(arguments,1)))},d.throttle=function(t,e,n){var i,r,s,o=null,a=0;n||(n={});var l=function(){a=n.leading===!1?0:d.now(),o=null,s=t.apply(i,r),o||(i=r=null)};return function(){var h=d.now();a||n.leading!==!1||(a=h);var u=e-(h-a);return i=this,r=arguments,0>=u||u>e?(clearTimeout(o),o=null,a=h,s=t.apply(i,r),o||(i=r=null)):o||n.trailing===!1||(o=setTimeout(l,u)),s}},d.debounce=function(t,e,n){var i,r,s,o,a,l=function(){var h=d.now()-o;e>h&&h>0?i=setTimeout(l,e-h):(i=null,n||(a=t.apply(s,r),i||(s=r=null)))};return function(){s=this,r=arguments,o=d.now();var h=n&&!i;return i||(i=setTimeout(l,e)),h&&(a=t.apply(s,r),s=r=null),a}},d.wrap=function(t,e){return d.partial(e,t)},d.negate=function(t){return function(){return!t.apply(this,arguments)}},d.compose=function(){var t=arguments,e=t.length-1;return function(){for(var n=e,i=t[e].apply(this,arguments);n--;)i=t[n].call(this,i);return i}},d.after=function(t,e){return function(){return--t<1?e.apply(this,arguments):void 0}},d.before=function(t,e){var n;return function(){return--t>0?n=e.apply(this,arguments):e=null,n}},d.once=d.partial(d.before,2),d.keys=function(t){if(!d.isObject(t))return[];if(c)return c(t);var e=[];for(var n in t)d.has(t,n)&&e.push(n);return e},d.values=function(t){for(var e=d.keys(t),n=e.length,i=Array(n),r=0;n>r;r++)i[r]=t[e[r]];return i},d.pairs=function(t){for(var e=d.keys(t),n=e.length,i=Array(n),r=0;n>r;r++)i[r]=[e[r],t[e[r]]];return i},d.invert=function(t){for(var e={},n=d.keys(t),i=0,r=n.length;r>i;i++)e[t[n[i]]]=n[i];return e},d.functions=d.methods=function(t){var e=[];for(var n in t)d.isFunction(t[n])&&e.push(n);return e.sort()},d.extend=function(t){if(!d.isObject(t))return t;for(var e,n,i=1,r=arguments.length;r>i;i++){e=arguments[i];for(n in e)h.call(e,n)&&(t[n]=e[n])}return t},d.pick=function(t,e,n){var i,r={};if(null==t)return r;if(d.isFunction(e)){e=f(e,n);for(i in t){var s=t[i];e(s,i,t)&&(r[i]=s)}}else{var l=a.apply([],o.call(arguments,1));t=new Object(t);for(var h=0,u=l.length;u>h;h++)i=l[h],i in t&&(r[i]=t[i])}return r},d.omit=function(t,e,n){if(d.isFunction(e))e=d.negate(e);else{var i=d.map(a.apply([],o.call(arguments,1)),String);e=function(t,e){return!d.contains(i,e)}}return d.pick(t,e,n)},d.defaults=function(t){if(!d.isObject(t))return t;for(var e=1,n=arguments.length;n>e;e++){var i=arguments[e];for(var r in i)void 0===t[r]&&(t[r]=i[r])}return t},d.clone=function(t){return d.isObject(t)?d.isArray(t)?t.slice():d.extend({},t):t},d.tap=function(t,e){return e(t),t};var y=function(t,e,n,i){if(t===e)return 0!==t||1/t===1/e;if(null==t||null==e)return t===e;t instanceof d&&(t=t._wrapped),e instanceof d&&(e=e._wrapped);var r=l.call(t);if(r!==l.call(e))return!1;switch(r){case"[object RegExp]":case"[object String]":return""+t==""+e;case"[object Number]":return+t!==+t?+e!==+e:0===+t?1/+t===1/e:+t===+e;case"[object Date]":case"[object Boolean]":return+t===+e}if("object"!=typeof t||"object"!=typeof e)return!1;for(var s=n.length;s--;)if(n[s]===t)return i[s]===e;var o=t.constructor,a=e.constructor;if(o!==a&&"constructor"in t&&"constructor"in e&&!(d.isFunction(o)&&o instanceof o&&d.isFunction(a)&&a instanceof a))return!1;n.push(t),i.push(e);var h,u;if("[object Array]"===r){if(h=t.length,u=h===e.length)for(;h--&&(u=y(t[h],e[h],n,i)););}else{var c,p=d.keys(t);if(h=p.length,u=d.keys(e).length===h)for(;h--&&(c=p[h],u=d.has(e,c)&&y(t[c],e[c],n,i)););}return n.pop(),i.pop(),u};d.isEqual=function(t,e){return y(t,e,[],[])},d.isEmpty=function(t){if(null==t)return!0;if(d.isArray(t)||d.isString(t)||d.isArguments(t))return 0===t.length;for(var e in t)if(d.has(t,e))return!1;return!0},d.isElement=function(t){return!(!t||1!==t.nodeType)},d.isArray=u||function(t){return"[object Array]"===l.call(t)},d.isObject=function(t){var e=typeof t;return"function"===e||"object"===e&&!!t},d.each(["Arguments","Function","String","Number","Date","RegExp"],function(t){d["is"+t]=function(e){return l.call(e)==="[object "+t+"]"}}),d.isArguments(arguments)||(d.isArguments=function(t){return d.has(t,"callee")}),"function"!=typeof/./&&(d.isFunction=function(t){return"function"==typeof t||!1}),d.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},d.isNaN=function(t){return d.isNumber(t)&&t!==+t},d.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"===l.call(t)},d.isNull=function(t){return null===t},d.isUndefined=function(t){return void 0===t},d.has=function(t,e){return null!=t&&h.call(t,e)},d.noConflict=function(){return t._=e,this},d.identity=function(t){return t},d.constant=function(t){return function(){return t}},d.noop=function(){},d.property=function(t){return function(e){return e[t]}},d.matches=function(t){var e=d.pairs(t),n=e.length;return function(t){if(null==t)return!n;t=new Object(t);for(var i=0;n>i;i++){var r=e[i],s=r[0];if(r[1]!==t[s]||!(s in t))return!1}return!0}},d.times=function(t,e,n){var i=Array(Math.max(0,t));e=f(e,n,1);for(var r=0;t>r;r++)i[r]=e(r);return i},d.random=function(t,e){return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))},d.now=Date.now||function(){return(new Date).getTime()};var k={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=d.invert(k),x=function(t){var e=function(e){return t[e]},n="(?:"+d.keys(t).join("|")+")",i=RegExp(n),r=RegExp(n,"g");return function(t){return t=null==t?"":""+t,i.test(t)?t.replace(r,e):t}};d.escape=x(k),d.unescape=x(w),d.result=function(t,e){if(null==t)return void 0;var n=t[e];return d.isFunction(n)?t[e]():n};var S=0;d.uniqueId=function(t){var e=++S+"";return t?t+e:e},d.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var _=/(.)^/,E={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},N=/\\|'|\r|\n|\u2028|\u2029/g,O=function(t){return"\\"+E[t]};d.template=function(t,e,n){!e&&n&&(e=n),e=d.defaults({},e,d.templateSettings);var i=RegExp([(e.escape||_).source,(e.interpolate||_).source,(e.evaluate||_).source].join("|")+"|$","g"),r=0,s="__p+='";t.replace(i,function(e,n,i,o,a){return s+=t.slice(r,a).replace(N,O),r=a+e.length,n?s+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":i?s+="'+\n((__t=("+i+"))==null?'':__t)+\n'":o&&(s+="';\n"+o+"\n__p+='"),e}),s+="';\n",e.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(e.variable||"obj","_",s)}catch(a){throw a.source=s,a}var l=function(t){return o.call(this,t,d)},h=e.variable||"obj";return l.source="function("+h+"){\n"+s+"}",l},d.chain=function(t){var e=d(t);return e._chain=!0,e};var T=function(t){return this._chain?d(t).chain():t};d.mixin=function(t){d.each(d.functions(t),function(e){var n=d[e]=t[e];d.prototype[e]=function(){var t=[this._wrapped];return s.apply(t,arguments),T.call(this,n.apply(d,t))}})},d.mixin(d),d.each(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=n[t];d.prototype[t]=function(){var n=this._wrapped;return e.apply(n,arguments),"shift"!==t&&"splice"!==t||0!==n.length||delete n[0],T.call(this,n)}}),d.each(["concat","join","slice"],function(t){var e=n[t];d.prototype[t]=function(){return T.call(this,e.apply(this._wrapped,arguments))}}),d.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return d})}).call(this);