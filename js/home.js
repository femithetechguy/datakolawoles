// Home section functionality for Data.Kolawoles Analytics portfolio

// Create the home section HTML
function createHomeSection(data) {
  let html = `
    <section class="home-section py-3">
      <div class="container">
        <div class="row">
  `;
  
  data.forEach((item, index) => {
    if (index === 0) {
      html += `
        <div class="col-12 mb-3">
          <div class="welcome-banner animate-fade-in text-center py-4">
            <h2 class="mb-3">${item.title}</h2>
            <p class="lead">${item.description}</p>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="col-md-6 col-lg-4 mb-3">
          <div class="feature-card animate-fade-in" style="animation-delay: ${(index) * 100}ms;">
            <div class="card shadow h-100">
              <div class="text-center p-4 bg-light" id="home-image-${index}">
                <i class="bi ${getBootstrapIconForTitle(item.title)} text-primary" style="font-size: 4rem;"></i>
              </div>
              <div class="card-body">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                ${item.link ? `<a href="javascript:void(0);" onclick="navigateToTab('Showcase')" class="btn btn-primary">Learn More</a>` : ''}
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

// Navigation and scroll logic
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        const hash = this.hash;
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
          });
          history.pushState(null, null, hash);
        }
      }
    });
  });
});

// Set favicon if not already set
(function() {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = "assets/imgs/favicon.png";
})();

// Helper function to determine the appropriate Bootstrap icon based on title
function getBootstrapIconForTitle(title) {
  const titleLower = title.toLowerCase();
  
  // Map common data analytics terms to appropriate Bootstrap icons
  if (titleLower.includes('data') || titleLower.includes('analytics')) return 'bi-bar-chart-fill';
  if (titleLower.includes('visualization') || titleLower.includes('dashboard')) return 'bi-graph-up';
  if (titleLower.includes('services')) return 'bi-gear-fill';
  if (titleLower.includes('expertise')) return 'bi-stars';
  if (titleLower.includes('project') || titleLower.includes('featured')) return 'bi-collection';
  if (titleLower.includes('integration')) return 'bi-diagram-3';
  if (titleLower.includes('model')) return 'bi-grid-3x3-gap';
  if (titleLower.includes('business') || titleLower.includes('intelligence')) return 'bi-briefcase-fill';
  
  // Default icon if no match
  return 'bi-bar-chart-line-fill';
}

// Make functions available globally
window.createHomeSection = createHomeSection;
window.getBootstrapIconForTitle = getBootstrapIconForTitle;
