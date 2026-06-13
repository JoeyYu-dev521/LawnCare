# Deploy notes - V2.3

## What changed
- Added 6 Week Roadmap page
- Added Insights page for feedback, care records, weekly summaries, and action items
- Added Weekly Summary page with history trace-back
- Updated HOA report to include plan progress and weekly summaries
- Updated Version Log
- Kept self-contained index.html pattern for deployment safety

## Files modified
- index.html
- README.md
- css/style.css
- js/app.js

## Files added
- docs/deploy-notes-v2.3.md

## Files removed
- None

## GitHub upload instructions
1. Download and unzip `LawnCare-V2.3-DEPLOY.zip`
2. Upload/replace included files in GitHub
3. Commit to `main`
4. Cloudflare Pages auto-deploys

## Cloudflare impact
No build command required.

## Rollback
Restore prior hotfix package or previous commit from GitHub history.

## Validation checklist
- Home page loads with green hero
- 6 Week Plan page opens
- Generate 6-week plan works
- Mark week done works
- Insights page summarizes feedback/records/weeklies
- Weekly Summary save works
- HOA report includes plan progress
- Version Log shows V2.3
- Language switch works
- Large text switch works
