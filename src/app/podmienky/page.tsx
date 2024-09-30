// src/app/layout.tsx

import React from 'react';
import { Inter } from 'next/font/google';
import NavBar from '../../components/NavBar'; // Correct the path as necessary

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Zochook',
  description: 'A social media application similar to Instagram.',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className} style={{ paddingBottom: '56px' }}> {/* Adjust padding as necessary */}
        <main>{children}</main>
        <NavBar />
      </body>
    </html>
  );
};

export default Layout;
