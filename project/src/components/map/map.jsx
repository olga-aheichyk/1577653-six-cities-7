import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map.js';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import { PinParameter } from '../../consts.js';

const defaultPinIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PinParameter.X, PinParameter.Y],
  iconAnchor: [(PinParameter.X)/ 2, PinParameter.Y],
});

const activePinIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [PinParameter.X, PinParameter.Y],
  iconAnchor: [(PinParameter.X)/ 2, PinParameter.Y],
});


function Map({location, offers, activeOffer}) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeOffer.id) ? activePinIcon : defaultPinIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, activeOffer]);

  return (
    <div
      style={{height: '100%', width: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

Map.propTypes = {
  location: PropTypes.object.isRequired,
  offers: placeCardsListProp,
  activeOffer: PropTypes.object.isRequired,
};

export default Map;

