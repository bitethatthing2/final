"use client";

import Script from "next/script";

export default function ClientScripts() {
  return (
    <>
      {/* Add Require Polyfill - highest priority to prevent animation errors */}
      <Script 
        src="/require-polyfill.js"
        strategy="beforeInteractive"
        id="require-polyfill"
      />
      {/* Add Direct Animation Fix Script - highest priority */}
      <Script 
        src="/direct-animation-fix.js"
        strategy="beforeInteractive"
      />
      {/* Add Animation Frame Fix Script */}
      <Script 
        src="/animation-frame-fix.js"
        strategy="beforeInteractive"
      />
      {/* Add Performance Timing Fix Script */}
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
