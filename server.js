const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const message = "Hello World";
  const movieId = 889737;

  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b5ed8cede022fe9ef61ae22cc6a4dda1`;

  axios.get(url).then((response) => {
    console.log(response.data);

    let data = response.data;

    let releaseDate = new Date(data.release_date).getFullYear();
    let currentYear = new Date().getFullYear();

    let genres = "";
    data.genres.forEach((genre) => {
      genres += genre.name + ", ";
    });

    let genresUpdated = genres.slice(0, -2) + ".";

    let posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;

    res.render("index", {
      dataToRender: response.data,
      year: currentYear,
      releaseDate: releaseDate,
      genres: genresUpdated,
      posterUrl: posterUrl,
    });
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

const movieId = 889737;

let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b5ed8cede022fe9ef61ae22cc6a4dda1`;
