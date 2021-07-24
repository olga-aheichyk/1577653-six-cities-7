import { ApiRoute, AppRoute, AuthorizationStatus, BACKEND_URL } from '../consts.js';
import { ActionCreator } from './action.js';
import { adaptAuthInfoToClient, adaptOfferToClient, adaptReviewToClient } from '../components/utils.js';


export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.OFFERS)
    .then(({data}) => data.map(adaptOfferToClient))
    .then((offers) => dispatch(ActionCreator.loadOffers(offers)))
    .catch(() => dispatch(ActionCreator.activeErrorNotification()))
);

export const fetchFavoriteOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITE)
    .then(({data}) => data.map(adaptOfferToClient))
    .then((favoriteOffers) => dispatch(ActionCreator.loadFavoriteOffers(favoriteOffers)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(({data}) => adaptAuthInfoToClient(data))
    .then((adaptedAuthInfo) => dispatch(ActionCreator.login(adaptedAuthInfo)))
    .catch(() => dispatch(ActionCreator.authorizationRequired(AuthorizationStatus.NO_AUTH)))
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => adaptAuthInfoToClient(data))
    .then((adaptedAuthInfo) => {
      localStorage.setItem('token', adaptedAuthInfo.token);
      dispatch(ActionCreator.login(adaptedAuthInfo));
    })
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout()))
);

export const fetchReviewsList = (id) => (dispatch, _getState, api) => (
  api.get(`${BACKEND_URL}${ApiRoute.REVIEWS}${id}`)
    .then(({data}) => data.map(adaptReviewToClient))
    .then((reviews) => dispatch(ActionCreator.loadReviews(reviews)))
);

export const fetchNearestOffers = (id) => (dispatch, _getState, api) => (
  api.get(`${BACKEND_URL}/hotels/${id}/nearby`)
    .then(({data}) => data.map(adaptOfferToClient))
    .then((adaptedNearestOffers) => dispatch(ActionCreator.loadNearestOffers(adaptedNearestOffers)))
);

export const changeFavoritesStatus = (id, status) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.FAVORITE}/${id}/${status}`)
    .then(({data}) => adaptOfferToClient(data))
    .then((offer) => dispatch(ActionCreator.updateOffers(offer)))
    .catch(() => dispatch(ActionCreator.redirectToRoute(AppRoute.LOGIN)))
);

export const postComment = (id, {rating, comment}) => (dispatch, _getState, api) => (
  api.post(`${BACKEND_URL}${ApiRoute.REVIEWS}${id}`, {rating, comment})
    .then(({data}) => data.map(adaptReviewToClient))
    .then((newReviewsList) => dispatch(ActionCreator.addReview(newReviewsList)))
);
