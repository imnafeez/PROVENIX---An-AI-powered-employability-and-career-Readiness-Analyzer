# CareerLens

CareerLens is an employability and career-readiness analyzer prototype.

## Run locally
1. Install Node.js (LTS).
2. Open a terminal in `frontend/`.
3. Run `npm install`
4. Run `npm run dev`

The frontend currently uses clearly labeled demo data. It is structured so the API layer can be connected to your teammate's FastAPI backend later.

## Project structure
- `frontend/`: React + TypeScript + Vite + Tailwind UI
- `docs/API_CONTRACT.md`: suggested frontend/backend contract
- `docs/SCORING_RULES.md`: explainable scoring principles

## Environment
Create `frontend/.env` from `.env.example` and set `VITE_API_BASE_URL` when the backend is ready.

## Important
- Never put MongoDB credentials in the frontend.
- The frontend should call FastAPI; FastAPI should access MongoDB.
- Do not treat missing evidence as proof that a student lacks a skill.
