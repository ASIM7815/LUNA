/**
 * Hide Placeholder Images in Department Pages
 * This script removes placeholder loading images that don't look good
 */
(function() {
    'use strict';
    
    function hideImages() {
        // Hide all images with docs/ in their src (HOD images)
        var allImages = document.querySelectorAll('img');
        for (var i = 0; i < allImages.length; i++) {
            var img = allImages[i];
            var src = img.getAttribute('src') || '';
            
            // Check if it's images.png logo
            if (src.includes('images.png')) {
                img.style.display = 'none';
                img.style.visibility = 'hidden';
                img.style.opacity = '0';
                console.log('Hidden images.png logo');
                continue;
            }
            
            // Check if it's a docs/ image or HOD image
            if (src.includes('/docs/') || 
                src.includes('hod') || 
                src.includes('csehod') ||
                src.includes('ithod') ||
                src.includes('ecehod') ||
                src.includes('eeehod') ||
                src.includes('civilhod') ||
                src.includes('mechhod') ||
                src.includes('mbahod')) {
                
                // Hide the image
                img.style.display = 'none';
                img.style.visibility = 'hidden';
                img.style.opacity = '0';
                
                // Hide parent containers
                var parent = img.parentElement;
                if (parent) {
                    var className = parent.className || '';
                    if (className.includes('media-left') || 
                        className.includes('author') ||
                        className.includes('hod')) {
                        parent.style.display = 'none';
                    }
                }
            }
        }
        
        // Hide sidebar/quicklinks images
        var sidebarImages = document.querySelectorAll('.sidebar-info img, .widget img, aside img, [class*="quick"] img');
        for (var j = 0; j < sidebarImages.length; j++) {
            sidebarImages[j].style.display = 'none';
            sidebarImages[j].style.visibility = 'hidden';
            
            // Hide parent if it's just an image container
            var sidebarParent = sidebarImages[j].parentElement;
            if (sidebarParent && sidebarParent.children.length === 1) {
                sidebarParent.style.display = 'none';
            }
        }
        
        console.log('Placeholder images hidden successfully');
    }
    
    // Run immediately
    hideImages();
    
    // Run again after DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideImages);
    }
    
    // Run after a delay to catch dynamically loaded images
    setTimeout(hideImages, 1000);
    setTimeout(hideImages, 2000);
    setTimeout(hideImages, 3000);
    
    // Watch for new images being added
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                hideImages();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();
