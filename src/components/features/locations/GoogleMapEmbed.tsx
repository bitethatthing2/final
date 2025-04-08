"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GoogleMapEmbedProps {
  src: string;
  title: string;
  className?: string;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  src,
  title,
  className
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle loading attribute for cross-browser compatibility
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined' && iframeRef.current) {
      // Check if loading attribute is supported
      const isLoadingSupported = 'loading' in HTMLIFrameElement.prototype;
      
      if (isLoadingSupported) {
        iframeRef.current.setAttribute('loading', 'lazy');
      }
    }
  }, []);

  return (
    <div className="w-full rounded-lg overflow-hidden border border-white/10 shadow-md">
      {/* Maintain aspect ratio for responsiveness */}
      <div className="relative pb-[56.25%] h-0"> {/* 16:9 Aspect Ratio */}
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          width="100%"
          height="100%"
          allowFullScreen={true}
          referrerPolicy="no-referrer-when-downgrade"
          className={cn("absolute top-0 left-0 w-full h-full border-0", className)}
        />
      </div>
    </div>
  );
};

export default GoogleMapEmbed;
