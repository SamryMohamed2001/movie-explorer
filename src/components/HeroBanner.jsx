import { useState, useMemo } from "react";
import { Box, Container, Typography, Stack, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getBackdropUrl, getPosterUrl } from "../api/tmdb";
import StarRating from "./StarRating";

export default function HeroBanner({ movies, genres }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const featured = movies[index];

  const genreNames = useMemo(() => {
    if (!featured) return [];
    const map = new Map(genres.map((g) => [g.id, g.name]));
    return (featured.genre_ids || []).slice(0, 3).map((id) => map.get(id)).filter(Boolean);
  }, [featured, genres]);

  if (!featured) return null;

  const rail = movies.slice(0, 6);

  const prev = () => setIndex((i) => (i - 1 + movies.length) % movies.length);
  const next = () => setIndex((i) => (i + 1) % movies.length);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        mb: 5,
        minHeight: { xs: 560, md: 480 },
        color: "#fff",
        backgroundColor: "#0a0a0a",
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 100%), url(${
          getBackdropUrl(featured.backdrop_path) || getPosterUrl(featured.poster_path)
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        transition: "background-image 0.4s ease",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: { md: "center" },
          }}
        >
          {/* Left: title, meta, CTA */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                width: 40,
                height: 3,
                borderRadius: 1,
                background: "linear-gradient(90deg, #01b4e4, #6c5ce7)",
                mb: 2,
              }}
            />

            <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: "wrap", gap: 1 }}>
              {genreNames.map((name) => (
                <Typography key={name} component="span" variant="overline" sx={{ opacity: 0.85, letterSpacing: 1 }}>
                  {name}
                  {name !== genreNames[genreNames.length - 1] ? " · " : ""}
                </Typography>
              ))}
            </Stack>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
                textShadow: "0 4px 24px rgba(0,0,0,0.5)",
              }}
            >
              {featured.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.85,
                mb: 2,
                maxWidth: 480,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {featured.overview || "No description available."}
            </Typography>

            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
              <StarRating voteAverage={featured.vote_average} size="medium" />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                / 10
              </Typography>
            </Stack>

            <Button
              variant="contained"
              size="large"
              startIcon={<InfoOutlinedIcon />}
              onClick={() => navigate(`/movie/${featured.id}`)}
              sx={{
                borderRadius: 2,
                px: 3,
                background: "linear-gradient(135deg, #01b4e4, #6c5ce7)",
                boxShadow: "0 8px 20px rgba(1,180,228,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #01a1cc, #5b4bd1)" },
              }}
            >
              View Details
            </Button>
          </Box>

          {/* Right: poster rail */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1.5, alignItems: "center" }}>
            {rail.map((m, i) => (
              <Box
                key={m.id}
                component="img"
                onClick={() => setIndex(i)}
                src={getPosterUrl(m.poster_path, "w342") || "https://placehold.co/220x330?text=No+Poster"}
                alt={m.title}
                sx={{
                  width: i === index ? 150 : 100,
                  height: i === index ? 225 : 150,
                  objectFit: "cover",
                  borderRadius: 2,
                  cursor: "pointer",
                  boxShadow: i === index ? 6 : 1,
                  border: i === index ? "2px solid" : "2px solid transparent",
                  borderColor: i === index ? "primary.main" : "transparent",
                  transition: "all 0.25s ease",
                  alignSelf: "center",
                }}
              />
            ))}
          </Box>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mt: { xs: 3, md: 4 } }}>
          <IconButton
            onClick={prev}
            size="small"
            sx={{ border: "1px solid rgba(255,255,255,0.4)", color: "#fff" }}
            aria-label="previous featured movie"
          >
            <ArrowBackIosNewIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={next}
            size="small"
            sx={{ border: "1px solid rgba(255,255,255,0.4)", color: "#fff" }}
            aria-label="next featured movie"
          >
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
