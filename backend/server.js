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

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}

startServer();
