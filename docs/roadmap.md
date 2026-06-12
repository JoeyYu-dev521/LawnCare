# LawnCare Roadmap

## Version 2.0 - Stable non-AI homeowner workflow

Goals:

- Remove unfinished AI interactions from the live app
- Make the app usable for a middle-aged / less tech-savvy homeowner
- Prioritize HOA evidence over feature volume
- Keep the live product stable and explainable

Live UX:

- Four-action home screen
- Manual problem guide
- Month-based task prompts
- One-tap task completion logging
- HOA report view
- Large-text mode
- Mobile bottom navigation

## Version 2.1 - Better record keeping

Good next improvements:

- Better print layout
- Import backup file
- Before / after photo comparison
- Filter by front yard / back yard
- English / Chinese language toggle
- Calendar reminders

## Version 2.2 - Cloud sync

Possible stack:

- Supabase Auth
- Supabase Database
- Supabase Storage or Cloudflare R2

Purpose:

- Sync records across phone, tablet, and laptop
- Prevent local browser data loss
- Make HOA reporting more reliable

## Version 3.0 - AI features

Only after a backend is available:

- AI weed recognition
- AI disease detection
- AI chat coach
- AI HOA summary
- Smart treatment/product recommendations

Security rule:

- Model credentials must live in the backend, not in browser code.
