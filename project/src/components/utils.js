export const calculateWidthForRating = (rating) => rating / 5 * 100;

export const filterActiveCityOffers = (activeCity, offers) => offers.slice().filter((offer) => offer.city.name === activeCity);

