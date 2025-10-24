// ==============================
// MAIN.JS — SignalCraft Audio
// Handles animations, hamburger menu, smooth scroll, blog dynamic rendering
// ==============================

// ==============================
// DOM ELEMENTS
// ==============================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// ==============================
// HAMBURGER MENU TOGGLE
// ==============================
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navLinks &&
    menuToggle &&
    !navLinks.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    navLinks.classList.remove('show');
  }
});

// ==============================
// SMOOTH SCROLL FOR ANCHORS
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==============================
// FADE-IN ANIMATIONS ON SCROLL
// ==============================
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// ==============================
// BLOG POSTS DYNAMIC RENDER
// ==============================
const blogGrid = document.getElementById('blog-grid');

if (blogGrid) {
  fetch('blogPosts.json')
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('card', 'fade-in');

        postCard.innerHTML = `
          <img src="${post.image}" alt="${post.title}">
          <h4>${post.title}</h4>
          <p><em>${post.date} — ${post.author}</em></p>
          <p>${post.excerpt}</p>
          <a class="btn" href="${post.url}">Read More</a>
        `;
        blogGrid.appendChild(postCard);
        appearOnScroll.observe(postCard); // apply fade-in effect
      });
    })
    .catch(error => console.error('Error loading blog posts:', error));
}

// ==============================
// FOOTER YEAR UPDATE
// ==============================
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ==============================
// CONTACT FORM SUBMISSION (SIMULATED)
// ==============================
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    contactForm.reset();
  });
}