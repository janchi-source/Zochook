"use client";

import { Button, Container, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export default function SignInView() {
  const [error, setError] = useState<string | null>(null);

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Prihlásenie
      </Typography>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => signIn("google")}
        sx={{ mb: 1 }}
      >
        Prihlásiť sa účtom Google
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account? <a href="/auth/registracia">Create one!</a>
      </Typography>
    </Container>
  );
}
