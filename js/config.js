import TOKEN from "./token.js";

export const IMDB_API_URL = "https://imdb-top-100-movies.p.rapidapi.com/";
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": TOKEN,
    "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  },
};
export const PAGE_TITLE = "Movie List";
