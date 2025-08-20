// Expertise section functionality for Kolawoles Data Analytics portfolio

// Create the expertise section HTML
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

// Make the function available globally
window.createExpertiseSection = createExpertiseSection;
