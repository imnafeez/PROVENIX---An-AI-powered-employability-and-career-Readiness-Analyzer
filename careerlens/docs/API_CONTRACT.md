# Draft API Contract — CareerLens

Agree on the final contract with the backend owner before integration. Prefix routes with `/api/v1` if desired.

## Suggested endpoints
- `GET /health` — service status
- `GET /api/profile/me` — current user's profile and evidence-source status
- `PUT /api/profile/me` — update profile fields
- `POST /api/profile/resume` — upload a resume (multipart form)
- `GET /api/analysis/latest` — latest readiness analysis, score breakdown, evidence references, and caveats
- `POST /api/analysis/run` — request a new analysis
- `GET /api/roles` — role definitions and skill requirements
- `GET /api/roadmap` — personalized roadmap
- `PATCH /api/roadmap/tasks/{task_id}` — update task status
- `GET /api/placement/summary` — aggregate placement analytics, only for authorized users and privacy-safe cohorts

## Principles
- Return structured, explainable score components rather than only one number.
- Each inferred skill should include evidence references and confidence/coverage metadata.
- Distinguish `not_observed` / `insufficient_evidence` from `low_proficiency`.
- Do not expose another student's personal data in cohort analytics.
- Keep secrets, tokens, and MongoDB credentials on the backend.
- Use explicit auth and role-based authorization for student/admin routes.
