const connection = require('../db/conn.js');

// Index
const index = (req, res) => {
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

module.exports = { index };
