# Environment Variable Reference

## Your `.env.local` File

This file is **already created** in your project root and contains:

```
NEXT_PUBLIC_WEB3FORMS_KEY=9423b565-f0ad-4d94-92e4-ef137abfa183
```

### File Location:
```
/vercel/share/v0-project/.env.local
```

### Security:
- ✅ Protected by `.gitignore`
- ✅ Never committed to GitHub
- ✅ Loaded automatically by Next.js dev server
- ✅ Safe to expose (client-side key)

---

## How It's Used in Your Code

**File:** `src/components/ProjectForm.jsx`  
**Line:** 6

```javascript
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
```

Then in the form submission (line 52-62):

```javascript
const formPayload = {
  access_key: WEB3FORMS_KEY,  // ← Uses the environment variable
  subject: `New Project Inquiry from ${formData.fullName}`,
  from_name: formData.fullName,
  from_email: formData.email,
  // ... rest of payload
}
```

---

## For Vercel Deployment

When you deploy to Vercel, you need to add this environment variable to your project settings:

### Steps:

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Your Project**
   - Click your project name

3. **Go to Settings**
   - Click "Settings" in the top menu

4. **Go to Environment Variables**
   - Click "Environment Variables" in left sidebar

5. **Add New Variable**
   - Click "Add New"
   - **Name:** `NEXT_PUBLIC_WEB3FORMS_KEY`
   - **Value:** `9423b565-f0ad-4d94-92e4-ef137abfa183`
   - **Environments:** Select all (Development, Preview, Production)

6. **Save & Redeploy**
   - Click "Save"
   - Vercel will automatically redeploy

---

## Variable Naming Convention

**Why `NEXT_PUBLIC_` prefix?**

- ✅ `NEXT_PUBLIC_` means it's safe to expose in frontend code
- ✅ Next.js automatically injects it into the browser
- ✅ This is a client-side API key (not a secret)
- ✅ It's different from backend secrets (which never have this prefix)

---

## What NOT to Do

❌ **Don't hardcode the key:**
```javascript
// WRONG - never do this
const ACCESS_KEY = '9423b565-f0ad-4d94-92e4-ef137abfa183'
```

❌ **Don't commit `.env.local`:**
```bash
# Never do this
git add .env.local
git commit -m "Add env vars"
```

❌ **Don't use environment variable directly in JSX:**
```javascript
// WRONG - key would be exposed
<input value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />
```

---

## Checking Environment Variables

### In Development:

Open browser DevTools (F12) → Console and run:
```javascript
console.log(process.env.NEXT_PUBLIC_WEB3FORMS_KEY)
// Should output: 9423b565-f0ad-4d94-92e4-ef137abfa183
```

### In Production:

The environment variable is available to your deployed app via Vercel's settings, not in the code repository.

---

## If Something Breaks

### "process.env.NEXT_PUBLIC_WEB3FORMS_KEY is undefined"

**Solution:**
1. Verify `.env.local` exists in project root
2. Verify it contains: `NEXT_PUBLIC_WEB3FORMS_KEY=...`
3. Restart dev server: `npm run dev`
4. Check browser console for the value

### Form submission fails with error

**Check in browser console (F12):**
```javascript
console.log(process.env.NEXT_PUBLIC_WEB3FORMS_KEY)
```

If it's `undefined`, the environment variable isn't loaded.

### On Vercel, form doesn't work

**Solution:**
1. Go to Vercel project settings
2. Check Environment Variables section
3. Verify `NEXT_PUBLIC_WEB3FORMS_KEY` is set
4. Redeploy after adding/updating

---

## Complete Checklist

### Local Development:
- [ ] `.env.local` exists in project root
- [ ] Contains correct key value
- [ ] `.gitignore` protects it
- [ ] Dev server started (`npm run dev`)
- [ ] Form submission works
- [ ] Test emails arrive

### Before Deploying:
- [ ] Committed all files EXCEPT `.env.local`
- [ ] Pushed to GitHub
- [ ] `.env.local` is in `.gitignore`

### After Deploying to Vercel:
- [ ] Went to Vercel Settings
- [ ] Added `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable
- [ ] Set correct value
- [ ] Selected all environments
- [ ] Redeployed
- [ ] Tested form on live site

---

## Reference

| Item | Value |
|------|-------|
| **Variable Name** | `NEXT_PUBLIC_WEB3FORMS_KEY` |
| **Variable Value** | `9423b565-f0ad-4d94-92e4-ef137abfa183` |
| **Storage** | `.env.local` (local) + Vercel settings (production) |
| **Usage** | Client-side form submission |
| **Protection** | `.gitignore` (not committed to Git) |
| **Type** | Client-side key (safe to expose) |

---

**Last Updated:** June 2026  
**Status:** Ready for Use
