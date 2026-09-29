import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

export default function Favorites() {
  const { favorites } = useMovies();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        ❤️ Your Favorites
      </Typography>

      {favorites.length === 0 ? (
        <Box>
          <Typography color="text.secondary">
            You haven't saved any favorites yet. Click the heart icon on any movie to add it here.
          </Typography>
        </Box>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Container>
  );
}
