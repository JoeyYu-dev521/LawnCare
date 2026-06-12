# Deploy notes - V2.2.1

## What changed

- Moved Chinese / English language switch to the front page
- Added a Version Log page
- Added browser-plugin-style release timeline cards
- Added latest-release highlight card to the home page
- Updated README and roadmap

## Files modified

- index.html
- css/style.css
- js/app.js
- README.md
- docs/roadmap.md

## Files added

- docs/deploy-notes-v2.2.1.md

## Files removed

- None

## GitHub upload instructions

1. Download and unzip `LawnCare-V2.2.1-DEPLOY.zip`
2. Upload/replace the files in the repository root
3. Commit changes to `main`
4. Cloudflare Pages will auto-deploy

## Cloudflare impact

No build command is required.

```text
Framework preset: None
Build command: blank
Build output directory: /
```

## Rollback instructions

Use GitHub commit history to restore the previous V2.2 commit, or restore from the prior deployment ZIP.

Known prior V2.2 commit from GitHub MCP inspection:

```text
e2e4e0875371d68e577b88322464290d987e7516
```

## Post-deployment validation checklist

- [ ] Home page loads
- [ ] Chinese / English buttons are visible on the home page
- [ ] Language switch changes text immediately
- [ ] Version Log page opens
- [ ] Release cards show V2.2.1, V2.2, V2.1, and V2.0
- [ ] HOA report still works
- [ ] Feedback page still works
- [ ] Before / After comparison still works
- [ ] Large text switch still works
