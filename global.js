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
                <span>Kolawoles Analytics</span>
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
                  <a href="#about" class="btn btn-primary">Learn More</a>
                  <a href="#contact" class="btn btn-outline">Contact Me</a>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="hero-image">
                <img src="assets/imgs/data_avatar.jpg" alt="Adefemi Kolawole" class="img-fluid rounded-circle shadow">
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

    // Since we're using Bootstrap in index.html now, we don't need to add these links anymore
    // They're already included in the HTML head
  }

  function loadFooter() {
    // Load footer content from footer.json
    fetch('json/footer.json')
      .then(response => response.json())
      .then(footerData => {
        // Set copyright text
        document.getElementById('copyright').textContent = footerData.copyright;
        
        // Generate quick links
        const quickLinksContainer = document.getElementById('quick-links');
        if (footerData.quickLinks && footerData.quickLinks.length > 0) {
          let quickLinksHtml = '';
          footerData.quickLinks.forEach(link => {
            quickLinksHtml += `<a href="${link.url}" class="me-3">${link.text}</a>`;
          });
          quickLinksContainer.innerHTML = quickLinksHtml;
        }
        
        // Generate social links
        const socialLinksContainer = document.getElementById('social-links');
        if (footerData.socialLinks && footerData.socialLinks.length > 0) {
          let socialLinksHtml = '';
          footerData.socialLinks.forEach(link => {
            socialLinksHtml += `<a href="${link.url}" title="${link.platform}" target="_blank" rel="noopener"><i class="bi ${link.icon}"></i></a>`;
          });
          socialLinksContainer.innerHTML = socialLinksHtml;
        }
      })
      .catch(error => {
        console.error('Error loading footer data:', error);
        document.getElementById('copyright').textContent = `© ${new Date().getFullYear()} Kolawoles Data Analytics. All rights reserved.`;
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
    
    // Load tab-specific script if defined
    if(tab.script) {
      let scriptTag = document.getElementById('dynamic-script');
      if(scriptTag) scriptTag.remove();
      
      scriptTag = document.createElement('script');
      scriptTag.src = tab.script;
      scriptTag.id = 'dynamic-script';
      document.body.appendChild(scriptTag);
    }
    
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
          
          // Render different content based on tab title
          if (tab.title.toLowerCase() === 'home') {
            html += createHomeSection(data);
          } else if (tab.title.toLowerCase() === 'about') {
            html += createAboutSection(data);
          } else if (tab.title.toLowerCase() === 'expertise') {
            html += createExpertiseSection(data);
          } else if (tab.title.toLowerCase() === 'skillset') {
            html += createSkillsetSection(data);
          } else if (tab.title.toLowerCase() === 'showcase') {
            html += createShowcaseSection(data);
          } else if (tab.title.toLowerCase() === 'contact') {
            html += createContactSection(data);
          } else {
            html += createGenericSection(data);
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
  
  function createAboutSection(data) {
    let html = `
      <section class="about-section py-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="section-content">
                <h3 class="mb-4">Who am I?</h3>
                <h5 class="text-accent mb-3">Seasoned Data Analytics Expert</h5>
    `;
    
    data.forEach(item => {
      html += `
        <p class="mb-3">${item.description}</p>
      `;
    });
    
    html += `
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="personal-info py-5 bg-light">
        <div class="container">
          <h3 class="mb-4">Personal Info</h3>
          <div class="row">
            <div class="col-md-6">
              <ul class="list-unstyled">
                <li><strong>Email:</strong> <a href="mailto:adefemi@kolawoles.com">adefemi@kolawoles.com</a></li>
                <li><strong>Website:</strong> <a href="https://www.kolawoles.com/">Adefemi Kolawole</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
    
    return html;
  }
  
  function createSkillsetSection(data) {
    let html = `
      <section class="skills-section py-5">
        <div class="container">
          <div class="row">
    `;
    
    data.forEach((skill, index) => {
      html += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="skill-card animate-fade-in" style="animation-delay: ${(index + 1) * 100}ms;">
            <h4 class="skill-title">${skill.title}</h4>
            <h6 class="skill-subtitle">${skill.subtitle}</h6>
            <p>${skill.description}</p>
          </div>
        </div>
      `;
    });
    
    html += `
          </div>
        </div>
      </section>
    `;
    
    return html;
  }
  
  function createShowcaseSection(data) {
    let html = `
      <section class="showcase-section py-5">
        <div class="container">
          <div class="showcase-gallery">
            <div class="row">
    `;
    
    data.forEach((project, index) => {
      html += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="showcase-item animate-fade-in" style="animation-delay: ${(index + 1) * 100}ms;">
            <div class="card shadow h-100">
              <img src="${project.imageUrl || 'assets/imgs/dashboard.svg'}" class="card-img-top" alt="${project.title}">
              <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
                ${project.link ? `<a href="${project.link}" class="btn btn-primary mt-2">View Details</a>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    html += `
            </div>
          </div>
        </div>
      </section>
    `;
    
    return html;
  }
  
  function createContactSection(data) {
    let html = `
      <section class="contact-section py-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <h3 class="mb-4">Professional & Consultation Inquiry</h3>
              <div class="contact-form card shadow p-4">
                <form>
                  <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" required>
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" required>
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea class="form-control" id="message" rows="4" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Submit Inquiry</button>
                </form>
              </div>
            </div>
            <div class="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
              <div class="business-contact">
                <h3 class="mb-4">Business Contact</h3>
                <h6 class="mb-3">Email for Professional Inquiries:</h6>
                <p><a href="mailto:adefemi@kolawoles.com?subject=Consultation%20or%20Professional%20Inquiry">adefemi@kolawoles.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    
    return html;
  }
  
  function createHomeSection(data) {
    let html = `
      <section class="home-section py-5">
        <div class="container">
          <div class="row">
    `;
    
    data.forEach((item, index) => {
      if (index === 0) {
        html += `
          <div class="col-12 mb-5">
            <div class="welcome-banner animate-fade-in text-center py-4">
              <h2 class="mb-3">${item.title}</h2>
              <p class="lead">${item.description}</p>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="feature-card animate-fade-in" style="animation-delay: ${(index) * 100}ms;">
              <div class="card shadow h-100">
                ${item.imageUrl ? `
                  <div class="text-center p-4 bg-light">
                    <img src="${item.imageUrl}" alt="${item.title}" class="img-fluid" style="height: 120px;">
                  </div>
                ` : ''}
                <div class="card-body">
                  <h4>${item.title}</h4>
                  <p>${item.description}</p>
                  ${item.link ? `<a href="${item.link}" class="btn btn-primary">Learn More</a>` : ''}
                </div>
              </div>
            </div>
          </div>
        `;
      }
    });
    
    html += `
          </div>
        </div>
      </section>
    `;
    
    return html;
  }

  function createExpertiseSection(data) {
    let html = `
      <section class="expertise-section py-5">
        <div class="container">
          <div class="row expertise-grid">
    `;
    
    data.forEach((item, index) => {
      html += `
        <div class="col-md-6 mb-4">
          <div class="expertise-card animate-fade-in" style="animation-delay: ${(index + 1) * 100}ms;">
            <div class="card-img-container">
              ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" class="img-fluid">` : ''}
            </div>
            <div class="card-content">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              ${item.link ? `<a href="${item.link}" class="btn btn-primary">Learn More</a>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    
    html += `
          </div>
        </div>
      </section>
    `;
    
    return html;
  }

  function createGenericSection(data) {
    let html = `
      <section class="generic-section py-5">
        <div class="container">
          <div class="row">
    `;
    
    data.forEach((item, index) => {
      html += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card animate-fade-in shadow h-100" style="animation-delay: ${(index + 1) * 100}ms;">
            <div class="card-header">
              <h4>${item.title}</h4>
            </div>
            <div class="card-body">
              <p>${item.description}</p>
              ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" class="img-fluid rounded mt-3">` : ''}
              ${item.link ? `<a href="${item.link}" class="btn btn-primary mt-3">View Details</a>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    
    html += `
          </div>
        </div>
      </section>
    `;
    
    return html;
  }
});
