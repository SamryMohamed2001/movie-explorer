import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext(null);

const FAVORITES_KEY = "movie-explorer-favorites";
const LAST_SEARCH_KEY = "movie-explorer-last-search";
const SEARCH_HISTORY_KEY = "movie-explorer-search-history";
const LAST_VIEWED_KEY = "movie-explorer-last-viewed";

const MAX_HISTORY = 8;

function readJSON(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readJSON(FAVORITES_KEY, []));

  const [lastSearch, setLastSearch] = useState(() => {
    try {
      return localStorage.getItem(LAST_SEARCH_KEY) || "";
    } catch {
      return "";
    }
  });

  const [searchHistory, setSearchHistory] = useState(() => readJSON(SEARCH_HISTORY_KEY, []));
  const [lastViewed, setLastViewedState] = useState(() => readJSON(LAST_VIEWED_KEY, null));

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (movieId) => favorites.some((m) => m.id === movieId);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const updateLastSearch = (query) => {
    setLastSearch(query);
    localStorage.setItem(LAST_SEARCH_KEY, query);
  };

  const addSearchHistory = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchHistory((prev) => {
      const deduped = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      const next = [trimmed, ...deduped].slice(0, MAX_HISTORY);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const removeSearchHistory = (query) => {
    setSearchHistory((prev) => {
      const next = prev.filter((q) => q !== query);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  const setLastViewed = (movie) => {
    const trimmed = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    };
    setLastViewedState(trimmed);
    localStorage.setItem(LAST_VIEWED_KEY, JSON.stringify(trimmed));
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        lastSearch,
        updateLastSearch,
        searchHistory,
        addSearchHistory,
        removeSearchHistory,
        clearSearchHistory,
        lastViewed,
        setLastViewed,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);
