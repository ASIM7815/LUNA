(function() {
    'use strict';

    var globalObserver = null;
    var debounceTimer = null;

    function hideEmptyCarousels() {
        // Check if we're on the homepage by looking at the URL hash (React Router uses hash routing)
        var isHomePage = window.location.hash === '' || 
                        window.location.hash === '#/' || 
                        window.location.hash === '#' ||
                        window.location.pathname === '/' || 
                        window.location.pathname === '/index.html' ||
                        window.location.pathname === '';
        
        // Find all carousels in the page
        var carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(function(carousel) {
            // Check if this is the main hero carousel or highlights carousel
            var isMainCarousel = carousel.classList.contains('main-carousel');
            var isHighlightsCarousel = carousel.classList.contains('highlights-carousel');
            
            // If we're NOT on homepage, hide ALL carousels (including main/highlights)
            // If we ARE on homepage, show ONLY main and highlights carousels
            if (!isHomePage || (!isMainCarousel && !isHighlightsCarousel)) {
                // Aggressive hiding
                carousel.style.display = 'none';
                carousel.style.visibility = 'hidden';
                carousel.style.opacity = '0';
                carousel.style.height = '0';
                carousel.style.minHeight = '0';
                carousel.style.maxHeight = '0';
                carousel.style.overflow = 'hidden';
                carousel.style.position = 'absolute';
                carousel.style.left = '-9999px';
                carousel.setAttribute('aria-hidden', 'true');
                
                // Hide parent container too if it looks like a carousel wrapper
                var parent = carousel.closest('.pt-25, .carousel-wrapper, [class*="carousel"]');
                if (parent && parent !== carousel) {
                    parent.style.display = 'none';
                }
            } else if (isHomePage && (isMainCarousel || isHighlightsCarousel)) {
                // Ensure homepage carousels are visible
                carousel.style.display = '';
                carousel.style.visibility = '';
                carousel.style.opacity = '';
                carousel.style.height = '';
                carousel.style.position = '';
                carousel.style.left = '';
                carousel.removeAttribute('aria-hidden');
            }
        });
        
        // Also aggressively hide carousel-inner elements
        var carouselInners = document.querySelectorAll('.carousel-inner');
        carouselInners.forEach(function(inner) {
            var parentCarousel = inner.closest('.carousel');
            var isMainCarousel = parentCarousel && parentCarousel.classList.contains('main-carousel');
            var isHighlightsCarousel = parentCarousel && parentCarousel.classList.contains('highlights-carousel');
            
            if (!isHomePage || (!isMainCarousel && !isHighlightsCarousel)) {
                inner.style.display = 'none';
                inner.style.background = 'transparent';
            }
        });
        
        // Hide any carousel images that contain hack23.jpg on non-homepage
        if (!isHomePage) {
            var carouselImages = document.querySelectorAll('.carousel img[src*="hack23.jpg"], .carousel img[src*="mainSlider"]');
            carouselImages.forEach(function(img) {
                var carousel = img.closest('.carousel');
                if (carousel && !carousel.classList.contains('main-carousel') && !carousel.classList.contains('highlights-carousel')) {
                    img.style.display = 'none';
                    if (carousel) {
                        carousel.style.display = 'none';
                    }
                }
            });
        }
    }

    function debouncedHide() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(hideEmptyCarousels, 50);
    }

    function startObserver() {
        if (globalObserver) {
            globalObserver.disconnect();
        }

        globalObserver = new MutationObserver(debouncedHide);
        globalObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    // Run immediately
    hideEmptyCarousels();

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            hideEmptyCarousels();
            startObserver();
        });
    } else {
        startObserver();
    }

    // Listen for React Router hash changes (most important for SPA routing)
    window.addEventListener('hashchange', function() {
        setTimeout(hideEmptyCarousels, 50);
        setTimeout(hideEmptyCarousels, 200);
        setTimeout(hideEmptyCarousels, 500);
    });

    // Listen for route changes
    window.addEventListener('popstate', function() {
        setTimeout(hideEmptyCarousels, 50);
        setTimeout(hideEmptyCarousels, 200);
    });

    // Monitor hash changes for React Router
    var lastHash = window.location.hash;
    setInterval(function() {
        if (window.location.hash !== lastHash) {
            lastHash = window.location.hash;
            setTimeout(hideEmptyCarousels, 50);
            setTimeout(hideEmptyCarousels, 200);
            setTimeout(hideEmptyCarousels, 500);
        }
    }, 100);

    // Also monitor path changes
    var lastPath = window.location.pathname;
    setInterval(function() {
        if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            setTimeout(hideEmptyCarousels, 50);
            setTimeout(hideEmptyCarousels, 200);
        }
    }, 300);

    console.log('Department carousel hider loaded - aggressive mode with React Router support');
})();
