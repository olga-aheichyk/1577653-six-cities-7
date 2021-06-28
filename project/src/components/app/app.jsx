import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import OfferPropertyScreen from '../offer-property-screen/offer-property-screen.jsx';
import LogInScreen from '../log-in-screen/log-in-screen.jsx';
import { AppRoute, AuthorizationStatus } from '../../consts.js';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import reviewsListProp from '../reviews-list/reviews-list.prop.js';
import LoadingScreen from '../loading-screen/loading-screen.jsx';

const isCheckingAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;
function App(props) {
  const {
    offers,
    reviews,
    authorizationStatus,
    isDataLoaded } = props;

  if (isCheckingAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

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
  authorizationStatus: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,

});

export {App};
export default connect(mapStateToProps, null)(App);

