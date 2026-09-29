import { AppBar, Toolbar, Typography, IconButton, Button, Box, useScrollTrigger } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { useThemeMode } from "../context/ThemeModeContext";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const { mode, toggleMode } = useThemeMode();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: "blur(10px)",
        bgcolor: scrolled ? (mode === "dark" ? "rgba(13,17,23,0.75)" : "rgba(245,247,250,0.75)") : "transparent",
        borderBottom: "1px solid",
        borderColor: scrolled ? "divider" : "transparent",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <Box component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
          <Logo size={30} />
        </Box>

        {isAuthenticated && (
          <>
            <Typography variant="body2" sx={{ mr: 1, opacity: 0.7, display: { xs: "none", sm: "block" } }}>
              {user?.username}
            </Typography>
            <Button
              component={Link}
              to="/favorites"
              startIcon={<FavoriteIcon />}
              color="inherit"
              sx={{ borderRadius: 3 }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>Favorites</Box>
            </Button>
            <IconButton onClick={handleLogout} color="inherit" aria-label="logout">
              <LogoutIcon />
            </IconButton>
          </>
        )}

        <IconButton onClick={toggleMode} color="inherit" aria-label="toggle theme">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
