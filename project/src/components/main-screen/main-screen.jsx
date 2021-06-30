import React, {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action.js';

import SvgSprite from '../svg-sprite/svg-sprite.jsx';
import Logo from '../logo/logo.jsx';
import NavNotAuthorizedUser from '../nav-not-authorized-user/nav-not-authorized-user.jsx';
import NavAuthorizedUser from '../nav-authorized-user/nav-authorized-user.jsx';

import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';

import { AuthorizationStatus, CITIES, userEmail } from '../../consts.js';
import CitiesPlaces from '../cities-places/cities-places.jsx';
import CitiesNoPlaces from '../cities-no-places/cities-no-places.jsx';
import Map from '../map/map.jsx';
import { filterActiveCityOffers } from '../utils.js';

function MainScreen(props) {
  const {
    activeCity,
    activeCityOffers,
    authorizationStatus,
    onCityChange } = props;

  const [activeOffer, setActiveOffer] = useState({});

  const onPlaceCardHover = (placeCardId) => {
    const currentOffer = activeCityOffers.find((offer) =>
      offer.id === Number(placeCardId),
    );
    setActiveOffer(currentOffer);
  };

  const onPlaceCardAwayHover = () => {
    setActiveOffer({});
  };

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
              {authorizationStatus === AuthorizationStatus.AUTH ? <NavAuthorizedUser userEmail={userEmail} /> : <NavNotAuthorizedUser />}
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
                  onPlaceCardHover={onPlaceCardHover}
                  onPlaceCardAwayHover={onPlaceCardAwayHover}
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

MainScreen.propTypes = {
  activeCity: PropTypes.string.isRequired,
  activeCityOffers: placeCardsListProp,
  authorizationStatus: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  activeCityOffers: filterActiveCityOffers(state.activeCity, state.offers),
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(evtTargetTextContent) {
    dispatch(ActionCreator.cityChange(evtTargetTextContent));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
