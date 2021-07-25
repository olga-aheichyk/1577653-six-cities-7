import { ActionType } from '../action.js';

const initialState = {
  offers: [],
  favoriteOffers: [],
  nearestOffers: [],
  reviews: [],
  isDataLoaded: false,
  serverError: false,
  favoriteOffersLoadingError: false,
  isCommentSending: false,
};

const appData = (state = initialState, action) => {
  const offerIndex = state.offers.findIndex((offer) => offer.id === action.payload.id);
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
        serverError: false,
      };

    case ActionType.LOAD_FAVORITE_OFFERS:
      return {
        ...state,
        favoriteOffers: action.payload,
        favoriteOffersLoadingError: false,
        serverError: false,
      };

    case ActionType.UPDATE_OFFERS:
      return {
        ...state,
        offers: [
          ...state.offers.slice(0, (offerIndex)),
          action.payload,
          ...state.offers.slice(offerIndex + 1),
        ],
        serverError: false,
      };

    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        serverError: false,
      };

    case ActionType.LOAD_NEAREST_OFFERS:
      return {
        ...state,
        nearestOffers: action.payload,
        serverError: false,
      };

    case ActionType.ADD_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };

    case ActionType.ACTIVE_ERROR_NOTIFICATION:
      return {
        ...state,
        serverError: true,
        isDataLoaded: true,
      };

    case ActionType.ACTIVE_FAVORITE_OFFERS_LOADING_ERROR:
      return {
        ...state,
        favoriteOffersLoadingError: true,
      };

    case ActionType.CHANGE_COMMENT_SENDING_STATUS:
      return {
        ...state,
        isCommentSending: action.payload,
      };

    default:
      return state;
  }
};

export { appData };
