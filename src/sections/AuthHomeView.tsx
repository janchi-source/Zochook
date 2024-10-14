// src/sections/AuthPageView.tsx

import React from 'react';
import { Container, Typography } from '@mui/material';

export default function AuthPageView() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome Back!
      </Typography>
      <Typography variant="body1">
        Here is the content for authenticated users.
      </Typography>
    </Container>
  );
}
