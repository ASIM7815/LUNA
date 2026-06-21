(function() {
    'use strict';

    var NEWSLETTER_LINKS = {
        'CSE Newsletter 2025': 'https://drive.google.com/file/d/1GKBZU9QOayf9SzYJc_dnD-OLjyYYCPLL/view?usp=sharing',
        'CSE Newsletter 2024-25': 'https://drive.google.com/file/d/1xYvzRFbDNrkXBzCy_hQtaRTsxlcfE9Nv/view?usp=sharing',
        "Magazine 23'": 'https://drive.google.com/file/d/1FU80c-jf_Un_atWNiccCtTauRgUB3cUI/view?usp=drive_link'
    };

    var globalObserver = null;
    var debounceTimer = null;

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
                    updatedCount++;
                }
            }
        }
        
        return updatedCount > 0;
    }

    function debouncedUpdate() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updateCSENewsletterLink, 150);
    }

    function startObserver() {
        if (globalObserver) {
            globalObserver.disconnect();
        }

        globalObserver = new MutationObserver(debouncedUpdate);
        globalObserver.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    function tryUpdate() {
        updateCSENewsletterLink();
        startObserver();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryUpdate);
    } else {
        tryUpdate();
    }

    // Listen for route changes
    window.addEventListener('popstate', function() {
        setTimeout(function() {
            updateCSENewsletterLink();
            startObserver();
        }, 100);
    });

    // Monitor URL changes for React Router
    var lastPath = window.location.pathname;
    setInterval(function() {
        if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            setTimeout(function() {
                updateCSENewsletterLink();
                startObserver();
            }, 100);
        }
    }, 500);
})();
