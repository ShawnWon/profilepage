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
	var loaderDismissed = false;
	var loaderPage = function() {
		if (loaderDismissed) return;
		loaderDismissed = true;
		$(".fh5co-loader").delay(1000).fadeOut(1500);
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
			var imgs = document.images, len = imgs.length, counter = 0;
			var fallbackTimer = setTimeout(function(){
				loaderPage();
			}, 2500);

			if (len === 0) {
				clearTimeout(fallbackTimer);
				loaderPage();
				return;
			}

			function incrementCounter(){
				counter++;
				if(counter >= len){
					clearTimeout(fallbackTimer);
					loaderPage();
				}
			}

			[].forEach.call(imgs, function(img){
				if(img.complete) {
					incrementCounter();
				} else {
					img.addEventListener('load', incrementCounter, false);
					img.addEventListener('error', incrementCounter, false);
				}
			});
		});

	});

	var words = ['Software Developer','Certified AWS DevOps','Certified Kubernetes Administrator', 'System Analyst', 'Cyclist', 'Photographer'],
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
    var firstLetter = (part.charAt(0) || '').toLowerCase();
    var article = (firstLetter === 'a' || firstLetter === 'e' || firstLetter === 'i' || firstLetter === 'o' || firstLetter === 'u') ? 'An ' : 'A ';
    $('.word').text(article + part);
  },speed);
};

// Scroll Progress Bar Tracker
var initScrollProgressBar = function() {
  var $bar = $('#scroll-progress-bar');
  if (!$bar.length) {
    $('body').prepend('<div id="scroll-progress-bar"></div>');
    $bar = $('#scroll-progress-bar');
  }

  var $page = $('#page');

  function updateProgress() {
    var winScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var docHeight = (document.documentElement.scrollHeight || document.body.scrollHeight || 0) - window.innerHeight;

    // Check if #page is an internal scroll container
    var pageElem = $page[0];
    if (pageElem && pageElem.scrollHeight > pageElem.clientHeight && pageElem.scrollTop > 0) {
      winScroll = pageElem.scrollTop;
      docHeight = pageElem.scrollHeight - pageElem.clientHeight;
    }

    var progress = docHeight > 0 ? (winScroll / docHeight) * 100 : 0;
    progress = Math.min(100, Math.max(0, progress));
    $bar.css('width', progress + '%');
  }

  $(window).on('scroll resize', updateProgress);
  $page.on('scroll', updateProgress);
  updateProgress();
};

// Interactive Hero Parallax on Mouse Move
var initHeroParallax = function() {
  var $hero = $('#fh5co-header');
  var $parallaxLayer = $hero.find('.hero-content-parallax');

  if (!$hero.length || !window.matchMedia('(pointer: fine)').matches) return;

  var currentX = 0, currentY = 0;
  var targetX = 0, targetY = 0;

  $hero.on('mouseleave', function() {
    targetX = 0;
    targetY = 0;
  });

  $hero.on('mousemove', function(e) {
    var rect = this.getBoundingClientRect();
    var relX = (e.clientX - rect.left) - rect.width / 2;
    var relY = (e.clientY - rect.top) - rect.height / 2;
    targetX = relX / (rect.width / 2); // -1 to 1
    targetY = relY / (rect.height / 2);
  });

  function renderParallax() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    if ($parallaxLayer.length) {
      $parallaxLayer.css('transform', 'translate3d(' + (currentX * 12) + 'px, ' + (currentY * 8) + 'px, 0)');
    }

    requestAnimationFrame(renderParallax);
  }

  requestAnimationFrame(renderParallax);
};

// Terminal Boot Sequence for Contact Me
var initContactTerminal = function () {
  var $terminal = $('#contactTerminalBody');
  var $btn = $('#contactBootBtn');
  var $btnText = $('#contactBtnText');
  if (!$terminal.length || !$btn.length) return;

  var hasTriggered = false;

  var scriptLines = [
    { type: 'cmd', prompt: 'shawn@station:~$', text: 'systemctl boot contact-service.sh' },
    { type: 'info', prefix: '[ OK ]', text: 'Initiating quantum handshake protocol...' },
    { type: 'info', prefix: '[ OK ]', text: 'Secure communication channel established.' },
    { type: 'info', prefix: '[READY]', text: 'Looking for visionary collaborators & new ventures.' },
    { type: 'cmd', prompt: 'shawn@station:~$', text: './contact --execute' }
  ];

  function runBootSequence() {
    $terminal.empty();
    var currentLineIndex = 0;

    function typeLine() {
      if (currentLineIndex >= scriptLines.length) {
        // All lines typed, trigger button transform
        transformButton();
        return;
      }

      var item = scriptLines[currentLineIndex];
      var $line = $('<div class="terminal-line"></div>');
      $terminal.append($line);

      var $cursor = $('<span class="terminal-cursor"></span>');

      if (item.type === 'cmd') {
        var $prompt = $('<span class="t-prompt"></span>').text(item.prompt);
        var $cmd = $('<span class="t-cmd"></span>');
        $line.append($prompt).append($cmd).append($cursor);

        var charIndex = 0;
        var cmdInterval = setInterval(function () {
          if (charIndex < item.text.length) {
            $cmd.text($cmd.text() + item.text.charAt(charIndex));
            charIndex++;
          } else {
            clearInterval(cmdInterval);
            $cursor.remove();
            currentLineIndex++;
            setTimeout(typeLine, 350);
          }
        }, 32);
      } else {
        // System status line
        var $prefix = $('<span class="t-success"></span>').text(item.prefix + ' ');
        var $info = $('<span class="t-info"></span>');
        $line.append($prefix).append($info).append($cursor);

        var charIdx = 0;
        var infoInterval = setInterval(function () {
          if (charIdx < item.text.length) {
            $info.text($info.text() + item.text.charAt(charIdx));
            charIdx++;
          } else {
            clearInterval(infoInterval);
            $cursor.remove();
            currentLineIndex++;
            setTimeout(typeLine, 220);
          }
        }, 18);
      }
    }

    typeLine();
  }

  function transformButton() {
    // Add blinking cursor to the final prompt in terminal
    var $finalCursor = $('<span class="terminal-cursor"></span>');
    $terminal.find('.terminal-line:last-child').append($finalCursor);

    // Glitch / flip transform from ./contact to Let's talk
    setTimeout(function () {
      $btnText.addClass('text-glitch');
      setTimeout(function () {
        $btnText.text("Let's talk");
        $btnText.removeClass('text-glitch');
        $btn.removeClass('disabled').addClass('btn-ready');
      }, 350);
    }, 450);
  }

  // Trigger when scrolled into view
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;
          observer.disconnect();
          setTimeout(runBootSequence, 300);
        }
      });
    }, { threshold: 0.25 });

    var targetSection = document.getElementById('fh5co-started');
    if (targetSection) {
      observer.observe(targetSection);
    }
  } else {
    // Fallback: Waypoint or scroll
    $('#fh5co-started').waypoint(function () {
      if (!hasTriggered) {
        hasTriggered = true;
        setTimeout(runBootSequence, 300);
      }
    }, { offset: '75%' });
  }
};

$(document).ready(function () {
	
  wordflick();
  initScrollProgressBar();
  initHeroParallax();
  initContactTerminal();

  var scrollTargets = {
    '#headerarrow': '#portfolio',
    '#portfolioarrow': '#myjourney',
    '#journeyarrow': '#myblog',
    '#blogarrow': '#aboutme',
    '#aboutarrow': '#contact'
  };

  $.each(scrollTargets, function(arrowId, targetId) {
    $(arrowId).on('click', function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var target = $(targetId);
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 800, 'easeInOutExpo');
      }
    });
  });
});


}());
