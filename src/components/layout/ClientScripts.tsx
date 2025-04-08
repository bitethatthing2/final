"use client";

import Script from "next/script";

export default function ClientScripts() {
  return (
    <>
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
    </>
  );
}
