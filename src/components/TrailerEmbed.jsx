import { Box, Typography } from "@mui/material";

export default function TrailerEmbed({ videos }) {
  const trailer = videos?.find((v) => v.site === "YouTube" && v.type === "Trailer") || videos?.[0];

  if (!trailer) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
        Trailer
      </Typography>
      <Box sx={{ position: "relative", pt: "56.25%", borderRadius: 2, overflow: "hidden" }}>
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
        />
      </Box>
    </Box>
  );
}
