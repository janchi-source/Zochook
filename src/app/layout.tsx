// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import AuthProvider from "../components/AuthProvider"
import Navbar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Bos",
  description: "Bos",
};

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
            <main >
              {children}
            </main>
            <Navbar />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}