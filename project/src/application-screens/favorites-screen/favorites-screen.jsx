import React, { useEffect } from 'react';
import Logo from '../../components/logo/logo.jsx';
import { useDispatch, useSelector } from 'react-redux';
import SvgSprite from '../../components/svg-sprite/svg-sprite.jsx';
import FavoritesNotEmpty from '../../components/favorites-not-empty/favorites-not-empty.jsx';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.jsx';
import NavAuthorizedUser from '../../components/nav-authorized-user/nav-authorized-user.jsx';
import { fetchFavoriteOffersList } from '../../store/api-actions.js';
import ErrorNotification from '../../components/error-notification/error-notification.jsx';
import { getFavoriteOffers, getLoadingFavoriteOffersErrorOccurence, getOffers } from '../../store/app-data/selectors.js';

function FavoritesScreen() {
  const favoriteOffers = useSelector(getFavoriteOffers);
  const offers = useSelector(getOffers);
  const favoriteOffersLoadingError = useSelector(getLoadingFavoriteOffersErrorOccurence);

  const dispatch = useDispatch();
  const loadFavoriteOffers = () => {
    dispatch(fetchFavoriteOffersList());
  };

  useEffect(() => {
    loadFavoriteOffers();
  }, [offers]);

  return (
    <>
      <SvgSprite />

      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <NavAuthorizedUser/>
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {favoriteOffersLoadingError && <ErrorNotification message={'We can\'t load your favorite offers now. Please, retry later'} />}
            {favoriteOffers.length ? <FavoritesNotEmpty favoriteOffers={favoriteOffers} /> : <FavoritesEmpty />}
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </a>
        </footer>
      </div>
    </>
  );
}

export default FavoritesScreen;
