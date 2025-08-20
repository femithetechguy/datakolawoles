// About section functionality for Data.Kolawoles Analytics portfolio
function createAboutSection(data) {
  // Separate about content and CTA content
  const aboutContent = data.filter(item => item.category === 'about');
  const ctaItem = data.find(item => item.category === 'about-cta');
  
  let html = `
    <section class="about-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 offset-lg-2">
            <div class="section-content">
              <h3 class="mb-4">Who am I?</h3>
              <h5 class="text-accent mb-3">Seasoned Data Analytics Expert</h5>
  `;
  
  aboutContent.forEach(item => {
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
  `;
  
  // Add CTA section if available in data
  if (ctaItem) {
    html += `
    <!-- CTA Section -->
    <section class="about-cta-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 offset-lg-2">
            <div class="connect-banner p-4 animate-fade-in shadow rounded text-center">
              <h3 class="connect-title mb-3">${ctaItem.title}</h3>
              <a href="mailto:${ctaItem.description}" class="email-link">
                <span class="email-text">${ctaItem.description}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
  }
  
  return html;
  
  return html;
}

// Make the function available globally
window.createAboutSection = createAboutSection;
