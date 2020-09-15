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


	$('.footer-item-top').on('click', function(){
		$('.footer-item-list').not($(this).next()).removeClass('active');
		$(this).next().toggleClass('active');
	});






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
					prevArrow: '.folder-nav .btn-prev',
					nextArrow: '.folder-nav .btn-next',
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

				$('.doors-list a').on('click', function(){

					$('.doors-list a').removeClass('active')
					$(this).addClass('active')

					$('.doors-photo').each(function(){
						$(this).removeClass('active');
					});
					$($(this).attr('href')).addClass('active');
					return false;

				});
			}

			if($(window).width() < 768){
				$('.warehouse-body').slick({
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					arrows: true,
					prevArrow: '.warehouse .btn-prev',
					nextArrow: '.warehouse .btn-next',
					touchThreshold: 15
				})
			}

		break;
		case 'page_catalog':
			$('.sidebar-item-top').on('click', function(){
				$(this).parent('.sidebar-item').toggleClass('open')
			});

			$('.catalog-top-filter').on('click', function(){
				$('body').addClass('overflow')
				$('.sidebar').addClass('open')
			})

			if($(window).width() < 767){
				$(document).mouseup(function (e){
					var block = $(".sidebar");
					if (!block.is(e.target)
						&& block.has(e.target).length === 0) {
						block.removeClass('open');
						$('body').removeClass('overflow')
					}
				});
			}

			$('.sidebar-clear').click(function () {
				$('.sidebar input').prop('checked', false);
			});



		break;
	}
});




// Init Map
//----------------------------------------------------//
var map, infoWindow, markersData = [{
	lat: 48.323039,
	lng: 25.917981
}];

function initMap() {
	var e = {
		center: new google.maps.LatLng(48.323039, 25.913981),
		zoom: 15,
		styles: [
			{
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#ebe3cd"
					}
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#523735"
					}
				]
			},
			{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#f5f1e6"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#c9b2a6"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#dcd2be"
					}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#ae9e90"
					}
				]
			},
			{
				"featureType": "landscape.natural",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dfd2ae"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dfd2ae"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#93817c"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#a5b076"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#447530"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f5f1e6"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#fdfcf8"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#f8c967"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#e9bc62"
					}
				]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#e98d58"
					}
				]
			},
			{
				"featureType": "road.highway.controlled_access",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#db8555"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#806b63"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dfd2ae"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#8f7d77"
					}
				]
			},
			{
				"featureType": "transit.line",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#ebe3cd"
					}
				]
			},
			{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#dfd2ae"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#b9d3c2"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#92998d"
					}
				]
			}
		]
	};
	map = new google.maps.Map(document.getElementById("map"), e), infoWindow = new google.maps.InfoWindow;
	for (var a = 0; a < markersData.length; a++) {
		addMarker(new google.maps.LatLng(markersData[a].lat, markersData[a].lng), markersData[a].name, markersData[a].address)
	}
}

function addMarker(e, a, o) {
	new google.maps.Marker({
		position: new google.maps.LatLng(48.323039, 25.917981),
		map: map,
		title: a,
		icon: 'img/icons/marker.png'
	}).addListener("click", function() {
		window.open('https://www.google.com/maps/dir/?api=1&map_action=map,Ukraine,Chernivtsi&destination=Zavodska Street,37','_blank');
	})
}
