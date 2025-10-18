/**
 * Substack Blog Integration
 * Fetches and displays blog posts from Substack RSS feed
 * Author: Portfolio Integration System
 * Date: October 18, 2025
 */

class SubstackBlogIntegration {
  constructor(substackUrl, containerId = 'substack-blog-posts') {
    this.substackUrl = substackUrl.replace(/\/$/, ''); // Remove trailing slash
    this.rssUrl = `${this.substackUrl}/feed`;
    this.containerId = containerId;
    this.posts = [];
  }

  /**
   * Fetch posts from Substack RSS feed
   */
  async fetchPosts(limit = 10) {
    try {
      // Use RSS2JSON service to convert RSS to JSON
      const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(this.rssUrl)}&api_key=ky8drmn9qc36vnwwaezv62z1fmase6udv1apzg22&count=${limit}`;
      
      const response = await fetch(rss2jsonUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'ok') {
        this.posts = data.items.map(item => this.parsePost(item));
        return this.posts;
      } else {
        throw new Error('Failed to fetch Substack posts');
      }
    } catch (error) {
      console.error('Error fetching Substack posts:', error);
      this.showFallbackContent();
      return [];
    }
  }

  /**
   * Parse RSS item to blog post object
   */
  parsePost(item) {
    // Extract image from content or use default
    const imageMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
    const image = imageMatch ? imageMatch[1] : './assets/images/default-blog.jpg';
    
    // Extract excerpt (first 150 characters of text content)
    const textContent = item.content.replace(/<[^>]*>/g, '').trim();
    const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
    
    // Extract category from categories array or default
    const category = item.categories && item.categories.length > 0 
      ? item.categories[0] 
      : 'Article';
    
    return {
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate),
      category: category,
      excerpt: excerpt,
      image: image,
      author: item.author || 'Ayinde Abdul-Sobur'
    };
  }

  /**
   * Format date for display
   */
  formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  /**
   * Create HTML for a single blog post
   */
  createPostHTML(post) {
    return `
      <li class="blog-post-item">
        <a href="${post.link}" target="_blank" rel="noopener noreferrer">
          <figure class="blog-banner-box">
            <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.src='./assets/images/default-blog.jpg'">
          </figure>

          <div class="blog-content">
            <div class="blog-meta">
              <p class="blog-category">${post.category}</p>
              <span class="dot"></span>
              <time datetime="${post.pubDate.toISOString()}">${this.formatDate(post.pubDate)}</time>
              <span class="dot"></span>
              <span class="blog-source">Substack</span>
            </div>

            <h3 class="h3 blog-item-title">${post.title}</h3>

            <p class="blog-text">${post.excerpt}</p>

            <div class="blog-read-more">
              <span>Read on Substack</span>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </a>
      </li>
    `;
  }

  /**
   * Render posts to the page
   */
  renderPosts(posts = this.posts) {
    const container = document.getElementById(this.containerId);
    
    if (!container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    if (posts.length === 0) {
      container.innerHTML = `
        <li class="blog-post-item" style="text-align:center;padding:40px 20px;">
          <p style="color:var(--light-gray);font-size:var(--fs-6);">
            No blog posts available yet. Check back soon!
          </p>
        </li>
      `;
      return;
    }

    container.innerHTML = posts.map(post => this.createPostHTML(post)).join('');
  }

  /**
   * Show fallback content if fetch fails
   */
  showFallbackContent() {
    const container = document.getElementById(this.containerId);
    
    if (container) {
      container.innerHTML = `
        <li class="blog-post-item" style="text-align:center;padding:40px 20px;">
          <p style="color:var(--light-gray);font-size:var(--fs-6);margin-bottom:15px;">
            Unable to load blog posts at the moment.
          </p>
          <a href="${this.substackUrl}" target="_blank" rel="noopener noreferrer" 
             style="color:#ff3c00;text-decoration:underline;font-size:var(--fs-6);">
            Visit my Substack directly →
          </a>
        </li>
      `;
    }
  }

  /**
   * Initialize and load posts
   */
  async init(limit = 10) {
    // Show loading state
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = `
        <li class="blog-post-item" style="text-align:center;padding:40px 20px;">
          <div class="loading-spinner" style="display:inline-block;width:40px;height:40px;border:3px solid var(--jet);border-top-color:#ff3c00;border-radius:50%;animation:spin 1s linear infinite;"></div>
          <p style="color:var(--light-gray);font-size:var(--fs-7);margin-top:15px;">
            Loading blog posts...
          </p>
        </li>
      `;
    }

    // Fetch and render posts
    await this.fetchPosts(limit);
    this.renderPosts();
  }
}

// Add loading spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .blog-source {
    display: inline-block;
    padding: 2px 8px;
    background: linear-gradient(135deg, #ff3c00, #ff5722);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 500;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .blog-read-more {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #ff3c00;
    font-size: var(--fs-7);
    font-weight: 500;
    margin-top: 12px;
    transition: gap var(--transition-1);
  }
  
  .blog-post-item:hover .blog-read-more {
    gap: 10px;
  }
  
  .blog-read-more ion-icon {
    font-size: 16px;
  }
`;
document.head.appendChild(style);

// Export for use
window.SubstackBlogIntegration = SubstackBlogIntegration;
