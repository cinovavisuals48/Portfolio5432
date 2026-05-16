// ─────────────────────────────────────────────────────────────
// PROJECT DATA — src/data/projects.js
// ─────────────────────────────────────────────────────────────
// 
// HOW TO ADD A NEW PROJECT:
// 1. Copy one of the project objects below
// 2. Paste it at the end (before the closing bracket)
// 3. Update all the fields with your project info
// 4. Add your thumbnail image to: public/thumbnails/
// 5. Save this file - your project will appear automatically!
//
// ─────────────────────────────────────────────────────────────
//
// HOW TO CHANGE/ADD THUMBNAILS:
// ─────────────────────────────────────────────────────────────
// 1. Create your thumbnail image (recommended: 1920x1080 or 1280x720, JPG/PNG)
// 2. Save it to the folder: public/thumbnails/
//    - Name it something descriptive like: my-project-name.jpg
// 3. Update the 'thumbnailUrl' field for your project below:
//    - Example: thumbnailUrl: '/thumbnails/my-project-name.jpg'
// 4. The thumbnail will appear on the project card with a play button overlay
//
// TIPS:
// - Use 16:9 aspect ratio for best display
// - Keep file size under 500KB for fast loading
// - Use descriptive names that match your project ID
// - JPG is recommended for photos, PNG for graphics with transparency
//
// ─────────────────────────────────────────────────────────────

export const projects = [
  {
    // UNIQUE ID - Use lowercase, no spaces (use dashes instead)
    id: 'gemini',
    
    // PROJECT TITLE - What you want to call this project
    title: 'Gemini',
    
    // CATEGORY - One of: 'SaaS Explainer', 'UI Animation', 'Product Launch', 'Concept Spec', 'Motion System'
    category: 'SaaS Explainer',
    
    // DESCRIPTION - 1-2 sentences about the project
    description: 'A motion concept for Gemini guided learning exploring how AI can make learning feel more interactive and intuitive. Showcasing smooth transitions and micro-interactions that guide users through complex information.',
    
    // VIDEO URL - Your Vimeo embed URL (get this from Vimeo share > embed)
    videoEmbedUrl: 'https://player.vimeo.com/video/1190775920',
    
    // THUMBNAIL - Path to your thumbnail image in public/thumbnails/
    // Example: '/thumbnails/my-project.jpg' or '/thumbnails/my-project.png'
    // Leave empty '' to use default placeholder
    thumbnailUrl: '/thumbnails/gemini.jpg',
    
    // TAGS - 2-3 short tags describing the work
    tags: ['Product Explainer', 'SaaS', 'UI Animation'],
  },
  {
    id: 'feedbask',
    title: 'Feedbask',
    category: 'Concept Spec',
    description: 'A spec explainer made for Feedbask A platform that helps businesses collect and manage customer feedback in one place. Focused on explaining the product features in a simple and visually clear way through motion design. Used UI animations and smooth transitions to make the workflow easy to understand. The goal was to keep the visuals modern engaging and easy to follow while showing how users can collect feedback track ideas and improve products more efficiently',
    videoEmbedUrl: 'https://player.vimeo.com/video/1191850183',
    thumbnailUrl: '/thumbnails/feedbask.jpg',
    tags: ['Product Explainer', 'SaaS', 'UI Animation'],
  },
  {
    id: 'uber',
    title: 'Uber',
    category: 'SaaS Explainer',
    description: 'A motion conceept for Uber that takes users through the process of booking a ride. The animation focussed on smooth tranisitions and app ui interations to make the experience feel intuitive and engageing. The goal was to show how the app simplifies the process of getting from poing A to point B while highlighting key features.',
    videoEmbedUrl: 'https://player.vimeo.com/video/1191852242',
    thumbnailUrl: '/thumbnails/uber.jpg',
    tags: ['UI Animation'],
  },
  {
    id: 'apple-music',
    title: 'Apple music',
    category: 'UI Animation',
    shortUiAnimation: true,
    description: 'A short ui animation made for apple music. Focussed on showcasing the smooth transitions.',
    videoEmbedUrl: 'https://player.vimeo.com/video/1191975722',
    thumbnailUrl: '/thumbnails/apple.jpg',
    aspectRatio: '1 / 1',
    tags: ['UI Animation'],
  },
{
    id: 'dropbox',
    title: 'Drop-Box',
    category: 'UI Animation',
    shortUiAnimation: true,
    description: 'A short ui animation made for dropbox. Focussed on showcasing smooth transitions.',
    videoEmbedUrl: 'https://player.vimeo.com/video/1192225465',
    thumbnailUrl: '/thumbnails/dropbox.jpg',
    aspectRatio: '1 / 1',
    tags: ['UI Animation'],
  },
  {
    id: 'instagram',
    title: 'Instagram',
    category: 'UI Animation',
    shortUiAnimation: true,
    description: 'A short ui animation made for instagram. Focussed on showcasing smooth tranisitions.',
    videoEmbedUrl: 'https://player.vimeo.com/video/1192225464',
    thumbnailUrl: '/thumbnails/instagram.jpg',
    aspectRatio: '1 / 1',
    tags: ['UI Animation'],
  },
  // ─────────────────────────────────────────────────────────────
  // ADD YOUR NEW PROJECTS BELOW (copy the template):
  // ─────────────────────────────────────────────────────────────
  //
  // {
  //   id: 'your-project-id',
  //   title: 'Your Project Title',
  //   category: 'SaaS Explainer',
  //   description: 'Describe your project in 1-2 sentences.',
  //   videoEmbedUrl: 'https://player.vimeo.com/video/YOUR_VIDEO_ID',
  //   thumbnailUrl: '/thumbnails/your-thumbnail.jpg',
  //   aspectRatio: '1 / 1', // Optional: use this for square or custom video ratios
  //   tags: ['Tag 1', 'Tag 2', 'Tag 3'],
  // },
  //
  // ─────────────────────────────────────────────────────────────
]

// Get first 3 projects for homepage featured section
export const featuredProjects = projects.slice(0, 3)

// Available categories for filtering (if you add filtering later)
export const categories = [
  'All',
  'SaaS Explainer',
  'UI Animation',
  'Product Launch',
  'Concept Spec',
  'Motion System',
]
