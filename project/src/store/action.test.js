import { AuthorizationStatus } from '../consts.js';
import { ActionType, authorizationRequired, cityChange, loadOffers, logOut } from './action.js';

describe('Actions', () => {
  it('action creator for loading offers returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [],
    };

    expect(loadOffers([])).toEqual(expectedAction);
  });

  it('action creator for city change returns correct action', () => {
    const testCity = 'Paris';

    const expectedAction = {
      type: ActionType.CITY_CHANGE,
      payload: testCity,
    };

    expect(cityChange(testCity)).toEqual(expectedAction);
  });

  it('action creator for checking auth returns correct action', () => {
    const testAuthorizationStatus = AuthorizationStatus.AUTH;

    const expectedAction = {
      type: ActionType.AUTHORIZATION_REQUIRED,
      payload: testAuthorizationStatus,
    };

    expect(authorizationRequired(testAuthorizationStatus)).toEqual(expectedAction);
  });

  it('action creator for loging out returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOG_OUT,
    };

    expect(logOut()).toEqual(expectedAction);
  });
});

