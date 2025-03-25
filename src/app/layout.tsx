'use client';
import { MantineProvider, createTheme} from '@mantine/core';
import { Open_Sans } from 'next/font/google';
import '@mantine/core/styles.css';

import NavBar from "@/components/layout/NavBar";
import Footer from '@/components/layout/Footer';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans',
});

const theme = createTheme({
  colors: {
    dark: [
     '#F9F0FF', // 0 - Lightest purple (for text/accents only)
     '#EFDBFF', // 1 - Very light purple
     '#D3ADF7', // 2 - Light purple
     '#B37FEB', // 3 - Lavender
     '#9254DE', // 4 - Bright purple
     '#722ED1', // 5 - Primary purple
     '#531DAB', // 6 - Deep purple
     '#150634', // 7 - Extremely dark purple
     '#0C031D', // 8 - Nearly black with purple tint
     '#05020E', // 9 - Almost pure black with hint of purple
    ]
  },
  fontFamily: "'Open Sans', sans-serif"
  });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <MantineProvider
          theme={theme}>
          <NavBar />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
