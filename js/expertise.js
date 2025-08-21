// Expertise section functionality for Kolawoles Data Analytics portfolio

// Helper function to determine appropriate icon for expertise areas
function getExpertiseIcon(title) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('visualization') || titleLower.includes('dashboard')) return 'bi-bar-chart-line-fill';
  if (titleLower.includes('modeling') || titleLower.includes('analysis')) return 'bi-diagram-3-fill';
  if (titleLower.includes('business') || titleLower.includes('intelligence')) return 'bi-lightbulb-fill';
  if (titleLower.includes('integration')) return 'bi-intersect';
  
  // Default icon
  return 'bi-graph-up';
}

// Create the expertise section HTML
function createExpertiseSection(data) {
  let html = `
    <section class="expertise-section py-3">
      <div class="container">
        <div class="row expertise-grid">
  `;
  
  data.forEach((item, index) => {
    html += `
      <div class="col-md-6 mb-3">
        <div class="expertise-card animate-fade-in" style="animation-delay: ${(index + 1) * 100}ms;">
          <div class="card-img-container text-center py-3" id="expertise-image-${index}">
            <i class="bi ${getExpertiseIcon(item.title)} text-primary" style="font-size: 3.5rem;"></i>
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

// Add animation to expertise cards when they come into view
document.addEventListener('DOMContentLoaded', function() {
  // Add any expertise-specific functionality here
  
  // Example: Add animation to expertise cards when they come into view
  const expertiseCards = document.querySelectorAll('.expertise-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  expertiseCards.forEach(card => {
    observer.observe(card);
  });
});

// Make functions available globally
window.createExpertiseSection = createExpertiseSection;
window.getExpertiseIcon = getExpertiseIcon;
