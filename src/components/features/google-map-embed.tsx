interface GoogleMapEmbedProps {
  lat: number;
  lng: number;
  zoom?: number;
  apiKey?: string;
}

export function GoogleMapEmbed({ lat, lng, zoom = 15, apiKey = "" }: GoogleMapEmbedProps) {
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=${zoom}`;

  return (
    <div className="w-full h-full">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        className="border-0"
        // Removed loading="lazy" attribute for compatibility with Safari on iOS < 16.4
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
        allow="fullscreen"
      />
    </div>
  );
}
