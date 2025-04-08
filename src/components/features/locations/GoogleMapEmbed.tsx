"use client";

import React, { useRef, useEffect, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // Ensure the src is properly formatted for Google Maps
  const getSafeMapUrl = (url: string) => {
    // Make sure the URL has the correct format and parameters
    if (!url.includes('maps.google.com') && !url.includes('google.com/maps')) {
      return url; // Return as is if not a Google Maps URL
    }

    // Add necessary parameters for better security and performance
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}output=embed&z=15`;
  };

  // Custom intersection observer for lazy loading (more compatible than loading="lazy")
  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      root: null,
      rootMargin: '200px', // Load when within 200px of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect(); // Stop observing once in viewport
        }
      });
    }, options);

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!iframeRef.current || !isInViewport) return;

    const handleLoad = () => {
      console.log('Google Maps iframe loaded successfully');
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = (e: Event) => {
      console.error('Error loading Google Maps iframe:', e);
      setHasError(true);
      setIsLoaded(false);
    };

    // Add event listeners
    const iframe = iframeRef.current;
    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    // Clean up event listeners
    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, [isInViewport]);

  return (
    <div ref={containerRef} className="w-full rounded-lg overflow-hidden border border-white/10 shadow-md">
      {/* Maintain aspect ratio for responsiveness */}
      <div className="relative pb-[56.25%] h-0"> {/* 16:9 Aspect Ratio */}
        {hasError ? (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/20 text-white">
            <p>Unable to load map. Please try again later.</p>
          </div>
        ) : isInViewport ? (
          <iframe
            ref={iframeRef}
            src={getSafeMapUrl(src)}
            title={title}
            width="100%"
            height="100%"
            allowFullScreen={true}
            referrerPolicy="no-referrer-when-downgrade"
            className={cn("absolute top-0 left-0 w-full h-full border-0", 
              !isLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-300",
              className
            )}
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/10 text-white">
            <p>Loading map...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleMapEmbed;
