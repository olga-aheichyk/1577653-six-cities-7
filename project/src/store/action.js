export const ActionType = {
  CITY_CHANGE: 'cityChange',
  OFFERS_COUNT_CHANGE: 'offersCountChange',
  RESET_APP: 'resetApp',
  LOAD_OFFERS: 'loadOffers',
  AUTHORIZATION_REQUIRED: 'authorizationRequired',
  LOG_OUT: 'logOut',
};

export const ActionCreator = {
  cityChange: (evtTargetTextContent) => ({
    type: ActionType.CITY_CHANGE,
    payload: evtTargetTextContent,
  }),
  offersCountChange: (offers) => ({
    type: ActionType.OFFERS_COUNT_CHANGE,
    payload: offers,
  }),
  resetApp: () => ({
    type: ActionType.RESET_APP,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  authorizationRequired: (status) => ({
    type: ActionType.AUTHORIZATION_REQUIRED,
    payload: status,
  }),
  logOut: () => ({
    type: ActionType.LOG_OUT,
  }),
};

