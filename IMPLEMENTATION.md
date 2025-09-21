FoodPort App Bundle
===================

Contents:
- foodport-app/: React frontend and Node/Express backend stubs
  - frontend: src, public, package.json
  - backend: index.js with stub endpoints, package.json
- external_original_files/: files extracted from the uploaded zip (for reuse)

How to run locally (development):
1) Backend:
   - cd foodport-app/backend
   - npm install
   - npm start
   Backend runs on http://localhost:4000

2) Frontend:
   - cd foodport-app
   - npm install
   - npm start
   Frontend runs on http://localhost:3000 and expects the backend to be available at /api/* 
   For local dev, configure a proxy in package.json or use axios baseURL.

API integration points (where to add real services):
- backend/index.js:
  - /api/pricing: replace stub with grocery pricing API or scraping logic. You can integrate
    store APIs (Walmart, Kroger) or build a scraper + cache.
  - /api/route: replace stub with Google Maps Directions API, Mapbox Directions, or a
    GTFS-based transit router (OpenTripPlanner) for accurate transit planning.
  - /api/share: connect to a database (Postgres/Mongo) and add authentication & payment handling.

- frontend/src/pages/Transit.js:
  - currently calls /api/pricing and /api/route. These are where you will point to your real backend.

Notes on making it cross-functional / production-ready:
- Use a proper authentication system (JWT or OAuth) for users.
- Persist shared lists and user profiles in a database (Postgres, MongoDB).
- Use a payments provider (Stripe) to handle fees and payouts to neighbors.
- For transit: use Google Maps Directions API (with transit mode), or Mapbox with transit tiles,
  or deploy a GTFS-based router (OpenTripPlanner) for full control.
- For pricing: negotiate or use official store APIs; consider caching and normalization of product names.
- Deploy backend to a cloud service (Heroku, Render, AWS Elastic Beanstalk, or containerize with Docker).
- Serve frontend as static files from the backend or via CDN.
