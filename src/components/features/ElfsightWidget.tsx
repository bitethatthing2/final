'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface ElfsightWidgetProps {
  widgetId: string;
  className?: string;
}

const ElfsightWidget = ({ widgetId, className = '' }: ElfsightWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetClass = `elfsight-app-${widgetId}`;

  useEffect(() => {
    // This will trigger the Elfsight widget to load if the script is already loaded
    if (window.elfsight) {
      window.elfsight.reinit();
    }
  }, [widgetId]);

  return (
    <>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.elfsight) {
            window.elfsight.reinit();
          }
        }}
      />
      <div ref={containerRef} className={`${widgetClass} ${className}`}></div>
    </>
  );
};

// Add TypeScript declaration for the Elfsight global
declare global {
  interface Window {
    elfsight: {
      reinit: () => void;
    };
  }
}

export default ElfsightWidget;
