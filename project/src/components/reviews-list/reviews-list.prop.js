import PropTypes from 'prop-types';
import reviewItemProp from '../review-item/review-item.prop.js';

export default PropTypes.arrayOf(
  reviewItemProp,
).isRequired;
