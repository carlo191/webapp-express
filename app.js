// INIT EXPRESS
const express = require(`express`);
const app = express();
const cors = require("cors");
app.use(cors());
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// CONTROLLERS
const filmController = require("./controllers/filmController");

// Configura le rotte
app.get("/movies", filmController.index);
app.get("/movies/:id", filmController.show); // Rotta per ottenere la lista dei film

app.listen(3000, () => {
  console.log(`server listening at http://localhost:3000`);
});
