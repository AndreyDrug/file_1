// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Флейта","Как звучит кларнет","Валторна", "Фагот"],
    "crushdrummers.ru":["Барабанное шоу", "Заказать шоу барабанщиков", "Барабанщики на праздник москва"]
}
let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)];
let worlds = sites[site];
let yandexInput = document.getElementsByName("text")[0];
let word = worlds[getIntRandom(0, worlds.length)];
let train = document.getElementsByClassName("button mini-suggest__button button_theme_search button_size_search i-bem")[0];
if(train != undefined){
    document.cookie = "site="+site;
    let i = 0;                                                           // проверка на то что главная страница яндекс
    let timerId = setInterval(()=>{
        yandexInput.value += word[i++];
        if(i==word.length){
        clearInterval(timerId);
        train.click();
       }
    },1000);
 }else if(location.hostname == "yandex.ru"){                            // проверка на то что вообще находимся на яндексе

    let links = document.links;
    let next = document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem");
    let goNextPage = true;
    let currentPage = +document.querySelector(".pager__item_kind_page").innerText;
     for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) != -1){
             setTimeout(function(){
            link.click();
             },2000)
            goNextPage = false;
            break; // команда стоп
        }
    }
     if(goNextPage && currentPage<8) setTimeout(function() {next.click();}, 1800);
     else if(goNextPage) location.href = "https://yandex.ru/";
 }else{                                                                 // ветка другого сайта
     let site = getCookie('site');
     let links = document.links;
     let index = getIntRandom(0, links.length)
     setTimeout(()=>{
        if(links[index].href.indexOf(location.pathname) != -1)
            links[index].click();
        else location.href = "https://yandex.ru/";
    }, 2000);
     console.log("Мы находимся на другом сайте");
    }
function getIntRandom(min,max){
 return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
