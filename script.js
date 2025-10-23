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

// === RESPONSIVE NAVIGATION ===
const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuIcon.querySelector("i").classList.toggle("fa-bars");
    menuIcon.querySelector("i").classList.toggle("fa-times");
  });

  // Optional: close menu when clicking a link
  document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuIcon.querySelector("i").classList.add("fa-bars");
      menuIcon.querySelector("i").classList.remove("fa-times");
    });
  });
}

// === FEEDBACK FUNCTIONALITY ===
const openBtn = document.getElementById('openFeedback');
const modal = document.getElementById('feedbackModal');
const closeBtn = document.getElementById('closeFeedback');
const stars = document.querySelectorAll('.star');
const submitBtn = document.getElementById('submitFeedback');
const feedbackList = document.getElementById('feedbackList');
let selectedRating = 0;

// Open modal
if (openBtn) {
  openBtn.onclick = () => { modal.style.display = 'flex'; };
}

// Close modal
if (closeBtn) {
  closeBtn.onclick = () => { modal.style.display = 'none'; };
}

// Click outside modal
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = 'none';
};

// Star rating click
stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value;
    stars.forEach(s => s.classList.remove('active'));
    for (let i = 0; i < selectedRating; i++) stars[i].classList.add('active');
  });
});

// Submit feedback
if (submitBtn) {
  submitBtn.onclick = () => {
    const name = document.getElementById('fbName').value.trim();
    const message = document.getElementById('fbMessage').value.trim();

    if (!name || !message || selectedRating == 0) {
      alert('Please complete all fields!');
      return;
    }

    const feedback = {
      name: name,
      rating: selectedRating,
      message: message,
      date: new Date().toLocaleString()
    };

    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.unshift(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    renderFeedbacks();

    document.getElementById('fbName').value = '';
    document.getElementById('fbMessage').value = '';
    stars.forEach(s => s.classList.remove('active'));
    selectedRating = 0;
    modal.style.display = 'none';
  };
}

// Render feedback list
function renderFeedbacks() {
  let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  feedbackList.innerHTML = feedbacks.map(f => `
    <div class="feedback-item">
      <strong>${f.name}</strong>
      <span>(${f.rating}⭐)</span>
      <p>${f.message}</p>
      <small>${f.date}</small>
    </div>
  `).join('');
}