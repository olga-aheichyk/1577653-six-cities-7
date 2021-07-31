import React from 'react';
import PropTypes from 'prop-types';
import placeCardsListProp from './place-cards-list.prop.js';

import PlaceCard from '../place-card/place-card.jsx';

import { PlaceCardVariant, PlaceCardVariantDetails } from '../../consts.js';

function PlaceCardsList(props) {
  const {offers, onPlaceCardHover, onPlaceCardAwayHover} = props;


  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          details={PlaceCardVariantDetails[PlaceCardVariant.MAIN]}
          offer={offer}
          onPlaceCardHover={onPlaceCardHover}
          onPlaceCardAwayHover={onPlaceCardAwayHover}
        />
      ))}
    </div>
  );
}

PlaceCardsList.propTypes = {
  offers: placeCardsListProp,
  onPlaceCardHover: PropTypes.func.isRequired,
  onPlaceCardAwayHover: PropTypes.func.isRequired,
};

export default PlaceCardsList;
