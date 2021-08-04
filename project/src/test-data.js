export const testOffers = [
  {
    bedrooms: 4,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    description:
      'My housing is close to Maisons-Alfort - Alfortville station. You will appreciate my accommodation for its terrace, its location, quiet area and outdoor spaces.',
    goods: [
      'Heating',
      'Kitchen',
      'Cable TV',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
    ],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
    id: 111,
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
    ],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    maxAdults: 5,
    previewImage: 'img/apartment-small-03.jpg',
    price: 120,
    rating: 4.8,
    title: 'Delightful hotel at 5 minutes from Paris',
    type: 'hotel',
  },
  {
    bedrooms: 2,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    description:
      'Shower in the kitchen, and there is no central heating system but a small ultrared-heater in the Bedroom. There is no table to work on but many cafes around 50 meters from the flat.',
    goods: ['Heating', 'Kitchen', 'Washing machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 4,
      isPro: true,
      name: 'Sam',
    },
    id: 112,
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
    ],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    maxAdults: 3,
    previewImage: 'img/apartment-02.jpg',
    price: 60,
    rating: 3.9,
    title: 'Cosy apartment in beautiful Eimsbüttel (E-heater)',
    type: 'apartment',
  },
  {
    bedrooms: 5,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 10,
      },
    },
    description:
      'The house are managed digitally by a 24/7 guest assistance team, reachable via your favourite messaging apps.',
    goods: [
      'Heating',
      'Kitchen',
      'Washing machine',
      'Dishwasher',
      'Hot water',
      'Grill-barbeque zone',
      'Parking',
    ],
    host: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 3,
      isPro: false,
      name: 'Alice',
    },
    id: 113,
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
    ],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
    maxAdults: 8,
    previewImage: 'img/studio-01.jpg',
    price: 250,
    rating: 4.9,
    title: 'Intimate House with Balcony in Amsterdam',
    type: 'house',
  },
];

export const testOffer = {
  bedrooms: 4,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85341,
      longitude: 2.3488,
      zoom: 10,
    },
  },
  description: 'My housing is close to Maisons-Alfort - Alfortville station. You will appreciate my accommodation for its terrace, its location, quiet area and outdoor spaces.',
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 3,
    isPro: true,
    name: 'Angelina',
  },
  id: 111,
  images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 48.867543,
    longitude: 2.35,
    zoom: 8,
  },
  maxAdults: 5,
  previewImage: 'img/apartment-small-03.jpg',
  price: 120,
  rating: 4.8,
  title: 'Delightful hotel at 5 minutes from Paris',
  type: 'hotel',
};

export const testReviews = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 4,
      isPro: false,
      name: 'Max',
    },
  },
];

export const testServerOffer = {
  'bedrooms': 3,
  'city': {
    'location': {
      'latitude': 52.370216,
      'longitude': 4.895168,
      'zoom': 10,
    },
    'name': 'Amsterdam',
  },
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'goods': ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  'host': {
    'avatar_url': 'img/1.png',
    'id': 3,
    'is_pro': true,
    'name': 'Angelina',
  },
  'id': 1,
  'images': ['img/1.png', 'img/2.png'],
  'is_favorite': false,
  'is_premium': false,
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8,
  },
  'max_adults': 4,
  'preview_image': 'img/1.png',
  'price': 120,
  'rating': 4.8,
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
};

export const adaptedTestServerOffer = {
  'bedrooms': 3,
  'city': {
    'location': {
      'latitude': 52.370216,
      'longitude': 4.895168,
      'zoom': 10,
    },
    'name': 'Amsterdam',
  },
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'goods': ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  'host': {
    'avatarUrl': 'img/1.png',
    'id': 3,
    'isPro': true,
    'name': 'Angelina',
  },
  'id': 1,
  'images': ['img/1.png', 'img/2.png'],
  'isFavorite': false,
  'isPremium': false,
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8,
  },
  'maxAdults': 4,
  'previewImage': 'img/1.png',
  'price': 120,
  'rating': 4.8,
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
};

export const testServerReview = {
  'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'date': '2019-05-08T14:13:56.569Z',
  'id': 1,
  'rating': 4,
  'user': {
    'avatar_url': 'img/1.png',
    'id': 4,
    'is_pro': false,
    'name': 'Max',
  },
};

export const testServerAuthInfo = {
  'avatar_url': 'img/1.png',
  'email': 'Oliver.conner@gmail.com',
  'id': 1,
  'is_pro': false,
  'name': 'Oliver.conner',
  'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};

export const adaptedTestServerAuthInfo = {
  'avatarUrl': 'img/1.png',
  'email': 'Oliver.conner@gmail.com',
  'id': 1,
  'isPro': false,
  'name': 'Oliver.conner',
  'token': 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};
