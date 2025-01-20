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
    WHERE id = ?
    ORDER BY created_at DESC`;

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

function storeReview(req, res) {
  movieIdId = req.params.id;
  const name = req.body.name;
  const vote = req.body.vote;
  const text = req.body.text;
  const sql =
    "INSERT INTO reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?)";
  connection.query(sql, [name, vote, text, movieId], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Recensione aggiunta" });
  });
}
module.exports = { index, show, storeReview };
