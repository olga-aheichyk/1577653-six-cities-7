import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getUserEmail = (state) => state[NameSpace.USER].userEmail;
export const getUserAvatarUrl = (state) => state[NameSpace.USER].userAvatarUrl;
export const getUserServerError = (state) => state[NameSpace.USER].serverError;
