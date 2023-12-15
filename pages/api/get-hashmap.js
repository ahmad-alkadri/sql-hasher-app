import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('./hashmap.db');

export default function handler(req, res) {
    if (req.method === 'GET') {
        db.all("SELECT columnName, hashedColumnName FROM column_hashes", [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            const hashMap = {};
            rows.forEach(row => {
                hashMap[row.columnName] = row.hashedColumnName;
            });
            res.status(200).json(hashMap);
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
