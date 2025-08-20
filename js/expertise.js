// Expertise page specific JavaScript

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
