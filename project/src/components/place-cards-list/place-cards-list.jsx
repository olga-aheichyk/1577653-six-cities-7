import React from 'react';
import PlaceCard from '../place-card/place-card.jsx';
import placeCardsListProp from './place-cards-list.prop.js';

function PlaceCardsList(props) {
  const {offers} = props;


  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}

PlaceCardsList.propTypes = {
  offers: placeCardsListProp,
};

export default PlaceCardsList;
