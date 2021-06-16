import React, {useState} from 'react';
import Logo from '../logo/logo.jsx';
import PlaceCard from '../place-card/place-card.jsx';
import SvgSprite from '../svg-sprite/svg-sprite.jsx';
import placeCardsListProp from '../place-cards-list/place-cards-list.prop.js';
import CommentPostForm from '../comment-post-form/comment-post-form.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import reviewsListProp from '../reviews-list/reviews-list.prop.js';
import {calculateWidthForRating} from '../utils.js';
import NavAuthorizedUser from '../nav-authorized-user/nav-authorized-user.jsx';
import { userEmail } from '../../consts.js';
import Map from '../map/map.jsx';

function OfferPropertyScreen(props) {
  const { offers, reviews } = props;
  //const firstOffer = offers.slice().find((offer) => offer.id === currentId)

  const nearestOffers = offers.slice(0, 3);
  const [firstOffer] = offers;
  const {
    bedrooms,
    //city,
    description,
    goods,
    host,
    //id,
    images,
    isFavorite,
    isPremium,
    //location,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = firstOffer;

  const {
    avatarUrl,
    //hostId,
    isPro,
    name,
  } = host;

  const [activeOffer, setActiveOffer] = useState(firstOffer);

  const onPlaceCardHover = (placeCardId) => {
    const currentOffer = nearestOffers.find((offer) =>
      offer.id === Number(placeCardId),
    );
    setActiveOffer(currentOffer);
  };


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
              <NavAuthorizedUser userEmail={userEmail} />
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((image, i = 1) => (
                  <div className="property__image-wrapper" key={i++}>
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
                {isPremium ? (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>) : null}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button
                    className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : null} button`}
                    type="button"
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
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
                    {goods.map((good, i = 1) => <li className="property__inside-item" key={i++}>{good}</li>)}
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
                    {isPro ? <span className="property__user-status">Pro</span> : null}
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
                  <CommentPostForm />
                </section>
              </div>
            </div>
            <section className="property__map map" style={{maxWidth: '1144px', margin: '0 auto 50px'}}>
              <Map
                location={offers.slice().find((offer) => offer.city.name === firstOffer.city.name).city.location}
                offers={nearestOffers}
                activeOffer={activeOffer}
              />

            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                {offers.slice(0, 3).map((offer) => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                    onPlaceCardHover={onPlaceCardHover}
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
};

export default OfferPropertyScreen;
