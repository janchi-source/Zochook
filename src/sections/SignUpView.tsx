'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from "@mui/material/Alert";
import SignInUpViewLink from "../components/CustomLink";
import { z } from "zod";

export default function SignUpView() {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signUpSchema = z.object({
    acceptedTerms: z.literal(true, {
      errorMap: () => ({
        message: "Musíte súhlasiť s GDPR a podmienkami používania"
      })
    })
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (error) {
      setError(null);
    }
  };

  const handleSignUp = async () => {
    try {
      signUpSchema.parse({ acceptedTerms: isChecked });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
      return;
    }

    const result = await signIn('google', { callbackUrl: '/' });
    if (result?.ok) {
      router.push('/');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >

      <Card
        sx={{
          width: 400,
          padding: '20px',
          bgcolor: 'background.paper',
          color: 'text.primary'
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
            Registrácia
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
            Please sign up using your Google account.
          </Typography>

          <FormControlLabel
            control={
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            }
            label={
              <>
                Súhlasím s <SignInUpViewLink href="/gdpr" text="GDPR" /> a{" "}
                <SignInUpViewLink href="/podmienky" text="podmienkami používania" />.
              </>
            }
            sx={{ mb: 2 }}
          />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            sx={{
              marginTop: '20px',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            Register with Google
          </Button>

          <Typography variant="body2" sx={{ mt: 3 }}>
            Already have an account? <SignInUpViewLink href="/auth/prihlasenie" text="Sign in!" />
          </Typography>
        </CardContent>
      </Card>


    </Box>
  );
}
