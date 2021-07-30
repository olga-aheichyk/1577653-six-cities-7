import { appData, initialState } from './app-data.js';
import { ActionType } from '../action.js';
import {testOffer, testOffers, testReviews} from '../test-data.js';

describe('Reducer: appData', () => {
  it('should return initial state in case of absence of action type', () => {
    expect(appData(undefined, {}))
      .toEqual(initialState);
  });

  it('should load offers from action payload', () => {
    const state = {
      offers: [],
      isDataLoaded: false,
      serverError: false,
    };

    const loadOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: testOffers,
    };

    expect(appData(state, loadOffersAction)).toEqual({
      offers: testOffers,
      isDataLoaded: true,
      serverError: false,
    });
  });

  it('should update offers with changed offer from payload', () => {
    const state = {
      offers: testOffers,
      serverError: false,
    };

    const updateOffersAction = {
      type: ActionType.UPDATE_OFFERS,
      payload: testOffer,
    };

    const testOfferIndex = testOffers.findIndex((offer) => offer.id === testOffer.id);
    const changedTestOffers = [
      ...testOffers.slice(0, testOfferIndex),
      testOffer,
      ...testOffers.slice((testOfferIndex + 1)),
    ];

    expect(appData(state, updateOffersAction))
      .toEqual({
        offers: changedTestOffers,
        serverError: false,
      });

  });
  it('should return new reviews array from payload', () => {
    const addReviewAction = {
      type: ActionType.ADD_REVIEW,
      payload: testReviews,
    };

    expect(appData({reviews: []}, addReviewAction))
      .toEqual({
        reviews: testReviews,
      });

    expect(appData({reviews: testReviews}, addReviewAction))
      .toEqual({
        reviews: testReviews,
      });
  });

  // it('', () => {});
  // it('', () => {});
  // it('', () => {});
  // it('', () => {});
});
