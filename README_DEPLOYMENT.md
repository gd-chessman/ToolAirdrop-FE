# 🚀 Frontend Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended - Fastest & Easiest)

1. **Sign up**: Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. **Import Project**: Click "Add New..." → "Project"
3. **Select repo**: Choose `cypher_43_landing_page`
4. **Configure**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Environment Variables** (if needed):
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
6. **Deploy**: Click "Deploy" 🎉

**Features**:
- ✅ Auto-deploy on every push
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Preview deployments for PRs
- ✅ Zero configuration

**Cost**: Free for personal projects

**Your site will be live at**: `https://your-project.vercel.app`

---

### Option 2: Netlify

1. **Sign up**: [netlify.com](https://netlify.com)
2. **New site from Git**: Dashboard → "Add new site" → "Import an existing project"
3. **Connect GitHub**: Choose `cypher_43_landing_page`
4. **Build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 20
5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
6. **Deploy site**

**Features**:
- ✅ Auto-deploy on push
- ✅ Free SSL
- ✅ Form handling
- ✅ Serverless functions

**Cost**: Free tier available

---

### Option 3: GitHub Pages

1. **Update `vite.config.js`**:
   ```javascript
   export default defineConfig({
     base: '/cypher_43_landing_page/', // Your repo name
     // ... rest of config
   })
   ```

2. **Create deploy workflow** (already created in `.github/workflows/deploy-gh-pages.yml`):

3. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: GitHub Actions
   - Save

4. **Push to main**: Workflow will auto-deploy

**Your site will be live at**: `https://yourusername.github.io/cypher_43_landing_page/`

**Cost**: Free

---

### Option 4: Cloudflare Pages

1. **Sign up**: [pages.cloudflare.com](https://pages.cloudflare.com)
2. **Create project**: Connect GitHub
3. **Build settings**:
   - **Framework**: Vite
   - **Build command**: `npm run build`
   - **Build output**: `dist`
4. **Environment Variables**: Add if needed
5. **Save and Deploy**

**Features**:
- ✅ Unlimited bandwidth
- ✅ Fast global CDN
- ✅ Free SSL

**Cost**: Free

---

## CI/CD Setup

### GitHub Actions (Already configured!)

Every push to `main` or `master`:
1. ✅ Dependencies installed
2. ✅ Production build created
3. ✅ Build artifacts uploaded
4. ✅ Bundle size analyzed

---

## Environment Variables

Create `.env.production` file (don't commit this!):

```env
VITE_API_URL=https://your-backend-url.com
VITE_APP_NAME=Cypher43
```

Then add these to your deployment platform's environment variables.

---

## Build Optimization

Your build is already optimized with:
- ✅ Vite for fast builds
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization

---

## Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

---

## Performance Tips

1. **Enable Compression**: Most platforms do this automatically
2. **Use CDN**: Vercel, Netlify, Cloudflare all include CDN
3. **Cache Assets**: Already configured in `vercel.json`
4. **Lazy Load Routes**: Use Vue Router lazy loading

---

## Monitoring

After deployment:
- **Vercel**: Analytics dashboard (free)
- **Netlify**: Analytics (paid)
- **Google Analytics**: Add to your app
- **Lighthouse**: Test performance

---

## Troubleshooting

### Build fails?
- Check Node version (should be 20+)
- Verify all dependencies are in `package.json`
- Check build logs for errors

### Blank page after deploy?
- Check browser console for errors
- Verify `base` path in `vite.config.js`
- Check API URL environment variable

### Routes not working?
- Ensure SPA fallback is configured (already in `vercel.json`)
- For Netlify, create `_redirects` file:
  ```
  /*    /index.html   200
  ```

---

## Quick Start Commands

```bash
# Local development
npm run dev

# Production build (test locally)
npm run build
npm run preview

# Deploy to Vercel (using CLI)
npm install -g vercel
vercel --prod
```

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev/guide/static-deploy.html
