import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zochook",
  description: "Created by students of SPŠE Zochova 9, Bratislava",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};