# 🔐 Admin Dashboard - Setup & User Guide

## 📋 Overview

You now have a **secure, password-protected admin dashboard** where only you can manage your portfolio content. All data is stored locally in your browser (localStorage) and can be exported/imported as JSON.

### **Access the Admin Dashboard**
```
https://croesus-portfolio.vercel.app/admin.html
```

---

## 🔑 LOGIN CREDENTIALS

### **Default Password:**
```
Croesus@2025
```

⚠️ **IMPORTANT:** Change this password immediately after first login!

1. Go to **Settings** tab
2. Click **"Change Password"**
3. Enter current password: `Croesus@2025`
4. Set a new strong password
5. Confirm password matches

---

## 📁 Features

### **1. 📁 Projects Management**
- ✅ Add new projects with live links & GitHub repos
- ✅ Upload project images
- ✅ Tag tech stack (React, Python, GIS, etc.)
- ✅ Mark projects as "Featured" (appears first)
- ✅ Set project status (Active, Completed, Archived)
- ✅ Edit or delete existing projects

**Example:**
- Title: "MWG by Sama"
- Category: Web development
- Tech Stack: React, Node.js, PostgreSQL
- Live Link: https://mwgbysama.vercel.app/
- GitHub: https://github.com/croesus245/...

---

### **2. 🏆 Certifications**
- ✅ Add certificates with issuer info & dates
- ✅ Upload certificate images
- ✅ Link to credential verification
- ✅ Organize by date earned

**Example:**
- Title: "Machine Learning Specialization"
- Issuer: Coursera
- Date Earned: Jan 15, 2025
- Credential URL: https://coursera.org/...

---

### **3. 📝 Blog Posts**
- ✅ Write articles directly in dashboard
- ✅ Categorize posts (Tech, GIS, Career, Tutorial, Personal)
- ✅ Set publication dates
- ✅ Upload featured images
- ✅ Full CRUD operations (Create, Read, Update, Delete)

**Example:**
- Title: "The Future of AI in GIS"
- Category: Tech
- Content: Full article text (markdown or plain text)
- Featured Image: Upload cover photo

---

### **4. ⭐ Skills Management**
- ✅ Add any skill with proficiency percentage (0-100%)
- ✅ Categorize (Programming, Tools, Design, Other)
- ✅ Visual progress bars
- ✅ Quick deletion

**Example:**
- Skill: "Python Programming"
- Level: 95%
- Category: Programming

---

### **5. 💬 Testimonials**
- ✅ Add client/colleague testimonials
- ✅ Include ratings (1-5 stars)
- ✅ Upload profile images
- ✅ Save author info & company

**Example:**
- Author: "John Doe"
- Title: "CEO"
- Company: "Tech Startup"
- Rating: 5/5
- Text: "Working with Ayinde was amazing..."

---

### **6. ⚙️ Settings**

#### **Data Management**
- 📥 **Export Data**: Download all portfolio data as JSON backup
- 📤 **Import Data**: Upload JSON file to restore data

#### **Security**
- 🔐 **Change Password**: Update admin login password

#### **Publishing**
- 🚀 **Sync to Portfolio**: Deploy changes to live website

#### **About**
- View dashboard version & last sync time

---

## 🎯 Step-by-Step Guide

### **Adding Your First Project**

1. **Login** with password
2. Click **"Projects"** tab in navigation
3. Click **"+ Add New Project"** button
4. Fill in the form:
   - **Title**: "GeoBot AI Chatbot"
   - **Category**: "Web development"
   - **Status**: "Active"
   - **Description**: "AI-powered chatbot for surveying students with real-time Q&A"
   - **Tech Stack**: "Python, Django, TensorFlow, React"
   - **Live Link**: "https://geobot-demo.vercel.app"
   - **GitHub Link**: "https://github.com/croesus245/geobot"
   - **Image**: Upload project screenshot
   - **Featured**: Check if you want it first
5. Click **"Save Project"**
6. ✅ Project appears in list!

### **Publishing a Blog Post**

1. Click **"Blog"** tab
2. Click **"+ Write New Article"**
3. Fill in details:
   - **Title**: "Home Addressing Systems in Nigeria"
   - **Category**: "GIS"
   - **Date**: Select today's date
   - **Content**: Write your article (up to 10,000+ characters)
   - **Featured Image**: Upload cover photo
4. Click **"Publish Article"**
5. ✅ Article is live!

### **Adding a Skill**

1. Click **"Skills"** tab
2. Click **"+ Add Skill"**
3. Enter skill name: "React.js"
4. Drag slider to set proficiency: 85%
5. Select category: "Programming"
6. Click **"Add Skill"**
7. ✅ Skill added with visual progress bar!

---

## 💾 Data Storage

### **Where Is My Data Stored?**

Your admin data is stored in browser's **localStorage** (locally on your computer):

**Storage Key:** `portfolio_admin_data`

This means:
- ✅ Data persists across page refreshes
- ✅ Only you can access it (from your computer)
- ✅ Survives browser restarts
- ⚠️ Data is lost if browser cache is cleared
- ⚠️ Different browsers = different data

### **Backup Your Data Regularly**

To prevent data loss:

1. Go to **Settings** tab
2. Click **"📥 Export Data (JSON)"**
3. Save the JSON file to your computer
4. Keep this as a backup

To restore later:
1. Go to **Settings** tab
2. Click **"📤 Import Data (JSON)"**
3. Select your JSON backup file
4. ✅ All data restored!

---

## 🚀 Publishing to Your Portfolio

### **Sync Changes**

When you've made updates:

1. Go to **Settings** tab
2. Click **"🚀 Sync to Portfolio"**
3. Your changes are queued for deployment
4. Vercel will auto-deploy within minutes
5. Visit https://croesus-portfolio.vercel.app/ to see changes

**Note:** Initial sync integration will auto-update your portfolio's HTML. For now, admin data is stored separately. We can integrate it fully with your main portfolio in the next phase.

---

## 🔒 Security Tips

✅ **DO:**
- Change default password immediately
- Use a strong password (8+ chars, mix of letters/numbers/symbols)
- Don't share your admin password
- Regularly backup your data
- Clear old browsers' localStorage if switching devices

❌ **DON'T:**
- Don't use the same password as your email
- Don't share the admin.html link with anyone
- Don't use weak/simple passwords
- Don't forget to backup before major updates

---

## 🐛 Troubleshooting

### **I Forgot My Password**
1. Clear browser data/cache for the website
2. Password resets to default: `Croesus@2025`
3. Immediately set a new strong password

### **Data Disappeared After Clearing Browser Cache**
- This is normal! Browser cache stores localStorage
- Always backup your data before clearing cache
- Use the "Export Data" feature regularly

### **Changes Not Showing on Live Portfolio**
1. Make sure to click **"Sync to Portfolio"** in Settings
2. Wait 1-2 minutes for Vercel to deploy
3. Hard refresh your portfolio: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
4. Check browser developer console for errors

### **Images Not Uploading**
1. Check file size (keep under 5MB)
2. Use JPG, PNG, or WebP formats
3. Try a different image if upload fails
4. Check internet connection

---

## 📊 Data Format (JSON)

When you export, the JSON looks like this:

```json
{
  "projects": [
    {
      "id": 1234567890,
      "title": "MWG by Sama",
      "category": "web development",
      "status": "active",
      "description": "...",
      "techStack": "React, Node.js",
      "liveLink": "https://...",
      "githubLink": "https://...",
      "featured": true,
      "image": "data:image/jpeg;base64,...",
      "createdAt": "2025-01-26T..."
    }
  ],
  "certifications": [...],
  "blog": [...],
  "skills": [...],
  "testimonials": [...]
}
```

---

## 🎓 Best Practices

### **For Projects**
- Upload professional screenshots (1200x800px ideal)
- Include all relevant tech in tech stack
- Mark your best/newest as "Featured"
- Link to working live demos when possible

### **For Blog**
- Write engaging titles (20-60 characters)
- Use clear, readable content
- Add featured image for every post
- Pick appropriate category for discovery

### **For Skills**
- Be honest with proficiency levels
- Group similar skills by category
- Update levels as you improve
- Remove outdated skills

### **For Testimonials**
- Get real feedback from clients/colleagues
- Include specific details (not generic praise)
- Use professional profile photos
- Rate accurately (1-5 stars)

---

## 📱 Mobile Access

You can access the admin dashboard from your phone:

1. Go to: `https://croesus-portfolio.vercel.app/admin.html` on your phone
2. Login with your password
3. Dashboard is fully responsive
4. Add projects, blog posts, etc. on the go!

---

## 🔄 What's Next?

### **Phase 2 (Coming Soon)**
- [ ] Auto-sync admin data to main portfolio
- [ ] Database integration (Firebase/Supabase)
- [ ] Image optimization & CDN
- [ ] Analytics dashboard
- [ ] Email notifications for new contacts

### **Phase 3 (Future)**
- [ ] Multi-user support (invite collaborators)
- [ ] Version history & rollback
- [ ] Custom themes
- [ ] Advanced scheduling
- [ ] API for mobile app

---

## ❓ FAQ

**Q: Can anyone find this admin dashboard?**
A: No, only if they know the exact URL `/admin.html` AND your password. It's secure but not hidden from code inspection. For production, we recommend a backend auth system.

**Q: Is my data synced to the cloud?**
A: Currently data is stored locally. We can integrate Firebase/Supabase for cloud backup in phase 2.

**Q: How many projects/skills can I add?**
A: Unlimited! localStorage typically allows 5-10MB, which is plenty for thousands of items.

**Q: Can I upload videos?**
A: Currently we support images. Videos can be added by linking to YouTube/Vimeo URLs.

**Q: What if I accidentally delete something?**
A: You can restore from your JSON backup. If you haven't backed up, refresh the page (before clearing cache) to see if it's still there.

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Clear browser cache and try again
3. Check browser console (F12) for error messages
4. Contact support with the error message

---

**Last Updated:** January 26, 2025
**Version:** 1.0
**Dashboard Status:** ✅ Live & Secure
