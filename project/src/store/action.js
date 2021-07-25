import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CITY_CHANGE: 'appChanges/cityChange',
  LOAD_OFFERS: 'appData/loadOffers',
  LOAD_FAVORITE_OFFERS: 'appData/loadFavoriteOffers',
  UPDATE_OFFERS: 'appData/updateOffers',
  LOAD_REVIEWS: 'appData/loadReviews',
  LOAD_NEAREST_OFFERS: 'appData/loadNearestOffers',
  ADD_REVIEW: 'appData/addReview',
  AUTHORIZATION_REQUIRED: 'user/authorizationRequired',
  REDIRECT_TO_ROUTE: 'appChanges/redirectToRoute',
  LOG_IN: 'user/login',
  LOG_OUT: 'user/logout',
  ACTIVE_ERROR_NOTIFICATION: 'appData/activeErrorNotification',
  ACTIVE_FAVORITE_OFFERS_LOADING_ERROR: 'appData/activeFavoriteOffersLoadingError',
  CHANGE_COMMENT_SENDING_STATUS: 'appData/changeReviewSendingStatus',
};

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => ({
  payload: offers,
}));

export const cityChange = createAction(ActionType.CITY_CHANGE, (evtTargetTextContent) => ({
  payload: evtTargetTextContent,
}));

export const loadFavoriteOffers = createAction(ActionType.LOAD_FAVORITE_OFFERS, (favoriteOffers) => ({
  payload: favoriteOffers,
}));

export const updateOffers = createAction(ActionType.UPDATE_OFFERS, (offer) => ({
  payload: offer,
}));

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews) => ({
  payload: reviews,
}));

export const loadNearestOffers = createAction(ActionType.LOAD_NEAREST_OFFERS, (nearestOffers) => ({
  payload: nearestOffers,
}));

export const addReview = createAction(ActionType.ADD_REVIEW, (newReviewsList) => ({
  payload: newReviewsList,
}));

export const authorizationRequired = createAction(ActionType.AUTHORIZATION_REQUIRED, (payload) => ({
  payload,
}));

export const logIn = createAction(ActionType.LOG_IN, (payload) => ({
  payload,
}));

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));

export const logOut = createAction(ActionType.LOG_OUT);

export const activeErrorNotification = createAction(ActionType.ACTIVE_ERROR_NOTIFICATION);

export const activeFavoriteOffersLoadingError = createAction(ActionType.ACTIVE_FAVORITE_OFFERS_LOADING_ERROR);

export const changeCommentSendingStatus = createAction(ActionType.CHANGE_COMMENT_SENDING_STATUS, (status) => ({
  payload: status,
}));

