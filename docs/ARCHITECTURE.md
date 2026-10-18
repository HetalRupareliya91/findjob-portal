# Job Portal System - Architecture

A complete job portal made of three apps that share one REST API.

| App        | Folder      | Stack                          | Port |
|------------|-------------|--------------------------------|------|
| API        | `backend/`  | Node.js, Express, MongoDB      | 5000 |
| Website    | `frontend/` | React, Vite, React Router      | 5173 |
| Admin      | `admin/`    | React, Vite, React Router      | 5174 |

The website and the admin panel are fully responsive (mobile view) through the
`*.mobile.css` stylesheets, mobile card components and collapsible menus.

## Backend layout

Each feature (jobs, companies, applications, interviews ...) follows the same layers:

- `models/` - Mongoose schema
- `validators/` - request validation
- `services/` - database logic (pagination, search)
- `controllers/` - HTTP handlers
- `routes/` - Express router, auto-mounted by `src/app.js`

Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` (JWT).
Writes need a token; deletes need an `admin` role.

## Frontend layout

- `src/api/` - one API client per feature
- `src/components/<Feature>/` - card, mobile card and form
- `src/pages/<Feature>/` - list and detail pages, auto-registered in `App.jsx`

## Admin layout

- `src/pages/<Feature>Management.jsx` - auto-added to the sidebar
- `src/components/<Feature>Table.jsx` - data tables

## Running locally

```bash
# API
cd backend && cp .env.example .env && npm install && npm run dev

# Website
cd frontend && npm install && npm run dev

# Admin panel
cd admin && npm install && npm run dev

# Tests
cd backend && npm test
```

To create an admin, register a normal user and set its `role` to `admin` in MongoDB:

```js
db.users.updateOne({ email: 'you@example.com' }, { $set: { role: 'admin' } })
```
