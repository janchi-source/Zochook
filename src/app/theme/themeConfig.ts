// src/styles/theme.ts

import { createTheme } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
};

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: { main: '#dc004e' },
    secondary: { main: '#1976d2' },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: { main: '#f44336' },
    secondary: { main: '#2196f3' }, 
    background: {
      default: '#121212', 
      paper: '#1e1e1e', 
    },
    text: {
      primary: '#ffffff', 
      secondary: '#aaaaaa', 
    },
  },
});

export { lightTheme, darkTheme };