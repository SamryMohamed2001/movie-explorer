import { Box, Typography } from "@mui/material";

export default function EmptyState({ icon, title, subtitle }) {
  return (
    <Box
      sx={{
        position: "relative",
        py: 10,
        px: 2,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          "& svg": { fontSize: 180, opacity: 0.05 },
          pointerEvents: "none",
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h5"
        fontWeight={800}
        sx={{ position: "relative", mb: 1 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ position: "relative", maxWidth: 360, mx: "auto" }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
