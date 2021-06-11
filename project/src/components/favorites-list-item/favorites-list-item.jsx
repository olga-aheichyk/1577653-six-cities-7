import React from 'react';
import PlaceCard from '../place-card/place-card.jsx';
import { Link } from 'react-router-dom';
import appProp from '../app/app.prop.js';

function FavoritesListItem(props) {
  const {offers} = props;

  const cityNames = Array.from(new Set(offers.slice().map((offer) => offer.city.name)));

  if (offers.length) {
    return cityNames.map((cityName, i = 1) =>
      (
        <li className="favorites__locations-items" key={cityName + i++}>
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
                <PlaceCard key={offer.id} offer={offer} />
              ))}
          </div>
        </li>
      ),
    );
  }

  return '';

}

FavoritesListItem.propTypes = {
  offers: appProp,
};

export default FavoritesListItem;
