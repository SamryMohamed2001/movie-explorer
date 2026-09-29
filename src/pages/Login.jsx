import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Paper, TextField, Button, Typography, Container, Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import PosterBackdrop from "../components/PosterBackdrop";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    login(username.trim());
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        bgcolor: "#0a0c10",
      }}
    >
      <PosterBackdrop />

      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Stack sx={{ alignItems: "center", mb: 3 }}>
          <Logo size={52} withWordmark={false} />
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 4,
            bgcolor: "rgba(18,20,26,0.72)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
          }}
        >
          <Typography variant="h5" fontWeight={800} align="center" sx={{ mb: 1, color: "#fff" }}>
            Movie Explorer
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 3, color: "rgba(255,255,255,0.65)" }}>
            Sign in to discover your favorite films
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              autoFocus
              sx={{
                "& .MuiInputBase-input": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.25)" },
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{
                "& .MuiInputBase-input": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.25)" },
              }}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                borderRadius: 2,
                py: 1.2,
                background: "linear-gradient(135deg, #01b4e4, #6c5ce7)",
                boxShadow: "0 8px 20px rgba(1,180,228,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #01a1cc, #5b4bd1)" },
              }}
            >
              Sign In
            </Button>
            <Typography variant="caption" align="center" sx={{ color: "rgba(255,255,255,0.5)" }}>
              Demo app: any username and password will sign you in.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
