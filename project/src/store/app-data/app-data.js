import { activeErrorNotification,
  activeFavoriteOffersLoadingError,
  addReview,
  changeCommentSendingStatus,
  loadFavoriteOffers,
  loadNearestOffers,
  loadOffers,
  loadReviews,
  updateOffers } from '../action.js';
import { createReducer } from '@reduxjs/toolkit';

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

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
      state.serverError = false;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
      state.favoriteOffersLoadingError = false;
      state.serverError = false;
    })
    .addCase(updateOffers, (state, action) => {
      const offerIndex = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers = [
        ...state.offers.slice(0, (offerIndex)),
        action.payload,
        ...state.offers.slice(offerIndex + 1),
      ];
      state.serverError = false;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.serverError = false;
    })
    .addCase(loadNearestOffers, (state, action) => {
      state.nearestOffers = action.payload;
      state.serverError = false;
    })
    .addCase(addReview, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(activeErrorNotification, (state) => {
      state.serverError = true;
      state.isDataLoaded = true;
    })
    .addCase(activeFavoriteOffersLoadingError, (state) => {
      state.favoriteOffersLoadingError = true;
    })
    .addCase(changeCommentSendingStatus, (state, action) => {
      state.isCommentSending = action.payload;
    });
});

export { initialState, appData };
