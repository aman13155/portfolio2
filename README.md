# Aman – Portfolio

React + Vite portfolio with scroll-driven scenes, a canvas background and mouse animations.

## Run locally
```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # test the production build
```

## Deploy
- **Vercel:** push to GitHub, import the repo at vercel.com. Framework: Vite (build `npm run build`, output `dist`).
- **Netlify:** push to GitHub, add a new site. Build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** push to `main`, then Settings > Pages > Source: GitHub Actions. The included workflow builds and publishes automatically.

## Edit content
- `src/data.js`: links, skills, projects, certificates
- `src/assets/aman.jpg`: your photo
- `src/styles.css`: colors (CSS variables at the top) and layout
