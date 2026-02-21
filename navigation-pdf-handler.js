(function () {
  'use strict';

  console.log('Navigation PDF Handler loaded');

  // Configuration for all navigation PDF routes
  var ROUTE_CONFIGS = [
    // NAAC Section
    {
      suffix: '/naac',
      title: 'NAAC - National Assessment and Accreditation Council',
      pdfFolder: 'DATA/NAAC',
      showFileList: true
    },
    // AQAR Section
    {
      suffix: '/aqar',
      title: 'AQAR - Annual Quality Assurance Report',
      pdfFolder: 'DATA/AQAR',
      showFileList: true
    },
    // DVV Section
    {
      suffix: '/dvv',
      title: 'DVV - Data Validation and Verification',
      pdfFolder: 'DATA/DVV',
      showFileList: true
    },
    // NIRF Section
    {
      suffix: '/nirf',
      title: 'NIRF - National Institutional Ranking Framework',
      pdfFolder: 'DATA/NIRF',
      showFileList: true
    },
    // RTI Section
    {
      suffix: '/rti',
      title: 'RTI - Right to Information',
      pdfFolder: 'DATA/RTI',
      showFileList: true
    },
    // IIC Section
    {
      suffix: '/iic',
      title: 'IIC - Institution Innovation Council',
      pdfFolder: 'DATA/IIC',
      showFileList: true
    },
    // NISP Section
    {
      suffix: '/nisp',
      title: 'NISP Policy',
      pdfFile: 'DATA/NISP_Policy.pdf'
    },
    // HR Policy Section
    {
      suffix: '/hrpolicy',
      title: 'HR Policy',
      pdfFile: 'DATA/hrpolicy.pdf'
    },
    // FDP Section
    {
      suffix: '/fdp',
      title: 'FDP - Faculty Development Program',
      pdfFolder: 'DATA/FDP',
      showFileList: true
    },
    // Committees Section
    {
      suffix: '/committees',
      title: 'Committees',
      pdfFolder: 'DATA/Committees',
      showFileList: true
    }
  ];

  var PDF_HASH = 'toolbar=0&navpanes=0&scrollbar=0';

  // Known PDF files structure (from code analysis)
  var PDF_STRUCTURE = {
    'NAAC': [
      { path: 'DATA/NAAC/1/1.1.1/1.1.1AdditionalInformation.pdf', title: '1.1.1 Additional Information' },
      { path: 'DATA/NAAC/1/1.2.1/1.2.1AdditionalInformation.pdf', title: '1.2.1 Additional Information' },
      { path: 'DATA/NAAC/1/1.2.2/1.2.2SupportingDoc.pdf', title: '1.2.2 Supporting Document' },
      { path: 'DATA/NAAC/1/1.3.1/1.3.1AdditionalInformation.pdf', title: '1.3.1 Additional Information' },
      { path: 'DATA/NAAC/1/1.3.2/1.3.2SupportingDoc.pdf', title: '1.3.2 Supporting Document' },
      { path: 'DATA/NAAC/1/1.4.1/1.4.1SupportingDoc.pdf', title: '1.4.1 Supporting Document' },
      { path: 'DATA/NAAC/2/2.1.1/2.1.1SupportingDoc.pdf', title: '2.1.1 Supporting Document' },
      { path: 'DATA/NAAC/2/2.1.2/2.1.2SupportingDoc.pdf', title: '2.1.2 Supporting Document' },
      { path: 'DATA/NAAC/2/2.3.1/2.3.1AdditionalDoc.pdf', title: '2.3.1 Additional Document' },
      { path: 'DATA/NAAC/2/2.4.1/2.4.1SupportingDoc.pdf', title: '2.4.1 Supporting Document' },
      { path: 'DATA/NAAC/2/2.4.2/2.4.2SupportingDoc.pdf', title: '2.4.2 Supporting Document' },
      { path: 'DATA/NAAC/2/2.5.1/2.5.1AdditionalInformation.pdf', title: '2.5.1 Additional Information' },
      { path: 'DATA/NAAC/2/2.6.1/2.6.1AdditionalInformationDoc.pdf', title: '2.6.1 Additional Information' },
      { path: 'DATA/NAAC/2/2.6.2/2.6.2SupportingDoc.pdf', title: '2.6.2 Supporting Document' },
      { path: 'DATA/NAAC/3/3.1.1/3.1.1SupportingDoc.pdf', title: '3.1.1 Supporting Document' },
      { path: 'DATA/NAAC/3/3.2.1/3.2.1AdditionalDoc.pdf', title: '3.2.1 Additional Document' },
      { path: 'DATA/NAAC/3/3.2.2/3.2.2SupportingDoc.pdf', title: '3.2.2 Supporting Document' },
      { path: 'DATA/NAAC/3/3.3.1/3.3.1SupportingDoc.pdf', title: '3.3.1 Supporting Document' },
      { path: 'DATA/NAAC/3/3.3.2/3.3.2SupportingDoc.pdf', title: '3.3.2 Supporting Document' },
      { path: 'DATA/NAAC/3/3.4.1/3.4.1AdditionalInformation.pdf', title: '3.4.1 Additional Information' },
      { path: 'DATA/NAAC/3/3.4.2/3.4.2AdditionalInformation.pdf', title: '3.4.2 Additional Information' },
      { path: 'DATA/NAAC/3/3.4.3/3.4.3SupportingDoc.pdf', title: '3.4.3 Supporting Document' },
      { path: 'DATA/NAAC/3/3.5.1/3.5.1SupportingDoc.pdf', title: '3.5.1 Supporting Document' },
      { path: 'DATA/NAAC/4/4.1.1/4.1.1AdditionalInformation.pdf', title: '4.1.1 Additional Information' },
      { path: 'DATA/NAAC/4/4.1.2/4.1.2SupportingDoc.pdf', title: '4.1.2 Supporting Document' },
      { path: 'DATA/NAAC/4/4.2.1/4.2.1AdditionalDoc.pdf', title: '4.2.1 Additional Document' },
      { path: 'DATA/NAAC/4/4.3.1/4.3.1AdditionalInformation.pdf', title: '4.3.1 Additional Information' },
      { path: 'DATA/NAAC/4/4.3.2/4.3.2SupportingDoc.pdf', title: '4.3.2 Supporting Document' },
      { path: 'DATA/NAAC/4/4.4.1/4.4.1.SupportingDoc.pdf', title: '4.4.1 Supporting Document' },
      { path: 'DATA/NAAC/5/5.1.1/5.1.1SupportingDoc.pdf', title: '5.1.1 Supporting Document' },
      { path: 'DATA/NAAC/5/5.1.2/5.1.2SupportingDoc.pdf', title: '5.1.2 Supporting Document' },
      { path: 'DATA/NAAC/5/5.1.3/5.1.3SupportingDoc.pdf', title: '5.1.3 Supporting Document' },
      { path: 'DATA/NAAC/5/5.1.4/5.1.4SupportingDoc.pdf', title: '5.1.4 Supporting Document' },
      { path: 'DATA/NAAC/5/5.2.1/5.2.1SupportingDoc.pdf', title: '5.2.1 Supporting Document' },
      { path: 'DATA/NAAC/5/5.2.2/5.2.2SupportingDoc.pdf', title: '5.2.2 Supporting Document' },
      { path: 'DATA/NAAC/5/5.3.1/5.3.1SupportingDoc.pdf', title: '5.3.1 Supporting Document' },
      { path: 'DATA/NAAC/5/5.3.2/5.3.2SupportingDoc.pdf', title: '5.3.2 Supporting Document' },
      { path: 'DATA/NAAC/5/5.4.1/5.4.1AdditionalInformation.pdf', title: '5.4.1 Additional Information' },
      { path: 'DATA/NAAC/6/6.1.1/6.1.1AdditionalInformationDoc.pdf', title: '6.1.1 Additional Information' },
      { path: 'DATA/NAAC/6/6.2.1/6.2.1AdditionalInformationDoc.pdf', title: '6.2.1 Additional Information' },
      { path: 'DATA/NAAC/6/6.2.2/6.2.2SuppportingDoc.pdf', title: '6.2.2 Supporting Document' },
      { path: 'DATA/NAAC/6/6.3.1/6.3.1AdditionalInformation.pdf', title: '6.3.1 Additional Information' },
      { path: 'DATA/NAAC/6/6.3.2/6.3.2SupportingDoc.pdf', title: '6.3.2 Supporting Document' },
      { path: 'DATA/NAAC/6/6.3.3/6.3.3SupportingDoc.pdf', title: '6.3.3 Supporting Document' },
      { path: 'DATA/NAAC/6/6.4.1/6.4.1AdditionalInformation.pdf', title: '6.4.1 Additional Information' },
      { path: 'DATA/NAAC/6/6.5.1/6.5.1AdditionalInformation.pdf', title: '6.5.1 Additional Information' },
      { path: 'DATA/NAAC/6/6.5.2/6.5.2SupportingDoc.pdf', title: '6.5.2 Supporting Document' },
      { path: 'DATA/NAAC/7/7.1.1/7.1.1AdditionalDoc.pdf', title: '7.1.1 Additional Document' },
      { path: 'DATA/NAAC/7/7.1.2/7.1.2SupportingDoc.pdf', title: '7.1.2 Supporting Document' },
      { path: 'DATA/NAAC/7/7.1.3/7.1.3SupportingDoc.pdf', title: '7.1.3 Supporting Document' },
      { path: 'DATA/NAAC/7/7.1.4/7.1.4AdditionalInformationDoc.pdf', title: '7.1.4 Additional Information' },
      { path: 'DATA/NAAC/7/7.2.1/7.2.1.Best_Practices.pdf', title: '7.2.1 Best Practices' },
      { path: 'DATA/NAAC/7/7.3.1/7.3.1Distinctiveness.pdf', title: '7.3.1 Distinctiveness' }
    ],
    'AQAR': [
      { path: 'DATA/AQAR/1/1.1.2.pdf', title: '1.1.2' },
      { path: 'DATA/AQAR/1/1.4.1.pdf', title: '1.4.1' },
      { path: 'DATA/AQAR/1/1.4.2.pdf', title: '1.4.2' },
      { path: 'DATA/AQAR/2/2.2.1.pdf', title: '2.2.1' },
      { path: 'DATA/AQAR/2/2.2.2.pdf', title: '2.2.2' },
      { path: 'DATA/AQAR/2/2.3.1.pdf', title: '2.3.1' },
      { path: 'DATA/AQAR/2/2.3.2.pdf', title: '2.3.2' },
      { path: 'DATA/AQAR/2/2.3.3.pdf', title: '2.3.3' },
      { path: 'DATA/AQAR/2/2.5.1.pdf', title: '2.5.1' },
      { path: 'DATA/AQAR/2/2.5.2.pdf', title: '2.5.2' },
      { path: 'DATA/AQAR/2/2.6.1.pdf', title: '2.6.1' },
      { path: 'DATA/AQAR/2/2.6.2.pdf', title: '2.6.2' },
      { path: 'DATA/AQAR/2/2.6.3.pdf', title: '2.6.3' },
      { path: 'DATA/AQAR/3/3.1.1.pdf', title: '3.1.1' },
      { path: 'DATA/AQAR/3/3.1.2.pdf', title: '3.1.2' },
      { path: 'DATA/AQAR/3/3.1.3.pdf', title: '3.1.3' },
      { path: 'DATA/AQAR/3/3.2.1.pdf', title: '3.2.1' },
      { path: 'DATA/AQAR/3/3.2.2.pdf', title: '3.2.2' },
      { path: 'DATA/AQAR/3/3.3.2.pdf', title: '3.3.2' },
      { path: 'DATA/AQAR/3/3.3.3.pdf', title: '3.3.3' },
      { path: 'DATA/AQAR/3/3.3.4.pdf', title: '3.3.4' },
      { path: 'DATA/AQAR/3/3.4.1.pdf', title: '3.4.1' },
      { path: 'DATA/AQAR/3/3.4.2.pdf', title: '3.4.2' },
      { path: 'DATA/AQAR/4/4.1.1.pdf', title: '4.1.1' },
      { path: 'DATA/AQAR/4/4.1.2.pdf', title: '4.1.2' },
      { path: 'DATA/AQAR/4/4.1.3.pdf', title: '4.1.3' },
      { path: 'DATA/AQAR/4/4.2.1.pdf', title: '4.2.1' },
      { path: 'DATA/AQAR/5/5.1.1.pdf', title: '5.1.1' },
      { path: 'DATA/AQAR/5/5.1.2.pdf', title: '5.1.2' },
      { path: 'DATA/AQAR/5/5.1.3.pdf', title: '5.1.3' },
      { path: 'DATA/AQAR/5/5.1.4.pdf', title: '5.1.4' },
      { path: 'DATA/AQAR/5/5.1.5.pdf', title: '5.1.5' },
      { path: 'DATA/AQAR/5/5.2.1.pdf', title: '5.2.1' },
      { path: 'DATA/AQAR/5/5.2.2.pdf', title: '5.2.2' },
      { path: 'DATA/AQAR/5/5.3.2.pdf', title: '5.3.2' },
      { path: 'DATA/AQAR/5/5.3.3.pdf', title: '5.3.3' },
      { path: 'DATA/AQAR/5/5.4.1.pdf', title: '5.4.1' },
      { path: 'DATA/AQAR/5/5.4.2.pdf', title: '5.4.2' },
      { path: 'DATA/AQAR/6/6.1.1.pdf', title: '6.1.1' },
      { path: 'DATA/AQAR/6/6.1.2.pdf', title: '6.1.2' },
      { path: 'DATA/AQAR/6/6.2.1.pdf', title: '6.2.1' },
      { path: 'DATA/AQAR/6/6.2.2.pdf', title: '6.2.2' },
      { path: 'DATA/AQAR/6/6.3.1.pdf', title: '6.3.1' },
      { path: 'DATA/AQAR/6/6.3.5.pdf', title: '6.3.5' },
      { path: 'DATA/AQAR/6/6.4.1.pdf', title: '6.4.1' },
      { path: 'DATA/AQAR/6/6.5.1.pdf', title: '6.5.1' },
      { path: 'DATA/AQAR/6/6.5.2.pdf', title: '6.5.2' },
      { path: 'DATA/AQAR/6/6.5.3.pdf', title: '6.5.3' }
    ]
  };

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
    var depth = (window.location.pathname.match(/\//g) || []).length;
    var prefix = '';
    for (var i = 0; i < depth; i++) {
      prefix += '../';
    }
    var url = new URL(prefix + pdfFile, window.location.href);
    return url.toString() + '#' + PDF_HASH;
  }

  function createFileListSection(sectionKey) {
    var files = PDF_STRUCTURE[sectionKey] || [];
    if (files.length === 0) return null;

    var section = document.createElement('div');
    section.style.marginTop = '24px';

    var heading = document.createElement('h4');
    heading.textContent = 'Available Documents';
    heading.style.margin = '0 0 16px 0';
    heading.style.fontWeight = '600';

    var list = document.createElement('div');
    list.style.display = 'grid';
    list.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    list.style.gap = '12px';

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var link = document.createElement('a');
      link.href = getPdfUrl(file.path);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = file.title;
      link.style.padding = '12px 16px';
      link.style.background = '#f8f9fa';
      link.style.border = '1px solid #dee2e6';
      link.style.borderRadius = '6px';
      link.style.textDecoration = 'none';
      link.style.color = '#192f59';
      link.style.fontSize = '14px';
      link.style.transition = 'all 0.2s';
      link.style.display = 'block';

      link.addEventListener('mouseenter', function() {
        this.style.background = '#e9ecef';
        this.style.borderColor = '#192f59';
      });
      link.addEventListener('mouseleave', function() {
        this.style.background = '#f8f9fa';
        this.style.borderColor = '#dee2e6';
      });

      list.appendChild(link);
    }

    section.appendChild(heading);
    section.appendChild(list);
    return section;
  }

  function injectContent() {
    var routeConfig = getRouteConfig();
    if (!routeConfig) return;

    console.log('Route matched:', routeConfig.suffix);

    var root = document.getElementById('root');
    if (!root) {
      console.log('Root element not found');
      return;
    }

    if (root.querySelector('[data-navigation-pdf="1"]')) {
      console.log('Content already injected');
      return;
    }

    // Try multiple strategies to find the target element
    var notFoundImg = root.querySelector('img[alt="404"], img[src*="404.png"]');
    var target = notFoundImg
      ? notFoundImg.closest('.pt-90') || notFoundImg.closest('div') || notFoundImg.parentElement
      : null;

    // If no 404 found, look for main content area
    if (!target) {
      target = root.querySelector('.pt-90') || root.querySelector('main') || root;
    }

    console.log('Target element found:', !!target);

    var shouldReplaceChildren = target !== root;
    
    if (shouldReplaceChildren && target.children.length > 0) {
      while (target.firstChild) target.removeChild(target.firstChild);
    }

    var wrapper = document.createElement('div');
    wrapper.setAttribute('data-navigation-pdf', '1');
    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '1200px';
    wrapper.style.margin = '0 auto';
    wrapper.style.padding = '24px 16px';

    var title = document.createElement('h3');
    title.textContent = routeConfig.title;
    title.style.margin = '0 0 24px 0';
    title.style.fontWeight = '600';
    title.style.fontSize = '28px';
    title.style.color = '#192f59';

    wrapper.appendChild(title);

    // Create description paragraph
    var description = document.createElement('p');
    description.style.color = '#495057';
    description.style.fontSize = '16px';
    description.style.lineHeight = '1.6';
    description.style.marginBottom = '32px';
    
    // Set description based on route
    var descriptions = {
      '/naac': 'The National Assessment and Accreditation Council (NAAC) is an autonomous body established by the University Grants Commission (UGC) of India to assess and accredit institutions of higher education in the country.',
      '/aqar': 'The Annual Quality Assurance Report (AQAR) is a self-evaluative report submitted annually by institutions to NAAC, highlighting the quality initiatives undertaken during the academic year.',
      '/dvv': 'Data Validation and Verification (DVV) is the process of ensuring the accuracy and authenticity of data submitted by institutions for accreditation purposes.',
      '/nirf': 'The National Institutional Ranking Framework (NIRF) is a methodology adopted by the Ministry of Education, Government of India, to rank institutions of higher education in India.',
      '/rti': 'The Right to Information (RTI) Act empowers citizens to seek information from public authorities, promoting transparency and accountability.',
      '/iic': 'The Institution Innovation Council (IIC) is established to systematically foster the culture of innovation in institutions.',
      '/nisp': 'The National Innovation and Start-up Policy (NISP) provides guidelines for promoting innovation and entrepreneurship in educational institutions.',
      '/hrpolicy': 'The HR Policy outlines the human resource management practices, guidelines, and procedures followed by the institution.',
      '/fdp': 'Faculty Development Programs (FDP) are designed to enhance the teaching, research, and professional skills of faculty members.',
      '/committees': 'Various committees are constituted to ensure smooth functioning and governance of the institution.'
    };
    
    description.textContent = descriptions[routeConfig.suffix] || 'Welcome to ' + routeConfig.title + ' section.';
    wrapper.appendChild(description);

    // If single PDF file
    if (routeConfig.pdfFile) {
      // Create placeholder card
      var card = document.createElement('div');
      card.style.background = '#f8f9fa';
      card.style.border = '2px dashed #dee2e6';
      card.style.borderRadius = '12px';
      card.style.padding = '48px 24px';
      card.style.textAlign = 'center';
      card.style.marginTop = '24px';
      
      var icon = document.createElement('div');
      icon.innerHTML = '📄';
      icon.style.fontSize = '64px';
      icon.style.marginBottom = '16px';
      card.appendChild(icon);
      
      var cardTitle = document.createElement('h4');
      cardTitle.textContent = 'Document Coming Soon';
      cardTitle.style.color = '#192f59';
      cardTitle.style.marginBottom = '8px';
      card.appendChild(cardTitle);
      
      var cardText = document.createElement('p');
      cardText.textContent = 'The ' + routeConfig.title + ' document will be available here shortly.';
      cardText.style.color = '#6c757d';
      cardText.style.fontSize = '14px';
      card.appendChild(cardText);
      
      wrapper.appendChild(card);
    }
    // If folder with file list
    else if (routeConfig.showFileList) {
      var sectionKey = routeConfig.pdfFolder.split('/').pop();
      var fileList = createFileListSection(sectionKey);
      if (fileList) {
        wrapper.appendChild(fileList);
      } else {
        // Create placeholder grid
        var placeholderGrid = document.createElement('div');
        placeholderGrid.style.display = 'grid';
        placeholderGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        placeholderGrid.style.gap = '16px';
        placeholderGrid.style.marginTop = '24px';
        
        // Create 6 placeholder cards
        for (var i = 1; i <= 6; i++) {
          var placeholderCard = document.createElement('div');
          placeholderCard.style.background = '#f8f9fa';
          placeholderCard.style.border = '2px dashed #dee2e6';
          placeholderCard.style.borderRadius = '8px';
          placeholderCard.style.padding = '24px 16px';
          placeholderCard.style.textAlign = 'center';
          placeholderCard.style.minHeight = '120px';
          placeholderCard.style.display = 'flex';
          placeholderCard.style.flexDirection = 'column';
          placeholderCard.style.justifyContent = 'center';
          placeholderCard.style.alignItems = 'center';
          
          var placeholderIcon = document.createElement('div');
          placeholderIcon.innerHTML = '📋';
          placeholderIcon.style.fontSize = '32px';
          placeholderIcon.style.marginBottom = '8px';
          placeholderCard.appendChild(placeholderIcon);
          
          var placeholderText = document.createElement('p');
          placeholderText.textContent = 'Document ' + i;
          placeholderText.style.color = '#6c757d';
          placeholderText.style.fontSize = '14px';
          placeholderText.style.margin = '0';
          placeholderCard.appendChild(placeholderText);
          
          placeholderGrid.appendChild(placeholderCard);
        }
        
        wrapper.appendChild(placeholderGrid);
        
        // Add info message
        var infoBox = document.createElement('div');
        infoBox.style.background = '#e7f3ff';
        infoBox.style.border = '1px solid #b3d9ff';
        infoBox.style.borderRadius = '8px';
        infoBox.style.padding = '16px';
        infoBox.style.marginTop = '24px';
        infoBox.style.display = 'flex';
        infoBox.style.alignItems = 'center';
        infoBox.style.gap = '12px';
        
        var infoIcon = document.createElement('span');
        infoIcon.innerHTML = 'ℹ️';
        infoIcon.style.fontSize = '24px';
        infoBox.appendChild(infoIcon);
        
        var infoText = document.createElement('p');
        infoText.textContent = 'Documents for this section will be uploaded soon. Please check back later.';
        infoText.style.color = '#004085';
        infoText.style.fontSize = '14px';
        infoText.style.margin = '0';
        infoBox.appendChild(infoText);
        
        wrapper.appendChild(infoBox);
      }
    }

    if (shouldReplaceChildren) {
      target.appendChild(wrapper);
    } else {
      target.insertBefore(wrapper, target.firstChild || null);
    }
  }

  function scheduleInject() {
    // Try immediately
    injectContent();
    // Try again after short delay for React to render
    window.setTimeout(injectContent, 100);
    window.setTimeout(injectContent, 500);
    window.setTimeout(injectContent, 1000);
  }

  // Handle first load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInject);
  } else {
    scheduleInject();
  }

  // Handle SPA navigation
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

  // Watch for React re-rendering
  var mo = new MutationObserver(function () {
    injectContent();
  });

  try {
    mo.observe(document.documentElement, { subtree: true, childList: true });
  } catch (e) {
    // Ignore if observer fails
  }
})();
