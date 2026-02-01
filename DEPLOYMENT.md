# Deployment Troubleshooting Guide

## JSON Parse Error Fix

The "JSON.parse: unexpected character" error occurs when the API returns HTML instead of JSON, usually due to missing environment variables.

---

## ✅ Solution: Configure Environment Variables in Vercel

### 1. Go to Vercel Dashboard
- Navigate to: https://vercel.com/dashboard
- Select your project: `echo-in-orbits`
- Go to **Settings** → **Environment Variables**

### 2. Add Required Variables

Add these environment variables (get values from your `.env.local` file):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Redeploy

After adding environment variables:
- Go to **Deployments** tab
- Click the **⋯** menu on latest deployment
- Select **Redeploy**

---

## 🔍 Verify Environment Variables Locally

Check your `.env.local` file has:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

---

## 🛠️ Code Changes Made

### StarField.tsx
Added proper error handling to prevent JSON parse crashes:

```tsx
fetch('/api/messages')
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON')
        }
        return res.json()
    })
    .catch(err => {
        console.error('Failed to fetch stars:', err)
        setStars([]) // Prevent crash
    })
```

---

## 🚀 Quick Deploy Checklist

- [ ] Environment variables added to Vercel
- [ ] Supabase project is active
- [ ] Database tables exist (run migrations)
- [ ] Clerk application is configured
- [ ] Redeploy after adding env vars

---

## 📝 Common Issues

**Issue**: Stars don't appear
- **Cause**: Empty database
- **Fix**: Run seed script or create messages manually

**Issue**: Authentication doesn't work
- **Cause**: Clerk keys missing
- **Fix**: Add Clerk env vars and configure allowed domains

**Issue**: API returns 500
- **Cause**: Supabase connection failed
- **Fix**: Verify Supabase URL and anon key are correct
