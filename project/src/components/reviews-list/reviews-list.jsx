import React from 'react';
import ReviewItem from '../review-item/review-item.jsx';

import PropTypes from 'prop-types';
import reviewItemProp from '../review-item/review-item.prop.js';

function ReviewsList(props) {
  const {reviews} = props;

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (<ReviewItem review={review} key={review.id} />))}
      </ul>
    </>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
    reviewItemProp,
  ).isRequired,
};

export default ReviewsList;
