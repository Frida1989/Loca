const express = require("express");
const cors = require("cors");
const connectDatabase = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    const db = await connectDatabase();
    app.get("/", (req, res) => {
      res.send("Hello Loca! Server is running.");
    });

    app.get("/api/bookings", async (req, res) => {
      // The school admin route is not safe to expose publicly.
      if (process.env.NODE_ENV === "production") {
        return res.status(403).json({ error: "Admin access is disabled" });
      }
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

        // Validate fields and dates before inserting data.
        if (
          typeof first_name !== "string" ||
          !first_name.trim() ||
          typeof last_name !== "string" ||
          !last_name.trim() ||
          typeof email !== "string" ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
          (phone != null && typeof phone !== "string")
        ) {
          return res
            .status(400)
            .json({ error: "Please enter valid guest details" });
        }

        const validDate = (value) => {
          if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
            return false;
          const date = new Date(value + "T12:00:00Z");
          return (
            !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
          );
        };
        const today = new Date().toLocaleDateString("sv-SE", {
          timeZone: "Europe/Stockholm",
        });
        if (
          !validDate(check_in) ||
          !validDate(check_out) ||
          check_in < today ||
          check_out <= check_in
        ) {
          return res
            .status(400)
            .json({ error: "Please choose valid booking dates" });
        }

        // Check that the stay exists and supports the room.
        const stay = await db.get("SELECT * FROM stays WHERE id = ?", [
          stay_id,
        ]);
        if (!stay) return res.status(404).json({ error: "Stay not found" });
        if (
          !["Single", "Double"].includes(room_type) ||
          !stay.room_type.split(",").includes(room_type)
        ) {
          return res
            .status(400)
            .json({ error: "Please select a valid room type" });
        }

        // Save booking to SQLite

        // Save only if the room is available
        const result = await db.run(
          `INSERT INTO booking
          (stay_id, first_name, last_name, email, phone, room_type, check_in, check_out)

          SELECT ?, ?, ?, ?, ?, ?, ?, ?
          WHERE NOT EXISTS (
            SELECT 1 FROM booking
            WHERE stay_id = ?
            AND room_type = ?
            AND check_in < ?
            AND check_out > ?
          )`,
          [
            stay_id,
            first_name,
            last_name,
            email,
            phone,
            room_type,
            check_in,
            check_out,
            stay_id,
            room_type,
            check_out,
            check_in,
          ],
        );

        // Room is already booked for these dates
        if (result.changes === 0) {
          return res.status(409).json({
            error:
              "This room is already booked for your selected dates. Please choose another room or different dates.",
          });
        }

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
