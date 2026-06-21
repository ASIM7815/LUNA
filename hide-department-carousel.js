(function() {
    'use strict';

    var globalObserver = null;
    var debounceTimer = null;

    function isHomePage() {
        var hash = window.location.hash;
        var pathname = window.location.pathname;
        
        // Homepage detection for GitHub Pages
        // Homepage is when hash is empty, just #, or #/
        return (hash === '' || hash === '#' || hash === '#/') && 
               (pathname === '/' || pathname === '/index.html' || pathname.endsWith('/LUNA/') || pathname.endsWith('/LUNA'));
    }

    function hideEmptyCarousels() {
        var homepage = isHomePage();
        
        console.log('Carousel checker running - isHomePage:', homepage, 'hash:', window.location.hash);
        
        // Find all carousels in the page
        var carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(function(carousel) {
            // Check if this is the main hero carousel or highlights carousel
            var isMainCarousel = carousel.classList.contains('main-carousel');
            var isHighlightsCarousel = carousel.classList.contains('highlights-carousel');
            
            // LOGIC: 
            // - On homepage: show ONLY main-carousel and highlights-carousel
            // - On other pages: hide ALL carousels
            if (!homepage) {
                // NOT on homepage - hide ALL carousels aggressively
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
                
                // Hide parent container too
                var parent = carousel.closest('.pt-25, .carousel-wrapper, .col-md-8, [class*="carousel"]');
                if (parent && parent !== carousel) {
                    parent.style.display = 'none';
                }
            } else {
                // On homepage
                if (isMainCarousel || isHighlightsCarousel) {
                    // Show main and highlights carousels
                    carousel.style.display = '';
                    carousel.style.visibility = '';
                    carousel.style.opacity = '';
                    carousel.style.height = '';
                    carousel.style.minHeight = '';
                    carousel.style.maxHeight = '';
                    carousel.style.position = '';
                    carousel.style.left = '';
                    carousel.removeAttribute('aria-hidden');
                } else {
                    // Hide other carousels even on homepage
                    carousel.style.display = 'none';
                    carousel.style.visibility = 'hidden';
                    carousel.style.opacity = '0';
                }
            }
        });
        
        // Also hide carousel-inner elements on non-homepage
        var carouselInners = document.querySelectorAll('.carousel-inner');
        carouselInners.forEach(function(inner) {
            var parentCarousel = inner.closest('.carousel');
            var isMainCarousel = parentCarousel && parentCarousel.classList.contains('main-carousel');
            var isHighlightsCarousel = parentCarousel && parentCarousel.classList.contains('highlights-carousel');
            
            if (!homepage) {
                inner.style.display = 'none';
                inner.style.background = 'transparent';
            } else if (homepage && (isMainCarousel || isHighlightsCarousel)) {
                inner.style.display = '';
                inner.style.background = '';
            }
        });
        
        // Specifically target and hide images from mainSlider folder on non-homepage
        if (!homepage) {
            var sliderImages = document.querySelectorAll('img[src*="mainSlider"], img[src*="hack23.jpg"]');
            sliderImages.forEach(function(img) {
                var carousel = img.closest('.carousel');
                if (carousel) {
                    img.style.display = 'none';
                    carousel.style.display = 'none';
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
