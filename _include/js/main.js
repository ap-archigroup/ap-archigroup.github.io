// All index files are now at root level - no basePath needed
var basePath = '';

jQuery(function($){

var BRUSHED = window.BRUSHED || {};

/* ==================================================
   Mobile Navigation
================================================== */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');
var backdrop = $('<div class="mobile-menu-backdrop"></div>');

BRUSHED.mobileNav = function(){
	var windowWidth = $(window).width();
	
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 && $('#navigation-mobile').length === 0 ) {
			mobileMenuClone.insertAfter('header');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
			backdrop.insertAfter('header');
		}
	} else {
		$('#navigation-mobile').removeClass('show');
		$('.mobile-menu-backdrop').removeClass('show');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
		$('body').css('overflow', 'auto');
	}
}

BRUSHED.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		if ($('#mobile-nav').hasClass('open')) {
			$('#navigation-mobile').addClass('show');
			$('.mobile-menu-backdrop').addClass('show');
			$('body').css('overflow', 'hidden');
		} else {
			$('#navigation-mobile').removeClass('show');
			$('.mobile-menu-backdrop').removeClass('show');
			$('body').css('overflow', 'auto');
		}
		e.preventDefault();
	});
	
	// Close menu when clicking a link
	$('#menu-nav-mobile a').on('click', function(){
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').removeClass('show');
		$('.mobile-menu-backdrop').removeClass('show');
		$('body').css('overflow', 'auto');
	});
	
	// Close menu when clicking backdrop
	$(document).on('click', '.mobile-menu-backdrop', function(){
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').removeClass('show');
		$('.mobile-menu-backdrop').removeClass('show');
		$('body').css('overflow', 'auto');
	});
}


/* ==================================================
   Slider Options
================================================== */

BRUSHED.slider = function(){
	$.supersized({
		// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Pauses slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   8000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	300,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   1,			// Keyboard navigation on/off
		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position						   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		vertical_center         :   1,			// Vertically center background
		horizontal_center       :   1,			// Horizontally center background
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait         	:   1,			// Portrait images will not exceed browser height
		fit_landscape			:   0,			// Landscape images will not exceed browser width
												   
		// Components							
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	0,			// Individual thumb links for each slide
		thumbnail_navigation    :   0,			// Thumbnail navigation
		slides 					:  	[			// Slideshow Images
            {image : '_include/img/main.jpg', title : '<div class="slide-content">Brushed</div>', thumb : '', url : ''},
								
									],
									
		// Theme Options			   
		progress_bar			:	0,			// Timer for each slide							
		mouse_scrub				:	0
		
	});

}


/* ==================================================
   Navigation Fix
================================================== */

BRUSHED.nav = function(){
	$('.sticky-nav').waypoint('sticky');
}


/* ==================================================
   Filter Works
================================================== */

BRUSHED.filter = function (){
	if($('#thumbs').length > 0){		
		var $container = $('#thumbs');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows'
			});
			
			// Force multiple layout refreshes to ensure proper alignment
			setTimeout(function() {
				$container.isotope('layout');
			}, 100);
			
			setTimeout(function() {
				$container.isotope('layout');
			}, 500);
			
			setTimeout(function() {
				$container.isotope('layout');
			}, 1000);
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#options .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}


/* ==================================================
   FancyBox
================================================== */
$(document).ready(function() {
	$(".various").fancybox({
		scrolling : 'auto',	
		maxWidth	: 1000,
		maxHeight	: 900,
		fitToView	: false,
		width		: '95%',
		height		: '80%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'yes'
	});
});


/* Service Pages - Open in iframe */
$(".open_service_architecture").click(function(e) {
    e.preventDefault();
    console.log('Architecture service clicked!');
    var cacheBuster = '?v=' + new Date().getTime();
    console.log('Opening:', basePath + 'services/architecture.html' + cacheBuster);
    $.fancybox.open({
        href: basePath + 'services/architecture.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});

$(".open_service_constructing").click(function(e) {
    e.preventDefault();
    console.log('Constructing service clicked!');
    var cacheBuster = '?v=' + new Date().getTime();
    console.log('Opening:', basePath + 'services/constructing.html' + cacheBuster);
    $.fancybox.open({
        href: basePath + 'services/constructing.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});

$(".open_service_furnishing").click(function(e) {
    e.preventDefault();
    console.log('Furnishing service clicked!');
    var cacheBuster = '?v=' + new Date().getTime();
    console.log('Opening:', basePath + 'services/furnishing.html' + cacheBuster);
    $.fancybox.open({
        href: basePath + 'services/furnishing.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});

/* EN Service Pages - Open in iframe */
$(".open_service_architecture_en").click(function(e) {
    e.preventDefault();
    var cacheBuster = '?v=' + new Date().getTime();
    $.fancybox.open({
        href: basePath + 'EN/services/architecture.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});

$(".open_service_constructing_en").click(function(e) {
    e.preventDefault();
    var cacheBuster = '?v=' + new Date().getTime();
    $.fancybox.open({
        href: basePath + 'EN/services/constructing.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});

$(".open_service_furnishing_en").click(function(e) {
    e.preventDefault();
    var cacheBuster = '?v=' + new Date().getTime();
    $.fancybox.open({
        href: basePath + 'EN/services/furnishing.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});

/* RU Service Pages - Open in iframe */
$(".open_service_architecture_ru").click(function(e) {
    e.preventDefault();
    var cacheBuster = '?v=' + new Date().getTime();
    $.fancybox.open({
        href: basePath + 'RU/services/architecture.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});

$(".open_service_constructing_ru").click(function(e) {
    e.preventDefault();
    var cacheBuster = '?v=' + new Date().getTime();
    $.fancybox.open({
        href: basePath + 'RU/services/constructing.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});

$(".open_service_furnishing_ru").click(function(e) {
    e.preventDefault();
    var cacheBuster = '?v=' + new Date().getTime();
    $.fancybox.open({
        href: basePath + 'RU/services/furnishing.html' + cacheBuster,
        type: 'iframe',
        width: '90%',
        height: '90%',
        autoSize: false,
        fitToView: false,
        aspectRatio: false,
        scrolling: 'auto',
        padding: 0,
        margin: [20, 60, 20, 60],
        openEffect: 'fade',
        closeEffect: 'fade',
        closeBtn: true,
        iframe: {
            preload: true
        },
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0, 0, 0, 0.75)',
                    'backdrop-filter': 'blur(10px)',
                    '-webkit-backdrop-filter': 'blur(10px)'
                }
            }
        }
    });
    return false;
});


/* ==================================================
   Twitter Feed
================================================== */

BRUSHED.tweetFeed = function(){
	
	var valueTop = -64; // Margin Top Value
	
    $("#ticker").tweet({
          modpath: '_include/js/twitter/',
          username: "Bluxart", // Change this with YOUR ID
          page: 1,
          avatar_size: 0,
          count: 10,
		  template: "{text}{time}",
		  filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
          loading_text: "loading ..."
	}).bind("loaded", function() {
	  var ul = $(this).find(".tweet_list");
	  var ticker = function() {
		setTimeout(function() {
			ul.find('li:first').animate( {marginTop: valueTop + 'px'}, 500, 'linear', function() {
				$(this).detach().appendTo(ul).removeAttr('style');
			});	
		  ticker();
		}, 5000);
	  };
	  ticker();
	});
	
}


/* ==================================================
   Menu Highlight
================================================== */

BRUSHED.menu = function(){
	$('#menu-nav, #menu-nav-mobile').onePageNav({
		currentClass: 'current',
    	changeHash: false,
    	scrollSpeed: 750,
    	scrollOffset: 30,
    	scrollThreshold: 0.5,
		easing: 'easeOutExpo',
		filter: ':not(.external):not(.submenu a)'
	});
	
	// Allow submenu links to work as regular links
	$('#menu-nav .submenu a, #menu-nav-mobile .submenu a').on('click', function(e) {
		e.stopPropagation();
		// Let the link work normally
	});
}

/* ==================================================
   Next Section
================================================== */

BRUSHED.goSection = function(){
	$('#nextsection').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}

/* ==================================================
   GoUp
================================================== */

BRUSHED.goUp = function(){
	$('#goUp').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}


/* ==================================================
	Scroll to Top
================================================== */

BRUSHED.scrollToTop = function(){
	var windowWidth = $(window).width(),
		didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	})

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);
}

/* ==================================================
   Thumbs / Social Effects
================================================== */

BRUSHED.utils = function(){
	
	$('.item-thumbs').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
	$('.image-wrap').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
	$('#social ul li').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
}
 
/* ==================================================
   Accordion
================================================== */

BRUSHED.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Toggle
================================================== */

BRUSHED.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Tooltip
================================================== */

BRUSHED.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}


/* ==================================================
	Init
================================================== */

BRUSHED.slider();

$(document).ready(function(){
	Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: '_include/js/placeholder.js', 
		complete : function() {
				if (!Modernizr.placeholder) {
						Placeholders.init({
						live: true,
						hideOnFocus: false,
						className: "yourClass",
						textColor: "#999"
						});    
				}
		}
	}
	]);
	
	// Preload the page with jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: true,
		autoClose: true,
		splashFunction: function() {
			$('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
		}
	});
	
	// Initialize projects loader - detect language from page
	if (typeof ProjectsLoader !== 'undefined') {
		var lang = 'fr'; // default
		if (window.location.pathname.indexOf('indexEN') !== -1 || window.location.pathname.indexOf('/EN/') !== -1) {
			lang = 'en';
		} else if (window.location.pathname.indexOf('indexRU') !== -1 || window.location.pathname.indexOf('/RU/') !== -1) {
			lang = 'ru';
		}
		ProjectsLoader.init(lang);
	}
	
	BRUSHED.nav();
	BRUSHED.mobileNav();
	BRUSHED.listenerMenu();
	BRUSHED.menu();
	BRUSHED.goSection();
	BRUSHED.goUp();
	BRUSHED.filter();
	BRUSHED.fancyBox();
	BRUSHED.contactForm();
	BRUSHED.tweetFeed();
	BRUSHED.scrollToTop();
	BRUSHED.utils();
	BRUSHED.accordion();
	BRUSHED.toggle();
	BRUSHED.toolTip();
});

$(window).resize(function(){
	BRUSHED.mobileNav();
});

});



