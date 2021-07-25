import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../components/logo/logo.jsx';
import { connect } from 'react-redux';
import SvgSprite from '../../components/svg-sprite/svg-sprite.jsx';
import placeCardsListProp from '../../components/place-cards-list/place-cards-list.prop.js';
import FavoritesNotEmpty from '../../components/favorites-not-empty/favorites-not-empty.jsx';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty.jsx';
import NavAuthorizedUser from '../../components/nav-authorized-user/nav-authorized-user.jsx';
import { fetchFavoriteOffersList } from '../../store/api-actions.js';
import ErrorNotification from '../../components/error-notification/error-notification.jsx';
import { getFavoriteOffers, getLoadingFavoriteOffersErrorOccurence, getOffers } from '../../store/app-data/selectors.js';

function FavoritesScreen(props) {
  const {
    favoriteOffers,
    offers,
    loadFavoriteOffers,
    favoriteOffersLoadingError,
  } = props;

  useEffect(() => {
    loadFavoriteOffers();
  }, [loadFavoriteOffers, offers]);

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

FavoritesScreen.propTypes = {
  favoriteOffers: placeCardsListProp,
  offers: placeCardsListProp,
  loadFavoriteOffers: PropTypes.func.isRequired,
  favoriteOffersLoadingError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
  offers: getOffers(state),
  favoriteOffersLoadingError: getLoadingFavoriteOffersErrorOccurence(state),
});

const mapDispatchToProps = {
  loadFavoriteOffers: fetchFavoriteOffersList,
};


export {FavoritesScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
