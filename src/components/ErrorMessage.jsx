import { Alert } from "@mui/material";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      {message}
    </Alert>
  );
}
