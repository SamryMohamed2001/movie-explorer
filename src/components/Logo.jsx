import { Box, Typography, Stack } from "@mui/material";

function Mark({ size }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 64 64"
      sx={{ width: size, height: size, flexShrink: 0, display: "block" }}
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#01b4e4" />
          <stop offset="1" stopColor="#6c5ce7" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#logo-bg)" />
      <path d="M24 18 L47 32 L24 46 Z" fill="#ffffff" />
      <circle cx="47" cy="47" r="13" fill="#ffd166" stroke="#0a0a0a" strokeWidth="2" />
      <path
        d="M47 40 l2.2 4.4 4.9.7-3.5 3.4.8 4.9-4.4-2.3-4.4 2.3.8-4.9-3.5-3.4 4.9-.7z"
        fill="#0a0a0a"
      />
    </Box>
  );
}

export default function Logo({ size = 32, withWordmark = true, wordmarkColor = "inherit" }) {
  return (
    <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
      <Mark size={size} />
      {withWordmark && (
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            letterSpacing: -0.3,
            color: wordmarkColor,
            lineHeight: 1,
          }}
        >
          Movie Explorer
        </Typography>
      )}
    </Stack>
  );
}
