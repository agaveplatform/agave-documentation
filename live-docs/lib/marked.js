/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){function t(t){this.tokens=[],this.tokens.links={},this.options=t||h.defaults,this.rules=c.normal,this.options.gfm&&(this.rules=this.options.tables?c.tables:c.gfm)}function e(t,e){if(this.options=e||h.defaults,this.links=t,this.rules=u.normal,this.renderer=this.options.renderer||new i,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.rules=this.options.breaks?u.breaks:u.gfm:this.options.pedantic&&(this.rules=u.pedantic)}function i(t){this.options=t||{}}function n(t){this.tokens=[],this.token=null,this.options=t||h.defaults,this.options.renderer=this.options.renderer||new i,this.renderer=this.options.renderer,this.renderer.options=this.options}function s(t,e){return t.replace(e?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function r(t){return t.replace(/&([#\w]+);/g,function(t,e){return e=e.toLowerCase(),"colon"===e?":":"#"===e.charAt(0)?String.fromCharCode("x"===e.charAt(1)?parseInt(e.substring(2),16):+e.substring(1)):""})}function o(t,e){return t=t.source,e=e||"",function i(n,s){return n?(s=s.source||s,s=s.replace(/(^|[^\[])\^/g,"$1"),t=t.replace(n,s),i):new RegExp(t,e)}}function a(){}function l(t){for(var e,i,n=1;n<arguments.length;n++){e=arguments[n];for(i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}function h(e,i,r){if(r||"function"==typeof i){r||(r=i,i=null),i=l({},h.defaults,i||{});var o,a,c=i.highlight,u=0;try{o=t.lex(e,i)}catch(d){return r(d)}a=o.length;var p=function(t){if(t)return i.highlight=c,r(t);var e;try{e=n.parse(o,i)}catch(s){t=s}return i.highlight=c,t?r(t):r(null,e)};if(!c||c.length<3)return p();if(delete i.highlight,!a)return p();for(;u<o.length;u++)!function(t){return"code"!==t.type?--a||p():c(t.text,t.lang,function(e,i){return e?p(e):null==i||i===t.text?--a||p():(t.text=i,t.escaped=!0,void(--a||p()))})}(o[u])}else try{return i&&(i=l({},h.defaults,i)),n.parse(t.lex(e,i),i)}catch(d){if(d.message+="\nPlease report this to https://github.com/chjj/marked.",(i||h.defaults).silent)return"<p>An error occured:</p><pre>"+s(d.message+"",!0)+"</pre>";throw d}}var c={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:a,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:a,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:a,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};c.bullet=/(?:[*+-]|\d+\.)/,c.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,c.item=o(c.item,"gm")(/bull/g,c.bullet)(),c.list=o(c.list)(/bull/g,c.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+c.def.source+")")(),c.blockquote=o(c.blockquote)("def",c.def)(),c._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",c.html=o(c.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,c._tag)(),c.paragraph=o(c.paragraph)("hr",c.hr)("heading",c.heading)("lheading",c.lheading)("blockquote",c.blockquote)("tag","<"+c._tag)("def",c.def)(),c.normal=l({},c),c.gfm=l({},c.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),c.gfm.paragraph=o(c.paragraph)("(?!","(?!"+c.gfm.fences.source.replace("\\1","\\2")+"|"+c.list.source.replace("\\1","\\3")+"|")(),c.tables=l({},c.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),t.rules=c,t.lex=function(e,i){var n=new t(i);return n.lex(e)},t.prototype.lex=function(t){return t=t.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(t,!0)},t.prototype.token=function(t,e,i){for(var n,s,r,o,a,l,h,u,d,t=t.replace(/^ +$/gm,"");t;)if((r=this.rules.newline.exec(t))&&(t=t.substring(r[0].length),r[0].length>1&&this.tokens.push({type:"space"})),r=this.rules.code.exec(t))t=t.substring(r[0].length),r=r[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?r:r.replace(/\n+$/,"")});else if(r=this.rules.fences.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"code",lang:r[2],text:r[3]});else if(r=this.rules.heading.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"heading",depth:r[1].length,text:r[2]});else if(e&&(r=this.rules.nptable.exec(t))){for(t=t.substring(r[0].length),l={type:"table",header:r[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:r[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:r[3].replace(/\n$/,"").split("\n")},u=0;u<l.align.length;u++)l.align[u]=/^ *-+: *$/.test(l.align[u])?"right":/^ *:-+: *$/.test(l.align[u])?"center":/^ *:-+ *$/.test(l.align[u])?"left":null;for(u=0;u<l.cells.length;u++)l.cells[u]=l.cells[u].split(/ *\| */);this.tokens.push(l)}else if(r=this.rules.lheading.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"heading",depth:"="===r[2]?1:2,text:r[1]});else if(r=this.rules.hr.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"hr"});else if(r=this.rules.blockquote.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"blockquote_start"}),r=r[0].replace(/^ *> ?/gm,""),this.token(r,e,!0),this.tokens.push({type:"blockquote_end"});else if(r=this.rules.list.exec(t)){for(t=t.substring(r[0].length),o=r[2],this.tokens.push({type:"list_start",ordered:o.length>1}),r=r[0].match(this.rules.item),n=!1,d=r.length,u=0;d>u;u++)l=r[u],h=l.length,l=l.replace(/^ *([*+-]|\d+\.) +/,""),~l.indexOf("\n ")&&(h-=l.length,l=this.options.pedantic?l.replace(/^ {1,4}/gm,""):l.replace(new RegExp("^ {1,"+h+"}","gm"),"")),this.options.smartLists&&u!==d-1&&(a=c.bullet.exec(r[u+1])[0],o===a||o.length>1&&a.length>1||(t=r.slice(u+1).join("\n")+t,u=d-1)),s=n||/\n\n(?!\s*$)/.test(l),u!==d-1&&(n="\n"===l.charAt(l.length-1),s||(s=n)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(l,!1,i),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(r=this.rules.html.exec(t))t=t.substring(r[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===r[1]||"script"===r[1]||"style"===r[1],text:r[0]});else if(!i&&e&&(r=this.rules.def.exec(t)))t=t.substring(r[0].length),this.tokens.links[r[1].toLowerCase()]={href:r[2],title:r[3]};else if(e&&(r=this.rules.table.exec(t))){for(t=t.substring(r[0].length),l={type:"table",header:r[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:r[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:r[3].replace(/(?: *\| *)?\n$/,"").split("\n")},u=0;u<l.align.length;u++)l.align[u]=/^ *-+: *$/.test(l.align[u])?"right":/^ *:-+: *$/.test(l.align[u])?"center":/^ *:-+ *$/.test(l.align[u])?"left":null;for(u=0;u<l.cells.length;u++)l.cells[u]=l.cells[u].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(l)}else if(e&&(r=this.rules.paragraph.exec(t)))t=t.substring(r[0].length),this.tokens.push({type:"paragraph",text:"\n"===r[1].charAt(r[1].length-1)?r[1].slice(0,-1):r[1]});else if(r=this.rules.text.exec(t))t=t.substring(r[0].length),this.tokens.push({type:"text",text:r[0]});else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0));return this.tokens};var u={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:a,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:a,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};u._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,u._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,u.link=o(u.link)("inside",u._inside)("href",u._href)(),u.reflink=o(u.reflink)("inside",u._inside)(),u.normal=l({},u),u.pedantic=l({},u.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),u.gfm=l({},u.normal,{escape:o(u.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:o(u.text)("]|","~]|")("|","|https?://|")()}),u.breaks=l({},u.gfm,{br:o(u.br)("{2,}","*")(),text:o(u.gfm.text)("{2,}","*")()}),e.rules=u,e.output=function(t,i,n){var s=new e(i,n);return s.output(t)},e.prototype.output=function(t){for(var e,i,n,r,o="";t;)if(r=this.rules.escape.exec(t))t=t.substring(r[0].length),o+=r[1];else if(r=this.rules.autolink.exec(t))t=t.substring(r[0].length),"@"===r[2]?(i=this.mangle(":"===r[1].charAt(6)?r[1].substring(7):r[1]),n=this.mangle("mailto:")+i):(i=s(r[1]),n=i),o+=this.renderer.link(n,null,i);else if(this.inLink||!(r=this.rules.url.exec(t))){if(r=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(r[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(r[0])&&(this.inLink=!1),t=t.substring(r[0].length),o+=this.options.sanitize?s(r[0]):r[0];else if(r=this.rules.link.exec(t))t=t.substring(r[0].length),this.inLink=!0,o+=this.outputLink(r,{href:r[2],title:r[3]}),this.inLink=!1;else if((r=this.rules.reflink.exec(t))||(r=this.rules.nolink.exec(t))){if(t=t.substring(r[0].length),e=(r[2]||r[1]).replace(/\s+/g," "),e=this.links[e.toLowerCase()],!e||!e.href){o+=r[0].charAt(0),t=r[0].substring(1)+t;continue}this.inLink=!0,o+=this.outputLink(r,e),this.inLink=!1}else if(r=this.rules.strong.exec(t))t=t.substring(r[0].length),o+=this.renderer.strong(this.output(r[2]||r[1]));else if(r=this.rules.em.exec(t))t=t.substring(r[0].length),o+=this.renderer.em(this.output(r[2]||r[1]));else if(r=this.rules.code.exec(t))t=t.substring(r[0].length),o+=this.renderer.codespan(s(r[2],!0));else if(r=this.rules.br.exec(t))t=t.substring(r[0].length),o+=this.renderer.br();else if(r=this.rules.del.exec(t))t=t.substring(r[0].length),o+=this.renderer.del(this.output(r[1]));else if(r=this.rules.text.exec(t))t=t.substring(r[0].length),o+=s(this.smartypants(r[0]));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else t=t.substring(r[0].length),i=s(r[1]),n=i,o+=this.renderer.link(n,null,i);return o},e.prototype.outputLink=function(t,e){var i=s(e.href),n=e.title?s(e.title):null;return"!"!==t[0].charAt(0)?this.renderer.link(i,n,this.output(t[1])):this.renderer.image(i,n,s(t[1]))},e.prototype.smartypants=function(t){return this.options.smartypants?t.replace(/--/g,"\u2014").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201c").replace(/"/g,"\u201d").replace(/\.{3}/g,"\u2026"):t},e.prototype.mangle=function(t){for(var e,i="",n=t.length,s=0;n>s;s++)e=t.charCodeAt(s),Math.random()>.5&&(e="x"+e.toString(16)),i+="&#"+e+";";return i},i.prototype.code=function(t,e,i){if(this.options.highlight){var n=this.options.highlight(t,e);null!=n&&n!==t&&(i=!0,t=n)}return e?'<pre><code class="'+this.options.langPrefix+s(e,!0)+'">'+(i?t:s(t,!0))+"\n</code></pre>\n":"<pre><code>"+(i?t:s(t,!0))+"\n</code></pre>"},i.prototype.blockquote=function(t){return"<blockquote>\n"+t+"</blockquote>\n"},i.prototype.html=function(t){return t},i.prototype.heading=function(t,e,i){return"<h"+e+' id="'+this.options.headerPrefix+i.toLowerCase().replace(/[^\w]+/g,"-")+'">'+t+"</h"+e+">\n"},i.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},i.prototype.list=function(t,e){var i=e?"ol":"ul";return"<"+i+">\n"+t+"</"+i+">\n"},i.prototype.listitem=function(t){return"<li>"+t+"</li>\n"},i.prototype.paragraph=function(t){return"<p>"+t+"</p>\n"},i.prototype.table=function(t,e){return"<table>\n<thead>\n"+t+"</thead>\n<tbody>\n"+e+"</tbody>\n</table>\n"},i.prototype.tablerow=function(t){return"<tr>\n"+t+"</tr>\n"},i.prototype.tablecell=function(t,e){var i=e.header?"th":"td",n=e.align?"<"+i+' style="text-align:'+e.align+'">':"<"+i+">";return n+t+"</"+i+">\n"},i.prototype.strong=function(t){return"<strong>"+t+"</strong>"},i.prototype.em=function(t){return"<em>"+t+"</em>"},i.prototype.codespan=function(t){return"<code>"+t+"</code>"},i.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},i.prototype.del=function(t){return"<del>"+t+"</del>"},i.prototype.link=function(t,e,i){if(this.options.sanitize){try{var n=decodeURIComponent(r(t)).replace(/[^\w:]/g,"").toLowerCase()}catch(s){return""}if(0===n.indexOf("javascript:"))return""}var o='<a href="'+t+'"';return e&&(o+=' title="'+e+'"'),o+=">"+i+"</a>"},i.prototype.image=function(t,e,i){var n='<img src="'+t+'" alt="'+i+'"';return e&&(n+=' title="'+e+'"'),n+=this.options.xhtml?"/>":">"},n.parse=function(t,e,i){var s=new n(e,i);return s.parse(t)},n.prototype.parse=function(t){this.inline=new e(t.links,this.options,this.renderer),this.tokens=t.reverse();for(var i="";this.next();)i+=this.tok();return i},n.prototype.next=function(){return this.token=this.tokens.pop()},n.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},n.prototype.parseText=function(){for(var t=this.token.text;"text"===this.peek().type;)t+="\n"+this.next().text;return this.inline.output(t)},n.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var t,e,i,n,s,r="",o="";for(i="",t=0;t<this.token.header.length;t++)n={header:!0,align:this.token.align[t]},i+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(r+=this.renderer.tablerow(i),t=0;t<this.token.cells.length;t++){for(e=this.token.cells[t],i="",s=0;s<e.length;s++)i+=this.renderer.tablecell(this.inline.output(e[s]),{header:!1,align:this.token.align[s]});o+=this.renderer.tablerow(i)}return this.renderer.table(r,o);case"blockquote_start":for(var o="";"blockquote_end"!==this.next().type;)o+=this.tok();return this.renderer.blockquote(o);case"list_start":for(var o="",a=this.token.ordered;"list_end"!==this.next().type;)o+=this.tok();return this.renderer.list(o,a);case"list_item_start":for(var o="";"list_item_end"!==this.next().type;)o+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(o);case"loose_item_start":for(var o="";"list_item_end"!==this.next().type;)o+=this.tok();return this.renderer.listitem(o);case"html":var l=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(l);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},a.exec=a,h.options=h.setOptions=function(t){return l(h.defaults,t),h},h.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new i,xhtml:!1},h.Parser=n,h.parser=n.parse,h.Renderer=i,h.Lexer=t,h.lexer=t.lex,h.InlineLexer=e,h.inlineLexer=e.output,h.parse=h,"undefined"!=typeof module&&"object"==typeof exports?module.exports=h:"function"==typeof define&&define.amd?define(function(){return h}):this.marked=h}).call(function(){return this||("undefined"!=typeof window?window:global)}());