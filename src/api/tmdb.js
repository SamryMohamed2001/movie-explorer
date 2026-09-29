import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrending = (page = 1) =>
  tmdb.get("/trending/movie/week", { params: { page } });

export const searchMovies = (query, page = 1) =>
  tmdb.get("/search/movie", { params: { query, page } });

export const discoverMovies = ({ genreId, year, minRating, page = 1 } = {}) =>
  tmdb.get("/discover/movie", {
    params: {
      page,
      with_genres: genreId || undefined,
      primary_release_year: year || undefined,
      "vote_average.gte": minRating || undefined,
      sort_by: "popularity.desc",
    },
  });

export const getMovieDetails = (movieId) =>
  tmdb.get(`/movie/${movieId}`, {
    params: { append_to_response: "credits,videos" },
  });

export const getGenres = () => tmdb.get("/genre/movie/list");

export const getPosterUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const getBackdropUrl = (path, size = "original") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export default tmdb;
