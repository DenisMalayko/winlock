var header = {
	fadeUp:function(){
		setTimeout(function () {
			$('.header_top').addClass('animate');
		}, 500)
		setTimeout(function () {
			$('.header_menu').addClass('animate');
		}, 1000)
	},
	menuOpen: function(){
		$('body').addClass('overflow');
		$('header').addClass('open');

		$('.header_icon div').removeClass('no-animate')	

		setTimeout(function () {
			$('.header__list li').each((index, element) => {
				setTimeout(() => element.classList.add('animate'), 100 * index)
			});
	    }, 500);
	    
	},
	menuClose: function(){
		$('body').removeClass('overflow');	
		setTimeout(function () {
			$('.header__list li').each((index, element) => {
				setTimeout(() => element.classList.remove('animate'), 100 * index)
			});
	    }, 100);
	   
	    setTimeout(function () {
			$('header').removeClass('open');
		}, 800)
	}
}


$(document).ready(function(){

	// Header
	// -------------------------------------- //
	header.fadeUp();


	$(".header-menu-list > li")
	.mouseenter(function() {
		$(this).addClass('is-active');
	})
	.click(function() {
		$(this).addClass('is-active');
	})
	.mouseleave(function() {
		$(this).removeClass('is-active');
	});



	$('.header_icon').click(function(){
		$(this).toggleClass('open_menu');
		if($('.header_icon').hasClass('open_menu')){
			header.menuOpen()
		}else{
			header.menuClose();
		}
	});

	$('.header-menu-list > li').each(function(){
		$(this).find('.header-menu--list').parent('li').addClass('has-menu');
	});

	if($(window).width() < 1025 ){
		$('.header__list li.has_menu > a').removeAttr("href")
	}

	// -------------------------------------- //

	$(window).scroll(function(){
		if($(window).scrollTop() > 10){
			$('.header').addClass('fixed')
		} else {
			$('.header').removeClass('fixed')
		}
	})

	let pageName = $('#wrapper').attr('class');
	switch (pageName) {

		case 'page_home':

			if($('.folder-slide').length > 1){

				// Вивести навігацію для сладеру з Фолдеру
				$('.folder-nav').addClass('open')

				// Ініціалізація слайдеру
				// -------------------------
				$('.folder-slider').slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					fade: true,
					infinite: true,
					arrows: true,
					prevArrow: '.btn-prev',
					nextArrow: '.btn-next',
					touchThreshold: 15
				});

				// Вивести всі слайди
				// -------------------------
				$('.folder-slider').find('.folder-slide').each(function (b) {
					b += 1;
					var numGallery = b;
					if (numGallery < 10) {
						numGallery = '0' + numGallery
					}
					$(this).parents('.folder').find('.folder-nav-count .all').html(numGallery);
				});

				// Додати 0 в активний слайд
				// -------------------------
				function ZeroCount(n) {
					return "0".substring(n >= 10) + n;
				}

				// Вивести активний слайд
				// -------------------------
				$('.folder-slider').on('init reInit afterChange', function (event, slick, currentSlide) {
					currentSlide++;
					let current = ZeroCount(currentSlide);
					$('.folder-nav-count .current').text(current)
				});
			}

		break;
	}
});