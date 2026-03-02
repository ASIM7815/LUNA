(function() {
    'use strict';

    // Newsletter configuration - Direct Google Drive link
    var NEWSLETTER_CONFIG = {
        title: 'CSE Newsletter 2025',
        path: 'https://drive.google.com/file/d/1GKBZU9QOayf9SzYJc_dnD-OLjyYYCPLL/view?usp=sharing',
        icon: 'fa fa-long-arrow-right'
    };

    function createNewsletterLink() {
        var link = document.createElement('a');
        link.href = NEWSLETTER_CONFIG.path;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        link.innerHTML = NEWSLETTER_CONFIG.title + 
            '<span><i class="' + NEWSLETTER_CONFIG.icon + '" aria-hidden="true"></i></span>';
        
        return link;
    }

    function injectNewsletterLink() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectNewsletterLink);
            return;
        }

        // Find a suitable container to inject the link
        var containers = [
            document.querySelector('.newsletter-container'),
            document.querySelector('.quick-links'),
            document.querySelector('.resources'),
            document.querySelector('nav'),
            document.querySelector('.sidebar')
        ];

        var targetContainer = null;
        for (var i = 0; i < containers.length; i++) {
            if (containers[i]) {
                targetContainer = containers[i];
                break;
            }
        }

        if (targetContainer) {
            var link = createNewsletterLink();
            targetContainer.appendChild(link);
        } else {
            console.log('Newsletter link ready. Path:', NEWSLETTER_CONFIG.path);
        }
    }

    // Initialize
    injectNewsletterLink();
})();
