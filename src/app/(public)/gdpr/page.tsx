"use client";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Link from '@mui/material/Link';

export default function TermsConditions() {
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

      {/* Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2, py: 4 }}>
        <Box className="polaroid" sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1a1a1a' }}>
            Privacy Policy
          </Typography>
        </Box>

        <Stack spacing={4}>
          {[
            {
              title: "Data Controller Information",
              content: "We act as the data controller for all personal information collected. Our contact details are [INSERT YOUR COMPANY DETAILS AND ADDRESS]."
            },
            {
              title: "Data Collection and Processing",
              content: (
                <>
                  <Typography variant="h6" gutterBottom>Types of Data We Collect</Typography>
                  <Typography component="ul" sx={{ pl: 2 }}>
                    <li>Personal identification information</li>
                    <li>Contact information</li>
                    <li>Technical data from website usage</li>
                    <li>Any other data you voluntarily provide</li>
                  </Typography>
                </>
              )
            },
            // Add additional sections here in a similar fashion if needed.
          ].map((section, index) => (
            <Box key={index} className="polaroid">
              <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a' }}>
                {section.title}
              </Typography>
              <Typography sx={{ color: '#333333' }}>
                {section.content}
              </Typography>
            </Box>
          ))}

          {/* Additional section with important links */}
          <Box className="polaroid">
            <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a' }}>
              Important Links
            </Typography>
            <Stack spacing={2}>
              <Link 
                href="https://zochova.sk" 
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#2271b3',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Visit Zochova.sk
              </Link>
              <Link 
                href="/registration" 
                sx={{
                  color: '#2271b3',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Register Now
              </Link>
            </Stack>
          </Box>
          
        </Stack>
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
          transform: rotate(${Math.random() * 2 - 1}deg);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .polaroid:hover {
          transform: scale(1.02) rotate(0deg);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </Box>
  );
}
