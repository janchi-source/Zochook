"use client";

import { Button, Container, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Link from "next/link";

export default function SignInView() {
  const [error] = useState<string | null>(null);

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

      <Typography variant="body2" sx={{ mt: 3 }}>
        Don&apos;t have an account?{" "}
        <Link href="/auth/registracia" passHref>
          <Button variant="text" sx={{ textTransform: "none", p: 0 }}>
            Create one!
          </Button>
        </Link>
      </Typography>
    </Container>
  );
}
