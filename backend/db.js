const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

async function connectDatabase() {
  try {
    const database = await open({
      filename: process.env.RAILWAY_VOLUME_MOUNT_PATH
        ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, "booking.db")
        : path.join(__dirname, "booking.db"),
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
            'Where the neighbors know your coffee order. Wake up to canal views, bicycle bells and Stroop, the neighborhood cat who thinks he owns the place. Fun fact: Every Friday, the neighbors meet for canal side coffee. Bring a story, leave with three new friends.',
            'Double',
          '/images/amsterdam.webp'
          ),
          (
            'Nordic Hideaway',
            'Stockholm',
            'Come for the calm. Stay for the fika. Enjoy slow mornings, cozy candles and cinnamon buns from the neighbor downstairs. Fun fact: The host''s grandmother teaches guests to bake kanelbullar, but her secret ingredient remains a mystery.',
            'Single',
            '/images/stockholm.webp'
          ),
          (
            'Bosphorus Home',
            'Istanbul',
            'One cup of tea is never just one. Discover colorful streets, hidden markets and curious cats while learning Turkish over breakfast. Fun fact: The local shopkeeper teaches guests a new Turkish phrase every day.',
            'Double',
            '/images/istanbul.webp'
          ),
          (
            'The Little Loft',
            'Copenhagen',
            'A little hygge. A lot of personality. Borrow a bicycle, explore local design shops or join Sunday yoga with the neighbors. Fun fact: The community bookshelf lets you exchange stories with people you have never met.',
            'Studio',
            '/images/copenhagen.webp'
          ),
          (
            'Parisian Corner',
            'Paris',
            'Your baguette era starts here. Stay above a flower shop and discover the little cafes where locals start their mornings. Fun fact: The florist leaves a mystery flower outside your door every Monday.',
            'Double',
            '/images/paris.webp'
          ),
          (
            'Lisbon Living',
            'Lisbon',
            'Sunny mornings and a dog named Pastel. Wander through colorful streets, discover hidden viewpoints and enjoy long sunset conversations. Fun fact: Every Thursday, the neighbors host a tiny music night with guitars, pastries and questionable singing.',
            'Single',
            '/images/lisbon.webp'
          );
      `);

      console.log("6 sample stays added");
    }

    // Existing stays now offer both room types; bookings stay unchanged.
    await database.run(`
      UPDATE stays
      SET room_type = 'Single,Double'
      WHERE room_type IN ('Single', 'Double', 'Studio')
    `);

    console.log("Database is connected");
    return database;
  } catch (err) {
    console.error("Database error:", err.message);
    throw err;
  }
}

module.exports = connectDatabase;
