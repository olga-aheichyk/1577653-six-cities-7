import React from 'react';
import PlaceCard from '../place-card/place-card';
import { Link } from 'react-router-dom';

function FavoritesListItem() {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/">
            <span>Cologne</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {new Array(2).fill(null).map((item, i = 1) => (
          <PlaceCard key={item + i++} item={item} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesListItem;
