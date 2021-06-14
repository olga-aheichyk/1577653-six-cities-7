import React, {useState} from 'react';
import SvgSprite from '../svg-sprite/svg-sprite.jsx';
import Logo from '../logo/logo.jsx';
import NavAuthorizedUser from '../nav-authorized-user/nav-authorized-user.jsx';

import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import PlaceCardsList from '../place-cards-list/place-cards-list.jsx';

import { CITIES, userEmail } from '../../consts.js';

function MainScreen(props) {
  const { offers } = props;

  const [activeCity, setActiveCity] = useState({
    city: 'Paris',
  });

  const activeCityOffers = offers.slice().filter((offer) => offer.city.name === activeCity.city);

  return (
    <>
      <SvgSprite />
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <NavAuthorizedUser
                userEmail={userEmail}
              />
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul
                onClick={(evt) => {
                  evt.preventDefault();
                  setActiveCity({ ...activeCity, city: evt.target.textContent });
                }}
                className="locations__list tabs__list"
              >
                {CITIES.map((city) => (
                  <li className="locations__item" key={city}>
                    <a className={`locations__item-link tabs__item ${activeCity.city === city ? 'tabs__item--active' : null}`} href="/#">
                      <span>{city}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {activeCityOffers.length} places to stay in {activeCity.city}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className="places__option places__option--active"
                      tabIndex="0"
                    >
                      Popular
                    </li>
                    <li className="places__option" tabIndex="0">
                      Price: low to high
                    </li>
                    <li className="places__option" tabIndex="0">
                      Price: high to low
                    </li>
                    <li className="places__option" tabIndex="0">
                      Top rated first
                    </li>
                  </ul>
                </form>
                <PlaceCardsList
                  offers={activeCityOffers}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map"></section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

MainScreen.propTypes = {
  offers: placeCardsListProp,
};

export default MainScreen;
