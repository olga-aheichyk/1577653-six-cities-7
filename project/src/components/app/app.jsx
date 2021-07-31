import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, fetchOffersList } from '../../store/api-actions.js';
import { getAuthorizationStatus } from '../../store/user/selectors.js';
import { getLoadedDataStatus } from '../../store/app-data/selectors.js';

import PrivateRoute from '../private-route/private-route.jsx';

import LoadingScreen from '../../application-screens/loading-screen/loading-screen.jsx';
import MainScreen from '../../application-screens/main-screen/main-screen.jsx';
import FavoritesScreen from '../../application-screens/favorites-screen/favorites-screen.jsx';
import OfferPropertyScreen from '../../application-screens/offer-property-screen/offer-property-screen.jsx';
import LogInScreen from '../../application-screens/log-in-screen/log-in-screen.jsx';
import NotFoundScreen from '../../application-screens/not-found-screen/not-found-screen.jsx';

import { AppRoute, AuthorizationStatus } from '../../consts.js';

const isCheckingAuth = (authorizationStatus) => authorizationStatus === AuthorizationStatus.UNKNOWN;

function App() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getLoadedDataStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.UNKNOWN) {
      dispatch(fetchOffersList());
    }
  }, [dispatch, authorizationStatus]);


  if (isCheckingAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
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
        render={() => <OfferPropertyScreen />}
      />
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export default App;

