# LawnCare

Live site: https://lawncare-sj4.pages.dev/

LawnCare is a simple Bermuda lawn care helper for homeowners who want clear daily guidance and HOA-ready records.

## Current product direction

The live product is non-AI first. It is designed for middle-aged or less tech-savvy homeowners who need large buttons, simple navigation, clear daily tasks, and reliable proof of lawn-care progress.

Primary user goal:

> Tell me what to do, help me record proof, and make it easy to explain progress to the HOA.

## Live features

- Four-action home screen
  - Today's Task
  - Weed / Lawn Problem Guide
  - Add HOA Record
  - Export HOA Report
- Manual weed and lawn issue checklist
- Bermuda lawn monthly care plan
- Product guidance without photo automation
- Local HOA care log
- Optional photo evidence per record
- Print-friendly HOA report
- Senior-friendly large-touch UI
- Large-text mode

## Product / UX decisions

Unfinished AI-facing functions were removed from the public UI and saved here as next-stage ideas.

The current app replaces those ideas with stable non-AI workflows:

1. What should I do today?
   - Month-based tasks
   - One-tap completion logging

2. What problem am I seeing?
   - Manual symptom checklist
   - Clear what-to-look-for and what-to-do-next guidance

3. How do I prove progress to HOA?
   - Date, action, product, location, notes, rating, and optional photos

4. How do I share it?
   - Browser print / save PDF
   - Copyable HOA progress summary

## Next stage / good-to-have AI roadmap

These features should be added only after a secure backend exists:

1. AI weed photo recognition
   - Take a photo
   - Identify likely weed name and confidence
   - Recommend next steps
   - Save result to HOA log

2. AI lawn disease detection
   - Brown patch
   - Drought stress
   - Scalping
   - Drainage issues
   - Nutrient deficiency

3. AI lawn coach chat
   - Simple Q&A for Bermuda lawn care
   - Uses location, season, lawn type, and care history

4. Smart product recommendation engine
   - Recommend treatment options based on season, weed type, Bermuda safety, and product-label constraints

5. HOA-ready AI summary
   - Convert logs and photos into a concise explanation of progress

## Future architecture

Recommended later stack:

- Frontend: Cloudflare Pages
- Backend: Cloudflare Workers
- Database: Supabase
- Photo storage: Supabase Storage or Cloudflare R2
- Vision/chat model access through the backend only

## Repository structure

```text
LawnCare/
├── index.html
├── css/style.css
├── js/app.js
├── docs/roadmap.md
├── docs/deploy-notes-2026-06-12.md
└── README.md
```

## Hosting

Cloudflare Pages settings:

```text
Framework preset: None
Build command: blank
Build output directory: /
```
