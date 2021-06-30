import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import OfferPropertyScreen from '../offer-property-screen/offer-property-screen.jsx';
import LogInScreen from '../log-in-screen/log-in-screen.jsx';
import { AppRoute, AuthorizationStatus } from '../../consts.js';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import reviewsListProp from '../reviews-list/reviews-list.prop.js';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import { PrivateRoute } from '../private-route/private-route.jsx';
import browserHistory from '../../browser-history';

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
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainScreen/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          authorizationStatus={authorizationStatus}
          render={
            () => (
              <FavoritesScreen
                offers={offers}
              />
            )
          }
        />
        <Route exact path={AppRoute.LOGIN}>
          <LogInScreen />
        </Route>
        <Route exact path={AppRoute.OFFER}
          render={({match}) => (
            <OfferPropertyScreen
              id={match.params.id}
              reviews={reviews}
            />
          )}
        />
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

