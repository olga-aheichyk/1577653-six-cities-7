import React from 'react';
import FavoritesListItem from '../favorites-list-item/favorites-list-item.jsx';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';

function FavoritesNotEmpty(props) {
  const {favoriteOffers} = props;
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {<FavoritesListItem offers={favoriteOffers} />}
      </ul>
    </section>
  );
}

FavoritesNotEmpty.propTypes = {
  favoriteOffers: placeCardsListProp,
};

export default FavoritesNotEmpty;
