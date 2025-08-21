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
          <div class="row">
  `;
  
  data.forEach((project, index) => {
    html += `
      <div class="col-md-6 col-lg-3 mb-3">
        <div class="showcase-item animate-fade-in" style="animation-delay: ${(index + 1) * 100}ms;">
          <div class="card shadow h-100">
            <div class="card-img-top text-center py-4 bg-light" id="project-image-${index}">
              <i class="bi ${getProjectIcon(project.title)} text-primary" style="font-size: 4.5rem;"></i>
            </div>
            <div class="card-body">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">${project.description}</p>
              ${project.link ? `<a href="${project.link}" class="btn btn-primary mt-2">View Details</a>` : ''}
              <button onclick="printProject('${project.title}')" class="btn btn-outline-secondary mt-2 ms-2">
                <i class="bi bi-printer"></i> Print
              </button>
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

// Print project details
function printProject(projectTitle) {
  // Create a printable version of the project
  const printContent = `
    <html>
      <head>
        <title>Project: ${projectTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #F85C70; }
          .project-details { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>${projectTitle}</h1>
        <div class="project-details">
          <p>Project details for ${projectTitle}</p>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
    </html>
  `;
  
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

// Print page
function printPage() {
  window.print();
}

// Print file (PDF, etc.)
function printFile(fileUrl) {
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.top = "-10000px";
  iframe.src = fileUrl;
  document.body.appendChild(iframe);
  iframe.onload = () => {
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };
}

// Make functions available globally
window.createShowcaseSection = createShowcaseSection;
window.getProjectIcon = getProjectIcon;
window.printProject = printProject;
