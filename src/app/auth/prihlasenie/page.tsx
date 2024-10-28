
// src/app/auth/login/page.tsx

"use client"

import { Container, Typography, Button } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <Container>
      <Typography> Login </Typography>
      <Button variant="contained" color="primary" onClick={() => signIn('google')}>
        Prihlasenie pomocou Google.
      </Button>
    </Container>
  );
}