
// src/app/page.tsx

// import Typography from "@mui/material/Typography";

// export const metadata = {title: "Domov | Kolcobos"};

// export default function Home() {
//   return (
//       <Typography> Domovská stránka </Typography>
//   );
// }


// src/app/page.tsx

'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import NonAuthPageView from '../../sections/NonAuthHomeView';
import AuthPageView from '../../sections/AuthHomeView';



// export const metadata = { title: "Domov | Kolcobos" };

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return session ? <AuthPageView /> : <NonAuthPageView />;
}
