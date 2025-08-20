// Contact section functionality for Kolawoles Data Analytics portfolio

// Create the contact section HTML
function createContactSection(data) {
  let html = `
    <section class="contact-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <h3 class="mb-4">Professional & Consultation Inquiry</h3>
            <div class="contact-form card shadow p-4">
              <form onsubmit="sendMessage(); return false;">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" required>
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Message</label>
                  <textarea class="form-control" id="message" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit Inquiry</button>
              </form>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
            <div class="business-contact">
              <h3 class="mb-4">Business Contact</h3>
              <h6 class="mb-3">Email for Professional Inquiries:</h6>
              <p><a href="mailto:adefemi@kolawoles.com?subject=Consultation%20or%20Professional%20Inquiry">adefemi@kolawoles.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  
  return html;
}

// Google Maps dark theme (if needed)
function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.7501, lng: -84.3885 },
    zoom: 12,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
      { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
      { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
      { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
      { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
      { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
      { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
      { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
      { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
      { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
      { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
      { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
      { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
    ],
  });
}

// Send message (reloads page)
function sendMessage() {
  alert("Your message has been sent!");
  location.reload();
}

// Make the function available globally
window.createContactSection = createContactSection;
