import TOKEN from "./token.js";

export const RAPID_LIST_URL = "https://imdb-top-100-movies.p.rapidapi.com/";
export const RAPID_DETAILS_URL = "https://imdb-top-100-movies.p.rapidapi.com/";
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": TOKEN,
    "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  },
};
