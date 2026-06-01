// ─── Active nav link based on current page ───
(function setActiveNav() {
  const links = document.querySelectorAll('.nav-menu a');
  const current = window.location.pathname;
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    
    // Normalize paths to just filename
    const linkFile = href.split('/').pop();
    const currFile = current.split('/').pop();
    
    if (linkFile && currFile && linkFile === currFile) {
      link.classList.add('active');
    }
    // Special case: index.html, root, or empty paths
    if ((currFile === '' || currFile === 'index.html') && (linkFile === 'index.html' || href.endsWith('/'))) {
      link.classList.add('active');
    }
  });
})();

// ─── Header scroll effect ───
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ─── Hamburger menu toggle (Synced with HTML .active class) ───
const menuToggle = document.querySelector('.menu-toggle');
const navMenu    = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked (mobile navigation)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click safely
  document.addEventListener('click', (e) => {
    if (header && !header.contains(e.target)) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ─── Scroll reveal ───
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('active');
    }
  });
}

if (reveals.length > 0) {
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // Run on initial load
}

// ─── Progress bar animation (hero card delay) ───
const fills = document.querySelectorAll('.progress-fill');
fills.forEach((fill, i) => {
  fill.style.animationDelay = `${0.4 + i * 0.15}s`;
});

// ─── Global Interactive Dropdown & Components Load ───
document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (dropdownBtn && dropdownMenu) {
    // 1. Ketika tombol utama dropdown diklik
    dropdownBtn.addEventListener('click', (event) => {
      event.stopPropagation(); 
      dropdownMenu.classList.toggle('show');
    });

    // 2. Jika user mengklik area lain di luar kotak dropdown
    document.addEventListener('click', (event) => {
      if (!dropdownMenu.contains(event.target) && event.target !== dropdownBtn) {
        dropdownMenu.classList.remove('show');
      }
    });
  }
});