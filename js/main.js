;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").delay(2000).fadeOut(2000);
	};

	//adjust img aspect ratio
	var adjustImgRatio = function() {
		console.log(window.innerHeight/window.innerWidth);
		if (window.innerHeight/window.innerWidth < 1.25)
		{
			$(".card__image").css("margin-top", (window.innerHeight/window.innerWidth -1.25)*50  - 20  +"px");
			$(".card__cover").show();
		}
		if (window.innerHeight/window.innerWidth < 0.7)
		{
			$(".card__cover").hide();
		}
	}
	
	$(function(){
		contentWayPoint();
		goToTop();
		//loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
		adjustImgRatio();
		$(document).ready(function(){
			var imgs = document.images, len = imgs.length, counter =0;
			[].forEach.call(imgs, function(img){
				if(img.complete) incrementCounter();
				else
					img.addEventListener('load', incrementCounter, false);
			});
	
			function incrementCounter(){
				counter++;
				if(counter===len){
					loaderPage();
				}
			}
		});

	});

	var words = ['Software Developer', 'System Analyst', 'Cyclist', 'Photographer'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text('A ' +part);
  },speed);
};

$(document).ready(function () {
	
  wordflick();

  $("#headerarrow").on('click',function(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
	const el = document.getElementById('page');
	el.scrollBy({
		top:1,
		behavior:'smooth'
	});
});

$("#portfolioarrow").on('click',function(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
	const el = document.getElementById('page');
	el.scrollBy({
		top:2,
		behavior:'smooth'
	});
});
$("#journeyarrow").on('click',function(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
	const el = document.getElementById('page');
	el.scrollBy({
		top:3,
		behavior:'smooth'
	});
});
$("#blogarrow").on('click',function(event) {
	event.preventDefault();
	event.stopImmediatePropagation();
	const el = document.getElementById('page');
	el.scrollBy({
		top:4,
		behavior:'smooth'
	});
});

});

}());

