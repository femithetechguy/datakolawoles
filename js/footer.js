// Footer functionality for Data.Kolawoles Analytics portfolio

// Load footer content from footer.json
function loadFooter() {
  // Load footer content from footer.json
  fetch('json/footer.json')
    .then(response => response.json())
    .then(footerData => {
      // Set copyright text
      document.getElementById('copyright').textContent = footerData.copyright;
      
      // Generate quick links
      const quickLinksContainer = document.getElementById('quick-links');
      if (footerData.quickLinks && footerData.quickLinks.length > 0) {
        let quickLinksHtml = '';
        footerData.quickLinks.forEach(link => {
          quickLinksHtml += `<a href="${link.url}" class="me-3">${link.text}</a>`;
        });
        quickLinksContainer.innerHTML = quickLinksHtml;
      }
      
      // Generate social links
      const socialLinksContainer = document.getElementById('social-links');
      if (footerData.socialLinks && footerData.socialLinks.length > 0) {
        let socialLinksHtml = '';
        footerData.socialLinks.forEach(link => {
          socialLinksHtml += `<a href="${link.url}" title="${link.platform}" target="_blank" rel="noopener"><i class="bi ${link.icon}"></i></a>`;
        });
        socialLinksContainer.innerHTML = socialLinksHtml;
      }
    })
    .catch(error => {
      console.error('Error loading footer data:', error);
      document.getElementById('copyright').textContent = `© ${new Date().getFullYear()} Data.Kolawoles Analytics. All rights reserved.`;
    });
}

// Make the function available globally
window.loadFooter = loadFooter;
