import { ApiRoute, AppRoute, AuthorizationStatus, BACKEND_URL } from '../consts.js';
import {
  activeErrorNotification,
  activeFavoriteOffersLoadingError,
  addReview,
  authorizationRequired,
  loadFavoriteOffers,
  loadNearestOffers,
  loadOffers,
  loadReviews,
  logIn,
  logOut,
  redirectToRoute,
  updateOffers
} from './action.js';
import { adaptAuthInfoToClient, adaptOfferToClient, adaptReviewToClient } from '../utils.js';


export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.OFFERS)
    .then(({ data }) => data.map(adaptOfferToClient))
    .then((offers) => dispatch(loadOffers(offers)))
    .catch(() => dispatch(activeErrorNotification()))
);

export const fetchFavoriteOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITE)
    .then(({ data }) => data.map(adaptOfferToClient))
    .then((favoriteOffers) => dispatch(loadFavoriteOffers(favoriteOffers)))
    .catch(() => dispatch(activeFavoriteOffersLoadingError()))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({ data }) => adaptAuthInfoToClient(data))
    .then((adaptedAuthInfo) => dispatch(logIn(adaptedAuthInfo)))
    .catch(() => dispatch(authorizationRequired(AuthorizationStatus.NO_AUTH)))
);

export const login = ({ login: email, password }) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, { email, password })
    .then(({ data }) => adaptAuthInfoToClient(data))
    .then((adaptedAuthInfo) => {
      localStorage.setItem('token', adaptedAuthInfo.token);
      dispatch(logIn(adaptedAuthInfo));
    })
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
    //.catch(() => dispatch(activeErrorNotification()))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(logOut()))
);

export const fetchReviewsList = (id) => (dispatch, _getState, api) => (
  api.get(`${BACKEND_URL}${ApiRoute.REVIEWS}${id}`)
    .then(({ data }) => data.map(adaptReviewToClient))
    .then((reviews) => dispatch(loadReviews(reviews)))
    .catch(() => dispatch(activeErrorNotification()))
);

export const fetchNearestOffers = (id) => (dispatch, _getState, api) => (
  api.get(`${BACKEND_URL}/hotels/${id}/nearby`)
    .then(({ data }) => data.map(adaptOfferToClient))
    .then((adaptedNearestOffers) => dispatch(loadNearestOffers(adaptedNearestOffers)))
    .catch(() => dispatch(activeErrorNotification()))
);

export const changeFavoritesStatus = (id, status) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.FAVORITE}/${id}/${status}`)
    .then(({ data }) => adaptOfferToClient(data))
    .then((offer) => dispatch(updateOffers(offer)))
    .catch(() => dispatch(redirectToRoute(AppRoute.LOGIN)))
);

export const postComment = (id, { rating, comment }) => (dispatch, _getState, api) => (
  api.post(`${BACKEND_URL}${ApiRoute.REVIEWS}${id}`, { rating, comment })
    .then(({ data }) => data.map(adaptReviewToClient))
    .then((newReviewsList) => dispatch(addReview(newReviewsList)))
);
