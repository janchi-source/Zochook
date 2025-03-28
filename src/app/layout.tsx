// src/app/layout.tsx

"use client";

import "./globals.css";
import { Box } from "@mui/material";
import RootThemeProvider from "../components/ThemeProvider";
import AuthProvider from "../components/AuthProvider";
import Navbar from "../components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>
          <RootThemeProvider>
            <Box
              sx={{
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #2271b3 0%, #89c5eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                py: 4,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {children}
              <Box
                component="div"
                sx={{
                  position: 'absolute',
                  top: '40px',
                  right: '40px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#FFD700',
                  boxShadow: '0 0 40px #FFD700',
                  animation: 'sunGlow 3s ease-in-out infinite',
                  zIndex: 1,
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    right: '-20px',
                    bottom: '-20px',
                    background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0) 70%)',
                    borderRadius: '50%',
                  }
                }}
              />
            </Box>
            <Navbar sx={{ zIndex: 2 }} />
          </RootThemeProvider>
        </AuthProvider>
        <style jsx global>{`
          @keyframes sunGlow {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.9;
            }
          }
        `}</style>
      </body>
    </html>
  );
}