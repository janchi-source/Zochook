'use client'
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/AuthProvider";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useMemo } from 'react';
import { PaletteMode } from '@mui/material';
import { getDesignTokens } from '../app/theme/themeConfig'

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [mode, setMode] = useState<PaletteMode>('light');
  
  const theme = useMemo(() => 
    createTheme(getDesignTokens(mode)), 
    [mode]
  );

  return (
    <html lang="sk">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <main style={{ flexGrow: 1 }}>
                {children}
              </main>
            </div>
            <Navbar mode={mode} setMode={setMode} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}