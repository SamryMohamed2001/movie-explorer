import { Card, CardContent, Typography, IconButton, Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getPosterUrl } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";
import StarRating from "./StarRating";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();
  const favorite = isFavorite(movie.id);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const poster = getPosterUrl(movie.poster_path);

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 28px rgba(1,180,228,0.25)",
        },
        "&:hover .hover-overlay": { opacity: 1 },
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <Box sx={{ position: "relative", aspectRatio: "2 / 3", overflow: "hidden", borderRadius: "10px 10px 0 0" }}>
        {poster ? (
          <Box
            component="img"
            src={poster}
            alt={movie.title}
            loading="lazy"
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "action.hover",
              color: "text.disabled",
              textAlign: "center",
              px: 1,
            }}
          >
            <Typography variant="body2">No Poster</Typography>
          </Box>
        )}

        {/* Hover overlay */}
        <Box
          className="hover-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 0.25s ease",
            background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: 5,
              px: 1.5,
              py: 0.4,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <VisibilityIcon fontSize="inherit" />
            View Details
          </Box>
        </Box>

        {/* Rating badge, always visible on top of the poster */}
        <StarRating
          voteAverage={movie.vote_average}
          size="small"
          compact
          pill
          sx={{ position: "absolute", bottom: 8, left: 8 }}
        />

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          size="small"
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            bgcolor: "rgba(0,0,0,0.55)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
          }}
          aria-label="toggle favorite"
        >
          {favorite ? <FavoriteIcon sx={{ color: "#ff5c5c", fontSize: 20 }} /> : <FavoriteBorderIcon sx={{ color: "#fff", fontSize: 20 }} />}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={700} noWrap title={movie.title}>
          {movie.title}
        </Typography>
        <Chip label={year} size="small" variant="outlined" sx={{ mt: 0.5 }} />
      </CardContent>
    </Card>
  );
}
