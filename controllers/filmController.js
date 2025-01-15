const connection = require("../db/conn.js");

// Index: Recupera tutti i film
function index(req, res) {
  const sql = "SELECT * FROM movies";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
}

// Show: Recupera un film specifico con le recensioni
function show(req, res) {
  const movieId = req.params.id;

  const sqlMovie = `
    SELECT 
      id,
      title,
      director,
      genre,
      release_year
    FROM movies
    WHERE id = ?`;

  const sqlReviews = `
    SELECT 
      reviews.id AS review_id,
      reviews.name,
      reviews.text,
      reviews.vote
    FROM reviews
    WHERE reviews.movie_id = ?`;

  // Prima query: Dettagli del film
  connection.query(sqlMovie, [movieId], (err, movieResults) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (movieResults.length === 0) {
      res.status(404).json({ error: "Film non trovato" });
      return;
    }

    const movie = movieResults[0];

    // Seconda query: Recensioni del film
    connection.query(sqlReviews, [movieId], (err, reviewResults) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      // Aggiungi le recensioni al film
      movie.reviews = reviewResults;
      res.json(movie);
    });
  });
}

module.exports = { index, show };
