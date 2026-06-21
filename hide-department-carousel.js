(function() {
    'use strict';

    var hasRun = false;
    var observer = null;

    function isHomePage() {
        var hash = window.location.hash;
        // Homepage is when hash is empty, just #, or #/
        return hash === '' || hash === '#' || hash === '#/';
    }

    function hideCarousels() {
        var homepage = isHomePage();
        
        if (homepage) {
            // On homepage - don't hide anything, stop observing
            if (observer) {
                observer.disconnect();
                observer = null;
            }
            return;
        }
        
        // NOT on homepage - hide ALL carousels
        var carousels = document.querySelectorAll('.carousel');
        var hiddenCount = 0;
        
        for (var i = 0; i < carousels.length; i++) {
            var carousel = carousels[i];
            
            // Skip if already hidden
            if (carousel.style.display === 'none') continue;
            
            // Hide this carousel
            carousel.style.setProperty('display', 'none', 'important');
            carousel.style.setProperty('visibility', 'hidden', 'important');
            carousel.style.setProperty('opacity', '0', 'important');
            carousel.style.setProperty('height', '0px', 'important');
            carousel.style.setProperty('min-height', '0px', 'important');
            carousel.style.setProperty('max-height', '0px', 'important');
            carousel.style.setProperty('overflow', 'hidden', 'important');
            carousel.style.setProperty('position', 'absolute', 'important');
            carousel.style.setProperty('left', '-9999px', 'important');
            carousel.style.setProperty('top', '-9999px', 'important');
            carousel.style.setProperty('pointer-events', 'none', 'important');
            carousel.style.setProperty('z-index', '-1', 'important');
            
            hiddenCount++;
            
            // Also hide parent containers
            var parent = carousel.parentElement;
            if (parent && (parent.classList.contains('pt-25') || parent.classList.contains('col-md-8'))) {
                parent.style.setProperty('display', 'none', 'important');
            }
        }
        
        // Hide carousel images
        var images = document.querySelectorAll('img[src*="hack23.jpg"], img[src*="mainSlider"], img[src*="allimages/mainSlider"]');
        for (var j = 0; j < images.length; j++) {
            if (images[j].style.display === 'none') continue;
            images[j].style.setProperty('display', 'none', 'important');
            images[j].style.setProperty('visibility', 'hidden', 'important');
            images[j].style.setProperty('opacity', '0', 'important');
            images[j].style.setProperty('width', '0', 'important');
            images[j].style.setProperty('height', '0', 'important');
        }
        
        if (hiddenCount > 0) {
            console.log('Hidden', hiddenCount, 'carousels on non-homepage');
        }
    }

    function startMonitoring() {
        if (observer || isHomePage()) return;
        
        observer = new MutationObserver(function(mutations) {
            // Only hide if new nodes are added
            var shouldHide = false;
            for (var i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes.length > 0) {
                    shouldHide = true;
                    break;
                }
            }
            if (shouldHide) {
                hideCarousels();
            }
        });

        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Run immediately
    hideCarousels();

    // Run a few more times with delays
    setTimeout(hideCarousels, 100);
    setTimeout(hideCarousels, 300);
    setTimeout(hideCarousels, 600);

    // Start monitoring after initial hiding
    setTimeout(startMonitoring, 700);

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            hideCarousels();
            setTimeout(hideCarousels, 100);
            setTimeout(startMonitoring, 200);
        });
    }

    // Listen for hash changes (React Router navigation)
    window.addEventListener('hashchange', function() {
        // Stop observer
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        
        // Hide after navigation
        setTimeout(hideCarousels, 50);
        setTimeout(hideCarousels, 200);
        setTimeout(hideCarousels, 500);
        
        // Restart monitoring
        setTimeout(startMonitoring, 600);
    });

    console.log('Department carousel hider loaded');
})();
