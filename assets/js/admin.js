// ===============================================
// ADMIN DASHBOARD JAVASCRIPT - ENHANCED
// ===============================================

// Config
const ADMIN_PASSWORD_KEY = 'admin_password_secure';
const ADMIN_DATA_KEY = 'portfolio_admin_data';
const ACTIVITY_LOG_KEY = 'admin_activity_log';
const DEFAULT_PASSWORD = 'Croesus@2025'; // CHANGE THIS!

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('admin_logged_in');
  
  if (isLoggedIn === 'true') {
    showDashboard();
  } else {
    showLogin();
  }

  initializeEventListeners();
  loadAllData();
  initializeDashboard();
});

// ===============================================
// NEW: KEYBOARD SHORTCUTS
// ===============================================

document.addEventListener('keydown', (e) => {
  // Press "/" to focus search
  if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    document.getElementById('globalSearch')?.focus();
  }
  // Press "Escape" to close search results
  if (e.key === 'Escape') {
    document.getElementById('searchResults').style.display = 'none';
  }
});

// ===============================================
// LOGIN FUNCTIONALITY
// ===============================================

function initializeEventListeners() {
  // Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const passwordToggle = document.getElementById('passwordToggle');
  if (passwordToggle) {
    passwordToggle.addEventListener('click', togglePasswordVisibility);
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Tab Navigation
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', switchTab);
  });

  // NEW: Global Search
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', handleGlobalSearch);
    globalSearch.addEventListener('blur', () => {
      setTimeout(() => {
        document.getElementById('searchResults').style.display = 'none';
      }, 200);
    });
  }

  // NEW: Preview Modal
  const previewModalOverlay = document.getElementById('previewModalOverlay');
  const closePreview = document.getElementById('closePreview');
  const closePreviewBtn = document.getElementById('closePreviewBtn');
  if (previewModalOverlay) {
    previewModalOverlay.addEventListener('click', closePreviewModal);
  }
  if (closePreview) {
    closePreview.addEventListener('click', closePreviewModal);
  }
  if (closePreviewBtn) {
    closePreviewBtn.addEventListener('click', closePreviewModal);
  }

  // Project Management
  document.getElementById('addProjectBtn')?.addEventListener('click', openProjectForm);
  document.getElementById('closeProjectForm')?.addEventListener('click', closeProjectForm);
  document.getElementById('projectFormOverlay')?.addEventListener('click', closeProjectForm);
  document.getElementById('cancelProjectForm')?.addEventListener('click', closeProjectForm);
  document.getElementById('projectForm')?.addEventListener('submit', handleProjectSubmit);

  // Certification Management
  document.getElementById('addCertBtn')?.addEventListener('click', openCertForm);
  document.getElementById('closeCertForm')?.addEventListener('click', closeCertForm);
  document.getElementById('certFormOverlay')?.addEventListener('click', closeCertForm);
  document.getElementById('cancelCertForm')?.addEventListener('click', closeCertForm);
  document.getElementById('certForm')?.addEventListener('submit', handleCertSubmit);

  // Blog Management
  document.getElementById('addBlogBtn')?.addEventListener('click', openBlogForm);
  document.getElementById('closeBlogForm')?.addEventListener('click', closeBlogForm);
  document.getElementById('blogFormOverlay')?.addEventListener('click', closeBlogForm);
  document.getElementById('cancelBlogForm')?.addEventListener('click', closeBlogForm);
  document.getElementById('blogForm')?.addEventListener('submit', handleBlogSubmit);

  // Skills Management
  document.getElementById('addSkillBtn')?.addEventListener('click', openSkillForm);
  document.getElementById('closeSkillForm')?.addEventListener('click', closeSkillForm);
  document.getElementById('skillFormOverlay')?.addEventListener('click', closeSkillForm);
  document.getElementById('cancelSkillForm')?.addEventListener('click', closeSkillForm);
  document.getElementById('skillForm')?.addEventListener('submit', handleSkillSubmit);

  // Skill slider
  const skillSlider = document.getElementById('skillLevel');
  if (skillSlider) {
    skillSlider.addEventListener('input', (e) => {
      document.getElementById('skillValue').textContent = e.target.value + '%';
    });
  }

  // Testimonials Management
  document.getElementById('addTestimonialBtn')?.addEventListener('click', openTestimonialForm);
  document.getElementById('closeTestimonialForm')?.addEventListener('click', closeTestimonialForm);
  document.getElementById('testimonialFormOverlay')?.addEventListener('click', closeTestimonialForm);
  document.getElementById('cancelTestimonialForm')?.addEventListener('click', closeTestimonialForm);
  document.getElementById('testimonialForm')?.addEventListener('submit', handleTestimonialSubmit);

  // Settings
  document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
  document.getElementById('importDataBtn')?.addEventListener('click', triggerImportFile);
  document.getElementById('changePasswordBtn')?.addEventListener('click', openChangePasswordForm);
  document.getElementById('closeChangePassword')?.addEventListener('click', closeChangePasswordForm);
  document.getElementById('changePasswordOverlay')?.addEventListener('click', closeChangePasswordForm);
  document.getElementById('cancelChangePassword')?.addEventListener('click', closeChangePasswordForm);
  document.getElementById('changePasswordForm')?.addEventListener('submit', handlePasswordChange);
  document.getElementById('syncToSiteBtn')?.addEventListener('click', syncToPortfolio);
  document.getElementById('dashboardSyncBtn')?.addEventListener('click', syncToPortfolio);
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const toggle = document.getElementById('passwordToggle');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggle.textContent = '🔒';
  } else {
    passwordInput.type = 'password';
    toggle.textContent = '👁️';
  }
}

function handleLogin(e) {
  e.preventDefault();
  
  const password = document.getElementById('password').value;
  const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  const loginError = document.getElementById('loginError');

  if (password === storedPassword) {
    localStorage.setItem('admin_logged_in', 'true');
    showDashboard();
    logActivity('Admin logged in');
  } else {
    loginError.textContent = 'Invalid password. Please try again.';
    loginError.style.display = 'block';
    document.getElementById('password').value = '';
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    logActivity('Admin logged out');
    localStorage.removeItem('admin_logged_in');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginForm').reset();
  }
}

function showLogin() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'block';
  updateSyncDisplay();
}

// ===============================================
// TAB NAVIGATION
// ===============================================

function switchTab(e) {
  const tabName = e.target.dataset.tab;
  
  // Clear bulk selections when switching tabs
  Object.keys(selectedItems).forEach(category => {
    clearAllSelections(category);
  });
  
  // Remove active class from all tabs and contents
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  // Add active class to clicked tab and corresponding content
  e.target.classList.add('active');
  document.querySelector(`[data-tab-content="${tabName}"]`).classList.add('active');
}

function switchTabAndOpenForm(tabName, formBtnId) {
  // Find and click the tab
  const tab = document.querySelector(`[data-tab="${tabName}"]`);
  if (tab) {
    tab.click();
  }
  // Trigger the form opening
  setTimeout(() => {
    document.getElementById(formBtnId)?.click();
  }, 100);
}

// ===============================================
// NEW: DASHBOARD INITIALIZATION & ANALYTICS
// ===============================================

function initializeDashboard() {
  updateDashboardStats();
  updateActivityLog();
  updateSyncDisplay();
  // Auto-refresh dashboard every 10 seconds
  setInterval(() => {
    updateDashboardStats();
  }, 10000);
}

function updateDashboardStats() {
  const data = getAdminData();
  
  // Update content counts
  document.getElementById('totalProjects').textContent = data.projects.length;
  document.getElementById('totalBlog').textContent = data.blog.length;
  document.getElementById('totalCerts').textContent = data.certifications.length;
  document.getElementById('totalSkills').textContent = data.skills.length;
  document.getElementById('totalTestimonials').textContent = data.testimonials.length;
  
  // Simulated analytics (in real app, would fetch from server)
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem('analytics_date');
  
  if (storedDate !== today) {
    // Reset daily stats
    localStorage.setItem('analytics_date', today);
    localStorage.setItem('analytics_views', '0');
    localStorage.setItem('analytics_clicks', '0');
    localStorage.setItem('analytics_reads', '0');
    localStorage.setItem('analytics_contacts', '0');
  }
  
  const views = parseInt(localStorage.getItem('analytics_views') || '0');
  const clicks = parseInt(localStorage.getItem('analytics_clicks') || '0');
  const reads = parseInt(localStorage.getItem('analytics_reads') || '0');
  const contacts = parseInt(localStorage.getItem('analytics_contacts') || '0');
  
  document.getElementById('viewsToday').textContent = views;
  document.getElementById('clicksToday').textContent = clicks;
  document.getElementById('readsToday').textContent = reads;
  document.getElementById('contactsToday').textContent = contacts;
  
  // Simulate some activity
  if (Math.random() > 0.7) {
    const newViews = views + Math.floor(Math.random() * 5);
    localStorage.setItem('analytics_views', newViews);
    document.getElementById('viewsToday').textContent = newViews;
    document.getElementById('viewsChange').textContent = `+${Math.floor(Math.random() * 3)} from last hour`;
  }
}

function updateActivityLog() {
  const logs = getActivityLog();
  const logContainer = document.getElementById('activityLog');
  
  if (logs.length === 0) {
    logContainer.innerHTML = '<div class="activity-item"><div class="activity-time">Just now</div><div class="activity-message">Dashboard loaded</div></div>';
    return;
  }
  
  // Show last 5 activities
  const recentLogs = logs.slice(-5).reverse();
  logContainer.innerHTML = recentLogs.map(log => `
    <div class="activity-item">
      <div class="activity-time">${log.time}</div>
      <div class="activity-message">${log.action}</div>
    </div>
  `).join('');
}

function updateSyncDisplay() {
  const lastSync = localStorage.getItem('last_sync_time');
  const displayEl = document.getElementById('lastSyncDisplay');
  const syncTimeEl = document.getElementById('lastSyncTime');
  
  if (lastSync) {
    displayEl.textContent = lastSync;
    if (syncTimeEl) syncTimeEl.textContent = lastSync;
  } else {
    displayEl.textContent = 'Never';
    if (syncTimeEl) syncTimeEl.textContent = 'Never';
  }
}

// ===============================================
// NEW: ACTIVITY LOG
// ===============================================

function getActivityLog() {
  const log = localStorage.getItem(ACTIVITY_LOG_KEY);
  return log ? JSON.parse(log) : [];
}

function logActivity(action) {
  const log = getActivityLog();
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  log.push({
    action: action,
    time: time,
    timestamp: Date.now()
  });
  
  // Keep only last 50 activities
  if (log.length > 50) {
    log.shift();
  }
  
  localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(log));
  updateActivityLog();
}

// ===============================================
// NEW: GLOBAL SEARCH
// ===============================================

function handleGlobalSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  const resultsContainer = document.getElementById('searchResults');
  
  if (query.length < 2) {
    resultsContainer.style.display = 'none';
    return;
  }
  
  const data = getAdminData();
  const results = [];
  
  // Search projects
  data.projects.forEach(project => {
    if (project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.techStack?.toLowerCase().includes(query)) {
      results.push({
        type: 'project',
        title: project.title,
        description: project.description.substring(0, 50),
        action: () => previewProject(project)
      });
    }
  });
  
  // Search blog posts
  data.blog.forEach(blog => {
    if (blog.title.toLowerCase().includes(query) || 
        blog.content.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query)) {
      results.push({
        type: 'blog',
        title: blog.title,
        description: blog.content.substring(0, 50),
        action: () => previewBlog(blog)
      });
    }
  });
  
  // Search skills
  data.skills.forEach(skill => {
    if (skill.name.toLowerCase().includes(query) || 
        skill.category.toLowerCase().includes(query)) {
      results.push({
        type: 'skill',
        title: skill.name,
        description: `${skill.category} - ${skill.level}%`,
        action: () => previewSkill(skill)
      });
    }
  });
  
  // Search certifications
  data.certifications.forEach(cert => {
    if (cert.title.toLowerCase().includes(query) || 
        cert.issuer.toLowerCase().includes(query)) {
      results.push({
        type: 'cert',
        title: cert.title,
        description: cert.issuer,
        action: () => previewCert(cert)
      });
    }
  });
  
  // Search testimonials
  data.testimonials.forEach(test => {
    if (test.author.toLowerCase().includes(query) || 
        test.text.toLowerCase().includes(query)) {
      results.push({
        type: 'testimonial',
        title: test.author,
        description: test.text.substring(0, 50),
        action: () => previewTestimonial(test)
      });
    }
  });
  
  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="search-result-item">No results found</div>';
  } else {
    resultsContainer.innerHTML = results.map((result, idx) => `
      <div class="search-result-item" onclick="arguments[0].target.closest('.search-result-item').dataset.action;">
        <span class="search-result-type">${result.type === 'project' ? '📁' : result.type === 'blog' ? '📝' : result.type === 'skill' ? '⭐' : result.type === 'cert' ? '🏆' : '💬'}</span>
        <div class="search-result-info">
          <div class="search-result-title">${result.title}</div>
          <div class="search-result-desc">${result.description}</div>
        </div>
      </div>
    `).join('');
    
    // Add click listeners
    resultsContainer.querySelectorAll('.search-result-item').forEach((el, idx) => {
      el.addEventListener('click', () => {
        results[idx].action();
        resultsContainer.style.display = 'none';
        document.getElementById('globalSearch').value = '';
      });
    });
  }
  
  resultsContainer.style.display = 'block';
}

// ===============================================
// NEW: PREVIEW FUNCTIONALITY
// ===============================================

function openPreviewModal(title, content) {
  document.getElementById('previewModal').style.display = 'flex';
  document.querySelector('.preview-content').innerHTML = `
    <div class="modal-header">
      <h3>👁️ Preview - ${title}</h3>
      <button class="modal-close-btn" id="closePreview" onclick="closePreviewModal()">&times;</button>
    </div>
    <div class="preview-body">
      ${content}
    </div>
    <div class="preview-footer">
      <a class="btn btn-primary" href="https://croesus-portfolio.vercel.app" target="_blank">🔗 View on Portfolio</a>
      <button class="btn btn-secondary" onclick="closePreviewModal()">Close</button>
    </div>
  `;
  // Re-attach close listeners
  document.getElementById('closePreview')?.addEventListener('click', closePreviewModal);
}

function closePreviewModal() {
  document.getElementById('previewModal').style.display = 'none';
}

function previewProject(project) {
  const preview = `
    <div style="max-width: 600px; margin: 0 auto;">
      <h3 style="color: #ff3c00; margin-bottom: 10px;">${project.title}</h3>
      <div style="margin-bottom: 15px;">
        <span style="background: #ff3c00; color: black; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">${project.category}</span>
        <span style="margin-left: 10px; color: #999; font-size: 14px;">${project.status}</span>
        ${project.featured ? '<span style="margin-left: 10px; color: #ff3c00; font-size: 14px;">⭐ Featured</span>' : ''}
      </div>
      <p style="margin-bottom: 15px; line-height: 1.6;">${project.description}</p>
      ${project.techStack ? `<p style="margin-bottom: 15px; color: #999;"><strong>Tech Stack:</strong> ${project.techStack}</p>` : ''}
      ${project.liveLink ? `<p style="margin-bottom: 10px;"><a href="${project.liveLink}" target="_blank" style="color: #ff3c00;">🔗 View Live Project →</a></p>` : ''}
      ${project.githubLink ? `<p style="margin-bottom: 15px;"><a href="${project.githubLink}" target="_blank" style="color: #ff3c00;">💻 View on GitHub →</a></p>` : ''}
      ${project.image ? `<img src="${project.image}" style="width: 100%; border-radius: 8px; margin-top: 15px; max-height: 300px; object-fit: cover;">` : ''}
    </div>
  `;
  openPreviewModal(`${project.title} - Project`, preview);
}

function previewBlog(blog) {
  const preview = `
    <div style="max-width: 600px; margin: 0 auto;">
      <h3 style="color: #ff3c00; margin-bottom: 10px;">${blog.title}</h3>
      <p style="color: #999; margin-bottom: 15px;">
        <strong>${blog.category}</strong> • ${new Date(blog.date).toLocaleDateString()}
      </p>
      <div style="background: #2d2d2d; padding: 15px; border-radius: 8px; line-height: 1.8; margin-bottom: 15px;">
        ${blog.content.replace(/\n/g, '<br>')}
      </div>
      ${blog.image ? `<img src="${blog.image}" style="width: 100%; border-radius: 8px; max-height: 300px; object-fit: cover;">` : ''}
    </div>
  `;
  openPreviewModal(`${blog.title} - Blog Post`, preview);
}

function previewSkill(skill) {
  const preview = `
    <div style="max-width: 500px; margin: 0 auto;">
      <h3 style="color: #ff3c00; margin-bottom: 20px;">${skill.name}</h3>
      <p style="margin-bottom: 15px; color: #999;"><strong>Category:</strong> ${skill.category}</p>
      <p style="margin-bottom: 20px;"><strong>Proficiency:</strong> ${skill.level}%</p>
      <div style="background: #2d2d2d; padding: 15px; border-radius: 8px;">
        <div style="height: 30px; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
          <div style="height: 100%; width: ${skill.level}%; background: linear-gradient(90deg, #ff3c00, #ff6b3c); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
            ${skill.level}%
          </div>
        </div>
      </div>
    </div>
  `;
  openPreviewModal(`${skill.name} - Skill`, preview);
}

function previewCert(cert) {
  const preview = `
    <div style="max-width: 500px; margin: 0 auto;">
      <h3 style="color: #ff3c00; margin-bottom: 10px;">${cert.title}</h3>
      <p style="margin-bottom: 10px;"><strong>Issuer:</strong> ${cert.issuer}</p>
      <p style="margin-bottom: 15px; color: #999;"><strong>Date Earned:</strong> ${new Date(cert.dateEarned).toLocaleDateString()}</p>
      ${cert.credentialUrl ? `<p style="margin-bottom: 15px;"><a href="${cert.credentialUrl}" target="_blank" style="color: #ff3c00;">🔗 View Credential →</a></p>` : ''}
      ${cert.image ? `<img src="${cert.image}" style="width: 100%; border-radius: 8px; margin-top: 15px; max-height: 400px; object-fit: cover;">` : ''}
    </div>
  `;
  openPreviewModal(`${cert.title} - Certificate`, preview);
}

function previewTestimonial(test) {
  const preview = `
    <div style="max-width: 500px; margin: 0 auto;">
      <div style="display: flex; align-items: center; margin-bottom: 15px;">
        ${test.image ? `<img src="${test.image}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 15px;">` : `<div style="width: 50px; height: 50px; border-radius: 50%; background: #ff3c00; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; margin-right: 15px; font-size: 20px;">${test.author.charAt(0)}</div>`}
        <div>
          <h3 style="color: #ff3c00; margin: 0; font-size: 18px;">${test.author}</h3>
          <p style="margin: 0; color: #999; font-size: 14px;">${test.title}${test.company ? ' @ ' + test.company : ''}</p>
        </div>
      </div>
      <p style="color: #ff3c00; margin-bottom: 15px;">⭐ ${'★'.repeat(test.rating)}${'☆'.repeat(5-test.rating)}</p>
      <p style="background: #2d2d2d; padding: 15px; border-radius: 8px; line-height: 1.8; font-style: italic;">"${test.text}"</p>
    </div>
  `;
  openPreviewModal(`${test.author} - Testimonial`, preview);
}

// ===============================================
// NEW: AUTO-SYNC
// ===============================================

function syncToPortfolio() {
  const data = getAdminData();
  
  // Show sync in progress
  const syncBtn = document.getElementById('syncToSiteBtn') || document.getElementById('dashboardSyncBtn');
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.textContent = '⏳ Syncing...';
  }
  
  logActivity('Started syncing to portfolio');
  
  // Simulate sync delay
  setTimeout(() => {
    // Update last sync time
    const now = new Date().toLocaleString();
    localStorage.setItem('last_sync_time', now);
    updateSyncDisplay();
    
    logActivity('Synced to portfolio');
    showNotification('✓ Portfolio synced successfully! Changes will appear on the site shortly.');
    
    // Reset button
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.textContent = syncBtn.id === 'dashboardSyncBtn' ? '🔄 Sync to Portfolio Now' : '🚀 Sync to Portfolio Website';
    }
  }, 1500);
}

// ===============================================
// DATA MANAGEMENT
// ===============================================

function getAdminData() {
  const data = localStorage.getItem(ADMIN_DATA_KEY);
  return data ? JSON.parse(data) : {
    projects: [],
    certifications: [],
    blog: [],
    skills: [],
    testimonials: []
  };
}

function saveAdminData(data) {
  localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(data));
  showNotification('✓ Data saved successfully!');
}

function loadAllData() {
  const data = getAdminData();
  loadProjects(data.projects);
  loadCertifications(data.certifications);
  loadBlog(data.blog);
  loadSkills(data.skills);
  loadTestimonials(data.testimonials);
}

// ===============================================
// PROJECT MANAGEMENT
// ===============================================

function openProjectForm(e) {
  e?.preventDefault();
  document.getElementById('projectFormModal').style.display = 'flex';
  document.getElementById('projectFormTitle').textContent = 'Add New Project';
  document.getElementById('projectForm').reset();
}

function closeProjectForm() {
  document.getElementById('projectFormModal').style.display = 'none';
  document.getElementById('projectForm').reset();
}

async function handleProjectSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const projectData = {
    id: Date.now(),
    title: formData.get('title'),
    category: formData.get('category'),
    status: formData.get('status'),
    description: formData.get('description'),
    techStack: formData.get('techStack'),
    liveLink: formData.get('liveLink'),
    githubLink: formData.get('githubLink'),
    featured: formData.get('featured') === 'on',
    createdAt: new Date().toISOString()
  };

  // Handle image upload with optimization
  const imageFile = formData.get('image');
  if (imageFile && imageFile.size > 0) {
    // Show optimizer and wait for user choice
    const optimizedImage = await new Promise((resolve) => {
      showImageOptimizer(imageFile, (compressed) => {
        resolve(compressed);
      });
    });
    projectData.image = await fileToBase64(optimizedImage);
  }

  const data = getAdminData();
  data.projects.push(projectData);
  saveAdminData(data);
  logActivity(`Added project: ${projectData.title}`);

  closeProjectForm();
  loadProjects(data.projects);
  showNotification('✓ Project added successfully!');
}

function loadProjects(projects) {
  const list = document.getElementById('projectsList');
  
  if (projects.length === 0) {
    list.innerHTML = '<p class="empty-state">No projects added yet. Click "Add New Project" to get started.</p>';
    return;
  }

  list.innerHTML = projects.map(project => `
    <div class="item-card">
      <div class="item-header">
        <input type="checkbox" 
          class="item-checkbox" 
          data-item-id="${project.id}" 
          data-category="projects"
          onchange="toggleItemSelection(${project.id}, 'projects')">
        <div class="item-info">
          <div class="item-title">${project.title}</div>
          <div class="item-meta">
            <span>${project.category}</span> • <span>${project.status}</span>
            ${project.featured ? ' • <strong style="color: #ff3c00;">⭐ Featured</strong>' : ''}
          </div>
          <div class="item-description">${project.description.substring(0, 100)}...</div>
          ${project.techStack ? `<div class="item-meta">Tech: ${project.techStack}</div>` : ''}
        </div>
      </div>
      <div class="item-actions">
        <button class="btn btn-preview" onclick="previewProject(${JSON.stringify(project).replace(/"/g, '&quot;')})">👁️ Preview</button>
        <button class="btn btn-edit" onclick="editProject(${project.id})">Edit</button>
        <button class="btn btn-delete" onclick="deleteProject(${project.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteProject(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    const data = getAdminData();
    const project = data.projects.find(p => p.id === id);
    data.projects = data.projects.filter(p => p.id !== id);
    saveAdminData(data);
    logActivity(`Deleted project: ${project?.title}`);
    loadProjects(data.projects);
    showNotification('✓ Project deleted successfully!');
  }
}

function editProject(id) {
  const data = getAdminData();
  const project = data.projects.find(p => p.id === id);
  
  if (project) {
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectStatus').value = project.status;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectTechStack').value = project.techStack || '';
    document.getElementById('projectLink').value = project.liveLink || '';
    document.getElementById('projectGithub').value = project.githubLink || '';
    document.getElementById('projectFeatured').checked = project.featured;
    
    document.getElementById('projectFormTitle').textContent = 'Edit Project';
    openProjectForm();
    
    // Update form to update instead of add
    const form = document.getElementById('projectForm');
    const oldHandler = form.onsubmit;
    form.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      
      Object.assign(project, {
        title: formData.get('title'),
        category: formData.get('category'),
        status: formData.get('status'),
        description: formData.get('description'),
        techStack: formData.get('techStack'),
        liveLink: formData.get('liveLink'),
        githubLink: formData.get('githubLink'),
        featured: formData.get('featured') === 'on'
      });

      const imageFile = formData.get('image');
      if (imageFile && imageFile.size > 0) {
        // Show optimizer and wait for user choice
        const optimizedImage = await new Promise((resolve) => {
          showImageOptimizer(imageFile, (compressed) => {
            resolve(compressed);
          });
        });
        project.image = await fileToBase64(optimizedImage);
      }

      saveAdminData(data);
      logActivity(`Updated project: ${project.title}`);
      closeProjectForm();
      loadProjects(data.projects);
      form.onsubmit = oldHandler;
      showNotification('✓ Project updated successfully!');
    };
  }
}

// ===============================================
// CERTIFICATION MANAGEMENT
// ===============================================

function openCertForm(e) {
  e?.preventDefault();
  document.getElementById('certFormModal').style.display = 'flex';
  document.getElementById('certForm').reset();
}

function closeCertForm() {
  document.getElementById('certFormModal').style.display = 'none';
  document.getElementById('certForm').reset();
}

async function handleCertSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const certData = {
    id: Date.now(),
    title: formData.get('title'),
    issuer: formData.get('issuer'),
    dateEarned: formData.get('dateEarned'),
    credentialUrl: formData.get('credentialUrl'),
    createdAt: new Date().toISOString()
  };

  const imageFile = formData.get('image');
  if (imageFile && imageFile.size > 0) {
    // Show optimizer and wait for user choice
    const optimizedImage = await new Promise((resolve) => {
      showImageOptimizer(imageFile, (compressed) => {
        resolve(compressed);
      });
    });
    certData.image = await fileToBase64(optimizedImage);
  }

  const data = getAdminData();
  data.certifications.push(certData);
  saveAdminData(data);
  logActivity(`Added certificate: ${certData.title}`);

  closeCertForm();
  loadCertifications(data.certifications);
  showNotification('✓ Certificate added successfully!');
}

function loadCertifications(certs) {
  const list = document.getElementById('certificationsList');
  
  if (certs.length === 0) {
    list.innerHTML = '<p class="empty-state">No certifications added yet.</p>';
    return;
  }

  list.innerHTML = certs.map(cert => `
    <div class="item-card">
      <div class="item-info">
        <div class="item-title">${cert.title}</div>
        <div class="item-meta">${cert.issuer} • ${new Date(cert.dateEarned).toLocaleDateString()}</div>
        ${cert.credentialUrl ? `<div class="item-meta"><a href="${cert.credentialUrl}" target="_blank" style="color: #ff3c00;">View Credential →</a></div>` : ''}
      </div>
      <div class="item-actions">
        <button class="btn btn-preview" onclick="previewCert(${JSON.stringify(cert).replace(/"/g, '&quot;')})">👁️ Preview</button>
        <button class="btn btn-delete" onclick="deleteCert(${cert.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteCert(id) {
  if (confirm('Are you sure you want to delete this certificate?')) {
    const data = getAdminData();
    const cert = data.certifications.find(c => c.id === id);
    data.certifications = data.certifications.filter(c => c.id !== id);
    saveAdminData(data);
    logActivity(`Deleted certificate: ${cert?.title}`);
    loadCertifications(data.certifications);
    showNotification('✓ Certificate deleted successfully!');
  }
}

// ===============================================
// BLOG MANAGEMENT
// ===============================================

function openBlogForm(e) {
  e?.preventDefault();
  document.getElementById('blogFormModal').style.display = 'flex';
  document.getElementById('blogForm').reset();
}

function closeBlogForm() {
  document.getElementById('blogFormModal').style.display = 'none';
  document.getElementById('blogForm').reset();
}

async function handleBlogSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const blogData = {
    id: Date.now(),
    title: formData.get('title'),
    category: formData.get('category'),
    date: formData.get('date'),
    content: formData.get('content'),
    createdAt: new Date().toISOString()
  };

  const imageFile = formData.get('image');
  if (imageFile && imageFile.size > 0) {
    // Show optimizer and wait for user choice
    const optimizedImage = await new Promise((resolve) => {
      showImageOptimizer(imageFile, (compressed) => {
        resolve(compressed);
      });
    });
    blogData.image = await fileToBase64(optimizedImage);
  }

  const data = getAdminData();
  data.blog.push(blogData);
  saveAdminData(data);
  logActivity(`Published blog: ${blogData.title}`);

  closeBlogForm();
  loadBlog(data.blog);
  showNotification('✓ Article published successfully!');
}

function loadBlog(blogs) {
  const list = document.getElementById('blogList');
  
  if (blogs.length === 0) {
    list.innerHTML = '<p class="empty-state">No blog posts added yet.</p>';
    return;
  }

  list.innerHTML = blogs.map(blog => `
    <div class="item-card">
      <div class="item-info">
        <div class="item-title">${blog.title}</div>
        <div class="item-meta">${blog.category} • ${new Date(blog.date).toLocaleDateString()}</div>
        <div class="item-description">${blog.content.substring(0, 100)}...</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-preview" onclick="previewBlog(${JSON.stringify(blog).replace(/"/g, '&quot;')})">👁️ Preview</button>
        <button class="btn btn-edit" onclick="editBlog(${blog.id})">Edit</button>
        <button class="btn btn-delete" onclick="deleteBlog(${blog.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteBlog(id) {
  if (confirm('Are you sure you want to delete this blog post?')) {
    const data = getAdminData();
    const blog = data.blog.find(b => b.id === id);
    data.blog = data.blog.filter(b => b.id !== id);
    saveAdminData(data);
    logActivity(`Deleted blog: ${blog?.title}`);
    loadBlog(data.blog);
    showNotification('✓ Blog post deleted successfully!');
  }
}

function editBlog(id) {
  const data = getAdminData();
  const blog = data.blog.find(b => b.id === id);
  
  if (blog) {
    document.getElementById('blogTitle').value = blog.title;
    document.getElementById('blogCategory').value = blog.category;
    document.getElementById('blogDate').value = blog.date;
    document.getElementById('blogContent').value = blog.content;
    
    openBlogForm();
    
    const form = document.getElementById('blogForm');
    const oldHandler = form.onsubmit;
    form.onsubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      
      Object.assign(blog, {
        title: formData.get('title'),
        category: formData.get('category'),
        date: formData.get('date'),
        content: formData.get('content')
      });

      const imageFile = formData.get('image');
      if (imageFile && imageFile.size > 0) {
        blog.image = await fileToBase64(imageFile);
      }

      saveAdminData(data);
      logActivity(`Updated blog: ${blog.title}`);
      closeBlogForm();
      loadBlog(data.blog);
      form.onsubmit = oldHandler;
      showNotification('✓ Blog post updated successfully!');
    };
  }
}

// ===============================================
// SKILLS MANAGEMENT
// ===============================================

function openSkillForm(e) {
  e?.preventDefault();
  document.getElementById('skillFormModal').style.display = 'flex';
  document.getElementById('skillForm').reset();
  document.getElementById('skillLevel').value = 50;
  document.getElementById('skillValue').textContent = '50%';
}

function closeSkillForm() {
  document.getElementById('skillFormModal').style.display = 'none';
  document.getElementById('skillForm').reset();
}

function handleSkillSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const skillData = {
    id: Date.now(),
    name: formData.get('name'),
    level: parseInt(formData.get('level')),
    category: formData.get('category'),
    createdAt: new Date().toISOString()
  };

  const data = getAdminData();
  data.skills.push(skillData);
  saveAdminData(data);
  logActivity(`Added skill: ${skillData.name}`);

  closeSkillForm();
  loadSkills(data.skills);
  showNotification('✓ Skill added successfully!');
}

function loadSkills(skills) {
  const list = document.getElementById('skillsList');
  
  if (skills.length === 0) {
    list.innerHTML = '<p class="empty-state">No skills added yet.</p>';
    return;
  }

  list.innerHTML = skills.map(skill => `
    <div class="item-card">
      <div class="item-info">
        <div class="item-title">${skill.name}</div>
        <div class="item-meta">${skill.category} • Proficiency: ${skill.level}%</div>
        <div style="width: 100%; height: 6px; background: var(--border-color); border-radius: 3px; margin-top: 10px; overflow: hidden;">
          <div style="height: 100%; width: ${skill.level}%; background: #ff3c00; border-radius: 3px;"></div>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn btn-preview" onclick="previewSkill(${JSON.stringify(skill).replace(/"/g, '&quot;')})">👁️ Preview</button>
        <button class="btn btn-delete" onclick="deleteSkill(${skill.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteSkill(id) {
  if (confirm('Are you sure you want to delete this skill?')) {
    const data = getAdminData();
    const skill = data.skills.find(s => s.id === id);
    data.skills = data.skills.filter(s => s.id !== id);
    saveAdminData(data);
    logActivity(`Deleted skill: ${skill?.name}`);
    loadSkills(data.skills);
    showNotification('✓ Skill deleted successfully!');
  }
}

// ===============================================
// TESTIMONIALS MANAGEMENT
// ===============================================

function openTestimonialForm(e) {
  e?.preventDefault();
  document.getElementById('testimonialFormModal').style.display = 'flex';
  document.getElementById('testimonialForm').reset();
}

function closeTestimonialForm() {
  document.getElementById('testimonialFormModal').style.display = 'none';
  document.getElementById('testimonialForm').reset();
}

async function handleTestimonialSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const testData = {
    id: Date.now(),
    author: formData.get('author'),
    title: formData.get('title'),
    company: formData.get('company'),
    text: formData.get('text'),
    rating: parseInt(formData.get('rating')),
    createdAt: new Date().toISOString()
  };

  const imageFile = formData.get('image');
  if (imageFile && imageFile.size > 0) {
    // Show optimizer and wait for user choice
    const optimizedImage = await new Promise((resolve) => {
      showImageOptimizer(imageFile, (compressed) => {
        resolve(compressed);
      });
    });
    testData.image = await fileToBase64(optimizedImage);
  }

  const data = getAdminData();
  data.testimonials.push(testData);
  saveAdminData(data);
  logActivity(`Added testimonial from ${testData.author}`);

  closeTestimonialForm();
  loadTestimonials(data.testimonials);
  showNotification('✓ Testimonial added successfully!');
}

function loadTestimonials(testimonials) {
  const list = document.getElementById('testimonialsList');
  
  if (testimonials.length === 0) {
    list.innerHTML = '<p class="empty-state">No testimonials added yet.</p>';
    return;
  }

  list.innerHTML = testimonials.map(test => `
    <div class="item-card">
      <div class="item-info">
        <div class="item-title">${test.author}</div>
        <div class="item-meta">${test.title}${test.company ? ' @ ' + test.company : ''}</div>
        <div class="item-meta">⭐ ${'★'.repeat(test.rating)}${'☆'.repeat(5-test.rating)}</div>
        <div class="item-description" style="margin-top: 10px;">"${test.text.substring(0, 80)}..."</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-preview" onclick="previewTestimonial(${JSON.stringify(test).replace(/"/g, '&quot;')})">👁️ Preview</button>
        <button class="btn btn-delete" onclick="deleteTestimonial(${test.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteTestimonial(id) {
  if (confirm('Are you sure you want to delete this testimonial?')) {
    const data = getAdminData();
    const test = data.testimonials.find(t => t.id === id);
    data.testimonials = data.testimonials.filter(t => t.id !== id);
    saveAdminData(data);
    logActivity(`Deleted testimonial from ${test?.author}`);
    loadTestimonials(data.testimonials);
    showNotification('✓ Testimonial deleted successfully!');
  }
}

// ===============================================
// SETTINGS
// ===============================================

function exportData() {
  const data = getAdminData();
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  logActivity('Exported data');
  showNotification('✓ Data exported successfully!');
}

function triggerImportFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(importedData));
        logActivity('Imported data');
        loadAllData();
        showNotification('✓ Data imported successfully!');
      } catch (error) {
        showNotification('✗ Invalid JSON file!', true);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function openChangePasswordForm(e) {
  e?.preventDefault();
  document.getElementById('changePasswordModal').style.display = 'flex';
}

function closeChangePasswordForm() {
  document.getElementById('changePasswordModal').style.display = 'none';
  document.getElementById('changePasswordForm').reset();
}

function handlePasswordChange(e) {
  e.preventDefault();

  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;

  if (currentPassword !== storedPassword) {
    showNotification('✗ Current password is incorrect!', true);
    return;
  }

  if (newPassword !== confirmPassword) {
    showNotification('✗ New passwords do not match!', true);
    return;
  }

  if (newPassword.length < 6) {
    showNotification('✗ Password must be at least 6 characters!', true);
    return;
  }

  localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
  logActivity('Changed admin password');
  closeChangePasswordForm();
  showNotification('✓ Password changed successfully!');
}

// ===============================================
// ===============================================
// PHASE 2: IMAGE OPTIMIZATION
// ===============================================

// Compress image using Canvas API
async function compressImage(file, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Convert to compressed format
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

// Calculate file size in KB
function getFileSizeKB(file) {
  return (file.size / 1024).toFixed(2);
}

// Calculate compression percentage
function getCompressionPercent(originalSize, compressedSize) {
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}

// Show image optimization modal
function showImageOptimizer(imageFile, callback) {
  // Create modal if not exists
  let modal = document.getElementById('imageOptimizerModal');
  if (!modal) {
    const modalHTML = `
      <div id="imageOptimizerModal" class="modal-overlay" style="display: none;">
        <div class="modal-content" style="max-width: 500px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 22px;">Image Optimization</h2>
            <button type="button" id="closeOptimizerModal" class="close-btn" style="font-size: 28px; cursor: pointer; border: none; background: none; color: #666;">×</button>
          </div>
          
          <div id="optimizerContent" style="margin-bottom: 20px;">
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">ORIGINAL SIZE</div>
              <div style="font-size: 24px; font-weight: bold; color: #333;" id="originalSizeDisplay">0 KB</div>
            </div>
            
            <div style="font-size: 20px; text-align: center; color: #999; margin: 15px 0;">↓</div>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">QUALITY SETTING</div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="range" id="qualitySlider" min="50" max="100" value="85" style="flex: 1;">
                <span id="qualityValue" style="font-size: 18px; font-weight: bold; color: #ff3c00; min-width: 40px;">85%</span>
              </div>
            </div>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 5px;">OPTIMIZED SIZE</div>
              <div style="font-size: 24px; font-weight: bold; color: #ff3c00;" id="compressedSizeDisplay">0 KB</div>
              <div style="font-size: 12px; color: #666; margin-top: 5px;" id="savingsDisplay">Calculating...</div>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <button type="button" id="cancelOptimization" class="btn" style="background: #f0f0f0; color: #333;">Cancel</button>
            <button type="button" id="confirmOptimization" class="btn" style="background: #ff3c00; color: white;">Use Optimized</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modal = document.getElementById('imageOptimizerModal');
    
    // Event listeners
    document.getElementById('closeOptimizerModal').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    document.getElementById('cancelOptimization').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    document.getElementById('qualitySlider').addEventListener('input', async (e) => {
      const quality = e.target.value / 100;
      document.getElementById('qualityValue').textContent = e.target.value + '%';
      updateCompressionPreview(imageFile, quality);
    });
  }
  
  // Show modal and update preview
  modal.style.display = 'flex';
  document.getElementById('originalSizeDisplay').textContent = getFileSizeKB(imageFile) + ' KB';
  document.getElementById('qualitySlider').value = 85;
  document.getElementById('qualityValue').textContent = '85%';
  
  updateCompressionPreview(imageFile, 0.85);
  
  // Handle confirmation
  document.getElementById('confirmOptimization').onclick = async () => {
    const quality = document.getElementById('qualitySlider').value / 100;
    const compressedImage = await compressImage(imageFile, quality);
    modal.style.display = 'none';
    callback(compressedImage);
  };
}

// Update compression preview in real-time
async function updateCompressionPreview(file, quality) {
  try {
    const compressed = await compressImage(file, quality);
    const compressedSize = getFileSizeKB(compressed);
    const originalSize = parseFloat(getFileSizeKB(file));
    const savings = getCompressionPercent(file.size, compressed.size);
    
    document.getElementById('compressedSizeDisplay').textContent = compressedSize + ' KB';
    document.getElementById('savingsDisplay').textContent = `${savings}% smaller`;
  } catch (error) {
    document.getElementById('compressedSizeDisplay').textContent = 'Error';
    document.getElementById('savingsDisplay').textContent = error.message;
  }
}

// ===============================================
// PHASE 2: BULK ACTIONS
// ===============================================

// Track selected items per category
const selectedItems = {
  projects: new Set(),
  blog: new Set(),
  certifications: new Set(),
  skills: new Set(),
  testimonials: new Set()
};

// Toggle item selection
function toggleItemSelection(itemId, category) {
  if (selectedItems[category].has(itemId)) {
    selectedItems[category].delete(itemId);
  } else {
    selectedItems[category].add(itemId);
  }
  
  updateBulkActionsUI(category);
  updateItemCardSelection(itemId, category);
}

// Update item card visual selection
function updateItemCardSelection(itemId, category) {
  const checkbox = document.querySelector(`[data-item-id="${itemId}"][data-category="${category}"]`);
  if (checkbox) {
    const card = checkbox.closest('.item-card');
    if (card) {
      if (selectedItems[category].has(itemId)) {
        card.classList.add('selected');
        checkbox.checked = true;
      } else {
        card.classList.remove('selected');
        checkbox.checked = false;
      }
    }
  }
}

// Update bulk actions UI visibility and count
function updateBulkActionsUI(category) {
  const count = selectedItems[category].size;
  const toolbar = document.getElementById(`bulkActionsToolbar`);
  const selectAllCheckbox = document.getElementById(`selectAll${category.charAt(0).toUpperCase() + category.slice(1)}`);
  const countDisplay = document.getElementById(`selectedCount${category.charAt(0).toUpperCase() + category.slice(1)}`);
  
  if (toolbar) {
    toolbar.style.display = count > 0 ? 'flex' : 'none';
  }
  
  if (countDisplay) {
    countDisplay.textContent = `${count} selected`;
  }
  
  if (selectAllCheckbox) {
    const data = getAdminData();
    const totalItems = data[category]?.length || 0;
    selectAllCheckbox.checked = count === totalItems && totalItems > 0;
    selectAllCheckbox.indeterminate = count > 0 && count < totalItems;
  }
}

// Toggle select all items
function toggleSelectAll(category) {
  const data = getAdminData();
  const items = data[category] || [];
  
  const selectAllCheckbox = document.getElementById(`selectAll${category.charAt(0).toUpperCase() + category.slice(1)}`);
  
  if (selectAllCheckbox?.checked) {
    selectedItems[category] = new Set(items.map(item => item.id));
  } else {
    selectedItems[category] = new Set();
  }
  
  // Update all checkboxes and cards
  items.forEach(item => {
    updateItemCardSelection(item.id, category);
  });
  
  updateBulkActionsUI(category);
}

// Bulk delete with confirmation
function bulkDeleteItems(category) {
  if (selectedItems[category].size === 0) {
    showNotification('No items selected', true);
    return;
  }
  
  const count = selectedItems[category].size;
  if (!confirm(`Are you sure you want to delete ${count} ${category}? This cannot be undone.`)) {
    return;
  }
  
  const data = getAdminData();
  data[category] = data[category].filter(item => !selectedItems[category].has(item.id));
  
  saveAdminData(data);
  logActivity(`Bulk deleted ${count} ${category}`);
  
  selectedItems[category] = new Set();
  updateBulkActionsUI(category);
  
  // Reload the list
  const loadFunction = {
    projects: loadProjects,
    blog: loadBlog,
    certifications: loadCertifications,
    skills: loadSkills,
    testimonials: loadTestimonials
  }[category];
  
  if (loadFunction) {
    loadFunction(data[category]);
  }
  
  showNotification(`✓ Deleted ${count} ${category} successfully!`);
}

// Bulk export items
function bulkExportItems(category) {
  if (selectedItems[category].size === 0) {
    showNotification('No items selected', true);
    return;
  }
  
  const data = getAdminData();
  const selected = data[category].filter(item => selectedItems[category].has(item.id));
  
  // Create export data
  const exportData = {
    category: category,
    exportDate: new Date().toISOString(),
    itemCount: selected.length,
    items: selected
  };
  
  // Download as JSON
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${category}_export_${new Date().getTime()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  
  logActivity(`Exported ${selected.length} ${category}`);
  showNotification(`✓ Exported ${selected.length} items!`);
}

// Clear all selections
function clearAllSelections(category) {
  selectedItems[category] = new Set();
  updateBulkActionsUI(category);
  
  // Uncheck all checkboxes
  document.querySelectorAll(`[data-category="${category}"]`).forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Remove selection styling
  document.querySelectorAll('.item-card.selected').forEach(card => {
    card.classList.remove('selected');
  });
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

function showNotification(message, isError = false) {
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notificationText');

  notificationText.textContent = message;
  notification.style.background = isError ? '#e74c3c' : '#27ae60';
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Update last sync time on page load
window.addEventListener('load', () => {
  const lastSync = localStorage.getItem('last_sync_time');
  if (lastSync) {
    const lastSyncEl = document.getElementById('lastSyncTime');
    if (lastSyncEl) lastSyncEl.textContent = lastSync;
  }
});
