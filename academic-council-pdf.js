(function () {
  'use strict';

  var TARGET_SUFFIX = '/about/academicouncil';
  var PDF_FILE = 'ISL Second Acad Council-MOM-26 July 2025 Signed FINAL.pdf';
  var PDF_HASH = 'toolbar=0&navpanes=0&scrollbar=0';
  var GALLERY_IMAGES = [
    { file: '1ac.jpeg', alt: 'Academic Council – Image 1' },
    { file: '2ac.jpeg', alt: 'Academic Council – Image 2' },
    { file: '3ac.jpeg', alt: 'Academic Council – Image 3' }
  ];

  function normalizedPathname() {
    return (window.location.pathname || '').replace(/\/+$/, '');
  }

  function isAcademicCouncilRoute() {
    return normalizedPathname().toLowerCase().endsWith(TARGET_SUFFIX);
  }

  function getPdfUrl() {
    // The route is `/about/academicouncil` (2 levels deep), while the PDF lives at the site root.
    // Using a relative URL keeps it working even if the site is deployed under a sub-path.
    var url = new URL('../../' + PDF_FILE, window.location.href);
    return url.toString() + '#' + PDF_HASH;
  }

  function getRootAssetUrl(file) {
    // The route is `/about/academicouncil` (2 levels deep), while assets live at the site root.
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

    // Responsive fallback for narrow screens.
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
    if (!isAcademicCouncilRoute()) return;

    var root = document.getElementById('root');
    if (!root) return;

    if (root.querySelector('[data-academic-council-pdf="1"]')) return;

    var pdfUrl = getPdfUrl();

    // The current app renders a 404 image inside a `.pt-90.pb-90.text-center` section.
    // Replace only that inner section so the existing header/footer remain intact.
    var notFoundImg = root.querySelector('img[alt="404"], img[src*="404.png"]');
    var target = notFoundImg
      ? notFoundImg.closest('.pt-90') || notFoundImg.parentElement
      : null;

    var shouldReplaceChildren = true;
    if (!target) {
      // Fallback: inject a full-width block without destroying the app UI.
      target = root;
      shouldReplaceChildren = false;
    }

    if (shouldReplaceChildren) {
      // Clear only the 404 content area.
      while (target.firstChild) target.removeChild(target.firstChild);
    }

    var wrapper = document.createElement('div');
    wrapper.setAttribute('data-academic-council-pdf', '1');
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '1200px';
    wrapper.style.margin = '0 auto';
    wrapper.style.padding = '0 16px';

    var title = document.createElement('h3');
    title.textContent = 'Academic Council – Minutes of Meeting (26 July 2025)';
    title.style.margin = '0 0 16px 0';
    title.style.fontWeight = '600';

    var frame = document.createElement('iframe');
    frame.src = pdfUrl;
    frame.title = 'Academic Council PDF Preview';
    frame.style.width = '100%';
    frame.style.height = '85vh';
    frame.style.border = '0';

    // Basic UX hardening (cannot fully prevent downloads in browsers).
    frame.setAttribute('loading', 'lazy');

    wrapper.appendChild(title);
    wrapper.appendChild(frame);
    wrapper.appendChild(createGallerySection());

    if (shouldReplaceChildren) {
      target.appendChild(wrapper);
    } else {
      target.insertBefore(wrapper, target.firstChild || null);
    }
  }

  function scheduleInject() {
    window.setTimeout(injectPdfViewer, 0);
  }

  // Handle first load.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInject);
  } else {
    scheduleInject();
  }

  // Handle SPA navigation (react-router uses the History API).
  var originalPushState = history.pushState;
  history.pushState = function () {
    var result = originalPushState.apply(this, arguments);
    scheduleInject();
    return result;
  };

  var originalReplaceState = history.replaceState;
  history.replaceState = function () {
    var result = originalReplaceState.apply(this, arguments);
    scheduleInject();
    return result;
  };

  window.addEventListener('popstate', scheduleInject);

  // As a safety net, watch for React re-rendering the 404 area.
  var mo = new MutationObserver(function () {
    injectPdfViewer();
  });

  try {
    mo.observe(document.documentElement, { subtree: true, childList: true });
  } catch (e) {
    // Ignore if observer fails.
  }
})();
