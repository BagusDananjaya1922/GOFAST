// ─── Active nav link based on current page ───
(function setActiveNav() {
  const links = document.querySelectorAll('.nav-menu a');
  const current = window.location.pathname;
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    // normalize paths to just filename
    const linkFile = href.split('/').pop();
    const currFile = current.split('/').pop();
    if (linkFile && currFile && linkFile === currFile) {
      link.classList.add('active');
    }
    // special case: index.html or root
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
  });
}

// ─── Hamburger menu toggle ───
const menuToggle = document.querySelector('.menu-toggle');
const navMenu    = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked (mobile)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
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
  revealOnScroll(); // run on load
}

// ─── Progress bar animation (hero card) ───
const fills = document.querySelectorAll('.progress-fill');
fills.forEach((fill, i) => {
  fill.style.animationDelay = `${0.4 + i * 0.15}s`;
});

document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  // Pastikan elementnya emang ada di HTML biar gak crash
  if (dropdownBtn && dropdownMenu) {
    
    // 1. Ketika tombol utama diklik
    dropdownBtn.addEventListener('click', function(event) {
      event.stopPropagation(); 
      dropdownMenu.classList.toggle('show');
    });

    // 2. Jika user mengklik area lain di luar kotak
    document.addEventListener('click', function(event) {
      if (!dropdownMenu.contains(event.target) && event.target !== dropdownBtn) {
        dropdownMenu.classList.remove('show');
      }
    });

  }
});
