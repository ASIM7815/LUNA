(function() {
    'use strict';

    var NEWSLETTER_LINKS = {
        'CSE Newsletter 2025': 'https://drive.google.com/file/d/1GKBZU9QOayf9SzYJc_dnD-OLjyYYCPLL/view?usp=sharing',
        'CSE Newsletter 2024-25': 'https://drive.google.com/file/d/1xYvzRFbDNrkXBzCy_hQtaRTsxlcfE9Nv/view?usp=sharing',
        "Magazine 23'": 'https://drive.google.com/file/d/1FU80c-jf_Un_atWNiccCtTauRgUB3cUI/view?usp=drive_link'
    };

    function updateCSENewsletterLink() {
        // Find all links on the page
        var links = document.querySelectorAll('a');
        var updatedCount = 0;
        
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var text = (link.textContent || link.innerText || '').trim();
            
            // Check each newsletter link
            for (var linkText in NEWSLETTER_LINKS) {
                if (text.indexOf(linkText) !== -1) {
                    // Update the href to point to Google Drive
                    link.href = NEWSLETTER_LINKS[linkText];
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    console.log('Updated ' + linkText + ' link to Google Drive');
                    updatedCount++;
                }
            }
        }
        
        return updatedCount > 0;
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
