// Modern data analytics portfolio functionality using only app.json colors

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the app
  initApp();

  function initApp() {
    createModernLayout();
    loadAppConfig();
  }

  function createModernLayout() {
    // Create modern page structure matching data.kolawoles.com
    const siteWrapper = document.querySelector('.site-wrapper');
    if (!siteWrapper) return;

    siteWrapper.innerHTML = `
      <header class="fixed-top">
        <div class="container">
          <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <a class="navbar-brand" href="/">
                <i class="bi bi-bar-chart-fill"></i>
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <i class="bi bi-list"></i>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto" id="main-nav"></ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      
      <section class="hero-section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="hero-content">
                <span class="subtitle animate-fade-in">Hello, I am</span>
                <h1 class="animate-fade-in">Adefemi Kolawole</h1>
                <h6 class="job-title animate-fade-in">Power BI Developer</h6>
                <p class="animate-fade-in">Unlocking insights from raw data to drive business growth.</p>
                <div class="hero-buttons">
                  <a href="javascript:void(0);" onclick="navigateToTab('About')" class="btn btn-primary">Learn More</a>
                  <a href="javascript:void(0);" onclick="navigateToTab('Contact')" class="btn btn-outline">Contact Me</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      <main id="content-area" class="content animate-fade-in"></main>
      
      <footer id="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <!-- Copyright info will be loaded from footer.json -->
              <p id="copyright"></p>
              
              <!-- Quick links will be loaded from footer.json -->
              <div id="quick-links" class="quick-links mt-3"></div>
            </div>
            <div class="col-md-6">
              <!-- Social links will be loaded from footer.json -->
              <div id="social-links" class="social-links text-end"></div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function initTabs(tabs) {
    const nav = document.getElementById('main-nav');
    const tabLinks = [];
    
    tabs.forEach((tab, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'nav-item';
      
      const link = document.createElement('a');
      // Don't set active class yet - we'll do this when we load the Home tab
      link.className = 'nav-link';
      link.href = '#';
      link.textContent = tab.title;
      link.dataset.tabTitle = tab.title.toLowerCase();
      
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to clicked tab
        link.classList.add('active');
        
        // Load the tab content
        loadTabContent(tab);
      });
      
      listItem.appendChild(link);
      nav.appendChild(listItem);
      tabLinks.push({ link, tab });
    });
    
    // Store tab links for later use when setting active tab
    window.tabLinks = tabLinks;
  }

  function loadTabContent(tab) {
    // Add tab-specific style if defined
    if(tab.style) {
      let linkTag = document.getElementById('dynamic-style');
      if(linkTag) linkTag.remove();
      
      linkTag = document.createElement('link');
      linkTag.rel = 'stylesheet';
      linkTag.href = tab.style;
      linkTag.id = 'dynamic-style';
      document.head.appendChild(linkTag);
    }
    
    // Since we're now including all scripts in index.html, we can directly load content
    loadTabContentData(tab);
  }
  
  function loadTabContentData(tab) {
    // Load tab content from JSON file
    fetch(tab.file)
      .then(res => res.json())
      .then(data => {
        const contentArea = document.getElementById('content-area');
        
        // Fade out current content
        contentArea.style.opacity = '0';
        
        setTimeout(() => {
          // Create content based on data and tab title
          let html = '';
          
          // Title section for each tab
          html += `
            <section class="section-title py-5">
              <div class="container">
                <h2 class="section-heading">${tab.title}</h2>
              </div>
            </section>
          `;
          
          // Determine the appropriate section creation function based on tab title
          const tabLower = tab.title.toLowerCase();
          const createFunctionName = 'create' + tab.title + 'Section';
          
          // Check if the section-specific create function exists
          if (window[createFunctionName]) {
            html += window[createFunctionName](data);
          } else if (window.createGenericSection) {
            // Use generic section renderer as fallback
            html += window.createGenericSection(data);
          } else {
            // Ultimate fallback if no section renderers are available
            html += `
              <section class="py-5">
                <div class="container">
                  <div class="alert alert-warning">
                    No renderer available for ${tab.title} section.
                  </div>
                </div>
              </section>
            `;
          }
          
          contentArea.innerHTML = html;
          
          // Fade in new content
          contentArea.style.opacity = '1';
          contentArea.style.transition = `opacity 300ms ease`;
          
          // Update page title
          document.title = `${tab.title} | ${window.appConfig.site.name}`;
        }, 300);
      })
      .catch(error => {
        console.error('Error loading tab content:', error);
        document.getElementById('content-area').innerHTML = `
          <section class="section-error py-5">
            <div class="container">
              <div class="card shadow">
                <div class="card-body text-center">
                  <h2>Content Error</h2>
                  <p>Unable to load tab content. Please try again later.</p>
                </div>
              </div>
            </div>
          </section>
        `;
      });
  }

  function loadAppConfig() {
    // Load app.json and initialize tabs
    fetch('app.json')
      .then(response => response.json())
      .then(config => {
        // Store config for later use
        window.appConfig = config;
        
        // Set document title
        document.title = config.site.name + " - Data Analytics Portfolio";
        
        // Initialize tabs from app.json
        initTabs(config.site.tabs);
        
        // Load footer content
        loadFooter();
        
        // Find the Home tab and load it first
        const homeTab = config.site.tabs.find(tab => tab.title.toLowerCase() === 'home') || config.site.tabs[0];
        
        // Set the appropriate nav link as active
        setTimeout(() => {
          if (window.tabLinks) {
            const activeTabLink = window.tabLinks.find(tl => tl.tab.title.toLowerCase() === 'home');
            if (activeTabLink) {
              document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
              });
              activeTabLink.link.classList.add('active');
            }
          }
          
          loadTabContent(homeTab);
        }, 100);
      })
      .catch(error => {
        console.error('Error loading app configuration:', error);
        document.getElementById('content-area').innerHTML = `
          <div class="card">
            <div class="card-body">
              <h2>Configuration Error</h2>
              <p>Unable to load application configuration. Please try again later.</p>
            </div>
          </div>
        `;
      });
  }

  // We no longer need loadScript as all scripts are included in index.html

  // Make navigateToTab function available globally so it can be called from button clicks
  window.navigateToTab = function(tabTitle) {
    if (!window.appConfig) return; // Make sure config is loaded
    
    // Find the tab by title
    const tab = window.appConfig.site.tabs.find(t => 
      t.title.toLowerCase() === tabTitle.toLowerCase()
    );
    
    if (!tab) return;
    
    // Find and click the corresponding nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.tabTitle === tab.title.toLowerCase()) {
        link.click();
      }
    });
  };
});
