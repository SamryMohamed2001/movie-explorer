import { Grid, Skeleton, Box } from "@mui/material";

export default function SkeletonGrid({ count = 10 }) {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
          <Box>
            <Skeleton variant="rounded" sx={{ aspectRatio: "2 / 3", width: "100%", borderRadius: 3 }} />
            <Skeleton variant="text" width="80%" sx={{ mt: 1, fontSize: "1rem" }} />
            <Skeleton variant="text" width="40%" sx={{ fontSize: "0.85rem" }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
