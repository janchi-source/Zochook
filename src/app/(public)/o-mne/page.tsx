// src/app/about/page.tsx

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Stack } from '@mui/material';

export const metadata = { title: "About Us | Kolcobos" }

export default function AboutUs() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        <Stack spacing={8}>
          {/* Hero Section */}
          <section>
            <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
              Building the Future of Digital Solutions
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
              We create innovative software solutions that transform businesses and enhance user experiences
            </Typography>
          </section>

          {/* Mission & Vision */}
          <section>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      Our Mission
                    </Typography>
                    <Typography>
                      To deliver exceptional digital solutions that empower businesses to thrive in the modern world, 
                      focusing on innovation, quality, and customer satisfaction.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      Our Vision
                    </Typography>
                    <Typography>
                      To become a leading force in digital transformation, setting new standards in software 
                      development and technological innovation.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </section>

          {/* Core Values */}
          <section>
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
              Our Core Values
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  title: "Innovation",
                  description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions."
                },
                {
                  title: "Quality",
                  description: "We maintain the highest standards in every project, ensuring robust and reliable solutions."
                },
                {
                  title: "Collaboration",
                  description: "We believe in the power of teamwork and close partnership with our clients."
                },
                {
                  title: "Integrity",
                  description: "We conduct our business with transparency, honesty, and ethical principles."
                }
              ].map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {value.title}
                      </Typography>
                      <Typography>
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </section>

          {/* Our Approach */}
          <section>
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
              Our Approach
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Client-Centric Focus
                </Typography>
                <Typography paragraph>
                  We put our clients at the center of everything we do. By understanding their unique challenges 
                  and objectives, we deliver tailored solutions that drive real business value.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Continuous Improvement
                </Typography>
                <Typography paragraph>
                  We're committed to staying at the forefront of technological advancement, constantly updating 
                  our skills and methodologies to provide the best possible solutions.
                </Typography>
              </Grid>
            </Grid>
          </section>

          {/* Contact CTA */}
          <section>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" gutterBottom>
                Ready to Work Together?
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Let's discuss how we can help transform your business with our innovative solutions.
              </Typography>
              {/* Add your contact button or form here */}
            </Box>
          </section>
        </Stack>
      </Box>
    </Container>
  );
}
