"use client";

import React from 'react';
import GoogleMapEmbed from './GoogleMapEmbed';

interface SalemMapProps {
  embedUrl?: string; 
  title?: string;    
}

// Salem coordinates for The Side Hustle Bar
const SALEM_LAT = 44.9404951;
const SALEM_LNG = -123.0392064;

const SalemMap: React.FC<SalemMapProps> = () => {
  return (
    <GoogleMapEmbed
      lat={SALEM_LAT}
      lng={SALEM_LNG}
      zoom={15}
    />
  );
};

export default SalemMap;
