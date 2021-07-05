export const ActionType = {
  INIT: 'init',
  CITY_CHANGE: 'cityChange',
  LOAD_OFFERS: 'loadOffers',
  AUTHORIZATION_REQUIRED: 'authorizationRequired',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
  LOG_IN: 'login',
  LOG_OUT: 'logout',
};

export const ActionCreator = {
  init: () => ({
    type: ActionType.INIT,
  }),
  cityChange: (evtTargetTextContent) => ({
    type: ActionType.CITY_CHANGE,
    payload: evtTargetTextContent,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
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

