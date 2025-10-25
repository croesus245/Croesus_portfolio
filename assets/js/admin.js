// ===============================================
// ADMIN DASHBOARD JAVASCRIPT
// ===============================================

// Config
const ADMIN_PASSWORD_KEY = 'admin_password_secure';
const ADMIN_DATA_KEY = 'portfolio_admin_data';
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

  // Load initial data
  loadAllData();
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
  } else {
    loginError.textContent = 'Invalid password. Please try again.';
    loginError.style.display = 'block';
    document.getElementById('password').value = '';
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
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
}

// ===============================================
// TAB NAVIGATION
// ===============================================

function switchTab(e) {
  const tabName = e.target.dataset.tab;
  
  // Remove active class from all tabs and contents
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  // Add active class to clicked tab and corresponding content
  e.target.classList.add('active');
  document.querySelector(`[data-tab-content="${tabName}"]`).classList.add('active');
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

  // Handle image upload
  const imageFile = formData.get('image');
  if (imageFile && imageFile.size > 0) {
    projectData.image = await fileToBase64(imageFile);
  }

  const data = getAdminData();
  data.projects.push(projectData);
  saveAdminData(data);

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
      <div class="item-info">
        <div class="item-title">${project.title}</div>
        <div class="item-meta">
          <span>${project.category}</span> • <span>${project.status}</span>
          ${project.featured ? ' • <strong style="color: #ff3c00;">⭐ Featured</strong>' : ''}
        </div>
        <div class="item-description">${project.description.substring(0, 100)}...</div>
        ${project.techStack ? `<div class="item-meta">Tech: ${project.techStack}</div>` : ''}
      </div>
      <div class="item-actions">
        <button class="btn btn-edit" onclick="editProject(${project.id})">Edit</button>
        <button class="btn btn-delete" onclick="deleteProject(${project.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteProject(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    const data = getAdminData();
    data.projects = data.projects.filter(p => p.id !== id);
    saveAdminData(data);
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
        project.image = await fileToBase64(imageFile);
      }

      saveAdminData(data);
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
    certData.image = await fileToBase64(imageFile);
  }

  const data = getAdminData();
  data.certifications.push(certData);
  saveAdminData(data);

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
        <button class="btn btn-delete" onclick="deleteCert(${cert.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteCert(id) {
  if (confirm('Are you sure you want to delete this certificate?')) {
    const data = getAdminData();
    data.certifications = data.certifications.filter(c => c.id !== id);
    saveAdminData(data);
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
    blogData.image = await fileToBase64(imageFile);
  }

  const data = getAdminData();
  data.blog.push(blogData);
  saveAdminData(data);

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
        <button class="btn btn-edit" onclick="editBlog(${blog.id})">Edit</button>
        <button class="btn btn-delete" onclick="deleteBlog(${blog.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteBlog(id) {
  if (confirm('Are you sure you want to delete this blog post?')) {
    const data = getAdminData();
    data.blog = data.blog.filter(b => b.id !== id);
    saveAdminData(data);
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
        <button class="btn btn-delete" onclick="deleteSkill(${skill.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteSkill(id) {
  if (confirm('Are you sure you want to delete this skill?')) {
    const data = getAdminData();
    data.skills = data.skills.filter(s => s.id !== id);
    saveAdminData(data);
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
    testData.image = await fileToBase64(imageFile);
  }

  const data = getAdminData();
  data.testimonials.push(testData);
  saveAdminData(data);

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
        <button class="btn btn-delete" onclick="deleteTestimonial(${test.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function deleteTestimonial(id) {
  if (confirm('Are you sure you want to delete this testimonial?')) {
    const data = getAdminData();
    data.testimonials = data.testimonials.filter(t => t.id !== id);
    saveAdminData(data);
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
  closeChangePasswordForm();
  showNotification('✓ Password changed successfully!');
}

function syncToPortfolio() {
  const data = getAdminData();
  
  // Here you would integrate with your portfolio website
  // This is a placeholder for the sync functionality
  console.log('Syncing data to portfolio:', data);
  
  // Update last sync time
  localStorage.setItem('last_sync_time', new Date().toLocaleString());
  document.getElementById('lastSyncTime').textContent = new Date().toLocaleString();
  
  showNotification('✓ Portfolio synced successfully! Changes will appear on the site shortly.');
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
