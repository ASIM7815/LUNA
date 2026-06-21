/**
 * Hide Skeleton Loading Placeholders in Department Pages
 * This script removes React skeleton loaders that don't look good
 */
(function() {
    'use strict';
    
    function hideSkeletons() {
        // Hide all React skeleton loading placeholders
        var skeletons = document.querySelectorAll('.react-loading-skeleton, span.react-loading-skeleton, [class*="skeleton"], [class*="Skeleton"]');
        
        for (var i = 0; i < skeletons.length; i++) {
            skeletons[i].style.display = 'none';
            skeletons[i].style.visibility = 'hidden';
            skeletons[i].style.opacity = '0';
        }
        
        // Hide images.png logo specifically
        var allImages = document.querySelectorAll('img');
        for (var j = 0; j < allImages.length; j++) {
            var img = allImages[j];
            var src = img.getAttribute('src') || '';
            
            if (src.includes('images.png')) {
                img.style.display = 'none';
                img.style.visibility = 'hidden';
                img.style.opacity = '0';
            }
        }
        
        if (skeletons.length > 0) {
            console.log('Hidden ' + skeletons.length + ' skeleton loaders');
        }
    }
    
    // Run immediately
    hideSkeletons();
    
    // Run again after DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideSkeletons);
    }
    
    // Run after delays to catch late-loading skeletons
    setTimeout(hideSkeletons, 500);
    setTimeout(hideSkeletons, 1000);
    setTimeout(hideSkeletons, 2000);
    
    // Watch for new skeleton loaders being added
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                hideSkeletons();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
