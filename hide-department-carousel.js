(function() {
    'use strict';

    var globalObserver = null;
    var debounceTimer = null;

    function hideEmptyCarousels() {
        // Find all carousels in the page
        var carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(function(carousel) {
            // Check if carousel has any images
            var hasImages = carousel.querySelector('img') !== null;
            var hasActiveItem = carousel.querySelector('.carousel-item.active') !== null;
            var carouselInner = carousel.querySelector('.carousel-inner');
            var hasContent = carouselInner && carouselInner.children.length > 0;
            
            // If no images or empty, hide the entire carousel
            if (!hasImages || !hasContent || !hasActiveItem) {
                carousel.style.display = 'none';
                carousel.style.visibility = 'hidden';
                carousel.style.opacity = '0';
                carousel.style.height = '0';
                carousel.style.minHeight = '0';
                carousel.style.overflow = 'hidden';
                carousel.style.position = 'absolute';
                
                // Also hide the parent container if it's a department carousel
                var parent = carousel.closest('.pt-25');
                if (parent) {
                    parent.style.display = 'none';
                }
            }
        });
        
        // Also hide any blue backgrounds or placeholder divs
        var carouselInners = document.querySelectorAll('.carousel-inner');
        carouselInners.forEach(function(inner) {
            if (!inner.querySelector('img') || inner.children.length === 0) {
                inner.style.background = 'transparent';
                inner.style.display = 'none';
            }
        });
    }

    function debouncedHide() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(hideEmptyCarousels, 100);
    }

    function startObserver() {
        if (globalObserver) {
            globalObserver.disconnect();
        }

        globalObserver = new MutationObserver(debouncedHide);
        globalObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            hideEmptyCarousels();
            startObserver();
        });
    } else {
        hideEmptyCarousels();
        startObserver();
    }

    // Listen for route changes
    window.addEventListener('popstate', function() {
        setTimeout(function() {
            hideEmptyCarousels();
            startObserver();
        }, 100);
    });

    // Monitor URL changes for React Router
    var lastPath = window.location.pathname;
    setInterval(function() {
        if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            setTimeout(function() {
                hideEmptyCarousels();
                startObserver();
            }, 100);
        }
    }, 500);

    console.log('Department carousel hider loaded');
})();
