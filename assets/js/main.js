// ==============================
// MAIN.JS
// ==============================

// ==============================
// HAMBURGER MENU TOGGLE
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Optional: Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });
  }

  // ==============================
  // FADE-IN ANIMATIONS
  // ==============================
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
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
  // DYNAMIC PROJECTS LOAD
  // ==============================
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    fetch('assets/data/projects.json')
      .then(res => res.json())
      .then(data => {
        data.projects.forEach(project => {
          const card = document.createElement('div');
          card.classList.add('card', 'fade-in');
          card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <a class="btn" href="${project.link}" target="_blank">View Project</a>
          `;
          projectsGrid.appendChild(card);
        });
      })
      .catch(err => console.error('Error loading projects:', err));
  }

  // ==============================
  // DYNAMIC BLOG POSTS LOAD
  // ==============================
  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid) {
    fetch('assets/data/blogPosts.json')
      .then(res => res.json())
      .then(data => {
        data.posts.forEach(post => {
          const card = document.createElement('div');
          card.classList.add('card', 'fade-in');
          card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <h4>${post.title}</h4>
            <p>${post.excerpt}</p>
            <a class="btn" href="${post.link}" target="_blank">Read More</a>
          `;
          blogGrid.appendChild(card);
        });
      })
      .catch(err => console.error('Error loading blog posts:', err));
  }

  // ==============================
  // UPDATE YEAR IN FOOTER
  // ==============================
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
