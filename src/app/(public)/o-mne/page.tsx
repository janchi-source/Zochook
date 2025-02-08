"use client";

import React from "react";
import { Typography, Box, Grid, Container } from "@mui/material";
import Wave from 'react-wavify';

export default function AboutUs() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #2271b3 0%, #89c5eb 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        pb: 10
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        {/* Clouds */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: "120px",
              height: "60px",
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "30px",
              top: `${Math.random() * 40}%`,
              left: `-120px`,
              animation: `moveCloud ${15 + i * 2}s linear infinite`,
              animationDelay: `${i * 2}s`,
              "&:before": {
                content: '""',
                position: "absolute",
                top: "-20px",
                left: "15px",
                width: "60px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "50%",
              },
              "&:after": {
                content: '""',
                position: "absolute",
                top: "-30px",
                left: "45px",
                width: "60px",
                height: "60px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "50%",
              },
            }}
          />
        ))}
      </Box>

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

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, mt: 4 }}>
        {/* Mission & Vision */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={5}>
            <Box className="polaroid">
              <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a' }}>
                Our Mission
              </Typography>
              <Typography sx={{ color: '#333333' }}>
                To deliver exceptional digital solutions that empower businesses
                to thrive in the modern world.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box className="polaroid">
              <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a' }}>
                Our Vision
              </Typography>
              <Typography sx={{ color: '#333333' }}>
                To become a leading force in digital transformation, setting
                new standards in software development.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Core Values Section */}
        <Typography
          variant="h2"
          align="center"
          sx={{
            color: 'white',
            my: 6,
            fontSize: '48px',
            fontWeight: 700,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Our Core Values
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Innovation",
              description: "Pushing boundaries with cutting-edge solutions"
            },
            {
              title: "Quality",
              description: "Maintaining highest standards in every project"
            },
            {
              title: "Collaboration",
              description: "Building strong partnerships with our clients"
            },
            {
              title: "Integrity",
              description: "Operating with transparency and honesty"
            }
          ].map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box className="polaroid">
                <Typography variant="h5" gutterBottom sx={{ color: '#1a1a1a' }}>
                  {value.title}
                </Typography>
                <Typography sx={{ color: '#333333' }}>
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Approach Section */}
        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box className="polaroid">
              <Typography variant="h5" gutterBottom sx={{ color: '#1a1a1a' }}>
                Client-Centric Focus
              </Typography>
              <Typography sx={{ color: '#333333' }}>
                Understanding unique challenges and delivering tailored solutions.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="polaroid">
              <Typography variant="h5" gutterBottom sx={{ color: '#1a1a1a' }}>
                Continuous Improvement
              </Typography>
              <Typography sx={{ color: '#333333' }}>
                Staying at the forefront of technological advancement.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <style jsx global>{`
        @keyframes moveCloud {
          from {
            transform: translateX(-120px);
          }
          to {
            transform: translateX(calc(100vw + 120px));
          }
        }
        .polaroid {
          background: white;
          padding: 20px;
          border: 12px solid white;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
          transform: rotate(${Math.random() * 4 - 2}deg);
          transition: transform 0.3s, box-shadow 0.3s;
          height: 100%;
        }
        .polaroid:hover {
          transform: scale(1.02) rotate(0deg);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </Box>
  );
}
