jQuery(function($){

var BRUSHED = window.BRUSHED || {};

/* ==================================================
   Mobile Navigation
================================================== */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

BRUSHED.mobileNav = function(){
	var windowWidth = $(window).width();
	
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('#menu');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
}

BRUSHED.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		if ($('#mobile-nav').hasClass('open')) {
			$('#navigation-mobile').slideDown(500, 'easeOutExpo');
		} else {
			$('#navigation-mobile').slideUp(500, 'easeOutExpo');
		}
		e.preventDefault();
	});
	
	$('#menu-nav-mobile a').on('click', function(){
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').slideUp(350, 'easeOutExpo');
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


$(".open_fancybox1").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox1/1.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox2").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox2/1.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox3").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox3/1.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox4").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox4/1.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox5").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox5/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox5/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox5/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox5/4.png',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox5/5.png',
            
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox6").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox6/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox6/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox6/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox6/4.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox6/5.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox6/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox6/7.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox6/8.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox6/9.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox6/10.jpg',
            
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox7").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox7/1.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox8").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox8/1.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox9").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox9/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox9/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox9/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox9/4.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox9/5.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox9/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox9/7.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox10").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox10/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox10/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox10/3.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox10/4.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox10/5.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox10/6.jpg',
           
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox11").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox11/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox11/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox11/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox11/4.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox11/5.jpg',
            
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox12").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox12/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox12/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox12/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox12/4.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox12/5.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox12/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox12/7.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox12/8.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox12/9.jpg',
            
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox13").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox13/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox13/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox13/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox13/4.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox13/5.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox13/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox13/7.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox14").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox14/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox14/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox14/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox14/4.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox14/5.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox14/6.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox15").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox15/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox15/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox15/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox15/4.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox15/5.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox15/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox15/7.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox15/8.jpg',
           
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox16").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox16/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox16/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox16/3.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox16/4.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox16/5.jpg',
            
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox16/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox16/7.jpg',
             
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox17").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox17/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox17/2.png',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox17/3.png',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox17/4.png',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox17/5.png',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox17/6.png',
           
        },
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox18").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox18/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/3.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/4.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/5.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/6.jpg',
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/7.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/8.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/9.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/10.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/11.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/12.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/13.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/14.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/15.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/16.jpg',
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox18/17.jpg',
           
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox19").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox19/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/3.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/4.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/5.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/6.jpg',
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/7.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/8.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/9.jpg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/10.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/11.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox19/12.jpg',
             
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox20").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox20/1.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox20/2.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox20/3.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox20/4.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox20/5.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox20/6.jpeg',
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox20/7.jpeg',
           
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox21").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox21/1.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox21/2.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox21/3.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox21/4.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox21/5.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox21/6.jpeg',
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox22").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox22/1.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox22/2.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox22/3.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox22/4.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox22/5.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox22/6.jpeg',
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox22/7.jpeg',
           
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox23").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox23/1.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox23/2.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox23/3.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox23/4.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox23/5.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox23/6.jpeg',
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox23/7.jpeg',
           
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox24").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox24/1.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox24/2.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox24/3.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox24/4.jpeg',
           
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox25").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox25/1.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox25/2.jpeg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox25/3.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox25/4.jpeg',
           
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox25/5.jpeg',
           
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox26").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox26/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/3.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/4.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/5.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/7.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/8.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/10.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/11.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/13.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox26/14.jpg',
             
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox26/16.jpg',
           
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox26/17.jpg',
             
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox27").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox27/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/3.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/4.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/5.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/7.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/8.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/9.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/10.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/11.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/12.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/13.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox27/14.jpg',
             
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox27/15.jpg',
             
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox27/16.jpg',
             
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox27/17.jpg',
             
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox27/18.jpg',
             
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox27/19.jpg',
             
        },
		{
            href : '_include/img/work/FancyBoxes/fancybox27/20.jpg',
             
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
                }
            }
        }
    });
    return false;
});

$(".open_fancybox28").click(function() {
    $.fancybox.open([
        {
            href : '_include/img/work/FancyBoxes/fancybox28/1.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/2.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/3.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/4.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/5.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/6.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/7.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/8.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/9.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/10.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/11.jpg',
             
        },
        {
            href : '_include/img/work/FancyBoxes/fancybox28/12.jpg',
             
        }
    ], {
        nextEffect : 'none',
        prevEffect : 'none',
        padding    : 0,
        helpers    : {
            title : {
                type: 'none'  
            },
            thumbs : {
                width  : 85,
                height : 60,
                source : function( item ) {
                    return item.href.replace('_b.jpg', '_s.jpg');
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
		filter: ':not(.external)'
	});
	
	// Fallback direct handler for menu links
	$('#menu-nav a, #menu-nav-mobile a').on('click', function(e){
		var href = $(this).attr('href');
		if(href && href.indexOf('#') === 0 && href.length > 1){
			var $target = $(href);
			if($target.length > 0){
				e.preventDefault();
				var targetOffset = $target.offset().top - 30;
				$('html, body').animate({scrollTop: targetOffset}, 750, 'easeOutExpo');
			}
		}
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
