// src/app/layout.tsx

"use client";

import "./globals.css";
import { Box } from "@mui/material";

import ThemeProvider from "../components/ThemeProvider";
import AuthProvider from "../components/AuthProvider";
import Navbar from "../components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body>
        <AuthProvider>
          <ThemeProvider>
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

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  zIndex: 0, // Lower zIndex for waves
                }}
              >
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                  <path
                    d="M-8.74,71.55 C289.78,255.11 349.60,4.47 505.36,34.05 L500.00,150.00 L0.00,150.00 Z"
                    style={{
                      stroke: 'none',
                      fill: '#89c5eb',
                      opacity: '0.8',
                      animation: 'wave1 7s linear infinite',
                    }}
                  />
                  <path
                    d="M-23.42,125.83 C187.63,45.89 299.38,57.73 526.80,123.86 L500.00,150.00 L0.00,150.00 Z"
                    style={{
                      stroke: 'none',
                      fill: '#89c5eb',
                      opacity: '0.6',
                      animation: 'wave2 5s linear infinite',
                    }}
                  />
                  <path
                    d="M-23.42,125.83 C172.96,-152.44 217.55,183.06 504.22,55.77 L500.00,150.00 L0.00,150.00 Z"
                    style={{
                      stroke: 'none',
                      fill: '#89c5eb',
                      opacity: '0.4',
                      animation: 'wave3 3s linear infinite',
                    }}
                  />
                </svg>
              </Box>

              {[...Array(8)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    width: '120px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '30px',
                    top: `${Math.random() * 40}%`,
                    left: `-120px`,
                    animation: `moveCloud ${15 + i * 2}s linear infinite`,
                    animationDelay: `${i * 2}s`,
                    zIndex: 1, // Ensure clouds are above waves
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: '-20px',
                      left: '15px',
                      width: '60px',
                      height: '60px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%',
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      top: '-30px',
                      left: '45px',
                      width: '60px',
                      height: '60px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '50%',
                    },
                  }}
                />
              ))}
            </Box>
            <Navbar sx={{ zIndex: 2 }} /> {/* Higher zIndex for Navbar */}
          </ThemeProvider>
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
          @keyframes moveCloud {
            from {
              transform: translateX(-120px);
            }
            to {
              transform: translateX(calc(100vw + 120px));
            }
          }
          @keyframes wave1 {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-500px);
            }
          }
          @keyframes wave2 {
            0% {
              transform: translateX(-500px);
            }
            100% {
              transform: translateX(0);
            }
          }
          @keyframes wave3 {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-500px);
            }
          }
        `}</style>
      </body>
    </html>
  );
}