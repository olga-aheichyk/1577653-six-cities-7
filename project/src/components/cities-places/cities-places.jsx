import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCardsList from '../place-cards-list/place-cards-list.jsx';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import Sort from '../sort/sort.jsx';
import { SortType } from '../../consts.js';

function CitiesPlaces(props) {
  const {
    activeCity,
    activeCityOffers,
    onPlaceCardHover,
    onPlaceCardAwayHover } = props;

  const [activeSortType, setActiveSortType] = useState(SortType.POPULAR);

  const onSortingTypeClick = (evtTargetTextContent) => {
    setActiveSortType(evtTargetTextContent);
  };

  const sortOffers = (offers, currentSortType) => {
    switch(currentSortType ) {
      case SortType.PRICE_HIGH_TO_LOW:
        return offers.slice().sort((a, b) => b.price - a.price);

      case SortType.PRICE_LOW_TO_HIGH:
        return offers.slice().sort((a, b) => a.price - b.price);

      case SortType.TOP_RATED_FIRST:
        return offers.slice().sort((a, b) => b.rating - a.rating);

      default:
        return offers;
    }
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {activeCityOffers.length} {activeCityOffers.length === 1 ? 'place' : 'places'} to stay in {activeCity}
      </b>
      <Sort
        activeSortType={activeSortType}
        onSortingTypeClick={onSortingTypeClick}
      />
      <PlaceCardsList
        offers={sortOffers(activeCityOffers, activeSortType)}
        onPlaceCardHover={onPlaceCardHover}
        onPlaceCardAwayHover={onPlaceCardAwayHover}
      />
    </section>
  );
}

CitiesPlaces.propTypes = {
  activeCity: PropTypes.string.isRequired,
  activeCityOffers: placeCardsListProp,
  onPlaceCardHover: PropTypes.func.isRequired,
  onPlaceCardAwayHover: PropTypes.func.isRequired,
};

export default CitiesPlaces;
