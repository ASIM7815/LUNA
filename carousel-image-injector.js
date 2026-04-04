(function() {
    'use strict';

    var CAROUSEL_IMAGES = [
        { id: 'hack-hero', src: './hack.jpeg', alt: 'Hackathon Event' },
        { id: 'shafir-hero', src: './SHAFISIR.jpeg', alt: 'Main Slider' },
        { id: 'instasize-hero', src: 'https://instasize.com/api/image/6fd70c0449522d9522322826f92df1fd78f60dcd2855d7ab93a32b37f737ff41.jpeg', alt: 'Main Slider' },
        { id: 'instasize-hero-2', src: 'https://instasize.com/api/image/1424d7eb8e36b98ff5962e649448e39876d9adfe99b81ad7c4bcdbb10baed88d.jpeg', alt: 'Main Slider' }
    ];

    function findMainCarousel() {
        // Try multiple selectors to find the main carousel
        var selectors = [
            '.carousel',
            '[class*="carousel"]',
            '.main-carousel',
            '#carouselExampleIndicators'
        ];

        for (var i = 0; i < selectors.length; i++) {
            var carousel = document.querySelector(selectors[i]);
            if (carousel) {
                var inner = carousel.querySelector('.carousel-inner');
                if (inner) return { carousel: carousel, inner: inner };
            }
        }
        return null;
    }

    function injectCarouselImages() {
        var result = findMainCarousel();
        if (!result) return false;

        var carousel = result.carousel;
        var inner = result.inner;

        // Add main-carousel class for styling
        if (!carousel.classList.contains('main-carousel')) {
            carousel.classList.add('main-carousel', 'carousel-fade');
        }

        var injectedCount = 0;

        // Inject each image if it doesn't exist
        for (var i = 0; i < CAROUSEL_IMAGES.length; i++) {
            var imgConfig = CAROUSEL_IMAGES[i];
            var existing = inner.querySelector('[data-injected="' + imgConfig.id + '"]');
            
            if (!existing) {
                var item = document.createElement('div');
                item.className = 'carousel-item' + (i === 0 ? ' active' : '');
                item.setAttribute('data-injected', imgConfig.id);

                var img = document.createElement('img');
                img.src = imgConfig.src;
                img.className = 'img-fluid d-block w-100';
                img.alt = imgConfig.alt;
                img.loading = i === 0 ? 'eager' : 'lazy';
                
                item.appendChild(img);

                // If this is the first image and there's an active item, deactivate it
                if (i === 0) {
                    var currentActive = inner.querySelector('.carousel-item.active:not([data-injected])');
                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }
                }

                // Insert at the beginning
                if (inner.firstChild) {
                    inner.insertBefore(item, inner.firstChild);
                } else {
                    inner.appendChild(item);
                }

                injectedCount++;
            }
        }

        // Rebuild indicators if we injected anything
        if (injectedCount > 0) {
            rebuildIndicators(carousel, inner);
        }

        return injectedCount > 0;
    }

    function rebuildIndicators(carousel, inner) {
        var indicators = carousel.querySelector('.carousel-indicators');
        if (!indicators) return;

        indicators.innerHTML = '';
        var items = inner.querySelectorAll('.carousel-item');
        
        for (var i = 0; i < items.length; i++) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('data-bs-target', '#' + (carousel.id || ''));
            btn.setAttribute('data-bs-slide-to', String(i));
            btn.setAttribute('aria-label', 'Slide ' + (i + 1));
            
            if (i === 0) {
                btn.className = 'active';
                btn.setAttribute('aria-current', 'true');
            }
            
            indicators.appendChild(btn);
        }
    }

    function tryInject() {
        if (injectCarouselImages()) {
            console.log('Carousel images injected successfully');
            return true;
        }
        return false;
    }

    // Try immediately
    if (tryInject()) return;

    // Watch for DOM changes
    var observer = new MutationObserver(function() {
        if (tryInject()) {
            observer.disconnect();
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Stop observing after 15 seconds
    setTimeout(function() {
        observer.disconnect();
    }, 15000);

    // Also try on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInject);
    }
})();
