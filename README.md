# Cinova Visuals Portfolio

A simple portfolio website for motion design work built with Next.js, Tailwind CSS, and Framer Motion.

---

## What This README Covers

This guide shows you how to:
- Add a new project
- Update the homepage featured projects
- Change social links, colors, and logo
- Fix common issues quickly

If you want to make the main changes, follow the steps below.

---

## 1. Add a New Project

### Step 1: Add the thumbnail image

1. Create a thumbnail image for the project.
   - Recommended size: `1920x1080` (16:9 ratio)
   - Format: `.jpg`, `.png`, or `.webp`
2. Name it with dashes, no spaces, for example: `my-project.jpg`
3. Place the file in `public/thumbnails/`

### Step 2: Add the project data

1. Open `src/data/projects.js`
2. Find the project list array
3. Add a new object using this template:

```javascript
{
  id: 'your-project-id',
  title: 'Your Project Title',
  category: 'SaaS Explainer',
  description: 'A short description of the project.',
  videoEmbedUrl: 'https://player.vimeo.com/video/YOUR_VIDEO_ID',
  thumbnailUrl: '/thumbnails/your-thumbnail.jpg',
  tags: ['SaaS', 'Explainer', 'Motion'],
},
```

### Fields explained

| Field | What it means | Example |
|---|---|---|
| `id` | Unique identifier, lowercase, no spaces | `acme-explainer` |
| `title` | Project name shown on the site | `Acme SaaS Explainer` |
| `category` | Display category | `SaaS Explainer` |
| `description` | Short summary of the work | `A launch video for Acme's onboarding product.` |
| `videoEmbedUrl` | Vimeo or YouTube embed URL | `https://player.vimeo.com/video/123456789` |
| `thumbnailUrl` | Path to thumbnail image | `/thumbnails/acme-explainer.jpg` |
| `aspectRatio` | Optional video ratio; use `1 / 1` for square videos | `1 / 1` |
| `tags` | Project keywords | `['SaaS', 'Landing Page', 'Demo']` |

If your video is square or non-standard, add an optional `aspectRatio` field to the object, for example:

```javascript
aspectRatio: '1 / 1',
```

### Save and check
- Save `src/data/projects.js`
- Refresh the site
- The new project should appear automatically.

---

## 2. Make a Project Featured on the Homepage

The homepage shows the first 3 featured projects from `featuredProjects`.

### Option A: Add a new project to the featured list
- Open `src/data/projects.js`
- Add your project object to the top of the `featuredProjects` array

### Option B: Reorder featured projects
- Move the objects inside `featuredProjects`
- The first 3 items in the array appear on the homepage

---

## 3. Update the Project List Page

All projects are shown on the Projects page.

To change what appears there:
- Edit `src/data/projects.js`
- Add, remove, or update project entries
- Save the file and refresh the page

---

## 4. Update Social Links

Edit `src/data/links.js` and replace placeholder URLs with your own:

```javascript
export const links = {
  instagram: 'https://www.instagram.com/YOUR_HANDLE/',
  twitter: 'https://x.com/YOUR_HANDLE',
  bookCall: 'https://cal.com/YOUR_LINK',
}
```

---

## 5. Change the Brand Logo

Replace the logo file here:

- `public/images/cinova-logo.png`

Use a transparent PNG or optimized image with a similar name.

---

## 6. Change Colors and Text Styles

Open `src/app/globals.css` and adjust the variables under `:root`.

Example:

```css
:root {
  --accent-blue: #3b82f6;
  --bg-primary: #0a0a0a;
  --text-primary: #f8fafc;
}
```

---

## 7. Fix Common Problems

### Thumbnail missing
- Confirm the file is in `public/thumbnails/`
- Confirm `thumbnailUrl` matches exactly
- Use `/thumbnails/your-image.jpg`

### Video does not load
- Use embed URLs only
- Vimeo: `https://player.vimeo.com/video/YOUR_VIDEO_ID`
- YouTube: `https://www.youtube.com/embed/YOUR_VIDEO_ID`

### Project not showing up
- Ensure `id` is unique
- Ensure object commas are correct
- Save the file after editing

---

## 8. Run the Site Locally

Use these commands from the project root:

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:3000
```

---

## 9. Deploying

For Vercel deployment:
1. Push to GitHub
2. Connect the repo on Vercel
3. Deploy
4. Future pushes update automatically

---

## Project Files You Will Edit Most Often

- `src/data/projects.js` — add/remove/update projects
- `src/data/links.js` — social and contact links
- `public/thumbnails/` — project preview images
- `src/app/globals.css` — colors and styles
- `public/images/cinova-logo.png` — logo image

---

## Quick Start Checklist

- [ ] Add thumbnail to `public/thumbnails/`
- [ ] Add project object to `src/data/projects.js`
- [ ] Use the correct embed URL format
- [ ] Save and refresh the site
- [ ] Update social links in `src/data/links.js`

---

## Need Help?

1. Check browser console: right-click > Inspect > Console
2. Confirm file paths are exact
3. Ensure JavaScript objects have proper commas

Built to showcase motion design work clearly and easily.

