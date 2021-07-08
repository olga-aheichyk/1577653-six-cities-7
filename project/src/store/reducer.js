import { ActionType } from './action.js';
import { AuthorizationStatus } from '../consts.js';

const initialState = {
  activeCity: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  userEmail: null,
  reviews: [],
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

    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
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
        //userEmail: action.payload.email,
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
