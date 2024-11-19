const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Error opening database", err);
    } else {
        console.log("Database connected");
    }
});

// Criação das tabelas, se não existirem
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        image TEXT,
        freeShipping BOOLEAN
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productId INTEGER,
        quantity INTEGER
    )`);
});

module.exports = db;
