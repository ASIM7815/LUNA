// Hide broken placeholder images in department pages
(function() {
    // Wait for DOM to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideBrokenImages);
    } else {
        hideBrokenImages();
    }

    function hideBrokenImages() {
        // Hide all images that fail to load
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add error handler
            img.addEventListener('error', function() {
                console.log('Hiding broken image:', this.src);
                
                // Hide the image
                this.style.display = 'none';
                
                // Also hide parent containers if they're just image wrappers
                let parent = this.parentElement;
                
                // Check if parent only contains this image
                if (parent && parent.children.length === 1) {
                    parent.style.display = 'none';
                    
                    // Check grandparent too
                    let grandparent = parent.parentElement;
                    if (grandparent && grandparent.classList.contains('col-md-6')) {
                        grandparent.style.display = 'none';
                    }
                }
            });
            
            // Check if image is already broken
            if (img.complete && img.naturalHeight === 0) {
                img.dispatchEvent(new Event('error'));
            }
        });
    }
})();
