# 🎯 VIF.Dev Portfolio - Component-Based Setup

Your portfolio now uses **modular components** for cleaner, more maintainable code!

## 📁 Project Structure

```
Portfolio-VIF/
├── index-modular.html          ← New clean HTML (only 130 lines!)
├── index.html                  ← Old static HTML (982 lines - backup)
├── components/                 ← Modular HTML components
│   ├── navbar.html
│   ├── hero.html
│   ├── about.html
│   ├── personality.html
│   ├── skills.html
│   ├── education.html
│   ├── certifications.html     ← NEW: Certifications & Awards
│   ├── projects.html
│   ├── contact.html
│   └── footer.html
├── css/                        ← Styles
├── js/                         ← JavaScript
│   ├── componentLoader.js      ← Loads components dynamically
│   ├── main.js                 ← Application entry point
│   ├── animations.js
│   ├── navigation.js
│   ├── interactive.js
│   └── utils.js
└── start-server.ps1            ← Development server script
```

## 🚀 How to Run

### Option 1: Using PowerShell Script (Recommended)

1. Open PowerShell in the project folder
2. Run:
   ```powershell
   .\start-server.ps1
   ```
3. Open browser to: **http://localhost:8000/index-modular.html**

### Option 2: Using Python Directly

```powershell
python -m http.server 8000
```

Then open: **http://localhost:8000/index-modular.html**

### Option 3: Using Node.js

```powershell
npx http-server -p 8000
```

Then open: **http://localhost:8000/index-modular.html**

## ✨ Benefits of Component-Based Setup

### Before (Static HTML):
❌ 982 lines in one file  
❌ Hard to find specific sections  
❌ Difficult to maintain  
❌ Code duplication  

### After (Component-Based):
✅ **130 lines** in index-modular.html  
✅ Each section in its own file  
✅ Easy to find and edit  
✅ Reusable components  
✅ Clean, organized code  

## 📝 How Components Work

1. **index-modular.html** contains placeholders:
   ```html
   <div id="navbar-placeholder"></div>
   <div id="hero-placeholder"></div>
   <!-- etc... -->
   ```

2. **componentLoader.js** loads each component:
   ```javascript
   await componentLoader.loadComponent('navbar', '#navbar-placeholder');
   ```

3. **Components** are loaded from the `components/` folder

## 🛠️ Editing Your Portfolio

To edit a section:

1. Open the component file in `components/`
   - Edit navbar → `components/navbar.html`
   - Edit hero → `components/hero.html`
   - Edit about → `components/about.html`
   - etc.

2. Save the file

3. Refresh the browser (Ctrl + F5)

## ⚙️ Configuration

Edit `js/main.js` to add/remove components:

```javascript
const AppConfig = {
  components: [
    { name: 'navbar', target: '#navbar-placeholder' },
    { name: 'hero', target: '#hero-placeholder' },
    // Add more components here
  ],
  debug: true // Set to false in production
};
```

## 🎨 EmailJS Configuration

Your EmailJS is already configured:
- **Public Key**: `cs8QoSnqtKqc4SkwX`
- **Service ID**: `service_g6jsrwq`
- **Template ID**: `template_pxji6pp`

Contact form will send emails to: **vounirishflorence.dejumo@gmail.com**

## 📦 Deployment

### Option 1: Keep Using index-modular.html

1. Upload all files to your hosting
2. Make sure `index-modular.html` is set as the main page
3. Or rename `index-modular.html` to `index.html`

### Option 2: Switch Back to Static HTML

If you prefer the static approach later, just use the original `index.html` (no server needed).

## 🔄 Migration Steps

When you're ready to fully switch:

```powershell
# Backup old file
Rename-Item index.html index-static-backup.html

# Use modular version as main file
Rename-Item index-modular.html index.html
```

## 🆘 Troubleshooting

### Components not loading?

1. Make sure you're using a web server (http://localhost:8000)
2. Don't open the file directly (file:/// won't work)
3. Check browser console for errors (F12)

### Still showing old content?

1. Hard refresh: **Ctrl + F5**
2. Clear browser cache
3. Check that you're opening `index-modular.html` not `index.html`

## 📚 Next Steps

1. ✅ Test the modular version
2. ✅ Edit components as needed
3. ✅ When satisfied, switch to using it as main `index.html`
4. ✅ Delete old backup files

---

**Enjoy your clean, modular portfolio!** 🎉
