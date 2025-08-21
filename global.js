// Modern data analytics portfolio functionality using only app.json colors

// Debug utilities
const DEBUG = true; // Set to true to see debug messages
function debug(section, message, data = null) {
  if (!DEBUG) return;
  
  // More noticeable styles
  const styles = 'background: #f85c70; color: white; padding: 2px 5px; border-radius: 3px; font-size: 14px; font-weight: bold;';
  
  // Only use console logs, no visual indicators on page
  console.log(`%c[DEBUG: ${section}]`, styles, message);
  
  // If we have data, log it separately
  if (data) {
    console.log('Debug data:', data);
  }
}

// Set up DOM observer in main function
function setupDOMObserver() {
  if (!DEBUG) return;
  
  setTimeout(() => {
    const contentArea = document.getElementById('content-area');
    if (contentArea) {
      debug('DOM_OBSERVER', 'Setting up MutationObserver on content-area');
      
      // Create an observer to monitor content changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            debug('DOM_CHANGE', 'Content area DOM changed', {
              addedNodes: mutation.addedNodes.length,
              removedNodes: mutation.removedNodes.length
            });
          }
        });
      });
      
      // Start observing
      observer.observe(contentArea, { childList: true, subtree: true });
    }
  }, 1000); // Wait for initial page load
}

document.addEventListener('DOMContentLoaded', function() {
  debug('INIT', 'DOM Content Loaded');
  // Initialize the app
  initApp();

  function initApp() {
    debug('INIT', 'Initializing app');
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
              <div class="hero-content" id="intro-content">
                <!-- This content will be dynamically loaded from home.json -->
                <span class="subtitle animate-fade-in">Hello, I am</span>
                <h1 class="animate-fade-in">Loading...</h1>
                <h6 class="job-title animate-fade-in">Data Professional</h6>
                <p class="animate-fade-in">Loading profile information...</p>
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
      <a href="#" class="floating-home-icon" title="Go to top of page" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" style="bottom:32px;">
        <i class="bi bi-house-door-fill" style="font-size:2rem;"></i>
      </a>
    `;
  }

  function initTabs(tabs) {
    debug('TABS', 'Initializing tabs', tabs);
    
    const mainNav = document.getElementById('main-nav');
    window.tabLinks = [];
    
    tabs.forEach((tab, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'nav-item';
      
      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = 'javascript:void(0);';
      link.textContent = tab.title;
      link.dataset.tabTitle = tab.title.toLowerCase();
      
      listItem.appendChild(link);
      mainNav.appendChild(listItem);
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        debug('NAVIGATION', `Tab clicked: ${tab.title}`);
        
        // Remove active class from all tabs
        document.querySelectorAll('.nav-link').forEach(l => {
          l.classList.remove('active');
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Load tab content
        loadTabContent(tab);
      });
      
      window.tabLinks.push({ link, tab });
    });
    
    debug('TABS', 'Tabs initialization complete', window.tabLinks);
  }

  function loadTabContent(tab) {
    debug('CONTENT', `Loading tab content for: ${tab.title}`, tab);
    
    // Add tab-specific style if defined
    if(tab.style) {
      debug('STYLES', `Loading tab-specific style: ${tab.style}`);
      let linkTag = document.getElementById('dynamic-style');
      if(linkTag) {
        debug('STYLES', 'Removing existing style');
        linkTag.remove();
      }
      
      linkTag = document.createElement('link');
      linkTag.rel = 'stylesheet';
      linkTag.href = tab.style;
      linkTag.id = 'dynamic-style';
      document.head.appendChild(linkTag);
      debug('STYLES', 'New style appended to head');
    }
    
    // Since we're now including all scripts in index.html, we can directly load content
    debug('CONTENT', 'Proceeding to load tab data');
    loadTabContentData(tab);
  }
  
  function loadTabContentData(tab) {
    debug('CONTENT_DATA', `Loading tab data for: ${tab.title}`, tab);
    
    // Get content area
    const contentArea = document.getElementById('content-area');
    if (!contentArea) {
      debug('CONTENT_DATA', 'ERROR: Content area not found!');
      return;
    }
    
    // Log current DOM state
    debug('DOM_STATE', 'Current content before fade-out', {
      html: contentArea.innerHTML.substring(0, 100) + '...',
      childNodes: contentArea.childNodes.length
    });
    
    // Start fetching the new content immediately while the old content is still showing
    debug('FETCH', `Fetching JSON from: ${tab.file}`);
    
    // Fetch data before starting transition
    fetch(tab.file)
      .then(res => {
        debug('FETCH', 'Response received', { status: res.status });
        return res.json();
      })
      .then(data => {
        debug('FETCH', 'JSON data parsed', { dataLength: data.length });
        
        // Now that we have the new data, start the transition
        debug('TRANSITION', 'Fading out current content');
        contentArea.style.transition = `opacity 300ms ease`;
        contentArea.style.opacity = '0';
        
        // Debug message for transition
        debug('TRANSITION', `Loading ${tab.title}...`);
        
        // Wait for fade out to complete before updating content
        debug('TRANSITION', 'Waiting for fade-out transition (300ms)');
        setTimeout(() => {
          debug('TRANSITION', 'Fade-out complete');
          
          // Log clearing action
          debug('TRANSITION', `Loading ${tab.title}... (Clearing old content)`);
          
          // Clear current content
          debug('CONTENT_DATA', 'Clearing current content');
          contentArea.innerHTML = '';
          
          // Log DOM state after clearing
          debug('DOM_STATE', 'Content after clearing', {
            html: contentArea.innerHTML,
            childNodes: contentArea.childNodes.length
          });
          // Create content based on data and tab title
          debug('RENDER', `Beginning render for: ${tab.title}`);
          let html = '';
          
          // Title section for each tab
          html += `
            <section class="section-title py-3">
              <div class="container">
                <h2 class="section-heading">${tab.title}</h2>
              </div>
            </section>
          `;
          
          // Create function name based on tab title, e.g., createHomeSection
          const createFunctionName = `create${tab.title}Section`;
          debug('RENDER', `Looking for renderer function: ${createFunctionName}`, {
            exists: !!window[createFunctionName]
          });
          
          // Check if the section-specific create function exists
          if (window[createFunctionName]) {
            debug('RENDER', `Using ${tab.title} specific renderer`);
            html += window[createFunctionName](data);
          } else if (window.createGenericSection) {
            debug('RENDER', 'Using generic section renderer');
            html += window.createGenericSection(data);
          } else {
            debug('RENDER', 'No renderer available, using fallback');
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
          
          debug('DOM_UPDATE', 'Setting innerHTML', { 
            htmlLength: html.length,
            preview: html.substring(0, 100) + '...' 
          });
          contentArea.innerHTML = html;
          
          // Log DOM state after updating content
          debug('DOM_STATE', 'Content after updating', {
            childNodes: contentArea.childNodes.length
          });
          
          // Log fade-in action
          debug('TRANSITION', `Fading in ${tab.title}`);
          
          // Fade in new content
          debug('TRANSITION', 'Fading in new content');
          contentArea.style.transition = `opacity 300ms ease`;
          // Set a small timeout to ensure the transition property is applied before opacity changes
          setTimeout(() => {
            contentArea.style.opacity = '1';
          }, 20);
          
          // Update page title
          document.title = `${tab.title} | ${window.appConfig.site.name}`;
          debug('CONTENT_DATA', `Tab content load complete for: ${tab.title}`);
          
          // Log completion of transition
          setTimeout(() => {
            debug('TRANSITION', `${tab.title} tab transition complete`);
          }, 500);
        }, error => {
          debug('ERROR', 'Error loading tab content', error);
          
          // Update debug marker to show error
          if (document.getElementById('debug-transition-marker')) {
            const marker = document.getElementById('debug-transition-marker');
            marker.textContent = `ERROR: Failed to load ${tab.title}`;
            marker.style.backgroundColor = 'rgba(128,0,0,0.9)';
            
            // Keep error marker visible longer
            setTimeout(() => {
              if (document.getElementById('debug-transition-marker')) {
                document.getElementById('debug-transition-marker').remove();
              }
            }, 3000);
          }
          
          contentArea.innerHTML = `
            <section class="section-error py-3">
              <div class="container">
                <div class="card shadow">
                  <div class="card-body text-center">
                    <h2>Content Error</h2>
                    <p>Unable to load tab content. Please try again later.</p>
                    <p class="text-danger">Error: ${error.message}</p>
                  </div>
                </div>
              </div>
            </section>
          `;
          contentArea.style.transition = `opacity 300ms ease`;
          setTimeout(() => {
            contentArea.style.opacity = '1';
          }, 20);
        });
    }, 300);
  }

  function loadIntroContent() {
    debug('INTRO', 'Loading intro content from home.json');
    
    fetch('json/home.json')
      .then(response => {
        debug('INTRO', 'Home json response received', { status: response.status });
        return response.json();
      })
      .then(data => {
        debug('INTRO', 'Home json parsed successfully', data);
        
        // Find intro item
        const introItem = data.find(item => item.id === 'intro');
        if (introItem) {
          debug('INTRO', 'Found intro data', introItem);
          
          const introContent = document.getElementById('intro-content');
          if (introContent) {
            // Parse the title to get the name and job title
            const titleParts = introItem.title.split(':');
            const name = titleParts[0].trim();
            const jobTitle = titleParts.length > 1 ? titleParts[1].trim() : 'Data Analytics Expert';
            
            // Update the intro content
            introContent.innerHTML = `
              <span class="subtitle animate-fade-in">Hello, I am</span>
              <h1 class="animate-fade-in">${name}</h1>
              <h6 class="job-title animate-fade-in">${jobTitle}</h6>
              <p class="animate-fade-in">${introItem.description}</p>
              <div class="hero-buttons">
                <a href="javascript:void(0);" onclick="navigateToTab('About')" class="btn btn-primary">Learn More</a>
                <a href="javascript:void(0);" onclick="navigateToTab('Contact')" class="btn btn-outline">Contact Me</a>
              </div>
            `;
            
            debug('INTRO', 'Updated intro content');
          } else {
            debug('INTRO', 'ERROR: Intro content element not found');
          }
        } else {
          debug('INTRO', 'ERROR: No intro item found in home.json');
        }
      })
      .catch(error => {
        debug('INTRO', 'ERROR loading intro content', error);
        console.error('Error loading intro content:', error);
      });
  }

  function loadAppConfig() {
    debug('CONFIG', 'Loading app configuration from app.json');
    // Load app.json and initialize tabs
    fetch('app.json')
      .then(response => {
        debug('CONFIG', 'App config response received', { status: response.status });
        return response.json();
      })
      .then(config => {
        debug('CONFIG', 'App config parsed successfully', config);
        // Store config for later use
        window.appConfig = config;
        
        // Set document title
        document.title = config.site.name + " - Data Analytics Portfolio";
        debug('CONFIG', `Document title set: ${document.title}`);
        
        // Initialize tabs from app.json
        debug('CONFIG', 'Initializing tabs from config');
        initTabs(config.site.tabs);
        
        // Load intro content
        debug('INTRO', 'Loading intro content');
        loadIntroContent();
        
        // Load footer content
        debug('FOOTER', 'Loading footer content');
        loadFooter();
        
        // Find the Home tab and load it first
        const homeTab = config.site.tabs.find(tab => tab.title.toLowerCase() === 'home') || config.site.tabs[0];
        debug('INITIAL_LOAD', 'Default tab identified', homeTab);
        
        // Set the appropriate nav link as active
        debug('INITIAL_LOAD', 'Setting up initial tab after short delay (100ms)');
        setTimeout(() => {
          debug('INITIAL_LOAD', 'Timeout elapsed, activating initial tab');
          
          if (window.tabLinks) {
            const activeTabLink = window.tabLinks.find(tl => tl.tab.title.toLowerCase() === 'home');
            if (activeTabLink) {
              debug('INITIAL_LOAD', 'Setting home tab as active');
              document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
              });
              activeTabLink.link.classList.add('active');
            } else {
              debug('INITIAL_LOAD', 'ERROR: Could not find home tab link');
            }
          } else {
            debug('INITIAL_LOAD', 'ERROR: tabLinks not available');
          }
          
          // Load the home content
          debug('INITIAL_LOAD', 'Loading initial tab content');
          loadTabContent(homeTab);
        }, 100);
      })
      .catch(error => {
        debug('CONFIG', 'ERROR loading app configuration', error);
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
    debug('NAVIGATION', `navigateToTab called with: ${tabTitle}`);
    
    if (!window.appConfig) {
      debug('NAVIGATION', 'ERROR: App config not loaded yet');
      return;
    }
    
    // Find the tab by title
    const tab = window.appConfig.site.tabs.find(t => 
      t.title.toLowerCase() === tabTitle.toLowerCase()
    );
    
    if (!tab) {
      debug('NAVIGATION', `ERROR: No tab found with title: ${tabTitle}`);
      return;
    }
    
    debug('NAVIGATION', `Found tab configuration`, tab);
    
    // Find and click the corresponding nav link
    let linkFound = false;
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.tabTitle === tab.title.toLowerCase()) {
        debug('NAVIGATION', `Clicking tab link for: ${tab.title}`);
        linkFound = true;
        link.click();
      }
    });
    
    if (!linkFound) {
      debug('NAVIGATION', `ERROR: No matching nav link found in DOM for: ${tab.title}`);
    }
  };
});
