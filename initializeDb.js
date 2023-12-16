const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./hashmap.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the hashmap SQLite database.');
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS column_hashes (columnName TEXT PRIMARY KEY, hashedColumnName TEXT)", (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Table created");
        }
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});
