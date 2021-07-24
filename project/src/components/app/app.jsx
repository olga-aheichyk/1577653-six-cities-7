import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, Router as BrowserRouter} from 'react-router-dom';
import NotFoundScreen from '../../application-screens/not-found-screen/not-found-screen.jsx';
import MainScreen from '../../application-screens/main-screen/main-screen.jsx';
import FavoritesScreen from '../../application-screens/favorites-screen/favorites-screen.jsx';
import OfferPropertyScreen from '../../application-screens/offer-property-screen/offer-property-screen.jsx';
import LogInScreen from '../../application-screens/log-in-screen/log-in-screen.jsx';
import { AppRoute, AuthorizationStatus } from '../../consts.js';
import LoadingScreen from '../../application-screens/loading-screen/loading-screen.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import browserHistory from '../../browser-history';
import { checkAuth, fetchOffersList } from '../../store/api-actions.js';

const isCheckingAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;
function App(props) {
  const {
    authorizationStatus,
    isDataLoaded,
    loadOffers,
    authorizationRequired,
  } = props;

  useEffect(() => {
    authorizationRequired();
  }, [authorizationRequired]);

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.UNKNOWN) {
      loadOffers();
    }
  }, [loadOffers, authorizationStatus]);


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
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = {
  loadOffers: fetchOffersList,
  authorizationRequired: checkAuth,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

