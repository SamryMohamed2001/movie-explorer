import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  Grid,
  Avatar,
  IconButton,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getMovieDetails, getPosterUrl } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";
import ErrorMessage from "../components/ErrorMessage";
import TrailerEmbed from "../components/TrailerEmbed";
import StarRating from "../components/StarRating";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, setLastViewed } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.data);
        setLastViewed(res.data);
      })
      .catch(() => setError("Couldn't load movie details."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" width={80} sx={{ mb: 2, fontSize: "1.5rem" }} />
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Skeleton variant="rounded" sx={{ width: "100%", aspectRatio: "2 / 3", borderRadius: 3 }} />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Skeleton variant="text" width="60%" sx={{ fontSize: "2.5rem" }} />
            <Skeleton variant="text" width="30%" sx={{ mb: 2 }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
          </Grid>
        </Grid>
      </Container>
    );
  }
  if (error) return <Container sx={{ py: 4 }}><ErrorMessage message={error} /></Container>;
  if (!movie) return null;

  const favorite = isFavorite(movie.id);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const cast = movie.credits?.cast?.slice(0, 8) || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={getPosterUrl(movie.poster_path) || "https://placehold.co/500x750?text=No+Poster"}
              alt={movie.title}
              sx={{ width: "100%", borderRadius: 3, boxShadow: 4, display: "block" }}
            />
            <StarRating
              voteAverage={movie.vote_average}
              size="medium"
              pill
              sx={{ position: "absolute", bottom: 12, left: 12 }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 8 }}>
          <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
            <Typography variant="h4" fontWeight={700}>
              {movie.title}
            </Typography>
            <IconButton onClick={() => toggleFavorite(movie)} aria-label="toggle favorite">
              {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", mt: 1, mb: 2 }}>
            <Chip label={year} size="small" />
            {movie.runtime ? <Chip label={`${movie.runtime} min`} size="small" /> : null}
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average?.toFixed(1)} / 10 · {movie.vote_count?.toLocaleString()} votes
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
            {movie.genres?.map((g) => (
              <Chip key={g.id} label={g.name} variant="outlined" size="small" />
            ))}
          </Stack>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Overview
          </Typography>
          <Typography color="text.secondary">{movie.overview || "No overview available."}</Typography>

          {cast.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Cast
              </Typography>
              <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 1 }}>
                {cast.map((actor) => (
                  <Stack key={actor.cast_id ?? actor.credit_id} spacing={0.5} sx={{ alignItems: "center", minWidth: 80 }}>
                    <Avatar
                      src={getPosterUrl(actor.profile_path, "w185") || undefined}
                      alt={actor.name}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Typography variant="caption" align="center" noWrap sx={{ maxWidth: 80 }}>
                      {actor.name}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}

          <TrailerEmbed videos={movie.videos?.results} />
        </Grid>
      </Grid>
    </Container>
  );
}
