import { Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MovieGrid from "../components/MovieGrid";
import EmptyState from "../components/EmptyState";
import { useMovies } from "../context/MovieContext";

export default function Favorites() {
  const { favorites } = useMovies();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 3 }}>
        <FavoriteIcon sx={{ color: "#ff5c5c" }} />
        <Typography variant="h4" fontWeight={700}>
          Your Favorites
        </Typography>
      </Stack>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<FavoriteBorderIcon />}
          title="No favorites yet"
          subtitle="Click the heart icon on any movie to save it here."
        />
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Container>
  );
}
