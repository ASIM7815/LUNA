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
        return true;
    }

    function injectNewsletterMenuItem() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectNewsletterMenuItem);
            return;
        }
        
        var aboutUsMenu = findAboutUsMenu();
        
        if (aboutUsMenu) {
            createNewsletterMenuItem(aboutUsMenu);
        } else {
            // If menu not found, wait for React to render
            var observer = new MutationObserver(function() {
                var menu = findAboutUsMenu();
                if (menu) {
                    createNewsletterMenuItem(menu);
                    observer.disconnect();
                }
            });
            
            observer.observe(document.body || document.documentElement, {
                childList: true,
                subtree: true
            });
            
            // Stop observing after 15 seconds
            setTimeout(function() {
                observer.disconnect();
            }, 15000);
        }
    }

    // Initialize
    injectNewsletterMenuItem();
})();
