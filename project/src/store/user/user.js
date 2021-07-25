import { ActionType } from '../action.js';
import { AuthorizationStatus } from '../../consts.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userEmail: null,
  userAvatarUrl: null,
  serverError: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZATION_REQUIRED:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    case ActionType.LOG_IN:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: action.payload.email,
        userAvatarUrl: action.payload.avatarUrl,
        serverError: false,
      };

    case ActionType.LOG_OUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: null,
        userAvatarUrl: null,
      };

    default:
      return state;
  }
};

export {user};
