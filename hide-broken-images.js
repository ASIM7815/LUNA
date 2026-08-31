// Show broken images with placeholder instead of hiding them
(function() {
    // Wait for DOM to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleBrokenImages);
    } else {
        handleBrokenImages();
    }

    function handleBrokenImages() {
        // Show broken images with red border for debugging
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add error handler
            img.addEventListener('error', function() {
                console.warn('⚠️ Image failed to load:', this.src);
                
                // Instead of hiding, show with a placeholder style for debugging
                this.style.border = '3px solid red';
                this.style.minHeight = '200px';
                this.style.backgroundColor = '#ffebee';
                this.style.display = 'block';
                
                // Add title to show the URL on hover
                this.title = 'Image not found: ' + this.src;
                
                // Log to console for easy tracking
                console.error('Missing image file:', this.src);
            });
            
            // Check if image is already broken
            if (img.complete && img.naturalHeight === 0 && img.src) {
                img.dispatchEvent(new Event('error'));
            }
        });
    }
    
    console.log('🔍 Image debugging mode enabled - broken images will show with red border');
})();
