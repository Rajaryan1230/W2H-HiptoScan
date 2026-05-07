# HepatoScan AI

HepatoScan AI is now split into:

- `backend/`: Django API for Render with Postgres, token auth, Gemini analysis, and user-owned analysis history.
- `frontend/`: React/Vite app for Vercel with signup, signin, liver scan upload, report rendering, print, and JSON export.

## Backend: Render + Postgres

Required environment variables:

```bash
SECRET_KEY=replace-with-a-long-random-secret
DEBUG=False
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DBNAME
DATABASE_SSL=True
ALLOWED_HOSTS=.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
GEMINI_API_KEY=replace-with-google-gemini-key
GEMINI_VISION_MODEL=gemini-2.5-flash
GEMINI_TEXT_MODEL=gemini-2.5-pro
```

Render can use the root `render.yaml`. It creates a web service from `backend/` and a Render Postgres database.

Local backend setup:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Check the Gemini production key and model access:

```bash
python scripts/check_gemini.py
cd backend && python scripts/check_gemini.py
python scripts/check_gemini.py --models gemini-2.5-flash,gemini-2.5-pro
```

## Frontend: Vercel

Required environment variable:

```bash
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
```

Local frontend setup:

```bash
cd frontend
npm install
npm run dev
```

When importing the repo into Vercel, either set the project root to `frontend/` or use the root `vercel.json`, which builds `frontend/` and serves `frontend/dist`.

## API

- `POST /api/auth/signup/`
- `POST /api/auth/signin/`
- `POST /api/auth/signout/`
- `GET /api/auth/me/`
- `POST /api/hepato-analyze/`
- `POST /api/hepato-advice/`
- `GET /api/analyses/`

Authenticated API requests use:

```http
Authorization: Token YOUR_TOKEN
```
