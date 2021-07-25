import React from 'react';
import reviewItemProp from './review-item.prop.js';
import dayjs from 'dayjs';

import {calculateWidthForRating} from '../../utils.js';

function ReviewItem(props) {
  const { review } = props;
  const {
    comment,
    date,
    id,
    rating,
    user,
  } = review;

  return (
    <li className="reviews__item" key={id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt={`Reviews avatar ${user.id}`}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${calculateWidthForRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={dayjs(date).format('YYYY-MM-DD')}>
          {dayjs(date).format('MMMM YYYY')}
        </time>
      </div>
    </li>
  );
}

ReviewItem.propTypes = {
  review: reviewItemProp,
};

export default ReviewItem;
