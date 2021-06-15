import React, {useState} from 'react';
import SvgSprite from '../svg-sprite/svg-sprite.jsx';
import Logo from '../logo/logo.jsx';
import NavNotAuthorizedUser from '../nav-not-authorized-user/nav-not-authorized-user.jsx';

import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';

import { CITIES } from '../../consts.js';
import CitiesPlaces from '../cities-places/cities-places.jsx';
import CitiesNoPlaces from '../cities-no-places/cities-no-places.jsx';

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
              <NavNotAuthorizedUser />
            </div>
          </div>
        </header>

        <main className={`page__main page__main--index ${activeCityOffers.length > 0 ? null : 'page__main--index-empty'}`}>
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
            <div className={`cities__places-container ${activeCityOffers.length > 0 ? null : 'cities__places-container--empty'} container`}>
              {activeCityOffers.length ?
                <CitiesPlaces
                  activeCity={activeCity}
                  activeCityOffers={activeCityOffers}
                /> :
                <CitiesNoPlaces
                  activeCity={activeCity}
                />}

              <div className="cities__right-section">
                {activeCityOffers.length ? (<section className="cities__map map"></section>) : null}
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
