# Vercel Redeploy Instructions

## All Pages Are Ready! 🎉

Your code has all three pages and is already pushed to GitHub:
- ✅ `/` - Home page (page.tsx)
- ✅ `/planetarium` - 3D experience (planetarium/page.tsx)
- ✅ `/documentation` - Technical docs (documentation/page.tsx)

---

## How to Redeploy on Vercel

### Option 1: Automatic Redeploy (Recommended)

Vercel automatically deploys when you push to `main`. Since code is already pushed, trigger a redeploy:

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Deployments** tab
4. Find the latest deployment
5. Click the **⋯** (three dots) menu
6. Select **Redeploy**
7. Check "Use existing Build Cache" (optional)
8. Click **Redeploy**

### Option 2: Force New Deployment

If automatic redeploy doesn't work:

```bash
# Make a small change to trigger deployment
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

### Option 3: CLI Deployment

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

---

## ✅ Verify Deployment

After redeployment, check these URLs:

- `https://your-app.vercel.app/` - Home page
- `https://your-app.vercel.app/planetarium` - Planetarium
- `https://your-app.vercel.app/documentation` - Docs

---

## 🔧 If Pages Still Don't Show

### Check Build Output

In Vercel deployment logs, verify you see:

```
Route (app)
┌ ○ /                    
├ ○ /documentation       
└ ○ /planetarium         
```

If routes are missing, check:
1. Files exist in `src/app/` directory
2. Each route has a `page.tsx` file
3. No build errors in logs

### Common Issues

**Issue**: Only one page shows
- **Cause**: Old deployment cached
- **Fix**: Hard refresh (Ctrl+Shift+R) or clear browser cache

**Issue**: 404 on routes
- **Cause**: Build didn't include all pages
- **Fix**: Check Vercel build logs for errors

---

## 📦 Current File Structure

```
src/app/
├── page.tsx              → / (Home)
├── layout.tsx            → Global layout
├── globals.css           → Global styles
├── planetarium/
│   └── page.tsx          → /planetarium
├── documentation/
│   └── page.tsx          → /documentation
└── api/
    └── messages/
        └── route.ts      → API endpoints
```

All files are committed and pushed to GitHub!
