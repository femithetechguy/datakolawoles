// JavaScript for Showcase section functionality

// Helper function to get more specific project icons
function getProjectIcon(projectTitle) {
  const title = projectTitle.toLowerCase();
  
  // Match project titles to appropriate Bootstrap icons
  if (title.includes('sales') || title.includes('revenue')) return 'bi-cash-coin';
  if (title.includes('customer') || title.includes('segmentation')) return 'bi-people-fill';
  if (title.includes('financial') || title.includes('finance')) return 'bi-currency-dollar';
  if (title.includes('market') || title.includes('trend')) return 'bi-graph-up-arrow';
  if (title.includes('supply') || title.includes('chain')) return 'bi-truck';
  if (title.includes('hr') || title.includes('employee')) return 'bi-person-workspace';
  if (title.includes('healthcare') || title.includes('medical')) return 'bi-heart-pulse-fill';
  if (title.includes('retail')) return 'bi-shop';
  if (title.includes('manufacturing')) return 'bi-gear-wide-connected';
  
  // Fallback icons if the more specific ones don't match
  if (title.includes('data')) return 'bi-database-fill';
  if (title.includes('chart') || title.includes('graph')) return 'bi-bar-chart-fill';
  if (title.includes('report')) return 'bi-file-earmark-text';
  if (title.includes('analytics')) return 'bi-graph-up';
  if (title.includes('dashboard')) return 'bi-speedometer2';
  
  // Default icon
  return 'bi-bar-chart-fill';
}

// Create the showcase section HTML
function createShowcaseSection(data) {
  let html = `
    <section class="showcase-section py-3">
      <div class="container">
        <div class="showcase-gallery">
          <div class="row justify-content-center">
  `;
  
  data.forEach((project, index) => {
    html += `
      <div class="col-md-6 col-lg-3 mb-2">
        <div class="showcase-item animate-fade-in" style="animation-delay: ${(index + 1) * 100}ms;">
          <div class="card shadow h-100">
            <div class="card-img-top text-center px-3 py-2 bg-light" id="project-image-${index}">
              <i class="bi ${getProjectIcon(project.title)} text-primary" style="font-size: 3.75rem;"></i>
            </div>
            <div class="card-body">
              <h5 class="card-title mb-1">${project.title}</h5>
              <p class="card-text mb-2">${project.description}</p>
              <div class="d-flex flex-wrap gap-2">
                ${project.link ? `<a href="${project.link}" class="btn btn-primary btn-sm">View Details</a>` : ''}
              </div>
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


// Make functions available globally
window.createShowcaseSection = createShowcaseSection;
window.getProjectIcon = getProjectIcon;
