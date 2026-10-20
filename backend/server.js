const express = require("express");
const cors = require("cors");
const connectDatabase = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    const db = await connectDatabase();
    app.get("/", (req, res) => {
      res.send("Hello Loca! Server is running.");
    });

    app.get("/api/bookings", async (req, res) => {
      try {
        const bookings = await db.all("SELECT * FROM booking");

        res.json(bookings);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Could not fetch bookings" });
      }
    });

    app.get("/api/stays", async (req, res) => {
      try {
        const stays = await db.all("SELECT * FROM stays");

        res.json(stays);
      } catch (err) {
        console.error(err.message);

        res.status(500).json({
          error: "Could not fetch stays",
        });
      }
    });

    app.post("/api/bookings", async (req, res) => {
      try {
        const {
          stay_id,
          first_name,
          last_name,
          email,
          phone,
          room_type,
          check_in,
          check_out,
        } = req.body;

        // Check required fields
        if (
          !stay_id ||
          !first_name ||
          !last_name ||
          !email ||
          !room_type ||
          !check_in ||
          !check_out
        ) {
          return res.status(400).json({
            error: "Please fill in all required fields",
          });
        }

        // Check booking dates
        if (check_out <= check_in) {
          return res.status(400).json({
            error: "Check-out must be after check-in",
          });
        }

        // Save booking to SQLite
        const result = await db.run(
          `INSERT INTO booking
      (stay_id, first_name, last_name, email, phone, room_type, check_in, check_out)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            stay_id,
            first_name,
            last_name,
            email,
            phone,
            room_type,
            check_in,
            check_out,
          ],
        );

        res.status(201).json({
          message: "Booking created successfully!",
          bookingId: result.lastID,
        });
      } catch (error) {
        console.error("Booking error:", error.message);

        res.status(500).json({
          error: "Could not create booking",
        });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}

startServer();
