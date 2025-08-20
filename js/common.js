// Common utility functions for Kolawoles Data Analytics portfolio

// Create a generic section based on data
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
