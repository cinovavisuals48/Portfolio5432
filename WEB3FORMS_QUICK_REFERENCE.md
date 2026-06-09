# Web3Forms Quick Reference

## ⚡ Critical: Update Before Deploying

**File:** `src/components/ProjectForm.jsx`  
**Line:** ~95  
**Change this:**
```javascript
email_address: 'your-email@example.com', // The recipient email
```

**To your actual email:**
```javascript
email_address: 'your-real-email@gmail.com',
```

---

## 📂 Files Modified/Created

```
✅ .env.local                          (Created)
   └─ NEXT_PUBLIC_WEB3FORMS_KEY=...

✅ .gitignore                          (Created)
   └─ Protects .env.local from Git

✅ src/components/ProjectForm.jsx      (Updated)
   └─ Tally → Web3Forms integration

✅ src/components/TallyFormModal.jsx   (Deleted)
   └─ No longer needed

✅ src/app/api/contact/route.js        (Updated)
   └─ Marked deprecated (client-side now)

📄 WEB3FORMS_SETUP.md                  (This project)
   └─ Full documentation

📄 WEB3FORMS_QUICK_REFERENCE.md        (This file)
   └─ Quick checklist
```

---

## 🔑 Environment Variable

**Your key is already set in `.env.local`:**
```
NEXT_PUBLIC_WEB3FORMS_KEY=9423b565-f0ad-4d94-92e4-ef137abfa183
```

**How it's used:**
```javascript
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
```

**Security:**
- ✅ Protected by `.gitignore`
- ✅ Not hardcoded in components
- ✅ Safe to expose (client-side key)

---

## 📋 Form Fields

| Field | Required | Type |
|-------|----------|------|
| Full Name | ✅ Yes | Text |
| Email | ✅ Yes | Email |
| WhatsApp Number | ❌ No | Tel |
| Contact Method | ❌ No | Select |
| Project Description | ✅ Yes | Textarea |
| Inspiration & References | ❌ No | Textarea |
| Deadline | ❌ No | Text |
| Video Length | ❌ No | Text |
| Budget | ❌ No | Text |

---

## 🎨 Design Details

- **Theme:** Dark (matches existing site)
- **Colors:** Uses design tokens (bg-card, text-ink-primary, accent-blue)
- **Animations:** Framer Motion (fade-in, scale, transitions)
- **Responsive:** Mobile-first, optimized for all screens
- **Cursor:** Maintains custom cursor behavior

---

## 🚀 Pre-Deployment Checklist

- [ ] **Email Updated:** Change `your-email@example.com` → your actual email
- [ ] **Test Locally:** `npm run dev` → http://localhost:3000/book-project
- [ ] **Test Submission:** Fill form, click "Send it over", check email
- [ ] **Verify .gitignore:** `.env.local` is protected
- [ ] **Check Console:** No errors in browser DevTools
- [ ] **Deploy:** Push to GitHub → Vercel auto-deploys
- [ ] **Post-Deploy Test:** Test form on live site

---

## 💬 Button States

| State | Text |
|-------|------|
| **Idle** | "Send it over" |
| **Loading** | "Sending..." |
| **Success** | (Shows success page) |
| **Error** | (Shows error message) |

---

## 🔗 Form Flow

```
User fills form
   ↓
Clicks "Send it over"
   ↓
Form validates:
  - Name required?
  - Email valid?
  - Description provided?
   ↓
If invalid → Show error in red box
If valid → Send to Web3Forms API
   ↓
Loading state: "Sending..."
   ↓
Success → Show confirmation page
Error → Show error message, allow retry
```

---

## 📧 Email Received Format

```
From: your-configured-email@gmail.com
Subject: New Project Inquiry from [Full Name]

[Full Name]'s Project Details:
- Email: [user's email]
- Phone: [whatsapp or "Not provided"]
- Contact Preference: [email/whatsapp/call]
- Project: [description]
- References: [inspiration or "Not provided"]
- Deadline: [deadline or "Not specified"]
- Video Length: [length or "Not specified"]
- Budget: [budget or "Not specified"]
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Form won't submit | Update recipient email in ProjectForm.jsx |
| Emails not arriving | Check spam folder, verify email in code |
| Validation errors | Fill all required fields (Name, Email, Description) |
| "Something went wrong" error | Check browser console, verify .env.local exists |
| Custom cursor not working | Check CustomCursor component is imported on page |

---

## 📞 When to Update Code

**Update `ProjectForm.jsx` line 95 if:**
- [ ] You want emails sent to a different address
- [ ] You're deploying to production
- [ ] You change your email

**Update `.env.local` if:**
- [ ] You regenerate your Web3Forms key
- [ ] You want to use a different Web3Forms account

---

## ✨ Everything Included

✅ Full Web3Forms integration  
✅ Client-side form validation  
✅ Loading states  
✅ Error handling  
✅ Success confirmation  
✅ Responsive design  
✅ Dark theme styling  
✅ Animations preserved  
✅ Environment security  
✅ Production-ready code  

---

**Status:** ✅ Ready for Deployment
