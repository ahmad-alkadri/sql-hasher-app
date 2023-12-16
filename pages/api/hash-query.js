import { parse, deparse } from 'pgsql-parser';
import { createHash } from 'crypto';
import sqlite3 from 'sqlite3';

function sha256Hash(string) {
    return createHash('sha256').update(string).digest('hex');
};

let db = new sqlite3.Database('./hashmap.db');

async function getColumnHash(columnName) {
    return new Promise((resolve, reject) => {
        db.get("SELECT hashedColumnName FROM column_hashes WHERE columnName = ?", [columnName], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.hashedColumnName : null);
            }
        });
    });
};

async function insertColumnHash(columnName, hashedColumnName) {
    return new Promise((resolve, reject) => {
        db.run("INSERT OR REPLACE INTO column_hashes (columnName, hashedColumnName) VALUES (?, ?)", [columnName, hashedColumnName], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

async function hashAllColumnRefObjects(obj, key) {
    if (obj !== null && typeof obj === 'object') {
        for (const [k, v] of Object.entries(obj)) {
            if (k === key) {
                for (let idx = 0; idx < obj[k].fields.length; idx++) {
                    try {
                        let colNameOrig = obj[k].fields[idx].String.str;
                        let hashedColumnName = await getColumnHash(colNameOrig);
                        if (!hashedColumnName) {
                            hashedColumnName = sha256Hash(colNameOrig);
                            await insertColumnHash(colNameOrig, hashedColumnName);
                        }
                        obj[k].fields[idx].String.str = hashedColumnName;
                    } catch (error) {
                        continue;
                    }
                }
            }

            if (typeof v === 'object' || Array.isArray(v)) {
                await hashAllColumnRefObjects(v, key);
            }
        }
    }
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const queryString = req.body.query;
        let hashedQuery = '';
        try {
            const stmts = parse(queryString);
            await hashAllColumnRefObjects(stmts, 'ColumnRef');
            hashedQuery = deparse(stmts);
            res.status(200).json({ originalQuery: queryString, hashedQuery });
        } catch (error) {
            res.status(500).json({ originalQuery: queryString, hashedQuery });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
