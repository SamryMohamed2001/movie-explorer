import { Box, FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 40 }, (_, i) => currentYear - i);
const RATINGS = [9, 8, 7, 6, 5, 4];

const EMPTY_FILTERS = { genreId: "", year: "", minRating: "" };

function activeSx(isActive) {
  return isActive
    ? {
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
        "& .MuiInputLabel-root": { color: "primary.main" },
      }
    : {};
}

export default function FilterBar({ genres, filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });
  const hasActiveFilters = Boolean(filters.genreId || filters.year || filters.minRating);

  return (
    <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
      <TuneIcon sx={{ fontSize: 20, opacity: 0.5, display: { xs: "none", sm: "block" } }} />

      <FormControl size="small" sx={{ minWidth: 160, ...activeSx(!!filters.genreId) }}>
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

      <FormControl size="small" sx={{ minWidth: 120, ...activeSx(!!filters.year) }}>
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

      <FormControl size="small" sx={{ minWidth: 140, ...activeSx(!!filters.minRating) }}>
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

      {hasActiveFilters && (
        <Chip
          label="Clear filters"
          size="small"
          onClick={() => onChange(EMPTY_FILTERS)}
          onDelete={() => onChange(EMPTY_FILTERS)}
          sx={{ borderRadius: 2 }}
        />
      )}
    </Box>
  );
}
