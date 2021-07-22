// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let worlds = ["Гобой", "Флейта", "Как звучит кларнет", "Валторна", "Фагот"];
let yandexInput = document.getElementsByName("text")[0];
yandexInput.value= worlds[getIntRandom(0, worlds.length)];
let train = document.getElementsByClassName("button mini-suggest__button button_theme_search button_size_search i-bem button_js_inited")[0];
if(train != undefined){
    setTimeout(function(){
    train.click();
         },1500);
}else{
    let links = document.links;
    let next = document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem link_js_inited");
    let goNextPage = true;
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
             setTimeout(function(){
            link.click();
             },2000)
            goNextPage = false;
            break; // команда стоп
        }
    }
if(goNextPage) setTimeout(function() {next.click();}, 1800);
    }
function getIntRandom(min,max){
return Math.floor(Math.random()*(max-min)+min);
}
