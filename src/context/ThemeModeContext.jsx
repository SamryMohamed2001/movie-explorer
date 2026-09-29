import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeModeContext = createContext(null);

const STORAGE_KEY = "movie-explorer-theme-mode";

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem(STORAGE_KEY) || "dark");

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#01b4e4" },
          background:
            mode === "dark"
              ? { default: "#0d1117", paper: "#161b22" }
              : { default: "#f5f7fa", paper: "#ffffff" },
        },
        shape: { borderRadius: 10 },
        typography: {
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          h1: { fontWeight: 800 },
          h2: { fontWeight: 800 },
          h3: { fontWeight: 700 },
          h4: { fontWeight: 700 },
          h5: { fontWeight: 700 },
          h6: { fontWeight: 700 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { textTransform: "none", fontWeight: 600 },
              containedPrimary: {
                background: "linear-gradient(135deg, #01b4e4, #6c5ce7)",
                boxShadow: "0 8px 20px rgba(1,180,228,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #01a1cc, #5b4bd1)" },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { fontWeight: 600 },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeModeContext);
