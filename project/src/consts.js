export const AppRoute = {
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer/:id',
  ROOT: '/',
};

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const TYPES = ['apartment', 'room', 'house', 'hotel'];

export const PinParameter = {
  X: 27,
  Y: 39,
};

export const SortType = {
  POPULAR: 'Popular',
  PRICE_LOW_TO_HIGH: 'Price: low to high',
  PRICE_HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED_FIRST: 'Top rated first',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const BACKEND_URL = 'https://7.react.pages.academy/six-cities';

export const ApiRoute = {
  OFFERS: '/hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
  REVIEWS: '/comments/',
  FAVORITE: '/favorite',
};

export const FavoritesButtonVariant = {
  PLACE_CARD: 'PLACE_CARD',
  PROPERTY: 'PROPERTY',
};

export const FavoritesButtonVariantDetails = {
  PLACE_CARD: {
    commonClassName: 'place-card',
    svgWidth: 18,
    svgHeight: 19,
  },
  PROPERTY: {
    commonClassName: 'property',
    svgWidth: 31,
    svgHeight: 33,
  },
};

export const PlaceCardVariant = {
  MAIN: 'MAIN',
  FAVORITES: 'FAVORITES',
  NEAREST: 'NEAREST',
};

export const PlaceCardVariantDetails = {
  MAIN: {
    articleClassName: 'cities__place-card',
    imgWrapperClassName: 'cities__image-wrapper',
    imgWidth: 260,
    imgHeight: 200,
    infoExtraClass: '',
  },
  FAVORITES: {
    articleClassName: 'favorites__card',
    imgWrapperClassName: 'favorites__image-wrapper',
    imgWidth: 150,
    imgHeight: 110,
    infoExtraClass: 'favorites__card-info',
  },
  NEAREST: {
    articleClassName: 'near-places__card',
    imgWrapperClassName: 'near-places__image-wrapper',
    imgWidth: 260,
    imgHeight: 200,
    infoExtraClass: '',
  },
};

