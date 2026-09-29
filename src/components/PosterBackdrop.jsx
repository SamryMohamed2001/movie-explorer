import { useEffect, useState, useMemo } from "react";
import { Box } from "@mui/material";
import { getTrending, getPosterUrl } from "../api/tmdb";

const COLUMN_COUNT = 6;

function chunkIntoColumns(items, columns) {
  const result = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => result[i % columns].push(item));
  return result;
}

export default function PosterBackdrop() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    getTrending()
      .then((res) => setPosters(res.data.results.filter((m) => m.poster_path)))
      .catch(() => setPosters([]));
  }, []);

  const columns = useMemo(() => chunkIntoColumns(posters, COLUMN_COUNT), [posters]);

  if (posters.length === 0) return null;

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes posterScrollUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes posterScrollDown {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .poster-column {
          animation-duration: 60s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .poster-column-up { animation-name: posterScrollUp; }
        .poster-column-down { animation-name: posterScrollDown; }
        @media (prefers-reduced-motion: reduce) {
          .poster-column { animation: none; }
        }
      `}</style>

      <Box
        sx={{
          display: "flex",
          gap: "6px",
          width: "100%",
          height: "100%",
          transform: "rotate(-6deg) scale(1.2)",
          transformOrigin: "center",
        }}
      >
        {columns.map((col, colIndex) => (
          <Box
            key={colIndex}
            className={`poster-column ${colIndex % 2 === 0 ? "poster-column-up" : "poster-column-down"}`}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              animationDuration: `${55 + colIndex * 8}s`,
            }}
          >
            {[...col, ...col].map((movie, i) => (
              <Box
                key={`${movie.id}-${i}`}
                component="img"
                src={getPosterUrl(movie.poster_path, "w342")}
                alt=""
                loading="lazy"
                sx={{
                  width: "100%",
                  aspectRatio: "2 / 3",
                  objectFit: "cover",
                  borderRadius: 1,
                  flexShrink: 0,
                }}
              />
            ))}
          </Box>
        ))}
      </Box>

      {/* Scrim for legibility */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10,12,16,0.55) 0%, rgba(10,12,16,0.85) 55%, rgba(10,12,16,0.96) 100%)",
        }}
      />
    </Box>
  );
}
