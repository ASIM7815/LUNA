(function () {
  'use strict';

  var ROUTE_CONFIGS = [
    {
      suffix: '/about/academicouncil',
      title: 'Academic Council – Minutes of Meeting (26 July 2025)',
      pdfFile: 'ISL Second Acad Council-MOM-26 July 2025 Signed FINAL.pdf'
    },
    {
      suffix: '/about/governingbody',
      title: 'Governing Body – ISLGC',
      pdfFile: 'ISLGC.pdf'
    }
  ];
  var PDF_HASH = 'toolbar=0&navpanes=0&scrollbar=0';
  var GALLERY_IMAGES = [
    { file: '1ac.jpeg', alt: 'Academic Council – Image 1' },
    { file: '2ac.jpeg', alt: 'Academic Council – Image 2' },
    { file: '3ac.jpeg', alt: 'Academic Council – Image 3' }
  ];

  var globalObserver = null;
  var debounceTimer = null;

  function normalizedPathname() {
    return (window.location.pathname || '').replace(/\/+$/, '');
  }

  function getRouteConfig() {
    var path = normalizedPathname().toLowerCase();
    for (var i = 0; i < ROUTE_CONFIGS.length; i++) {
      if (path.endsWith(ROUTE_CONFIGS[i].suffix)) return ROUTE_CONFIGS[i];
    }
    return null;
  }

  function getPdfUrl(pdfFile) {
    var url = new URL('../../' + pdfFile, window.location.href);
    return url.toString() + '#' + PDF_HASH;
  }

  function getRootAssetUrl(file) {
    var url = new URL('../../' + file, window.location.href);
    return url.toString();
  }

  function createGallerySection() {
    var section = document.createElement('section');
    section.style.marginTop = '24px';

    var heading = document.createElement('h4');
    heading.textContent = 'Academic Council – Gallery';
    heading.style.margin = '0 0 12px 0';
    heading.style.fontWeight = '600';

    var grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
    grid.style.gap = '16px';

    var mq = window.matchMedia && window.matchMedia('(max-width: 768px)');
    function applyColumns() {
      if (!mq) return;
      grid.style.gridTemplateColumns = mq.matches
        ? 'repeat(1, minmax(0, 1fr))'
        : 'repeat(3, minmax(0, 1fr))';
    }
    if (mq) {
      applyColumns();
      if (mq.addEventListener) mq.addEventListener('change', applyColumns);
      else if (mq.addListener) mq.addListener(applyColumns);
    }

    for (var i = 0; i < GALLERY_IMAGES.length; i++) {
      var imgMeta = GALLERY_IMAGES[i];

      var link = document.createElement('a');
      link.href = getRootAssetUrl(imgMeta.file);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'block';
      link.style.borderRadius = '10px';
      link.style.overflow = 'hidden';
      link.style.boxShadow = '0 6px 18px rgba(16, 24, 40, 0.10)';
      link.style.background = '#ffffff';
      link.style.border = '1px solid rgba(16, 24, 40, 0.08)';

      var img = document.createElement('img');
      img.src = getRootAssetUrl(imgMeta.file);
      img.alt = imgMeta.alt;
      img.loading = 'lazy';
      img.style.width = '100%';
      img.style.height = '240px';
      img.style.objectFit = 'cover';
      img.style.display = 'block';

      link.appendChild(img);
      grid.appendChild(link);
    }

    section.appendChild(heading);
    section.appendChild(grid);
    return section;
  }

  function injectPdfViewer() {
    var routeConfig = getRouteConfig();
    if (!routeConfig) return;

    var root = document.getElementById('root');
    if (!root) return;

    if (root.querySelector('[data-academic-council-pdf="1"]')) return;

    var pdfUrl = getPdfUrl(routeConfig.pdfFile);

    var notFoundImg = root.querySelector('img[alt="404"], img[src*="404.png"]');
    var target = notFoundImg
      ? notFoundImg.closest('.pt-90') || notFoundImg.parentElement
      : null;

    if (!target && routeConfig.suffix === '/about/governingbody') {
      var table = root.querySelector('table');
      if (table) {
        target = table.closest('.pt-90') || table.closest('section') || table.parentElement;
      }
    }

    var shouldReplaceChildren = true;
    if (!target) {
      target = root;
      shouldReplaceChildren = false;
    }

    if (shouldReplaceChildren) {
      while (target.firstChild) target.removeChild(target.firstChild);
    }

    var wrapper = document.createElement('div');
    wrapper.setAttribute('data-academic-council-pdf', '1');
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '1200px';
    wrapper.style.margin = '0 auto';
    wrapper.style.padding = '0 16px';

    var title = document.createElement('h3');
    title.textContent = routeConfig.title;
    title.style.margin = '0 0 16px 0';
    title.style.fontWeight = '600';

    var frame = document.createElement('iframe');
    frame.src = pdfUrl;
    frame.title = routeConfig.title + ' PDF Preview';
    frame.style.width = '100%';
    frame.style.height = '85vh';
    frame.style.border = '0';
    frame.setAttribute('loading', 'lazy');

    wrapper.appendChild(title);
    wrapper.appendChild(frame);
    if (routeConfig.suffix === '/about/academicouncil') {
      wrapper.appendChild(createGallerySection());
    }

    if (shouldReplaceChildren) {
      target.appendChild(wrapper);
    } else {
      target.insertBefore(wrapper, target.firstChild || null);
    }
  }

  function debouncedInject() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(injectPdfViewer, 150);
  }

  function startObserver() {
    if (globalObserver) {
      globalObserver.disconnect();
    }

    globalObserver = new MutationObserver(debouncedInject);
    
    try {
      globalObserver.observe(document.documentElement, { subtree: true, childList: true });
    } catch (e) {
      // Ignore if observer fails
    }
  }

  function scheduleInject() {
    window.setTimeout(function() {
      injectPdfViewer();
      startObserver();
    }, 0);
  }

  // Handle first load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInject);
  } else {
    scheduleInject();
  }

  // Listen for route changes
  window.addEventListener('popstate', function() {
    setTimeout(scheduleInject, 100);
  });

  // Monitor URL changes for React Router
  var lastPath = window.location.pathname;
  setInterval(function() {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      setTimeout(scheduleInject, 100);
    }
  }, 500);
})();
