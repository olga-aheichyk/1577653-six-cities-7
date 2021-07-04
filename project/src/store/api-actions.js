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


export const loadReviews = (id, setState) => {
  fetch(`${BACKEND_URL}${ApiRoute.REVIEWS}${id}`)
    .then((response) => response.json())
    .then((reviews) => reviews.map(adaptReviewToClient))
    .then((adaptedReviews) => setState(adaptedReviews));
};

export const loadNearestOffers = (id, setState) => {
  fetch(`${BACKEND_URL}/hotels/${id}/nearby`)
    .then((response) => response.json())
    .then((offers) => offers.map(adaptOfferToClient))
    .then((adaptedNearestOffers) => setState(adaptedNearestOffers));
};


export const postReview = (id, formData, onSuccess) => {
  fetch(`${BACKEND_URL}${ApiRoute.REVIEWS}${id}`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => onSuccess(response));
};
