import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('./hashmap.db');

/**
 * The function handles a DELETE request to delete all entries from a database
 * table, and returns a success message if the deletion is successful.
 * @param req - The `req` parameter represents the HTTP request object, which
 * contains information about the incoming request such as the request method,
 * headers, and body.
 * @param res - The `res` parameter is the response object that is used to send
 * the response back to the client. It has methods like `status()` to set the
 * HTTP status code, `json()` to send a JSON response, and `send()` to send a
 * plain text response.
 */
export default function handler(req, res) {
    if (req.method === 'DELETE') {
        db.run("DELETE FROM column_hashes", (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ message: 'All entries deleted successfully' });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
