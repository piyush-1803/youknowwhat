# Deployment Instructions

This project is optimized for deployment on **Vercel**.

## Prerequisites
- **GitHub account**: To host your source code.
- **Vercel account**: To host the live website.
- **Supabase project**: Already initialized with the required tables.

## Steps to Deploy

### 1. Push to GitHub
If you haven't already, push your local repository to a new GitHub repository:
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Connect to Vercel
1. Log in to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New"** → **"Project"**.
3. Import your GitHub repository.

### 3. Configure Environment Variables
In the Vercel project settings, add the following **Environment Variables**:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon/Public Key.

### 4. Deploy
Click **"Deploy"**. Vercel will automatically build the project using the configuration in `vercel.json`.

---

## Site Maintenance
- **Updating Content**: Use the built-in Admin Panel at `/admin/dashboard` to add or edit projects, research, and blog posts.
- **Updating Code**: Any changes pushed to the `main` branch on GitHub will trigger an automatic redeploy on Vercel.
