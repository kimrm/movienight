import { RAPID_TOKEN } from "./js/config.js";

export function options() {
  return {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_TOKEN,
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };
}
