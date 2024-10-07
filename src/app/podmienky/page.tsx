// src/app/layout.tsx

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = {
  title: 'Zochook',
  description: 'A social media application similar to Instagram.',
};

export default function Podmienky() {
  return (
    <Container>
      <Typography> Stránka o mne </Typography>
    </Container>
  );
}