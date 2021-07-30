import dayjs from 'dayjs';

export const calculateWidthForRating = (rating) => Math.round(rating) / 5 * 100;

export const adaptOfferToClient = (offer) => {
  const adaptedOffer = {
    ...offer,
    host: {
      ...offer.host,
      avatarUrl: offer.host.avatar_url,
      isPro: offer.host.is_pro,
    },
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    maxAdults: offer.max_adults,
    previewImage: offer.preview_image,
  };

  delete adaptedOffer.host.avatar_url;
  delete adaptedOffer.host.is_pro;
  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

export const adaptReviewToClient = (review) => {
  const adaptedReview = {
    ...review,
    user: {
      ...review.user,
      avatarUrl: review.user.avatar_url,
      isPro: review.user.is_pro,
    },
  };

  delete adaptedReview.user.avatar_url;
  delete adaptedReview.user.is_pro;

  return adaptedReview;
};

export const adaptAuthInfoToClient = (authInfo) => {
  const adaptedAuthInfo = {
    ...authInfo,
    avatarUrl: authInfo.avatar_url,
    isPro: authInfo.is_pro,
  };

  delete adaptedAuthInfo.avatar_url;
  delete adaptedAuthInfo.is_pro;

  return adaptedAuthInfo;
};

export const sortByDateDescending = (a, b) => dayjs(b.date).diff(dayjs(a.date));
