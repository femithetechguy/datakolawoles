// About section functionality for Data.Kolawoles Analytics portfolio
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
  `;
  
  return html;
}

// Make the function available globally
window.createAboutSection = createAboutSection;
