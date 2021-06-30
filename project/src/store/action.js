export const ActionType = {
  CITY_CHANGE: 'cityChange',
  LOAD_OFFERS: 'loadOffers',
  AUTHORIZATION_REQUIRED: 'authorizationRequired',
  REDIRECT_TO_ROUTE: 'redirectToRoute',
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
  authorizationRequired: (status) => ({
    type: ActionType.AUTHORIZATION_REQUIRED,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  logout: () => ({
    type: ActionType.LOG_OUT,
  }),
};

