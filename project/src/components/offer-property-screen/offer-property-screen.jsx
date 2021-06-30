import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Logo from '../logo/logo.jsx';
import PlaceCard from '../place-card/place-card.jsx';
import SvgSprite from '../svg-sprite/svg-sprite.jsx';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import CommentPostForm from '../comment-post-form/comment-post-form.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import reviewsListProp from '../reviews-list/reviews-list.prop.js';
import {calculateWidthForRating} from '../utils.js';
import NavAuthorizedUser from '../nav-authorized-user/nav-authorized-user.jsx';
import NavNotAuthorizedUser from '../nav-not-authorized-user/nav-not-authorized-user.jsx';
import { AuthorizationStatus, userEmail } from '../../consts.js';
import Map from '../map/map.jsx';
import { filterActiveCityOffers } from '../utils.js';

function OfferPropertyScreen(props) {
  const {
    id,
    offers,
    reviews,
    activeCity,
    authorizationStatus } = props;

  const nearestOffers = filterActiveCityOffers(activeCity, offers).slice(0, 3);

  const currentOffer = offers.find((offer) => Number(offer.id) === Number(id));

  const {
    bedrooms,
    description,
    goods,
    host,
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = currentOffer;

  const {
    avatarUrl,
    isPro,
    name,
  } = host;

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
              {authorizationStatus === AuthorizationStatus.AUTH ? <NavAuthorizedUser userEmail={userEmail} /> : <NavNotAuthorizedUser />}
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((image) => (
                  <div
                    className="property__image-wrapper"
                    key={image.match(/\d+?(?=.jpg)/)}
                  >
                    <img
                      className="property__image"
                      src={image}
                      alt={type}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>)}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button
                    className={classNames('property__bookmark-button', {'property__bookmark-button--active' : isFavorite}, 'button')}
                    type="button"
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{ width: `${calculateWidthForRating(rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((good) => <li className="property__inside-item" key={good}>{good}</li>)}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="property__avatar user__avatar"
                        src={avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{name}</span>
                    {isPro && <span className="property__user-status">Pro</span>}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {title}
                    </p>
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ReviewsList
                    reviews={reviews}
                  />
                  {authorizationStatus === AuthorizationStatus.AUTH && <CommentPostForm />}
                </section>
              </div>
            </div>
            <section className="property__map map" style={{maxWidth: '1144px', margin: '0 auto 50px'}}>
              <Map
                location={currentOffer.city.location}
                offers={nearestOffers}
                activeOffer={currentOffer}
              />

            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {nearestOffers.map((offer) => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

OfferPropertyScreen.propTypes = {
  offers: placeCardsListProp,
  reviews: reviewsListProp,
  id: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
  activeCity: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  offers: state.offers,
  authorizationStatus: state.authorizationStatus,
});


export {OfferPropertyScreen};
export default connect(mapStateToProps)(OfferPropertyScreen);
