import {NameSpace} from '../root-reducer';

export const getOffers = (state) => state[NameSpace.DATA].offers;
export const getFavoriteOffers = (state) => state[NameSpace.DATA].favoriteOffers;
export const getNearestOffers = (state) => state[NameSpace.DATA].nearestOffers;
export const getReviews = (state) => state[NameSpace.DATA].reviews;
export const getLoadedDataStatus = (state) => state[NameSpace.DATA].isDataLoaded;
export const getServerErrorOccurence = (state) => state[NameSpace.DATA].serverError;
export const getLoadingFavoriteOffersErrorOccurence = (state) => state[NameSpace.DATA].favoriteOffersLoadingError;
export const getCommentSendingStatus = (state) => state[NameSpace.DATA].isCommentSending;
