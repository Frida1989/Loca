const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

async function connectDatabase() {
  try {
    const database = await open({
      filename: path.join(__dirname, "booking.db"),
      driver: sqlite3.Database,
    });

    await database.run("PRAGMA foreign_keys = ON");

    await database.run(`
      CREATE TABLE IF NOT EXISTS booking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stay_id INTEGER REFERENCES stays(id),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        room_type TEXT NOT NULL,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL
      )
        
    `);

    await database.run(`
  CREATE TABLE IF NOT EXISTS stays (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    description TEXT,
    room_type TEXT NOT NULL,
    image_url TEXT
  )
`);

    const result = await database.get("SELECT COUNT(*) AS count FROM stays");

    if (result.count === 0) {
      await database.exec(`
    INSERT INTO stays (name, city, description, room_type, image_url)
    VALUES
      (
        'Canal House',
        'Amsterdam',
        'Wake up near the canals and experience local Amsterdam life.',
        'Double',
        '/images/amsterdam.jpg'
      ),
      (
        'Nordic Hideaway',
        'Stockholm',
        'A peaceful Scandinavian home close to local cafes and city life.',
        'Single',
        '/images/stockholm.jpg'
      ),
      (
        'Bosphorus Home',
        'Istanbul',
        'Discover Istanbul through a warm and welcoming local home.',
        'Double',
        '/images/istanbul.jpg'
      ),
      (
        'The Little Loft',
        'Copenhagen',
        'Explore Copenhagen from a cozy loft in a creative neighborhood.',
        'Studio',
        '/images/copenhagen.jpg'
      ),
      (
        'Parisian Corner',
        'Paris',
        'Enjoy a charming stay surrounded by Parisian streets and cafes.',
        'Double',
        '/images/paris.jpg'
      ),
      (
        'Lisbon Living',
        'Lisbon',
        'Experience colorful streets and relaxed local life in Lisbon.',
        'Single',
        '/images/lisbon.jpg'
      );
  `);

      console.log("6 sample stays added");
    }

    console.log("Database is connected");
    return database;
  } catch (err) {
    console.error("Database error:", err.message);
    throw err;
  }
}

module.exports = connectDatabase;
