import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, Router as BrowserRouter} from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';
import MainScreen from '../main-screen/main-screen.jsx';
import FavoritesScreen from '../favorites-screen/favorites-screen.jsx';
import OfferPropertyScreen from '../offer-property-screen/offer-property-screen.jsx';
import LogInScreen from '../log-in-screen/log-in-screen.jsx';
import { AppRoute, AuthorizationStatus } from '../../consts.js';
import LoadingScreen from '../loading-screen/loading-screen.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import browserHistory from '../../browser-history';
import { checkAuth, fetchOffersList } from '../../store/api-actions.js';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';

const isCheckingAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;
function App(props) {
  const {
    authorizationStatus,
    isDataLoaded,
    loadOffers,
    authorizationRequired,
    favoriteOffers,
  } = props;

  useEffect(() => {
    loadOffers();
    authorizationRequired();
  }, [favoriteOffers]);

  if (isCheckingAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT} component={MainScreen} />
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={
            () => <FavoritesScreen />
          }
        />
        <Route exact path={AppRoute.LOGIN}>
          {authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.ROOT} /> : <LogInScreen />}
        </Route>
        <Route exact path={AppRoute.OFFER}
          render={({match}) => (
            <OfferPropertyScreen
              id={match.params.id}
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
  authorizationStatus: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  loadOffers: PropTypes.func.isRequired,
  authorizationRequired: PropTypes.func.isRequired,
  favoriteOffers: placeCardsListProp,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,
  favoriteOffers: state.favoriteOffers,
});

const mapDispatchToProps = {
  loadOffers: fetchOffersList,
  authorizationRequired: checkAuth,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

