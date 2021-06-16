import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import OfferPropertyScreen from '../offer-property-screen/offer-property-screen.jsx';
import LogInScreen from '../log-in-screen/log-in-screen.jsx';
import { AppRoute } from '../../consts.js';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import reviewsListProp from '../reviews-list/reviews-list.prop.js';

function App(props) {
  const {offers, reviews } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainScreen
            offers={offers}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LogInScreen />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <FavoritesScreen
            offers={offers}
          />
        </Route>
        <Route exact path={AppRoute.OFFER}>
          <OfferPropertyScreen
            offers={offers}
            reviews={reviews}
          />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offers: placeCardsListProp,
  reviews: reviewsListProp,
};


export default App;

