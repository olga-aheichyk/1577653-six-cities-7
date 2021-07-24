import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map.js';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import { PinParameter } from '../../consts.js';
import placeCardProp from '../place-card/place-card.prop.js';

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

const pinsOnMap = [];

const removePins = () => {
  pinsOnMap.forEach((pin) => {
    pin.remove();
  });
  pinsOnMap.length = 0;
};
function Map({location, offers, activeOffer}) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      removePins();
      offers.forEach((offer) => {
        const pin = leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeOffer.id) ? activePinIcon : defaultPinIcon,
          });
        pin.addTo(map);
        pinsOnMap.push(pin);
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
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  offers: placeCardsListProp,
  activeOffer: PropTypes.oneOfType([
    PropTypes.shape({}),
    placeCardProp,
  ]).isRequired,
};

export default Map;

