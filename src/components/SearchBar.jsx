import { useState, useEffect, useMemo } from "react";
import { Paper, InputBase, IconButton, Box, List, ListItemButton, ListItemIcon, ListItemText, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import HistoryIcon from "@mui/icons-material/History";

export default function SearchBar({ initialValue = "", onSearch, history = [], onRemoveHistoryItem }) {
  const [value, setValue] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => setValue(initialValue), [initialValue]);

  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase();
    const list = query ? history.filter((h) => h.toLowerCase().includes(query) && h.toLowerCase() !== query) : history;
    return list.slice(0, 6);
  }, [value, history]);

  const runSearch = (term) => {
    setValue(term);
    onSearch(term.trim());
    setShowSuggestions(false);
  };

  const submit = (e) => {
    e.preventDefault();
    runSearch(value);
  };

  const clear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
    <Box sx={{ position: "relative" }}>
      <Paper
        component="form"
        onSubmit={submit}
        elevation={2}
        sx={{ p: "4px 8px", display: "flex", alignItems: "center", borderRadius: 3 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a movie..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          inputProps={{ "aria-label": "search movies" }}
        />
        {value && (
          <IconButton onClick={clear} aria-label="clear search">
            <ClearIcon />
          </IconButton>
        )}
        <IconButton type="submit" aria-label="search" color="primary">
          <SearchIcon />
        </IconButton>
      </Paper>

      {showSuggestions && suggestions.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 10,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <List dense disablePadding>
            {suggestions.map((term) => (
              <ListItemButton key={term} onClick={() => runSearch(term)} sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <HistoryIcon fontSize="small" sx={{ opacity: 0.6 }} />
                </ListItemIcon>
                <ListItemText primary={term} />
                {onRemoveHistoryItem && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveHistoryItem(term);
                    }}
                    aria-label={`remove ${term} from history`}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Box>
    </ClickAwayListener>
  );
}
