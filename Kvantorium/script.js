//ПРЕЛОАДЕР


document.body.onload = function(){
	setTimeout(function(){
		var preloader = document.getElementById('loadFix');
		if(!preloader.classList.contains('done')){
			preloader.classList.add('done');
		}
	},1000);
}







//Вставка фона на шапку при прокрутке
//Для главной страницы
var menu = document.getElementById('nav');


window.onscroll = function() {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;

  if(scrolled > 500){
	nav.style.background = '#222222';
}

  else {nav.style.background = 'transparent';}
}




//Для экскурсий
var eks = document.getElementById('eksNav');

window.onscroll = function() {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;

  if(scrolled > 200){
	eks.style.background = '#222222';
}

  else {eks.style.background = 'transparent';}
}


//Для команды
var team = document.getElementById('team');

window.onscroll = function() {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;

  if(scrolled > 200){
	team.style.background = '#222222';
}

  else {team.style.background = 'transparent';}
}

//Кнопка при нажатии переносит в самый верх страницы

var scrolled;
var timer;

document.getElementById('scroll').onclick = function(){
	scrolled = window.pageYOffset;
	scrollTop();
}

function scrollTop(){
	if (scrolled > 0) {
		window.scrollTo(0, scrolled);
		scrolled = scrolled - 120;
		timer = setTimeout(scrollTop, 20);
	}

	else{
		clearTimeout(timer);
		window.scrollTo(0,0);
	}
}


     $(window).scroll(function (){
        $(' .mov2').each(function (){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+300) {
                $(this).addClass('bounceInLeft');
            }
        });
    });﻿

     $(window).scroll(function (){
        $(' .sm-order-1').each(function (){
            var imagePos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+300) {
                $(this).addClass('bounceInLeft');
            }
        });
    });﻿


