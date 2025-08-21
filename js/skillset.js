// Skillset section functionality for Data.Kolawoles Analytics portfolio

// Create the skillset section HTML
function createSkillsetSection(data) {
  let html = `
    <section class="skills-section py-3">
      <div class="container">
        <div class="row">
  `;
  
  data.forEach((skill, index) => {
    html += `
      <div class="col-md-6 col-lg-3 mb-3">
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

// Add any skillset-specific functionality
document.addEventListener('DOMContentLoaded', function() {
  // Example: Add skill progress bars if needed
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const percentage = bar.getAttribute('data-percentage') || '0';
    bar.style.width = percentage + '%';
  });
});

// Make the function available globally
window.createSkillsetSection = createSkillsetSection;
