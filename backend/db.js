const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(
    "./shopdb.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the comp database.");
    }
  );
  


// Define schema creation queries
const createItemsTable = `
    CREATE TABLE IF NOT EXISTS Items (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );
`;

const createListTable = `
    CREATE TABLE IF NOT EXISTS List (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES User(id)
    );
`;

const createListItemsTable = `
    CREATE TABLE IF NOT EXISTS List_Items (
        list_id INTEGER,
        item_id INTEGER,
        FOREIGN KEY (list_id) REFERENCES List(_id),
        FOREIGN KEY (item_id) REFERENCES Items(_id),
        PRIMARY KEY (list_id, item_id)
    );
`;


const createUserTable = `
    CREATE TABLE IF NOT EXISTS User (
        name TEXT NOT NULL,
        id TEXT PRIMARY KEY  UNIQUE,
        password TEXT NOT NULL
    );
`;

// Create tables
db.serialize(() => {
    db.run(createItemsTable);
    db.run(createListTable);
    db.run(createListItemsTable);
    db.run(createUserTable);
});

module.exports = db;
