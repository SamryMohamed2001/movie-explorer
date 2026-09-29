import { Box, Container, Typography, Stack, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Logo from "./Logo";

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "Favorites", to: "/favorites" },
];

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0a0a0a", color: "rgba(255,255,255,0.85)", mt: 6 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} sx={{ justifyContent: "space-between" }}>
          <Box sx={{ maxWidth: 320 }}>
            <Box sx={{ mb: 1.5 }}>
              <Logo size={28} wordmarkColor="#fff" />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Discover trending films, search the TMDb catalog, and build your own favorites list.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#fff", mb: 1.5 }}>
              Explore
            </Typography>
            <Stack spacing={1}>
              {EXPLORE_LINKS.map((l) => (
                <MuiLink
                  key={l.label}
                  component={RouterLink}
                  to={l.to}
                  underline="hover"
                  sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "#fff" } }}
                >
                  {l.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", mt: 4, pt: 3 }}>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            Movie data provided by The Movie Database (TMDb). This product is not endorsed or certified by TMDb.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
