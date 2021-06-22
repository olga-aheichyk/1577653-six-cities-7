export const ActionType = {
  CITY_CHANGE: 'CITY_CHANGE',
  OFFERS_COUNT_CHANGE: 'OFFERS_COUNT_CHANGE',
  RESET_APP: 'RESET_APP',
};

export const ActionCreator = {
  cityChange: (evtTargetTextContent) => ({
    type: ActionType.CITY_CHANGE,
    payload: evtTargetTextContent,
  }),
  resetApp: () => ({
    type: ActionType.RESET_APP,
  }),
};

