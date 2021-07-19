import { ActionType } from './action.js';
import { AuthorizationStatus } from '../consts.js';

const initialState = {
  activeCity: 'Paris',
  offers: [],
  favoriteOffers: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  userEmail: null,
  reviews: [],
  nearestOffers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        activeCity: action.payload,
      };

    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };

    case ActionType.LOAD_FAVORITE_OFFERS:
      return {
        ...state,
        favoriteOffers: action.payload,
      };

    case ActionType.UPDATE_OFFERS:
      //const offerIndex = state.offers.findIndex((offer) => offer.id === action.payload.id);
      return {
        ...state,
        offers: [
          ...state.offers.slice(0, (state.offers.findIndex((offer) => offer.id === action.payload.id))),
          action.payload,
          ...state.offers.slice((state.offers.findIndex((offer) => offer.id === action.payload.id)) + 1),
        ],
      };

    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case ActionType.LOAD_NEAREST_OFFERS:
      return {
        ...state,
        nearestOffers: action.payload,
      };

    case ActionType.ADD_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };

    case ActionType.AUTHORIZATION_REQUIRED:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    case ActionType.LOG_IN:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: action.payload,
      };

    case ActionType.LOG_OUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
      };

    default:
      return state;
  }
};

export {reducer};
