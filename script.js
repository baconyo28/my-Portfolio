// === INITIALIZE EMAILJS ===
(function() {
  emailjs.init("xWUBa5SCXdwNdvg0g"); // 🔑 Replace with your actual EmailJS Public Key
})();

// === CONTACT FORM HANDLER ===
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const serviceID = "service_mjuot8s"; // ✅ Your EmailJS service ID
  const templateID = "Ytemplate_pf2x8ub"; // ✅ Replace with your actual template ID

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      alert("Message sent successfully! ✅");
      this.reset();
    }, (err) => {
      alert("Failed to send message ❌ " + JSON.stringify(err));
    });
});

// === SECTION TOGGLE HANDLER ===

// Sections
const homeSection = document.getElementById('home');
const servicesSection = document.getElementById('Services');
const projectsSection = document.getElementById('Projects');
const contactSection = document.getElementById('Contact');

// Navigation Links
const homeLink = document.getElementById('homeLink');
const servicesLink = document.getElementById('servicesLink');
const projectsLink = document.getElementById('projectsLink');
const contactLink = document.getElementById('contactLink');

// Helper: Show only one section at a time
function showSection(section) {
  [homeSection, servicesSection, projectsSection, contactSection].forEach(s => s.classList.add('hidden'));
  section.classList.remove('hidden');
  section.classList.add('fade-in');
}

// Navigation Events
homeLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(homeSection);
});

servicesLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(servicesSection);
});

projectsLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(projectsSection);
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(contactSection);
});