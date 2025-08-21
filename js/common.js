// Common utility functions for Data.Kolawoles Analytics portfolio

// Helper function to get common icons
function getCommonIcon(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('data')) return 'bi-database';
  if (titleLower.includes('analysis')) return 'bi-clipboard-data';
  if (titleLower.includes('dashboard')) return 'bi-speedometer2';
  if (titleLower.includes('report')) return 'bi-file-earmark-bar-graph';
  if (titleLower.includes('chart')) return 'bi-pie-chart-fill';
  
  // Default
  return 'bi-star-fill';
}

// Create a generic section based on data
function createGenericSection(data) {
  let html = `
    <section class="generic-section py-3">
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
            <div class="text-center mt-3" id="common-image-${index}">
              <i class="bi ${getCommonIcon(item.title)} text-primary" style="font-size: 3rem;"></i>
            </div>
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

// Utility function for fade-in animation
function animateElement(element, animationClass = 'animate-fade-in', delay = 0) {
  if (!element) return;
  
  element.classList.add(animationClass);
  if (delay > 0) {
    element.style.animationDelay = `${delay}ms`;
  }
}

// Utility function to format date
function formatDate(date) {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Make functions available globally
window.createGenericSection = createGenericSection;
window.animateElement = animateElement;
window.formatDate = formatDate;
window.getCommonIcon = getCommonIcon;
