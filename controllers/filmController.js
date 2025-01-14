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
function show(req, res) {
    const movieId = req.params.id; 

   
    const sqlMovie = `
        SELECT movies.*, reviews.vote 
        FROM movies
        INNER JOIN reviews ON movies.id = reviews.movie_id
        WHERE movies.id = ?;
    `; 

    connection.query(sqlMovie, [movieId], (err, results) => { 
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (results.length === 0) {
         
            res.status(404).json({ error: 'Film non trovato o senza recensioni' });
            return;
        }

        const [movie] = results;

      
        res.json(movie);
    });
}



module.exports = { index, show};
