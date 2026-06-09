# ⚠️ IMPORTANT: Setup Steps Required Before Deploying

## Step 1: Update Your Email Address

This is the **ONLY** code change required before deploying.

### File to Edit:
```
src/components/ProjectForm.jsx
```

### Find Line 59:
Look for this exact line:
```javascript
email_address: 'your-email@example.com', // The recipient email
```

### Replace with Your Email:
```javascript
email_address: 'your-actual-email@gmail.com', // The recipient email
```

**Use your actual email address** so form submissions reach your inbox.

### Example:
If your email is `contact@cinova.com`:
```javascript
email_address: 'contact@cinova.com', // The recipient email
```

---

## Step 2: Verify .env.local Exists

Your environment file is already created with the API key:

```
.env.local
```

Contents:
```
NEXT_PUBLIC_WEB3FORMS_KEY=9423b565-f0ad-4d94-92e4-ef137abfa183
```

✅ **Already done** - No action needed

---

## Step 3: Verify .gitignore Protection

Your `.gitignore` already protects the environment file:

```
.gitignore
```

Contains:
```
.env.local
.env.*.local
```

✅ **Already done** - No action needed

---

## Step 4: Test Locally

### Start Development Server:
```bash
npm run dev
```

### Navigate to Form:
- Open: `http://localhost:3000/book-project`
- OR click "Book a Project" button from home

### Test Submission:
1. Fill all required fields:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Project Description: `Test project`

2. Click "Send it over"

3. Watch button change to "Sending..."

4. See success page appear

5. **Check your email** for the submission

---

## Step 5: Verify Validation Works

### Test Empty Submission:
1. Try submitting empty form
2. Error should appear: "Full name is required"

### Test Invalid Email:
1. Enter: `Full Name`
2. Enter: `invalid-email` (no @)
3. Try submit
4. Error should appear: "Please enter a valid email"

### Test Missing Description:
1. Fill Name and Email
2. Leave Description empty
3. Try submit
4. Error should appear: "Project description is required"

---

## Step 6: Deploy to Vercel

### Before Pushing to Git:
1. ✅ Updated email in ProjectForm.jsx (line 59)
2. ✅ .env.local exists with key
3. ✅ .gitignore protects .env.local
4. ✅ Tested form locally

### Push Changes:
```bash
git add .
git commit -m "Replace Tally with Web3Forms"
git push
```

### Vercel Auto-Deploy:
Vercel will automatically deploy when you push to GitHub.

### Add Environment Variable to Vercel:
1. Go to **Vercel Dashboard**
2. Select your project
3. Go to **Settings → Environment Variables**
4. Click **Add New**
5. **Name:** `NEXT_PUBLIC_WEB3FORMS_KEY`
6. **Value:** `9423b565-f0ad-4d94-92e4-ef137abfa183`
7. Click **Save and Redeploy**

---

## Step 7: Test on Live Site

After deployment completes:

1. Visit your live site
2. Go to `/book-project`
3. Submit a test form
4. **Verify email is received** at the address you configured

---

## ✅ Pre-Deployment Checklist

Print this and check off as you complete each step:

```
[ ] Step 1: Updated email in ProjectForm.jsx line 59
[ ] Step 2: Verified .env.local exists
[ ] Step 3: Verified .gitignore contains .env.local
[ ] Step 4: Started dev server (npm run dev)
[ ] Step 5: Tested form submission locally
[ ] Step 6: Checked email for test submission
[ ] Step 7: Tested validation errors
[ ] Step 8: Verified no console errors (F12)
[ ] Step 9: Committed and pushed to GitHub
[ ] Step 10: Added env var to Vercel
[ ] Step 11: Tested on live site
[ ] Step 12: Submitted real test form
[ ] Step 13: Verified email received
```

---

## 🆘 If Something Goes Wrong

### Form Won't Submit
```
1. Check that email in ProjectForm.jsx is your actual email
2. Open browser DevTools (F12)
3. Go to Console tab
4. Look for error messages
5. Try again after fixing
```

### Emails Not Arriving
```
1. Check spam/junk folder
2. Verify email in ProjectForm.jsx is correct
3. Test with a different email address
4. Check Web3Forms status page
```

### Validation Errors
```
1. Fill all required fields:
   - Full Name (can't be empty)
   - Email (must be valid format)
   - Project Description (can't be empty)
```

### "Something went wrong" on submit
```
1. Open browser DevTools (F12)
2. Check Console for detailed error
3. Verify .env.local exists locally
4. Verify API key is correct
5. Try again
```

---

## 📋 Quick Reference

| What | Where | Status |
|------|-------|--------|
| Email to update | `src/components/ProjectForm.jsx` line 59 | ❌ TO DO |
| API Key | `.env.local` | ✅ DONE |
| Git Protection | `.gitignore` | ✅ DONE |
| Local Test | `http://localhost:3000/book-project` | ⏳ AFTER STEP 1 |
| Vercel Env Var | Vercel Dashboard Settings | ⏳ AFTER DEPLOYMENT |

---

## 📞 Summary

**Only ONE code change is needed:**
- Update your email address on line 59 of `src/components/ProjectForm.jsx`

Everything else is already configured and ready to go!

After that simple change:
1. Test locally (npm run dev)
2. Push to GitHub
3. Add environment variable to Vercel
4. Test on live site

You're done! 🎉

---

**Created:** June 2026  
**Status:** Ready for setup
