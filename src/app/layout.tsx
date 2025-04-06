import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script"; // Import Script component
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/contexts/theme-context"; // Corrected import path
import { LocationProvider } from "@/contexts/LocationContext"; // Import LocationProvider

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hustle Hard",
  description: "High-Energy Sports Bar • Restaurant • Nightclub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem={false} // Disable system theme detection
          disableTransitionOnChange
        >
          {/* Wrap children with LocationProvider */}
          <LocationProvider>
            {children} 
          </LocationProvider>
        </ThemeProvider>
        {/* Add Elfsight Platform Script */}
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
