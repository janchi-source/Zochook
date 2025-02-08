"use client";

import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Wave from 'react-wavify';

export default function NonAuthPageView() {
  return (
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
      
      {/* Animated Clouds */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
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


          {/* Wave Background */}
          <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
              <Wave
                  fill="rgba(255, 255, 255, 0.2)"
                  paused={false}
                  options={{
                      height: 20,
                      amplitude: 30,
                      speed: 0.15,
                      points: 3
                  }}
                  style={{ position: 'absolute', bottom: '0' }}
              />
              <Wave
                  fill="rgba(255, 255, 255, 0.1)"
                  paused={false}
                  options={{
                      height: 25,
                      amplitude: 35,
                      speed: 0.2,
                      points: 4
                  }}
                  style={{ position: 'absolute', bottom: '10px' }}
              />
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
        

        @keyframes boatFloat {
          0%, 100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, -10px);
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
    </Box>
  );
}
