# Bermuda Lawn Care AI + HOA Log

Static HTML app optimized for middle-aged / less tech-savvy homeowners.

## Free hosting

### GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html` to the repository root.
3. Go to Settings > Pages.
4. Set Source to `Deploy from a branch`, Branch `main`, Folder `/root`.
5. Open the published Pages URL.

### Cloudflare Pages
1. Open Cloudflare Pages.
2. Create a project and upload this folder, or connect the GitHub repo.
3. No build command is required. The output directory is `/`.

## AI security note
Do not place API keys directly in this HTML file. Use a backend proxy such as Cloudflare Workers, Vercel Functions, Netlify Functions, or GitHub Pages plus a separate serverless endpoint.
