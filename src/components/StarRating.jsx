import { Box, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function StarRating({ voteAverage, size = "small", showValue = true, compact = false, pill = false, sx }) {
  const value = (voteAverage || 0) / 2;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 0.4 : 0.75,
        ...(pill && {
          bgcolor: "rgba(0,0,0,0.65)",
          borderRadius: 5,
          px: 1,
          py: 0.4,
        }),
        ...sx,
      }}
    >
      {compact ? (
        <StarIcon sx={{ color: "#ffd166", fontSize: size === "small" ? 16 : 20 }} />
      ) : (
        <Rating
          value={value}
          precision={0.5}
          readOnly
          size={size}
          icon={<StarIcon fontSize="inherit" sx={{ color: "#ffd166" }} />}
          emptyIcon={<StarBorderIcon fontSize="inherit" sx={{ color: "rgba(255,255,255,0.3)" }} />}
        />
      )}
      {showValue && (
        <Typography
          sx={{
            fontSize: size === "small" ? 12 : 14,
            fontWeight: 700,
            color: pill ? "#fff" : "text.primary",
          }}
        >
          {voteAverage?.toFixed(1) ?? "N/A"}
        </Typography>
      )}
    </Box>
  );
}
