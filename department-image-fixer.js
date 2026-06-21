(function() {
    'use strict';

    function hideHodImagePlaceholder() {
        // Find all images with className "author" that are placeholder/template images
        var images = document.querySelectorAll('img.author');
        
        images.forEach(function(img) {
            // Check if it's a template image (csehod.png or similar patterns)
            var src = img.getAttribute('src') || '';
            
            // Hide template images from docs/cse/csehod.png or similar
            if (src.includes('docs/cse/csehod.png') || 
                src.includes('mbahodnov22.jpeg') ||
                src.includes('docs/') && src.includes('hod')) {
                
                // Hide the entire parent media block if it exists
                var mediaBlock = img.closest('.media') || img.closest('.single_advisor_profile');
                if (mediaBlock) {
                    mediaBlock.style.display = 'none';
                    console.log('Hidden HOD template image:', src);
                } else {
                    img.style.display = 'none';
                    console.log('Hidden template image:', src);
                }
            }
        });
    }

    function updateQuickLinksImages() {
        // Find Quick Links section
        var quickLinksHeaders = document.querySelectorAll('h4, h3, h2');
        
        quickLinksHeaders.forEach(function(header) {
            var headerText = (header.textContent || '').trim().toLowerCase();
            
            if (headerText === 'quick links') {
                // Find the parent container
                var container = header.closest('.sidebar-info') || 
                               header.closest('.widget') ||
                               header.parentElement;
                
                if (container) {
                    // Hide all images in quick links
                    var images = container.querySelectorAll('img');
                    images.forEach(function(img) {
                        img.style.display = 'none';
                        console.log('Hidden quick link image');
                    });
                    
                    // Ensure "More" text is visible and styled
                    var moreLinks = container.querySelectorAll('a');
                    moreLinks.forEach(function(link) {
                        var linkText = (link.textContent || '').trim().toLowerCase();
                        if (linkText.includes('more')) {
                            link.style.display = 'inline-block';
                            link.style.visibility = 'visible';
                            link.style.fontSize = '14px';
                            link.style.fontWeight = '500';
                            link.style.color = '#192f59';
                            link.style.textDecoration = 'none';
                            link.style.marginTop = '10px';
                            console.log('Styled More link');
                        }
                    });
                }
            }
        });
    }

    function applyFixes() {
        hideHodImagePlaceholder();
        updateQuickLinksImages();
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyFixes);
    } else {
        applyFixes();
    }

    // Watch for React re-renders using MutationObserver
    var observer = new MutationObserver(function(mutations) {
        // Debounce the execution
        clearTimeout(window.departmentImageFixerTimeout);
        window.departmentImageFixerTimeout = setTimeout(applyFixes, 100);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also run on route changes (for SPAs)
    var originalPushState = history.pushState;
    var originalReplaceState = history.replaceState;

    history.pushState = function() {
        var result = originalPushState.apply(this, arguments);
        setTimeout(applyFixes, 100);
        return result;
    };

    history.replaceState = function() {
        var result = originalReplaceState.apply(this, arguments);
        setTimeout(applyFixes, 100);
        return result;
    };

    window.addEventListener('popstate', function() {
        setTimeout(applyFixes, 100);
    });

    console.log('Department image fixer loaded');
})();
