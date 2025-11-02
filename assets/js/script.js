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
const selectValue = document.querySelector("[data-selvaluect-value]");
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



// Typing animation for roles - Updated with new roles
const rotatingRoles = [
  "AI/ML Engineer",
  "Python Developer",
  "GIS Specialist",
  "Surveying Expert",
  "Visual Effects Artist",
  "Geoinformatics Student",
  "Backend Developer",
  "Data Analyst"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function typeRole() {
  const typingText = document.getElementById('typing-text') || document.getElementById('rotating-role');
  if (!typingText) return;
  
  const currentRole = rotatingRoles[roleIndex];
  
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
    roleIndex = (roleIndex + 1) % rotatingRoles.length;
  }
  
  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeRole, speed);
}

// Start typing animation
if (document.getElementById('typing-text') || document.getElementById('rotating-role')) {
  setTimeout(typeRole, 1000);
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



/*-----------------------------------*\
  #ADVANCED FEATURES
\*-----------------------------------*/

/**
 * Preloader
 */
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  }
});

/**
 * Scroll Progress Bar
 */
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
  });
}

/**
 * Theme Toggle
 */
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-theme');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLight = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Animate button
    themeToggle.style.transform = 'rotate(360deg) scale(0.8)';
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 300);
  });
}

/**
 * Back to Top Button
 */
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Scroll Reveal Animation
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animation elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .zoom-in'
  );
  animatedElements.forEach(el => observer.observe(el));
});

/**
 * Enhanced Portfolio Filter with Counts
 */
function updateFilterCounts() {
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const projectItems = document.querySelectorAll('[data-filter-item]');

  filterButtons.forEach(btn => {
    const filterValue = btn.textContent.trim().toLowerCase();
    let count = 0;

    if (filterValue === 'all') {
      count = projectItems.length;
    } else {
      projectItems.forEach(item => {
        const category = item.dataset.category?.toLowerCase();
        if (category === filterValue) count++;
      });
    }

    // Add or update count badge
    let badge = btn.querySelector('.count-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'count-badge';
      btn.parentElement.style.position = 'relative';
      btn.parentElement.appendChild(badge);
    }
    badge.textContent = count;
  });
}

// Call on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateFilterCounts);
} else {
  updateFilterCounts();
}

/**
 * Enhanced Form Validation
 */
const contactForm = document.querySelector('[data-form]');
if (contactForm) {
  const formInputs = contactForm.querySelectorAll('[data-form-input]');
  const formBtn = contactForm.querySelector('[data-form-btn]');

  // Real-time validation
  formInputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
      checkFormValidity();
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMsg = '';

    // Remove previous error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    field.classList.remove('error', 'success');

    if (field.name === 'fullname') {
      if (value.length < 2) {
        isValid = false;
        errorMsg = 'Name must be at least 2 characters';
      }
    } else if (field.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMsg = 'Please enter a valid email address';
      }
    } else if (field.name === 'message') {
      if (value.length < 10) {
        isValid = false;
        errorMsg = 'Message must be at least 10 characters';
      }
    }

    if (!isValid) {
      field.classList.add('error');
      const errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      errorElement.textContent = errorMsg;
      field.parentElement.appendChild(errorElement);
    } else if (value) {
      field.classList.add('success');
    }

    return isValid;
  }

  function checkFormValidity() {
    let allValid = true;
    formInputs.forEach(input => {
      if (!input.value.trim() || input.classList.contains('error')) {
        allValid = false;
      }
    });
    if (formBtn) formBtn.disabled = !allValid;
  }

  // Enhanced form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    let isFormValid = true;
    formInputs.forEach(input => {
      if (!validateField(input)) isFormValid = false;
    });

    if (!isFormValid) return;

    // Show loading state
    const originalText = formBtn.innerHTML;
    formBtn.innerHTML = '<span>Sending...</span>';
    formBtn.disabled = true;

    const formData = new FormData(contactForm);
    const formValues = {
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    emailjs.send("service_j8ldhiq", "template_lxkd1sw", formValues)
      .then((response) => {
        // Success message
        const feedback = document.getElementById('form-feedback');
        feedback.innerHTML = `
          <div class="success-message">
            <ion-icon name="checkmark-circle"></ion-icon>
            <span>Message sent successfully! I'll get back to you soon.</span>
          </div>
        `;
        feedback.style.color = '#27ae60';
        
        contactForm.reset();
        formInputs.forEach(input => input.classList.remove('success', 'error'));
        
        // Reset button after delay
        setTimeout(() => {
          formBtn.innerHTML = originalText;
          formBtn.disabled = true;
        }, 2000);
      })
      .catch((error) => {
        const feedback = document.getElementById('form-feedback');
        feedback.innerHTML = `
          <div class="error-message">
            <ion-icon name="alert-circle"></ion-icon>
            <span>Failed to send message. Please try again.</span>
          </div>
        `;
        feedback.style.color = '#e74c3c';
        console.error("EmailJS Error:", error);
        
        formBtn.innerHTML = originalText;
        formBtn.disabled = false;
      });
  });
}

/**
 * Skills Progress Animation
 */
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-progress-fill');
      if (progressBar) {
        const width = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = width;
        }, 100);
      }
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-item').forEach(item => {
  skillsObserver.observe(item);
});

/**
 * Typing Animation Effect
 */
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove('typing-text');
    }
  }
  
  type();
}

// Apply to title if needed
const titleElement = document.querySelector('.name');
if (titleElement && window.innerWidth > 768) {
  const originalText = titleElement.textContent;
  window.addEventListener('load', () => {
    setTimeout(() => {
      titleElement.classList.add('typing-text');
      typeWriter(titleElement, originalText, 80);
    }, 1500);
  });
}

/**
 * Parallax Effect
 */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
      
      ticking = false;
    });
    ticking = true;
  }
});

/**
 * Enhanced GitHub Stats Loading
 */
document.querySelectorAll('.github-stat-item img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '0';
    setTimeout(() => {
      this.style.transition = 'opacity 0.5s ease';
      this.style.opacity = '1';
    }, 100);
  });
});

/**
 * Smooth Scroll for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/**
 * Performance Optimization: Debounce Function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll and resize events
const debouncedScroll = debounce(() => {
  console.log('Scroll event processed');
}, 100);

const debouncedResize = debounce(() => {
  updateFilterCounts();
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', debouncedResize);

/**
 * Console Easter Egg
 */
console.log('%c👋 Hello, Developer!', 'color: #ff3c00; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to my portfolio. Feel free to explore the code!', 'color: #ff5722; font-size: 14px;');
console.log('%c💼 Looking for a developer? Let\'s connect!', 'color: #ff3c00; font-size: 14px;');

