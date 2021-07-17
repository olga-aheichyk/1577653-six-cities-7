export const ActionType = {
  INIT: 'init',
  CITY_CHANGE: 'cityChange',
  LOAD_OFFERS: 'loadOffers',
  LOAD_REVIEWS: 'loadReviews',
  LOAD_NEAREST_OFFERS: 'loadNearestOffers',
  ADD_REVIEW: 'addReview',
  AUTHORIZATION_REQUIRED: 'authorizationRequired',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
  LOG_IN: 'login',
  LOG_OUT: 'logout',
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
  login: (email) => ({
    type: ActionType.LOG_IN,
    payload: email,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  logout: () => ({
    type: ActionType.LOG_OUT,
  }),
};

