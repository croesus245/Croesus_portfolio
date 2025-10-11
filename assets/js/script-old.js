'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
testimonialsItem.forEach(function(item) {
  item.addEventListener("click", function () {
    if (modalImg && modalTitle && modalText) {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");
      if (avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }
      if (title) modalTitle.innerHTML = title.innerHTML;
      if (text) modalText.innerHTML = text.innerHTML;
      testimonialsModalFunc();
    }
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]"); // fixed typo
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
selectItems.forEach(function(item) {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(function(item) {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(function(btn) {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
formInputs.forEach(function(input) {
  input.addEventListener("input", function () {
    if (form && formBtn) {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    }
  });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach(function(link, idx) {
  link.addEventListener("click", function () {
    pages.forEach(function(page, i) {
      if (link.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    });
  });
});



// Typing animation for roles
const roles = [
  "AI/ML Engineer",
  "Python Developer",
  "Visual Creator",
  "Geospatial Analyst",
  "Web Developer"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function typeRole() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;
  
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeRole, pauseDuration);
    return;
  }
  
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  
  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeRole, speed);
}

// Start typing animation
if (document.getElementById('typing-text')) {
  setTimeout(typeRole, 1000);
}



// EmailJS Configuration
(function() {
  emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS user ID
})();

// Enhanced contact form with EmailJS
const contactForm = document.querySelector("[data-form]");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const formBtn = document.querySelector("[data-form-btn]");
    const originalText = formBtn.innerHTML;
    
    // Show loading state
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get('fullname'),
      from_email: formData.get('email'),
      message: formData.get('message')
    };
    
    // Send email via EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function(response) {
        // Success
        formBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Sent!</span>';
        formBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(function() {
          formBtn.innerHTML = originalText;
          formBtn.style.background = '';
          formBtn.disabled = false;
        }, 3000);
      }, function(error) {
        // Error
        formBtn.innerHTML = '<ion-icon name="close-circle-outline"></ion-icon><span>Error</span>';
        formBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        
        // Reset button after 3 seconds
        setTimeout(function() {
          formBtn.innerHTML = originalText;
          formBtn.style.background = '';
          formBtn.disabled = false;
        }, 3000);
      });
  });
}



// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});



// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}



// ========================================
// ANIMATED STATS COUNTER
// ========================================
function animateCounter(element, target, duration = 2000) {
  let startTime = null;
  const startValue = 0;
  
  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
    
    element.textContent = currentValue + '+';
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      element.textContent = target + '+';
    }
  }
  
  requestAnimationFrame(animation);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const h2 = entry.target.querySelector('h2');
      const targetValue = parseInt(h2.textContent);
      
      entry.target.dataset.animated = 'true';
      animateCounter(h2, targetValue, 2000);
    }
  });
}, { threshold: 0.5 });

// Observe all stat cards
document.querySelectorAll('.stat-card').forEach(card => {
  statsObserver.observe(card);
});



// ========================================
// STICKY NAVIGATION WITH ACTIVE HIGHLIGHTING
// ========================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar-link');
const sections = document.querySelectorAll('article[data-page]');

// Make navbar sticky on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add sticky class when scrolling down
  if (scrollTop > 100) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
  
  lastScrollTop = scrollTop;
});

// Highlight active section in navigation
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pageName = entry.target.dataset.page;
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase() === pageName) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  rootMargin: '-50% 0px -50% 0px'
});

sections.forEach(section => {
  sectionObserver.observe(section);
});



// Add active class to current navigation item on page load
window.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash.substring(1) || 'about';
  const targetPage = document.querySelector(`[data-page="${hash}"]`);
  const targetNav = document.querySelector(`[data-nav-link][innerHTML*="${hash}"]`);
  
  if (targetPage) {
    pages.forEach(page => page.classList.remove('active'));
    targetPage.classList.add('active');
  }
  
  if (targetNav) {
    navigationLinks.forEach(link => link.classList.remove('active'));
    targetNav.classList.add('active');
  }
});



// Touch device detection and optimization
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
  document.body.classList.add('touch-device');
  
  // Add touch-friendly interactions
  const hoverElements = document.querySelectorAll('.content-card, .project-item, .service-item');
  hoverElements.forEach(elem => {
    elem.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });
    elem.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('touch-active');
      }, 300);
    });
  });
}
class AudioManager {
  constructor() {
    // Use Web Audio API to create sound effects
    this.audioContext = null;
    this.enabled = localStorage.getItem('soundEnabled') !== 'false';
    this.updateIcon();
  }
  
  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  
  playClick() {
    if (!this.enabled) return;
    this.initAudioContext();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }
  
  playHover() {
    if (!this.enabled) return;
    this.initAudioContext();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = 600;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }
  
  playSuccess() {
    if (!this.enabled) return;
    this.initAudioContext();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2);
    
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }
  
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', this.enabled);
    this.updateIcon();
    
    // Play sound to confirm toggle
    if (this.enabled) {
      this.playSuccess();
    }
  }
  
  updateIcon() {
    const soundIcon = document.getElementById('sound-icon');
    if (soundIcon) {
      soundIcon.setAttribute('name', this.enabled ? 'volume-high-outline' : 'volume-mute-outline');
    }
  }
}

// Initialize Audio Manager
const audioManager = new AudioManager();

// Sound toggle button
const soundToggle = document.getElementById('sound-toggle');
if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    audioManager.toggle();
    soundToggle.style.transform = 'scale(1.2)';
    setTimeout(() => {
      soundToggle.style.transform = 'scale(1)';
    }, 200);
  });
}

// Add sound effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Add click sounds to buttons and links
  const interactiveElements = document.querySelectorAll('button:not(#sound-toggle):not(#theme-toggle), a, .navbar-link');
  
  interactiveElements.forEach(el => {
    el.addEventListener('click', () => {
      audioManager.playClick();
    });
  });
  
  // Add hover sounds to navigation links
  const navLinks = document.querySelectorAll('.navbar-link, .social-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      audioManager.playHover();
    });
  });
});



// ========================================
// EASTER EGG - PORTFOLIO VERSION HISTORY
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    activateEasterEgg();
    konamiCode = [];
  }
});

// Also trigger with Ctrl+Shift+V (Version)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'V') {
    e.preventDefault();
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  // Play success sound
  if (audioManager) {
    audioManager.playSuccess();
  }
  
  // Create modal overlay
  const modal = document.createElement('div');
  modal.id = 'easter-egg-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: linear-gradient(135deg, var(--eerie-black-1), var(--smoky-black));
    padding: 40px;
    border-radius: 20px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    border: 2px solid var(--orange-yellow-crayola);
    box-shadow: 0 0 40px rgba(255, 107, 53, 0.3);
    animation: slideUp 0.5s ease;
  `;
  
  content.innerHTML = `
    <div style="text-align: center;">
      <h2 style="color: var(--orange-yellow-crayola); margin-bottom: 20px; font-size: 28px;">
        🎉 Secret Unlocked! 🎉
      </h2>
      <p style="color: var(--light-gray); margin-bottom: 30px;">
        You've discovered the portfolio time machine!
      </p>
      
      <div style="text-align: left; margin: 20px 0;">
        <h3 style="color: var(--white-1); margin-bottom: 15px;">Portfolio Evolution:</h3>
        
        <div style="background: var(--jet); padding: 15px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid var(--orange-yellow-crayola);">
          <h4 style="color: var(--orange-yellow-crayola); margin-bottom: 5px;">v3.0 - Dark Orange Era (Current)</h4>
          <p style="color: var(--light-gray); font-size: 14px;">
            Complete redesign with dark orange/black theme, animated stats, sound effects, theme toggle, and enhanced UX.
          </p>
          <p style="color: var(--vegas-gold); font-size: 12px; margin-top: 5px;">
            October 2025 - Features: AI/ML Focus, Interactive Elements
          </p>
        </div>
        
        <div style="background: var(--jet); padding: 15px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid #ffd700;">
          <h4 style="color: #ffd700; margin-bottom: 5px;">v2.0 - Golden Age</h4>
          <p style="color: var(--light-gray); font-size: 14px;">
            Yellow/gold theme with certificate showcase, timeline animations, and project portfolio.
          </p>
          <p style="color: var(--vegas-gold); font-size: 12px; margin-top: 5px;">
            2024 - Features: Rotating Avatar, Blog Section
          </p>
        </div>
        
        <div style="background: var(--jet); padding: 15px; border-radius: 10px; border-left: 4px solid #4fc3f7;">
          <h4 style="color: #4fc3f7; margin-bottom: 5px;">v1.0 - The Beginning</h4>
          <p style="color: var(--light-gray); font-size: 14px;">
            First portfolio with blue theme, basic project showcase, and contact form.
          </p>
          <p style="color: var(--vegas-gold); font-size: 12px; margin-top: 5px;">
            2023 - Features: Simple & Clean
          </p>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: rgba(255, 107, 53, 0.1); border-radius: 10px;">
        <p style="color: var(--light-gray); font-size: 14px; margin-bottom: 10px;">
          <strong style="color: var(--white-1);">Pro Tip:</strong> Trigger this easter egg anytime with:
        </p>
        <p style="color: var(--orange-yellow-crayola); font-family: monospace; font-size: 16px;">
          Ctrl + Shift + V
        </p>
        <p style="color: var(--light-gray-70); font-size: 12px; margin-top: 10px;">
          Or enter the legendary Konami Code: ↑↑↓↓←→←→BA
        </p>
      </div>
      
      <button id="close-easter-egg" style="
        background: var(--orange-yellow-crayola);
        color: var(--smoky-black);
        padding: 12px 30px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
        font-size: 16px;
        transition: transform 0.2s ease;
      ">
        Close
      </button>
    </div>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  // Add animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    #close-easter-egg:hover {
      transform: scale(1.05);
    }
    #close-easter-egg:active {
      transform: scale(0.95);
    }
  `;
  document.head.appendChild(style);
  
  // Close button handler
  document.getElementById('close-easter-egg').addEventListener('click', () => {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      modal.remove();
      style.remove();
    }, 300);
  });
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        modal.remove();
        style.remove();
      }, 300);
    }
  });
  
  // Close on ESC key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        modal.remove();
        style.remove();
        document.removeEventListener('keydown', escHandler);
      }, 300);
    }
  };
  document.addEventListener('keydown', escHandler);
}



// Add active class to current navigation item on page load
window.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash.substring(1) || 'about';
  const targetPage = document.querySelector(`[data-page="${hash}"]`);
  const targetNav = document.querySelector(`[data-nav-link][innerHTML*="${hash}"]`);
  
  if (targetPage) {
    pages.forEach(page => page.classList.remove('active'));
    targetPage.classList.add('active');
  }
  
  if (targetNav) {
    navigationLinks.forEach(link => link.classList.remove('active'));
    targetNav.classList.add('active');
  }
});



// Touch device detection and optimization
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
  document.body.classList.add('touch-device');
  
  // Add touch-friendly interactions
  const hoverElements = document.querySelectorAll('.content-card, .project-item, .service-item');
  hoverElements.forEach(elem => {
    elem.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });
    elem.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('touch-active');
      }, 300);
    });
  });
}