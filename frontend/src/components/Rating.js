import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyFaStar } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Rating = ({ rating, totalRating }) => {
  return (
    <div>
      <span>
        {rating >= 1 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : rating >= 0.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} />
        ) : (
          <FontAwesomeIcon icon={emptyFaStar} />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : rating >= 1.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} />
        ) : (
          <FontAwesomeIcon icon={emptyFaStar} />
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : rating >= 2.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} />
        ) : (
          <FontAwesomeIcon icon={emptyFaStar} />
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : rating >= 3.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} />
        ) : (
          <FontAwesomeIcon icon={emptyFaStar} />
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <FontAwesomeIcon icon={faStar} />
        ) : rating >= 4.5 ? (
          <FontAwesomeIcon icon={faStarHalfAlt} />
        ) : (
          <FontAwesomeIcon icon={emptyFaStar} />
        )}
      </span>
      <span className='text-muted ml-1'>/ {totalRating} değerlendirme </span>
    </div>
  );
};

export default Rating;
