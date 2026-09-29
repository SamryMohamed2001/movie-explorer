import { useState, useEffect, useCallback, useRef } from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import LoadingSpinner from "../components/LoadingSpinner";
import SkeletonGrid from "../components/SkeletonGrid";
import ErrorMessage from "../components/ErrorMessage";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import { getTrending, searchMovies, discoverMovies, getGenres } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export default function Home() {
  const {
    lastSearch,
    updateLastSearch,
    searchHistory,
    addSearchHistory,
    removeSearchHistory,
    lastViewed,
  } = useMovies();

  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingError, setTrendingError] = useState("");

  const [query, setQuery] = useState(lastSearch || "");
  const [filters, setFilters] = useState({ genreId: "", year: "", minRating: "" });
  const [genres, setGenres] = useState([]);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sentinelRef = useRef(null);

  useEffect(() => {
    getGenres()
      .then((res) => setGenres(res.data.genres))
      .catch(() => setGenres([]));
  }, []);

  useEffect(() => {
    getTrending()
      .then((res) => setTrending(res.data.results.slice(0, 10)))
      .catch(() => setTrendingError("Couldn't load trending movies right now."))
      .finally(() => setTrendingLoading(false));
  }, []);

  const applyClientFilters = useCallback(
    (results) =>
      results.filter((m) => {
        if (filters.genreId && !m.genre_ids?.includes(Number(filters.genreId))) return false;
        if (filters.year && !m.release_date?.startsWith(String(filters.year))) return false;
        if (filters.minRating && m.vote_average < Number(filters.minRating)) return false;
        return true;
      }),
    [filters]
  );

  const fetchPage = useCallback(
    async (pageToLoad, replace) => {
      setLoading(true);
      setError("");
      try {
        const res = query
          ? await searchMovies(query, pageToLoad)
          : await discoverMovies({ ...filters, page: pageToLoad });

        const filtered = query ? applyClientFilters(res.data.results) : res.data.results;

        setMovies((prev) => (replace ? filtered : [...prev, ...filtered]));
        setTotalPages(res.data.total_pages || 1);
        setPage(pageToLoad);
      } catch {
        setError("Something went wrong fetching movies. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [query, filters, applyClientFilters]
  );

  // Reset & refetch whenever the search query or filters change.
  useEffect(() => {
    setMovies([]);
    fetchPage(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters]);

  const loadMore = useCallback(() => {
    if (!loading && page < totalPages) fetchPage(page + 1, false);
  }, [loading, page, totalPages, fetchPage]);

  // Infinite scroll (search results only) via IntersectionObserver on a sentinel element.
  useEffect(() => {
    if (!query) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [query, loadMore]);

  const handleSearch = (value) => {
    setQuery(value);
    updateLastSearch(value);
    if (value.trim()) addSearchHistory(value);
  };

  return (
    <Box>
      {!query && !trendingLoading && trending.length > 0 && (
        <Container maxWidth="xl" sx={{ pt: 3 }}>
          <HeroBanner movies={trending} genres={genres} />
        </Container>
      )}

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700}>
            Discover Movies
          </Typography>
          <SearchBar
            initialValue={query}
            onSearch={handleSearch}
            history={searchHistory}
            onRemoveHistoryItem={removeSearchHistory}
          />
        </Stack>

        {!query && lastViewed && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              ▶ Continue Where You Left Off
            </Typography>
            <Box sx={{ width: { xs: "50%", sm: 200 } }}>
              <MovieCard movie={lastViewed} />
            </Box>
          </Box>
        )}

        {!query && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
              🔥 Trending This Week
            </Typography>
            <ErrorMessage message={trendingError} />
            {trendingLoading ? <SkeletonGrid /> : <MovieGrid movies={trending} />}
          </Box>
        )}

        <Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, mb: 2 }}
          >
            <Typography variant="h5" fontWeight={600}>
              {query ? `Results for "${query}"` : "Browse Popular Movies"}
            </Typography>
            <FilterBar genres={genres} filters={filters} onChange={setFilters} />
          </Stack>

          <ErrorMessage message={error} />
          {loading && movies.length === 0 ? <SkeletonGrid /> : <MovieGrid movies={movies} />}

          {/* Search results: infinite scroll auto-loads more as you reach the bottom. */}
          {loading && movies.length > 0 && <LoadingSpinner />}

          {/* Browse/discover (no search query): manual "Load More" button instead. */}
          {!query && !loading && page < totalPages && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="outlined"
                onClick={loadMore}
                sx={{
                  borderRadius: 5,
                  px: 3,
                  borderColor: "primary.main",
                  "&:hover": { borderColor: "primary.main", bgcolor: "rgba(1,180,228,0.08)" },
                }}
              >
                Load More
              </Button>
            </Box>
          )}

          {!loading && movies.length === 0 && (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              No movies found. Try a different search or filter.
            </Typography>
          )}

          {/* Sentinel element for infinite scroll, only active while searching */}
          {query && <Box ref={sentinelRef} sx={{ height: 1 }} />}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
