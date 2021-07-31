import React, { useEffect } from 'react';
import { createSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchNearestOffers, fetchReviewsList } from '../../store/api-actions.js';
import { getNearestOffers, getOffers, getReviews, getServerErrorOccurence } from '../../store/app-data/selectors.js';
import { getAuthorizationStatus } from '../../store/user/selectors.js';

import NotFoundScreen from '../not-found-screen/not-found-screen.jsx';
import Logo from '../../components/logo/logo.jsx';
import SvgSprite from '../../components/svg-sprite/svg-sprite.jsx';
import NavAuthorizedUser from '../../components/nav-authorized-user/nav-authorized-user.jsx';
import NavNotAuthorizedUser from '../../components/nav-not-authorized-user/nav-not-authorized-user.jsx';
import ErrorNotification from '../../components/error-notification/error-notification.jsx';
import FavoritesButton from '../../components/favorites-button/favorites-button.jsx';
import PlaceCard from '../../components/place-card/place-card.jsx';
import CommentPostForm from '../../components/comment-post-form/comment-post-form.jsx';
import ReviewsList from '../../components/reviews-list/reviews-list.jsx';
import Map from '../../components/map/map.jsx';

import { AuthorizationStatus, FavoritesButtonVariant, FavoritesButtonVariantDetails, PlaceCardVariant, PlaceCardVariantDetails } from '../../consts.js';
import { calculateWidthForRating, sortByDateDescending } from '../../utils.js';

const OfferTypeName = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

const MAX_IMAGES_COUNT = 6;
const MAX_REVIEWS_COUNT = 10;

const reviewsSelector = createSelector(
  getReviews,
  (reviews) => reviews.slice().sort(sortByDateDescending).slice(0, MAX_REVIEWS_COUNT),
);

function OfferPropertyScreen() {
  const offers = useSelector(getOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const reviews = useSelector(reviewsSelector);
  const nearestOffers = useSelector(getNearestOffers);
  const serverError = useSelector(getServerErrorOccurence);

  const {id} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviewsList(id));
    dispatch(fetchNearestOffers(id));
  }, [dispatch, id]);

  if (!offers.find((offer) => Number(offer.id) === Number(id))) {
    return <NotFoundScreen />;
  }

  const currentOffer = offers.find((offer) => Number(offer.id) === Number(id));
  const {
    bedrooms,
    city,
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

  const offerImages = images.slice(0, MAX_IMAGES_COUNT);

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
              {authorizationStatus === AuthorizationStatus.AUTH ? <NavAuthorizedUser /> : <NavNotAuthorizedUser />}
            </div>
          </div>
        </header>

        <main className="page__main page__main--property">
          <section className="property">
            {serverError && <ErrorNotification message={'We can\'t load all information about this offer. Please, retry later'} />}
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offerImages.map((image) => (
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

                  <FavoritesButton
                    details={FavoritesButtonVariantDetails[FavoritesButtonVariant.PROPERTY]}
                    isFavorite={isFavorite}
                    id={id}
                  />
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
                    {OfferTypeName[type]}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
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
                  <ReviewsList reviews={reviews} />
                  {authorizationStatus === AuthorizationStatus.AUTH && <CommentPostForm />}
                </section>
              </div>
            </div>
            <section className="property__map map" style={{maxWidth: '1144px', margin: '0 auto 50px'}}>
              <Map
                location={city.location}
                offers={[...nearestOffers, currentOffer]}
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
                    details={PlaceCardVariantDetails[PlaceCardVariant.NEAREST]}
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

export default OfferPropertyScreen;
