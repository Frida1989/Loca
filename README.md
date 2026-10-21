

# loca.

### Stay local. Feel connected.

**A thoughtfully designed local-stay booking experience.**  
Discover places with personality, explore cities beyond the usual landmarks, and book your next stay in a few simple steps.

---

## More than a place to stay.

Travel feels different when a city begins to feel familiar. **Loca.** is a concept booking platform built around that idea: characterful stays, local stories, and a clear, effortless reservation flow.

Created as a full-stack school project, Loca brings together an editorial, travel-inspired interface and a practical booking system powered by React, Express, and SQLite. The focus is on making the experience feel simple for travelers while understanding how frontend interfaces communicate with a real backend and database.

## The experience

**01 — Discover**  
Browse a curated collection of six sample stays, each with a distinct personality and destination.

**02 — Choose**  
Select a stay and open a focused booking form without leaving the page.

**03 — Book**  
Enter guest details, choose a room type, and select valid check-in and check-out dates.

**04 — Feel connected**  
Submit your reservation and receive a confirmation with a booking reference returned by the backend.

## Designed with intention

- **Editorial, image-led design** — photography, expressive typography, and a warm visual identity.
- **Clarity first** — a short journey from exploring a stay to booking it.
- **Responsive foundations** — layouts designed for desktop, tablet, and mobile.
- **Accessible-minded UI** — semantic HTML, labeled fields, validation messages, and visible keyboard focus. Accessibility testing and modal keyboard behavior are still being refined.
- **Real data flow** — accommodation data and bookings are handled through a REST API, not hardcoded UI state.

## Built with

| Frontend | Backend | Data & workflow |
| --- | --- | --- |
| React | Node.js | SQLite |
| Vite | Express | REST API / `fetch()` |
| React Router | CORS | Git & GitHub |
| JavaScript & CSS | | |

## How it works

```text
Traveler
   │
   ▼
React interface
   │
   ├── GET  /api/stays ───────► Express ───► SQLite (stays)
   │
   └── POST /api/bookings ────► Express ───► SQLite (booking)
                                    │
                                    ▼
                         Booking confirmation ID
                                    │
                                    ▼
                            React confirmation
```

### Current API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/stays` | Retrieve the six sample stays |
| `POST` | `/api/bookings` | Create a booking and return its reference |
| `GET` | `/api/bookings` | Retrieve bookings (backend endpoint; admin UI is not part of the finished public experience) |

## Project structure

```text
Loca/
├── backend/
│   ├── server.js
│   ├── db.js
│   └── booking.db
└── frontend/
    ├── public/
    │   └── images/
    └── src/
        ├── Components/
        │   ├── BookingForm.jsx
        │   └── StayList.jsx
        ├── Layouts/
        │   └── Layouts.jsx
        ├── Pages/
        │   ├── App.jsx
        │   ├── App.css
        │   ├── Home.jsx
        │   ├── About.jsx
        │   ├── Confirmation.jsx
        │   └── NotFound.jsx
        └── services/
            ├── StayApi.js
            └── BookingApi.js
```

*The structure above highlights the main public-facing files; additional work-in-progress files may exist.*

## Run locally

**Requirements:** Node.js and npm.

1. Clone the repository and open it in your editor.
2. Start the backend:

   ```bash
   cd backend
   npm install
   node server.js
   ```

3. In a second terminal, start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

The frontend expects the backend on `http://localhost:5000`. The SQLite database is initialized by the backend, including sample stays when the stays table is empty.

## What I learned

Building Loca has been an opportunity to connect visual design decisions with real application behavior:

- Fetching and rendering data from an Express API in React.
- Managing component state and passing the selected stay into a booking form.
- Validating dates and collecting booking information before submission.
- Sending POST requests, persisting records in SQLite, and displaying the returned booking ID.
- Separating React components, API services, and backend responsibilities.

## Still evolving

Loca is an ongoing learning and portfolio project. Future improvements include more refined motion and accessibility, deeper booking feedback, a polished deployment, and optional booking-management features.

---

Built as a full-stack learning project with a focus on frontend development and thoughtful UX/UI.


