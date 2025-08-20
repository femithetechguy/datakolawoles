// Showcase section functionality for Kolawoles Data Analytics portfolio

// Create the showcase section HTML
function createShowcaseSection(data) {
  let html = `
    <section class="showcase-section py-5">
      <div class="container">
        <div class="showcase-gallery">
          <div class="row">
  `;
  
  data.forEach((project, index) => {
    html += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="showcase-item animate-fade-in" style="animation-delay: ${(index + 1) * 100}ms;">
          <div class="card shadow h-100">
            <img src="${project.imageUrl || 'assets/imgs/dashboard.svg'}" class="card-img-top" alt="${project.title}">
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

// Make the function available globally
window.createShowcaseSection = createShowcaseSection;
window.printProject = printProject;
