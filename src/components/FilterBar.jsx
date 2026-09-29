import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 40 }, (_, i) => currentYear - i);
const RATINGS = [9, 8, 7, 6, 5, 4];

export default function FilterBar({ genres, filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          label="Genre"
          value={filters.genreId || ""}
          onChange={(e) => update("genreId", e.target.value)}
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Year</InputLabel>
        <Select label="Year" value={filters.year || ""} onChange={(e) => update("year", e.target.value)}>
          <MenuItem value="">Any Year</MenuItem>
          {YEARS.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Min Rating</InputLabel>
        <Select
          label="Min Rating"
          value={filters.minRating || ""}
          onChange={(e) => update("minRating", e.target.value)}
        >
          <MenuItem value="">Any Rating</MenuItem>
          {RATINGS.map((r) => (
            <MenuItem key={r} value={r}>
              {r}+ ⭐
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
