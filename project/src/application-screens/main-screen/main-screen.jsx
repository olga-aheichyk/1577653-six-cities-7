import React, {useState} from 'react';
import classNames from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {cityChange} from '../../store/action.js';
import SvgSprite from '../../components/svg-sprite/svg-sprite.jsx';
import Logo from '../../components/logo/logo.jsx';
import NavNotAuthorizedUser from '../../components/nav-not-authorized-user/nav-not-authorized-user.jsx';
import NavAuthorizedUser from '../../components/nav-authorized-user/nav-authorized-user.jsx';
import { AuthorizationStatus, CITIES } from '../../consts.js';
import CitiesPlaces from '../../components/cities-places/cities-places.jsx';
import CitiesNoPlaces from '../../components/cities-no-places/cities-no-places.jsx';
import Map from '../../components/map/map.jsx';
import ErrorNotification from '../../components/error-notification/error-notification.jsx';
import { getActiveCity } from '../../store/app-change/selectors.js';
import { getOffers, getServerErrorOccurence } from '../../store/app-data/selectors.js';
import { createSelector } from 'reselect';
import { getAuthorizationStatus } from '../../store/user/selectors.js';

const activeCityOffersSelector = createSelector(
  getActiveCity,
  getOffers,
  (city, offers) => offers.slice().filter((offer) => offer.city.name === city),
);

function MainScreen() {
  const activeCity = useSelector(getActiveCity);
  const activeCityOffers = useSelector(activeCityOffersSelector);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const serverError = useSelector(getServerErrorOccurence);

  const dispatch = useDispatch();

  const onCityChange = (evtTargetTextContent) => {
    dispatch(cityChange(evtTargetTextContent));
  };

  const [activeOffer, setActiveOffer] = useState({});

  const handlePlaceCardHover = (placeCardId) => {
    const currentOffer = activeCityOffers.find((offer) =>
      offer.id === Number(placeCardId),
    );
    setActiveOffer(currentOffer);
  };

  const handlePlaceCardAwayHover = () => {
    setActiveOffer({});
  };

  return (
    <>
      <SvgSprite />
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              {serverError && <ErrorNotification message={'We can\'t load available offers now. Please, retry later'} />}
              <div className="header__left">
                <Logo />
              </div>
              {authorizationStatus === AuthorizationStatus.AUTH ? <NavAuthorizedUser /> : <NavNotAuthorizedUser />}
            </div>
          </div>
        </header>

        <main className={classNames('page__main', 'page__main--index', { 'page__main--index-empty': activeCityOffers.length === 0 })}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul
                onClick={(evt) => {
                  evt.preventDefault();
                  onCityChange(evt.target.textContent);
                }}
                className="locations__list tabs__list"
              >
                {CITIES.map((city) => (
                  <li className="locations__item" key={city}>
                    <a className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active' : activeCity === city })} href="/#">
                      <span>{city}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className={classNames('cities__places-container', {'cities__places-container--empty' : activeCityOffers.length === 0}, 'container')}>
              {activeCityOffers.length ?
                <CitiesPlaces
                  activeCity={activeCity}
                  activeCityOffers={activeCityOffers}
                  onPlaceCardHover={handlePlaceCardHover}
                  onPlaceCardAwayHover={handlePlaceCardAwayHover}
                /> :
                <CitiesNoPlaces
                  activeCity={activeCity}
                />}

              <div className="cities__right-section">
                {activeCityOffers.length > 0 && (
                  <section className="cities__map map" style={{height: '100vh'}}>
                    <Map
                      location={activeCityOffers[0].city.location}
                      offers={activeCityOffers}
                      activeOffer={activeOffer}
                    />
                  </section>)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MainScreen;
