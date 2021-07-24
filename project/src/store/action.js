export const ActionType = {
  CITY_CHANGE: 'cityChange',
  LOAD_OFFERS: 'loadOffers',
  LOAD_FAVORITE_OFFERS: 'loadFavoriteOffers',
  UPDATE_OFFERS: 'updateOffers',
  LOAD_REVIEWS: 'loadReviews',
  LOAD_NEAREST_OFFERS: 'loadNearestOffers',
  ADD_REVIEW: 'addReview',
  AUTHORIZATION_REQUIRED: 'authorizationRequired',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
  LOG_IN: 'login',
  LOG_OUT: 'logout',
  ACTIVE_ERROR_NOTIFICATION: 'activeErrorNotification',
};

export const ActionCreator = {
  cityChange: (evtTargetTextContent) => ({
    type: ActionType.CITY_CHANGE,
    payload: evtTargetTextContent,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  loadFavoriteOffers: (favoriteOffers) => ({
    type: ActionType.LOAD_FAVORITE_OFFERS,
    payload: favoriteOffers,
  }),
  updateOffers: (offer) => ({
    type: ActionType.UPDATE_OFFERS,
    payload: offer,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  loadNearestOffers: (nearestOffers) => ({
    type: ActionType.LOAD_NEAREST_OFFERS,
    payload: nearestOffers,
  }),
  addReview: (newReviewsList) => ({
    type: ActionType.ADD_REVIEW,
    payload: newReviewsList,
  }),
  authorizationRequired: (payload) => ({
    type: ActionType.AUTHORIZATION_REQUIRED,
    payload,
  }),
  login: (payload) => ({
    type: ActionType.LOG_IN,
    payload,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  logout: () => ({
    type: ActionType.LOG_OUT,
  }),
  activeErrorNotification: () => ({
    type: ActionType.ACTIVE_ERROR_NOTIFICATION,
  }),
};

