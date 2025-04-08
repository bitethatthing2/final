"use client";

import Script from "next/script";

export default function ClientScripts() {
  return (
    <>
      {/* Add Performance Timing Fix Script - must be first */}
      <Script 
        src="/performance-timing-fix.js"
        strategy="beforeInteractive"
      />
      {/* Add Elfsight Fix Script */}
      <Script 
        src="/elfsight-fix.js"
        strategy="beforeInteractive"
      />
      {/* Add Elfsight Platform Fix Script */}
      <Script 
        src="/elfsight-platform-fix.js"
        strategy="beforeInteractive"
      />
      {/* Add Google Maps Fix Script */}
      <Script 
        src="/google-maps-fix.js"
        strategy="afterInteractive"
        onError={() => {
          console.error('Failed to load Google Maps fix script');
        }}
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
    </>
  );
}
