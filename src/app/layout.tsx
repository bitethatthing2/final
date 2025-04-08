import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script"; // Import Script component
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/contexts/theme-context"; // Corrected import path
import { LocationProvider } from "@/contexts/LocationContext"; // Import LocationProvider
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hustle Hard",
  description: "High-Energy Sports Bar • Restaurant • Nightclub",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hustle Hard",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <Toaster />
          </LocationProvider>
        </ThemeProvider>
        {/* Add Elfsight Fix Script */}
        <Script 
          src="/elfsight-fix.js"
          strategy="beforeInteractive"
        />
        {/* Add Elfsight Platform Script */}
        <Script 
          src="https://static.elfsight.com/platform/platform.js" 
          strategy="afterInteractive"
          onError={() => {
            if (typeof window !== 'undefined') {
              window.elfsightLoadFailed = true;
              console.error('Failed to load Elfsight platform script');
            }
          }}
          onLoad={() => {
            if (typeof window !== 'undefined') {
              window.elfsightLoaded = true;
            }
          }}
        />
        {/* Add Service Worker Initialization */}
        <Script 
          src="/service-worker-init.js"
          strategy="afterInteractive"
        />
        {/* Add PWA Installation Helper */}
        <Script 
          src="/pwa-install-helper.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
