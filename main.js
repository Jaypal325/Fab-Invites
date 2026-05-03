/* ===== MAIN.JS — SHARED INTERACTIONS ===== */

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── HAMBURGER MENU ──
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  links.classList.toggle('open');
  ham.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── CONTACT FORM ──
function handleForm(e) {
  e.preventDefault();
  const name = document.getElementById('name')?.value;
  const phone = document.getElementById('phone')?.value;
  const type = document.getElementById('invitation-type')?.value;

  if (!name || !phone) return;

  // Build WhatsApp message
  const msg = encodeURIComponent(
    `Hi FAB Invites! 👋\nName: ${name}\nPhone: ${phone}\nType: ${type || 'Not specified'}\nI'd like to know more about your services.`
  );

  // Show success state
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'flex';
    success.style.flexDirection = 'column';
    success.style.alignItems = 'center';
  }

  // Open WhatsApp after short delay
  setTimeout(() => {
    window.open(`https://wa.me/917517518079?text=${msg}`, '_blank');
  }, 600);
}

// ── SMOOTH ANCHOR SCROLLING ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── CUSTOM CENTER PLAY BUTTON & CONTROLS ──
document.querySelectorAll('.video-container').forEach(container => {
  const video = container.querySelector('video');
  const overlay = container.querySelector('.video-play-overlay');
  const controls = container.querySelector('.video-controls');
  if (!video || !overlay) return;

  let controlsTimeout;

  const showControls = () => {
    if (!controls) return;
    controls.classList.add('active');
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (!video.paused) controls.classList.remove('active');
    }, 3000);
  };

  // Click big overlay button to play
  overlay.addEventListener('click', () => {
    video.play();
  });

  // Click playing video to toggle controls (shows for 3s)
  video.addEventListener('click', () => {
    if (!video.paused) {
      if (controls?.classList.contains('active')) {
        controls.classList.remove('active');
        clearTimeout(controlsTimeout);
      } else {
        showControls();
      }
    }
  });

  // Video state changes
  video.addEventListener('play', () => {
    overlay.classList.add('playing');
    showControls(); // Show briefly when it starts
  });

  video.addEventListener('pause', () => {
    overlay.classList.remove('playing');
    controls?.classList.remove('active');
  });
  video.addEventListener('ended', () => {
    overlay.classList.remove('playing');
    controls?.classList.remove('active');
  });

  // Mini Controls logic
  if (controls) {
    const pauseBtn = controls.querySelector('.ctrl-pause');
    const fsBtn = controls.querySelector('.ctrl-fullscreen');

    pauseBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      video.pause();
    });

    fsBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      // Keep controls visible a bit longer if they clicked fullscreen
      showControls();
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
    });
  }
});

// ── VIDEO PLACEHOLDER PLAY (Marathi / reel placeholders) ──
document.querySelectorAll('.video-placeholder .play-icon-wrap').forEach(btn => {
  btn.addEventListener('click', function () {
    const container = this.closest('.video-container, .reel-video-wrap');
    const video = container?.querySelector('video');
    if (video) {
      video.play();
      this.closest('.video-placeholder, .reel-placeholder')?.remove();
    }
  });
});

// ── PARTICLE CURSOR (subtle gold dots on home page) ──
if (document.querySelector('.hero')) {
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.92) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed;
        width: 4px; height: 4px;
        background: rgba(201,168,76,0.6);
        border-radius: 50%;
        left: ${e.clientX}px; top: ${e.clientY}px;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.8s ease, transform 0.8s ease;
      `;
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'translateY(-20px) scale(0)';
      });
      setTimeout(() => dot.remove(), 800);
    }
  });
}

// ── ACTIVE NAV HIGHLIGHT ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.split('#')[0] === currentPage) {
    link.classList.add('active');
  }
});
