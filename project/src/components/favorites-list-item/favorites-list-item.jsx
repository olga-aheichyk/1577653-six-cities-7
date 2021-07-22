import React from 'react';
import PlaceCard from '../place-card/place-card.jsx';
import { Link } from 'react-router-dom';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import { PlaceCardVariant, PlaceCardVariantDetails } from '../../consts.js';

function FavoritesListItem(props) {
  const { offers } = props;

  const cityNames = Array.from(
    new Set(offers.slice().map((offer) => offer.city.name)),
  );

  return cityNames.map((cityName) => (
    <li className="favorites__locations-items" key={cityName}>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/">
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers
          .filter((offer) => offer.city.name === cityName)
          .map((offer) => (
            <PlaceCard
              key={offer.id}
              details={PlaceCardVariantDetails[PlaceCardVariant.FAVORITES]}
              offer={offer}
            />
          ))}
      </div>
    </li>
  ));
}

FavoritesListItem.propTypes = {
  offers: placeCardsListProp,
};

export default FavoritesListItem;
