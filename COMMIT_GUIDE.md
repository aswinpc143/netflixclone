# Git Setup and Commit Guide

## 🚀 Quick Setup Commands

Run these commands in your terminal to set up Git and commit your Netflix clone:

### 1. Initialize Git Repository
```bash
git init
```

### 2. Add Remote Repository
```bash
# Replace with your actual repository URL
git remote add origin https://github.com/yourusername/netflix-clone.git
```

### 3. Add All Files
```bash
git add .
```

### 4. Create Initial Commit
```bash
git commit -m "🎬 Initial commit: Netflix clone with Supabase integration

✨ Features:
- User authentication with Supabase
- Movie browsing with TMDB API
- Personal watchlist (My List)
- Viewing history tracking
- Responsive design for all devices
- Real-time data synchronization

🔧 Tech Stack:
- React 17 with Context API
- Supabase (PostgreSQL, Auth, Real-time)
- TMDB API for movie data
- CSS3 with responsive design
- YouTube integration for trailers

🗄️ Database:
- Row Level Security (RLS) policies
- 4 tables: profiles, my_list, viewing_history, user_preferences
- Optimized indexes and triggers
- Secure user data isolation

🎯 Ready for deployment on Netlify"
```

### 5. Push to Repository
```bash
# For first push
git push -u origin main

# Or if using master branch
git push -u origin master
```

## 📋 Alternative: Step-by-Step Commands

If you prefer to do it step by step:

```bash
# 1. Check Git status
git status

# 2. Add specific files (optional)
git add src/
git add package.json
git add README.md
git add supabase/

# 3. Check what will be committed
git status

# 4. Commit with detailed message
git commit -m "Add Netflix clone with Supabase backend"

# 5. Push to remote
git push origin main
```

## 🔧 Environment Setup Reminder

Before pushing, make sure to:

1. **Create `.env` file** (not committed to Git):
```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_TMDB_API_KEY=aa265ea31f232b711d8d52fde4679400
```

2. **Set up Supabase project** and run the migration

3. **Test the application** locally before pushing

## 📝 Commit Message Templates

For future commits, use these templates:

### Feature Addition
```bash
git commit -m "✨ Add [feature name]

- Description of what was added
- Any breaking changes
- Related issue numbers"
```

### Bug Fix
```bash
git commit -m "🐛 Fix [bug description]

- What was broken
- How it was fixed
- Affected components"
```

### UI/UX Improvements
```bash
git commit -m "💄 Improve [component] styling

- What was changed
- Responsive improvements
- Browser compatibility"
```

### Performance
```bash
git commit -m "⚡ Optimize [component/feature]

- Performance improvements
- Load time reductions
- Memory optimizations"
```

## 🚀 Deployment

After pushing to Git, you can deploy to Netlify:

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

## 📚 Next Steps

1. Set up CI/CD pipeline
2. Add testing framework
3. Implement error monitoring
4. Add analytics tracking
5. Optimize for SEO