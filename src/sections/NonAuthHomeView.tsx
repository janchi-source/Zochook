"use client";

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

export default function NonAuthPageView() {
  return (

      <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'relative',
  }}
>
  <Typography 
    variant="h1"
    sx={{
      fontSize: '96px',
      fontWeight: 900,
      textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
      textAlign: 'center',
    }}
  >
    ZOCHOOK
  </Typography>

  <Typography
    variant="h4"
    sx={{
      fontSize: '24px',
      fontWeight: 300,
      textAlign: 'center',
      maxWidth: '600px',
      color: 'white',
      marginTop: '20px',
      opacity: 0.9,
      letterSpacing: '1px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
    }}
  >
    Welcome aboard! Set sail with us on a journey of discovery
  </Typography>
</Box>
  
  );
}
