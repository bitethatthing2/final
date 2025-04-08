"use client";

import React from 'react';
import GoogleMapEmbed from './GoogleMapEmbed';

interface PortlandMapProps {
  embedUrl?: string; // Keep for backwards compatibility
  title?: string;    // Keep for backwards compatibility
}

// Portland coordinates for The Side Hustle Bar
const PORTLAND_LAT = 45.5184767;
const PORTLAND_LNG = -122.6794497;

const PortlandMap: React.FC<PortlandMapProps> = () => {
  return (
    <GoogleMapEmbed
      lat={PORTLAND_LAT}
      lng={PORTLAND_LNG}
      zoom={15}
    />
  );
};

export default PortlandMap;
