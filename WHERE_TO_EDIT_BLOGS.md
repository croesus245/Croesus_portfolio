# 🎯 QUICK REFERENCE: Where to Edit Blog Posts

## 📍 EXACT LOCATION

**File:** `index.html`  
**Line Range:** **851 to 932**

---

## 🔍 HOW TO FIND IT (GitHub Mobile)

1. Open **index.html** in GitHub app
2. Tap **search** (🔍)
3. Search: **`blog-post-item`**
4. You'll jump to **line 851** ✅

---

## 📝 WHAT YOU'LL SEE (Lines 849-936)

```html
LINE 849 →   <ul class="blog-posts-list">
LINE 850
LINE 851 →     <li class="blog-post-item">              ← BLOG POST #1 STARTS
LINE 852         <a href="https://croesusblog.blogspot.com/2025/01/HAS.html">
LINE 853
LINE 854           <figure class="blog-banner-box">
LINE 855             <img src="./assets/images/location blog.jpg" alt="location blog" loading="lazy">
LINE 856           </figure>
LINE 857
LINE 858           <div class="blog-content">
LINE 859
LINE 860             <div class="blog-meta">
LINE 861               <p class="blog-category">Tech</p>    ← CATEGORY
LINE 862
LINE 863               <span class="dot"></span>
LINE 864
LINE 865               <time datetime="2025-01-26">jan 26, 2025</time>  ← DATE
LINE 866             </div>
LINE 867
LINE 868             <h3 class="h3 blog-item-title">Home Addressing System</h3>  ← TITLE
LINE 869
LINE 870             <p class="blog-text">
LINE 871             The Father to the Fatherless          ← DESCRIPTION
LINE 872             </p>
LINE 873
LINE 874           </div>
LINE 875
LINE 876         </a>
LINE 877       </li>                                      ← BLOG POST #1 ENDS
LINE 878
LINE 879 →     <li class="blog-post-item">              ← BLOG POST #2 STARTS
LINE 880         <a href="https://croesusblog.blogspot.com/2025/01/Surveying.html">
                 ... (same structure)
LINE 905       </li>                                      ← BLOG POST #2 ENDS
LINE 906
LINE 907 →     <li class="blog-post-item">              ← BLOG POST #3 STARTS
                 ... (same structure)
LINE 932       </li>                                      ← BLOG POST #3 ENDS
LINE 933
LINE 934
LINE 935       </ul>
LINE 936
```

---

## ✏️ TO ADD A NEW BLOG POST

**Insert at LINE 933** (between line 932 and 935)

Copy this template:

```html
            <li class="blog-post-item">
              <a href="YOUR_BLOG_URL_HERE">

                <figure class="blog-banner-box">
                  <img src="./assets/images/YOUR_IMAGE.jpg" alt="Description" loading="lazy">
                </figure>

                <div class="blog-content">

                  <div class="blog-meta">
                    <p class="blog-category">Category</p>

                    <span class="dot"></span>

                    <time datetime="2025-10-18">oct 18, 2025</time>
                  </div>

                  <h3 class="h3 blog-item-title">Your Title</h3>

                  <p class="blog-text">
                  Your description
                  </p>

                </div>

              </a>
            </li>
```

---

## 🎯 EDIT THESE 5 THINGS

1. **Line 2:** `YOUR_BLOG_URL_HERE` → Your actual blog post URL
2. **Line 5:** `YOUR_IMAGE.jpg` → Your image filename
3. **Line 11:** `Category` → Tech, GIS, Tutorial, etc.
4. **Line 15:** `2025-10-18` and `oct 18, 2025` → Your date
5. **Line 18 & 21:** Title and description → Your content

---

## ✅ COMPLETE EXAMPLE

If you're adding a post called "AI in GIS":

```html
            <li class="blog-post-item">
              <a href="https://croesusblog.blogspot.com/2025/10/ai-gis.html">

                <figure class="blog-banner-box">
                  <img src="./assets/images/ai-gis.jpg" alt="AI in GIS" loading="lazy">
                </figure>

                <div class="blog-content">

                  <div class="blog-meta">
                    <p class="blog-category">Tech</p>

                    <span class="dot"></span>

                    <time datetime="2025-10-18">oct 18, 2025</time>
                  </div>

                  <h3 class="h3 blog-item-title">AI in GIS</h3>

                  <p class="blog-text">
                  How AI is transforming Geographic Information Systems
                  </p>

                </div>

              </a>
            </li>
```

**Paste this at LINE 933 → Commit → Done!** ✅

---

## 📱 GITHUB MOBILE WORKFLOW

1. **Open GitHub app**
2. **Go to:** croesus245/Croesus_portfolio
3. **Tap:** index.html
4. **Tap:** ✏️ (edit icon)
5. **Search:** `blog-post-item` (jumps to line 851)
6. **Scroll down** to line 933
7. **Paste template** above
8. **Edit** the 5 things
9. **Scroll to bottom**
10. **Commit message:** "Added new blog post"
11. **Tap:** Commit changes
12. **✅ DONE!** Live in 30 seconds

---

## 🚨 IMPORTANT: DON'T TOUCH THESE LINES

- **Line 849:** `<ul class="blog-posts-list">` ← Opening tag
- **Line 935:** `</ul>` ← Closing tag

**Only edit BETWEEN lines 851-933!**

---

## 🎨 CURRENT BLOG POSTS

**Post #1 (Lines 851-877):**
- Title: Home Addressing System
- Category: Tech
- Image: location blog.jpg

**Post #2 (Lines 879-905):**
- Title: From Maps to Machines
- Category: GIS
- Image: instrument.jpg

**Post #3 (Lines 907-932):**
- Title: The recalling Method
- Category: GIS
- Image: cytonn-photography-ZJEKICY5EXY-unsplash.jpg

---

## 💡 TIPS

✅ **Copy existing blog post** → Paste → Edit (easiest way!)  
✅ **Keep spacing/indentation** the same  
✅ **Upload images first** to `assets/images/`  
✅ **Test links** before adding them  
✅ **Write clear commit messages**

---

## 🔗 YOUR LIVE PORTFOLIO

https://croesus-portfolio.vercel.app/

**Changes go live in 30 seconds after commit!**

---

**That's it! Simple and easy!** 🎉
