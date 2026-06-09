# Tally Form Integration Setup Guide

## Step 1: Create Your Tally Form

1. Go to [tally.so](https://tally.so)
2. Sign up / Log in
3. Click **+ New Form**
4. Name it: "Book a Project – Cinova Visuals"

## Step 2: Add Form Fields

Create these fields **in this exact order**:

### 1. Full Name
- **Type:** Text
- **Label:** Full Name
- **Placeholder:** Jane Doe
- **Required:** Yes

### 2. Email
- **Type:** Email
- **Label:** Email
- **Placeholder:** you@company.com
- **Required:** Yes

### 3. WhatsApp Number
- **Type:** Phone Number (or Text)
- **Label:** WhatsApp number
- **Placeholder:** +1 555 123 4567
- **Required:** No

### 4. Preferred Contact Method
- **Type:** Multiple Choice
- **Label:** Preferred contact method
- **Options:** 
  - Email
  - WhatsApp
  - Instagram DM
- **Required:** Yes
- **Display as:** Buttons

### 5. Project Description
- **Type:** Long Text
- **Label:** Project description
- **Placeholder:** Tell me what you're building and what you need.
- **Required:** Yes

### 6. Inspiration & References
- **Type:** Long Text
- **Label:** Inspiration & references
- **Placeholder:** Paste links to videos or styles you like.
- **Required:** No

### 7. Deadline
- **Type:** Multiple Choice
- **Label:** Deadline
- **Options:**
  - ASAP (rush fee may apply)
  - Within 1-2 weeks
  - No rush, flexible
- **Required:** Yes
- **Display as:** Buttons

### 8. Video Length
- **Type:** Multiple Choice
- **Label:** Video length
- **Options:**
  - 5–10s
  - 10–20s
  - 20–40s
  - 40–60s
  - 60+s
- **Required:** Yes
- **Display as:** Buttons

### 9. Budget
- **Type:** Dropdown Select
- **Label:** Budget
- **Options:**
  - $300–$600
  - $600–$1,200
  - $1,200–$2,500
  - $2,500–$5,000
  - $5,000+
  - Not sure yet
- **Required:** Yes

## Step 3: Configure Tally Settings

### Enable Email Notifications
1. In your Tally form, click **Settings** (gear icon)
2. Go to **Notifications**
3. Enable "Email me on every new submission"
4. Enter your Gmail: **cinovavisuals48@gmail.com**

### Get Your Form Embed Code
1. Click **Embed & Share** button
2. Copy your **Form URL** (looks like: `https://tally.so/r/xxxxx`)
3. Save this URL — you'll need it in Step 4

### Optional: Customize Branding
1. In **Settings → Branding**
   - **Logo:** Add your Cinova Visuals logo
   - **Colors:** Set to match your blue accent (#3b82f6)
   - **Font:** Keep system default or choose "Plus Jakarta Sans"

## Step 4: Add Form URL to Your Code

In `src/components/ProjectForm.jsx`, you'll see this line:
```jsx
const TALLY_FORM_URL = 'https://tally.so/r/YOUR_FORM_ID_HERE'
```

Replace `YOUR_FORM_ID_HERE` with your actual Tally form URL from Step 3.

---

## Done! ✨

Your form is now live and:
- ✅ Submissions are stored in Tally dashboard
- ✅ You receive email notifications on every submission
- ✅ The form maintains your dark theme and styling
- ✅ Fully responsive on desktop and mobile
- ✅ All backend code has been removed

### After Setup
- Check your Tally dashboard at [tally.so](https://tally.so) for all submissions
- All emails will go to cinovavisuals48@gmail.com
