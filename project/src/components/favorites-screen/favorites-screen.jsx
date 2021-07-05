import React from 'react';
import Logo from '../logo/logo.jsx';
import { connect } from 'react-redux';
import SvgSprite from '../svg-sprite/svg-sprite.jsx';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import FavoritesNotEmpty from '../favorites-not-empty/favorites-not-empty.jsx';
import FavoritesEmpty from '../favorites-empty/favorites-empty.jsx';
import NavAuthorizedUser from '../nav-authorized-user/nav-authorized-user.jsx';

function FavoritesScreen(props) {
  const { favoriteOffers } = props;

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
};

const mapStateToProps = (state) => ({
  favoriteOffers: state.offers.slice().filter((offer) => offer.isFavorite),
});


export {FavoritesScreen};
export default connect(mapStateToProps, null)(FavoritesScreen);
