import PropTypes from 'prop-types';
import placeCardProp from '../place-card/place-card.prop.js';

export default PropTypes.arrayOf(
  placeCardProp,
).isRequired;
