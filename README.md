# Loca.

### Stay local. Feel connected.

Loca is a full-stack booking website I built as a school project and later continued improving for my portfolio.

The idea was to create a simple place where users can explore stays in different cities and make a reservation.

I wanted to focus on the design and user experience, while also learning how to connect a React frontend to a backend and database.

## Live Demo

Loca is live and available to explore.

🌐 [View Live Website](https://loca-stays.netlify.app/)

This is a portfolio project for demonstration purposes.
No real accommodation bookings are made.
Please use fictional contact details when testing.

## What you can do

- Explore six stays in different cities.
- View photos and descriptions of each stay.
- Select a stay and open a booking form.
- Choose between Single and Double rooms.
- Enter guest details and select check-in and check-out dates.
- Get a booking confirmation with a reference number.
- Use the website on desktop and mobile.

The booking form checks that the dates are valid. The backend also checks room availability to help prevent double bookings.

## Admin Dashboard

I also built a simple admin page to manage reservations.

The admin page is available locally through a separate route:

`/admin-secret-bookings`

From this page, I can:

- View all bookings, including the guest, stay, city, room type and dates.
- Edit the room type and booking dates.
- Delete a booking.

The admin dashboard works with the local Express API
and SQLite database during development.

In production, booking creation is available,
but admin endpoints are disabled for security reasons.

**A note about security:** The admin page is not linked in the public navigation. Since I haven't added authentication, the admin booking endpoints (GET, PUT and DELETE) are disabled in production. The admin features are intended for local use only.

## Tech Stack

**Frontend**
- React
- JavaScript
- Vite
- React Router
- CSS

**Backend**
- Node.js
- Express
- REST API

**Database**
- SQLite

**Tools**
- VS Code
- Git & GitHub
- Postman
- 
- **Deployment**
- Netlify – Frontend
- Railway – Backend
- Railway Volume – Persistent SQLite database storage

## How It Works

1. React fetches the available stays from the backend.
2. The user selects a stay and fills in the booking form.
3. The form sends a POST request to the Express API.
4. The backend validates the booking and saves it in SQLite if the room is available.
5. React displays the booking confirmation and reference number.

The admin page also communicates with the backend to retrieve, update and delete bookings.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/stays` | Get all stays |
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings` | View all bookings (local admin) |
| PUT | `/api/bookings/:id` | Update a booking (local admin) |
| DELETE | `/api/bookings/:id` | Delete a booking (local admin) |

## Run Locally

You need Node.js and npm installed.

**1. Clone the repository**

```bash
git clone https://github.com/Frida1989/Loca.git
cd Loca
```

**2. Start the backend**

Open a terminal:

```bash
cd backend
npm install
node server.js
```

The backend runs on `http://localhost:5000`.

The SQLite database is initialized locally, with sample stays added when the stays table is empty.

**3. Start the frontend**

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## What I Learned

This project helped me understand how the frontend, backend and database work together.

Some of the things I practiced:

- Working with React components, props and state.
- Fetching data from an API and displaying it in React.
- Building forms and validating user input.
- Sending GET, POST, PUT and DELETE requests.
- Saving and updating data in SQLite.
- Handling errors and displaying booking confirmations.
- Improving responsive design and typography.
- Using Git branches and GitHub to manage my project.

One of the most interesting parts was seeing how a booking made in the frontend could be saved in the database and then displayed on a separate admin page.

## Future Improvements

There are still things I would like to work on:

- Improve accessibility and keyboard interaction.
- Add authentication to the admin dashboard.
- Add email booking confirmations.


---

Made with ♥ by Frida Pakdaman
