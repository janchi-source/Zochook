// src/sections/NonAuthPageView.tsx

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function NonAuthPageView() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Zochook
      </Typography>
      <Typography variant="body1" paragraph>
        Prosim prihlaste sa pre plny pristup.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => signIn('google')}>
        Registracia pomocou Google.
      </Button>
    </Container>
  );
}
