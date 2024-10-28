
// src/app/auth/signup/page.tsx

"use client"

import { Container, Typography, Button } from '@mui/material';
import { signIn } from 'next-auth/react';

// export const metadata = {title: "Signup | Kolcobos"};

export default function Signup() {
  return (
    <Container>
      <Typography> Signup </Typography>
      <Button variant="contained" color="primary" onClick={() => signIn('google')}>
        Registracia pomocou Google.
      </Button>
    </Container>
  );
}