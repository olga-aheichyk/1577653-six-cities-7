import { ActionType } from './action.js';
import { offers } from '../mocks/offers.js';

const filterActiveCityOffers = (activeCity, allOffers) => allOffers.slice().filter((offer) => offer.city.name === activeCity);

const initialState = {
  activeCity: 'Paris',
  activeCityOffers: filterActiveCityOffers('Paris', offers),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        activeCity: action.payload,
        activeCityOffers: filterActiveCityOffers(action.payload, offers),
      };

    case ActionType.RESET_APP:
      return initialState;

    default:
      return state;
  }
};

export {reducer};
