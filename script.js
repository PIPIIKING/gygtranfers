// Scroll animation
document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll(".fade-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));

});

// Google Places Autocomplete
function initAutocomplete() {

  const origenInput = document.getElementById("origen");
  const destinoInput = document.getElementById("destino");

  if (origenInput) {
    new google.maps.places.Autocomplete(origenInput, {
      componentRestrictions: { country: "ar" },
      fields: ["formatted_address", "geometry"]
    });
  }

  if (destinoInput) {
    new google.maps.places.Autocomplete(destinoInput, {
      componentRestrictions: { country: "ar" },
      fields: ["formatted_address", "geometry"]
    });
  }
}

window.addEventListener("load", initAutocomplete);
// Autocomplete con OpenStreetMap (Gratis)

function setupAutocomplete(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const dropdown = document.createElement("div");
  dropdown.classList.add("autocomplete-dropdown");
  input.parentNode.appendChild(dropdown);

  input.addEventListener("input", async function () {
    const query = input.value;
    if (query.length < 3) {
      dropdown.innerHTML = "";
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=ar&q=${query}`
    );

    const data = await response.json();

    dropdown.innerHTML = "";

    data.forEach(place => {
      const option = document.createElement("div");
      option.textContent = place.display_name;
      option.addEventListener("click", () => {
        input.value = place.display_name;
        dropdown.innerHTML = "";
      });
      dropdown.appendChild(option);
    });
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target)) {
      dropdown.innerHTML = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupAutocomplete("origen");
  setupAutocomplete("destino");
});