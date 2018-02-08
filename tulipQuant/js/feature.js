
$(function(){


	/*--------------------------------------------------
    Scrollspy Bootstrap 
    ---------------------------------------------------*/

    $('body').scrollspy({
    	target: '#main-navbar',
    	offset: 78
    });


    /*--------------------------------------------------
    Affix Bootstrap 
    ---------------------------------------------------*/ 

    $('#main-navigation').affix({
        offset: {
            top: function() {
                var windowHeight = $(window).height();
                // Calculate distance from the top 
                // in accordance with home section height
                if(windowHeight > 568 & windowHeight < 1050) {
                    return windowHeight;
                } else if(windowHeight <= 568) {
                    return 568;
                } else {
                    return 1050;
                }
            }
        }
    });


	/*--------------------------------------------------
    Smooth Scroll 
    ---------------------------------------------------*/

	smoothScroll.init({
		selector: '.smoothScroll',
		speed: 1000,
		offset: function(){
            // Check if mobile navigation is active
            var query = Modernizr.mq('(max-width: 767px)');
            // Check if navbar is fixed
            var navFix = $("#main-navigation").hasClass('affix');
            // Check if navbar-collapse is not collapsed
            var navExt = $('#main-navbar').hasClass('in');
            // Calculate offset
            if(query && navExt && !navFix) {
                return (78 + $("#main-navbar").height());
            } else {
                return 78;
            }
        },
		before: function(anchor, toggle){
			// Check if mobile navigation is active
			var query = Modernizr.mq('(max-width: 767px)');
			// Check if element is navigation eelement
			var navItem = $(toggle).parents("#main-navbar").length;
			// If mobile nav & nav item then close nav
			if (query && navItem !== 0) {
				$("button.navbar-toggle").click();
			}
		}
	});

    /*--------------------------------------------------
    Mobile navigation fix
    ---------------------------------------------------*/
    
    var setNavHeight = function(){
        // Check if mobile navigation is active
        var query = Modernizr.mq('(max-width: 767px)');
        // Set navbar-collapse maxHeight
        if(query) {
            $(".navbar-collapse").css({ 
                maxHeight: $(window).height() - $(".navbar-header").height() + "px" 
            });
        }
    };

    // Trigger on init
    setNavHeight();

    // Listen for resize (orientation) changes
    $(window).resize(function(){
        setNavHeight();
    });

});