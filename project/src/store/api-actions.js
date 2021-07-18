import { ApiRoute, AppRoute, AuthorizationStatus, BACKEND_URL } from '../consts.js';
import { ActionCreator } from './action.js';
import { adaptOfferToClient, adaptReviewToClient } from '../components/utils.js';


export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.OFFERS)
    .then(({data}) => data.map(adaptOfferToClient))
    .then((offers) => dispatch(ActionCreator.loadOffers(offers)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(() => dispatch(ActionCreator.authorizationRequired(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(ActionCreator.login(email)))
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

export const fetchNearestOffers = (id) => (dispatch, _getState, api) => {
  api.get(`${BACKEND_URL}/hotels/${id}/nearby`)
    .then(({data}) => data.map(adaptOfferToClient))
    .then((adaptedNearestOffers) => dispatch(ActionCreator.loadNearestOffers(adaptedNearestOffers)));
};

export const changeFavoritesStatus = (id, status) => (dispatch, _getState, api) => {
  api.post(`${BACKEND_URL}/favorite/${id}/${status}`)
    .then(({data}) => adaptOfferToClient(data))
    .then((offer) => dispatch(ActionCreator.updateOffers(offer)));
};


export const postComment = (api, id, {rating, comment}, onSuccess) => (
  api.post(`${BACKEND_URL}${ApiRoute.REVIEWS}${id}`, {rating, comment})
    .then(({data}) => data.map(adaptReviewToClient))
    .then((newReviewsList) => {
      onSuccess(newReviewsList);
    })
);
