import React from 'react';
import reviewItemProp from './review-item.prop.js';

function ReviewItem(props) {
  const { review } = props;
  const {
    comment,
    date,
    id,
    //rating,
    user,
  } = review;

  //user {
  //   avatarUrl,
  //   id,
  //   isPro,
  //   name,
  // },

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
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {/* {April 2019} */}
          {date}
        </time>
      </div>
    </li>
  );
}

ReviewItem.propTypes = {
  review: reviewItemProp,
};

export default ReviewItem;
