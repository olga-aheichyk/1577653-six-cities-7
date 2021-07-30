import MockAdapter from 'axios-mock-adapter';
import { ApiRoute, AppRoute } from '../consts.js';
import {createApi} from '../services/api.js';
import { ActionType } from './action.js';
import { checkAuth, fetchFavoriteOffersList, fetchOffersList, login, logout } from './api-actions.js';
import { adaptedTestServerOffer, adaptedTestServerAuthInfo, testServerAuthInfo, testServerOffer } from './test-data.js';


let api = null;

describe('Async operations', () => {
  beforeAll(() => {
    api = createApi(() => {});
  });

  it('should make a correct API call to GET /hotels', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchOffersListLoader = fetchOffersList();

    apiMock
      .onGet(ApiRoute.OFFERS)
      .reply(200, [testServerOffer]);

    return fetchOffersListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [adaptedTestServerOffer],
        });
      });
  });

  it('should make a correct API call to GET /favorites', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchFavoriteOffersListLoader = fetchFavoriteOffersList();

    apiMock
      .onGet(ApiRoute.FAVORITE)
      .reply(200, [testServerOffer]);

    return fetchFavoriteOffersListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE_OFFERS,
          payload: [adaptedTestServerOffer],
        });
      });
  });

  it('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(ApiRoute.LOGIN)
      .reply(200, testServerAuthInfo);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOG_IN,
          payload: adaptedTestServerAuthInfo,
        });
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const testUser = {
      email: 'test@mail.ru',
      password: '1234567890',
    };
    const loginLoader = login(testUser);

    apiMock
      .onPost(ApiRoute.LOGIN)
      .reply(200, testServerAuthInfo);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOG_IN,
          payload: adaptedTestServerAuthInfo,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.ROOT,
        });
      });
  });

  it('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onDelete(ApiRoute.LOGOUT)
      .reply(204, '');

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOG_OUT,
        });
      });
  });
});
