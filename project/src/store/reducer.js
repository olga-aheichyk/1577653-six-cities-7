import { ActionType } from './action.js';
//import { offers } from '../mocks/offers.js';
import { AuthorizationStatus } from '../consts.js';

const filterActiveCityOffers = (activeCity, allOffers) => allOffers.slice().filter((offer) => offer.city.name === activeCity);

const initialState = {
  activeCity: 'Paris',
  activeCityOffers: [],
  offers: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        activeCity: action.payload,
        activeCityOffers: filterActiveCityOffers(action.payload, state.offers),
      };

    case ActionType.RESET_APP:
      return initialState;

    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        activeCityOffers: filterActiveCityOffers(initialState.activeCity, action.payload),
        isDataLoaded: true,
      };

    case ActionType.AUTHORIZATION_REQUIRED:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    case ActionType.LOG_OUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };

    default:
      return state;
  }
};

export {reducer};
