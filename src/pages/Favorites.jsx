import { Container, Typography, Box } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

export default function Favorites() {
  const { favorites } = useMovies();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
