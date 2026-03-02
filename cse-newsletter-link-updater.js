(function() {
    'use strict';

    var GOOGLE_DRIVE_PDF_URL = 'https://drive.google.com/file/d/1GKBZU9QOayf9SzYJc_dnD-OLjyYYCPLL/view?usp=sharing';

    function updateCSENewsletterLink() {
        // Find all links on the page
        var links = document.querySelectorAll('a');
        
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var text = link.textContent || link.innerText || '';
            
            // Check if this is the CSE Newsletter 2025 link
            if (text.indexOf('CSE Newsletter 2025') !== -1) {
                // Update the href to point to Google Drive
                link.href = GOOGLE_DRIVE_PDF_URL;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                console.log('Updated CSE Newsletter 2025 link to Google Drive');
                return true;
            }
        }
        
        return false;
    }

    function tryUpdate() {
        if (updateCSENewsletterLink()) {
            return;
        }

        // If not found immediately, watch for DOM changes
        var observer = new MutationObserver(function() {
            if (updateCSENewsletterLink()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true
        });

        // Stop observing after 10 seconds
        setTimeout(function() {
            observer.disconnect();
        }, 10000);
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryUpdate);
    } else {
        tryUpdate();
    }
})();
