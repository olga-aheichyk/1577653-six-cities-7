import React from 'react';
import FavoritesButton from './favorites-button.jsx';

import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createApi } from '../../services/api.js';
import { testOffers } from '../../test-data.js';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FavoritesButtonVariant, FavoritesButtonVariantDetails } from '../../consts.js';

let store = null;
let api = null;

describe('Component FavoritesButtonScreen', () => {
  beforeAll(() => {
    api = createApi(() => {});
    const createFakeStore = configureStore([thunk.withExtraArgument(api)]);
    store = createFakeStore({
      DATA: {offers: testOffers, favoriteOffers: []},
    });
  });

  it('should invoke redux dispatch function on button click', () => {
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    render(
      <Provider store={store}>
        <FavoritesButton
          details={FavoritesButtonVariantDetails[FavoritesButtonVariant.PLACE_CARD]}
          isFavorite={false}
          id={111}
        />
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
  });
});
