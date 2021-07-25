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

export const cityChange = (evtTargetTextContent) => ({
  type: ActionType.CITY_CHANGE,
  payload: evtTargetTextContent,
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers,
});

export const loadFavoriteOffers = (favoriteOffers) => ({
  type: ActionType.LOAD_FAVORITE_OFFERS,
  payload: favoriteOffers,
});

export const updateOffers = (offer) => ({
  type: ActionType.UPDATE_OFFERS,
  payload: offer,
});

export const loadReviews = (reviews) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: reviews,
});

export const loadNearestOffers = (nearestOffers) => ({
  type: ActionType.LOAD_NEAREST_OFFERS,
  payload: nearestOffers,
});

export const addReview = (newReviewsList) => ({
  type: ActionType.ADD_REVIEW,
  payload: newReviewsList,
});

export const authorizationRequired = (payload) => ({
  type: ActionType.AUTHORIZATION_REQUIRED,
  payload,
});

export const logIn = (payload) => ({
  type: ActionType.LOG_IN,
  payload,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

export const logOut = () => ({
  type: ActionType.LOG_OUT,
});

export const activeErrorNotification = () => ({
  type: ActionType.ACTIVE_ERROR_NOTIFICATION,
});

export const activeFavoriteOffersLoadingError = () => ({
  type: ActionType.ACTIVE_FAVORITE_OFFERS_LOADING_ERROR,
});

export const changeCommentSendingStatus = (status) => ({
  type: ActionType.CHANGE_COMMENT_SENDING_STATUS,
  payload: status,
});

