(function() {
    'use strict';

    var globalObserver = null;
    var debounceTimer = null;

    function hideEmptyCarousels() {
        // Check if we're on the homepage by looking for specific homepage elements
        var isHomePage = window.location.pathname === '/' || 
                        window.location.pathname === '/index.html' ||
                        window.location.pathname === '';
        
        // Find all carousels in the page
        var carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(function(carousel) {
            // Check if this is the main hero carousel or highlights carousel
            var isMainCarousel = carousel.classList.contains('main-carousel');
            var isHighlightsCarousel = carousel.classList.contains('highlights-carousel');
            
            // If we're NOT on homepage OR if it's not main/highlights carousel, hide it
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
                
                // Hide parent container too
                var parent = carousel.closest('.pt-25');
                if (parent) {
                    parent.style.display = 'none';
                }
            }
        });
        
        // Also aggressively hide carousel-inner elements without images
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

    // Listen for route changes
    window.addEventListener('popstate', function() {
        setTimeout(function() {
            hideEmptyCarousels();
            startObserver();
        }, 50);
    });

    // Monitor URL changes for React Router
    var lastPath = window.location.pathname;
    setInterval(function() {
        if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            setTimeout(function() {
                hideEmptyCarousels();
                startObserver();
            }, 50);
        }
    }, 300);

    console.log('Department carousel hider loaded - aggressive mode');
})();
