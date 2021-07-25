import { ActionType } from '../action.js';

const initialState = {
  activeCity: 'Paris',
};

const appChange = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        activeCity: action.payload,
      };

    default:
      return state;
  }
};

export {appChange};
