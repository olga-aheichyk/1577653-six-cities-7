import { useEffect, useState } from 'react';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

function useMap(mapRef, location) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map('map')
        .setView({
          lat: location.latitude,
          lng: location.longitude,
        }, location.zoom);

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }

    if (mapRef.current !== null && map !== null) {
      map.setView({
        lat: location.latitude,
        lng: location.longitude,
      }, location.zoom);
    }

  }, [mapRef, map, location]);

  return map;
}

export default useMap;
