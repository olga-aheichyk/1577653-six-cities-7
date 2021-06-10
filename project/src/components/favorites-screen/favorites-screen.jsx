import React from 'react';
import FavoritesListItem from '../favorites-list-item/favorites-list-item.jsx';
import Logo from '../logo/logo.jsx';
import SvgSprite from '../svg-sprite/svg-sprite.jsx';
import appProp from '../app/app.prop.js';

function FavoritesScreen(props) {
  const { offers } = props;

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
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="/#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                      </span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="/#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {<FavoritesListItem offers={offers.filter((offer) => offer.isFavorite)}/>}
                {/* {offers.filter((offer) => offer.isFavorite)
                  .slice(0, 3)
                  .map((offer) => (
                    <FavoritesListItem key={offer.id} offer={offer} />
                  ))} */}
              </ul>
            </section>
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
  offers: appProp,
};

export default FavoritesScreen;
