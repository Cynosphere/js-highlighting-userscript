// ==UserScript==
// @name         JS Highlighting
// @namespace    https://c7.pm
// @version      1.0
// @description  Adds a JS/CSS syntaxing and prettying to files
// @author       Cynosphere
// @include      http://*
// @include      https://*
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?gitlab\.com(:[0-9]{1,5})?\/.*$)/
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?github\.com(:[0-9]{1,5})?\/.*$)/
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?gitdab\.com(:[0-9]{1,5})?\/.*$)/
// @grant        none
// ==/UserScript==

var url = window.location.href;
if(url.includes("hastebin.com") && !url.includes("hastebin.com/raw/")) return;
if(url.includes("mystb.in") && !url.includes("mystb.in/raw/")) return;
if(document.contentType != "text/css" && document.contentType != "application/javascript" && document.contentType != "application/json") return;

var css = document.createElement("style");
css.innerHTML = [
  "body {",
  "  margin:0!important;",
  "}",
  "",
  "pre {",
  "  margin:0!important;",
  "  top:0;",
  "  left:0;",
  "  position:absolute;",
  "  width:100%;",
  "  height:100%;",
  "}"
].join("\n");
document.head.appendChild(css);
document.body.className = "hljs";

var hljs = document.createElement("script");
hljs.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js";
var hljs_js = document.createElement("script");
hljs_js.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/javascript.min.js";
var hljs_css = document.createElement("script");
hljs_css.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/css.min.js";
var hljs_style = document.createElement("link");
hljs_style.rel = "stylesheet";
hljs_style.href = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css";
var hljs_load = document.createElement("script");
hljs_load.innerHTML = "hljs.configure({languages:['css','js']});hljs.initHighlighting();";
var jsbeautify = document.createElement("script");
jsbeautify.src = "//cdnjs.cloudflare.com/ajax/libs/js-beautify/1.7.4/beautify.min.js";
var cssbeautify = document.createElement("script");
cssbeautify.src = "//cdnjs.cloudflare.com/ajax/libs/js-beautify/1.7.4/beautify-css.min.js";


var jsb = document.createElement("script");
jsb.innerHTML = "document.body.children[0].children[0].innerHTML = js_beautify(document.body.children[0].children[0].innerHTML);";

var cssb = document.createElement("script");
cssb.innerHTML = "document.body.children[0].children[0].innerHTML = css_beautify(document.body.children[0].children[0].innerHTML);";

document.head.appendChild(hljs);
document.head.appendChild(hljs_js);
document.head.appendChild(hljs_css);
document.head.appendChild(hljs_style);
document.head.appendChild(jsbeautify);
document.head.appendChild(cssbeautify);

var pre = document.body.children[0];
var insides = pre.innerHTML;
pre.innerHTML = "";
var code = document.createElement("code");
code.innerHTML = insides;
pre.appendChild(code);

setTimeout(()=>{
    if(document.contentType == "text/css"){
        document.head.appendChild(cssb);
    }else if (document.contentType == "application/javascript" || document.contentType == "application/json"){
        document.head.appendChild(jsb);
    }

    document.head.appendChild(hljs_load);
},1000);
