# Deploy notes - V2.2.2 Hotfix

## What changed
- Restored full UI
- Converted app to self-contained index.html
- Kept home language switch and Version Log
- Kept HOA records, Before/After, Feedback, Large Text, and Report

## Files modified
- index.html
- README.md
- css/style.css
- js/app.js

## Files added
- docs/deploy-notes-v2.2.2-hotfix.md

## Files removed
- None

## GitHub upload instructions
1. Download and unzip the hotfix ZIP
2. Upload/replace files in GitHub
3. Commit to main
4. Cloudflare Pages auto-deploys

## Cloudflare impact
No build command required.

## Rollback
Restore previous known stable commit:
e2e4e0875371d68e577b88322464290d987e7516

## Validation
- Home loads with green hero
- Language buttons visible
- Version Log opens
- Records, report, feedback, compare, large text all open
