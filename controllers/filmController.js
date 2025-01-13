const connection = require('../db/conn.js');

// Index
function index  (req, res)  {
    const sql = 'SELECT * FROM movies';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};
// show
function show(req, res) {
    const movieId = req.params.id; 

    const sqlMovie = 'SELECT * FROM movies WHERE id = ?'; 

    
    connection.query(sqlMovie, [movieId], (err, results) => { 
        if (err) {
            
            res.status(500).json({ error: err.message });
            return;
        }

        if (results.length === 0) {
            // Risposta se il film non viene trovato
            res.status(404).json({ error: 'Film non trovato' });
            return;
        }

        
        const [movie] = results;

        
        res.json(movie);
    });
}


module.exports = { index, show};
