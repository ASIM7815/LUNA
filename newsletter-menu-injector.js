(function() {
    'use strict';

    var NEWSLETTER_CONFIG = {
        menuItemText: 'Newsletter',
        targetUrl: './newsletter.html',
        aboutUsMenuSelectors: [
            'a[href*="/about"]',
            'a[href*="chairman"]',
            'a[href*="statutory"]'
        ]
    };

    var isInjected = false;
    var globalObserver = null;

    function findAboutUsMenu() {
        // Find the About Us dropdown or menu container
        var navLinks = document.querySelectorAll('nav a, .navbar a, .menu a, .nav-link');
        
        for (var i = 0; i < navLinks.length; i++) {
            var link = navLinks[i];
            var text = (link.textContent || link.innerText || '').trim().toLowerCase();
            
            if (text === 'about us' || text === 'about') {
                // Found About Us link, now find its parent container
                var parent = link.parentElement;
                
                // Look for dropdown menu or list
                var dropdown = parent.querySelector('.dropdown-menu, .sub-menu, ul');
                if (dropdown) {
                    return dropdown;
                }
                
                // Try parent's next sibling
                var sibling = parent.nextElementSibling;
                if (sibling && (sibling.classList.contains('dropdown-menu') || 
                              sibling.classList.contains('sub-menu') || 
                              sibling.tagName === 'UL')) {
                    return sibling;
                }
                
                // Try finding dropdown in parent
                var parentDropdown = parent.closest('li');
                if (parentDropdown) {
                    var parentMenu = parentDropdown.querySelector('.dropdown-menu, .sub-menu, ul');
                    if (parentMenu) {
                        return parentMenu;
                    }
                }
            }
        }
        
        return null;
    }

    function createNewsletterMenuItem(container) {
        // Check if Newsletter already exists
        var existingLinks = container.querySelectorAll('a');
        for (var i = 0; i < existingLinks.length; i++) {
            var linkText = (existingLinks[i].textContent || '').trim().toLowerCase();
            if (linkText === 'newsletter') {
                return false; // Already exists
            }
        }
        
        // Create new menu item
        var listItem = document.createElement('li');
        
        // Check if other items have specific classes
        var firstChild = container.querySelector('li');
        if (firstChild && firstChild.className) {
            listItem.className = firstChild.className;
        }
        
        var link = document.createElement('a');
        link.href = NEWSLETTER_CONFIG.targetUrl;
        link.textContent = NEWSLETTER_CONFIG.menuItemText;
        
        // Copy classes from existing links if present
        var firstLink = container.querySelector('a');
        if (firstLink && firstLink.className) {
            link.className = firstLink.className;
        }
        
        listItem.appendChild(link);
        container.appendChild(listItem);
        
        console.log('Newsletter menu item added to About Us dropdown');
        isInjected = true;
        return true;
    }

    function tryInject() {
        if (isInjected) return true;
        
        var aboutUsMenu = findAboutUsMenu();
        if (aboutUsMenu) {
            createNewsletterMenuItem(aboutUsMenu);
            return true;
        }
        return false;
    }

    function startObserver() {
        if (globalObserver) {
            globalObserver.disconnect();
        }

        globalObserver = new MutationObserver(function() {
            if (tryInject() && globalObserver) {
                globalObserver.disconnect();
            }
        });
        
        globalObserver.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    function injectNewsletterMenuItem() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectNewsletterMenuItem);
            return;
        }
        
        if (!tryInject()) {
            startObserver();
        }
    }

    // Listen for route changes
    window.addEventListener('popstate', function() {
        isInjected = false;
        setTimeout(function() {
            if (!tryInject()) {
                startObserver();
            }
        }, 100);
    });

    // Monitor URL changes for React Router
    var lastPath = window.location.pathname;
    setInterval(function() {
        if (window.location.pathname !== lastPath) {
            lastPath = window.location.pathname;
            isInjected = false;
            setTimeout(function() {
                if (!tryInject()) {
                    startObserver();
                }
            }, 100);
        }
    }, 500);

    // Initialize
    injectNewsletterMenuItem();
})();
