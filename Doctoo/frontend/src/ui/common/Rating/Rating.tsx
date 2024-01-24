import { FC, ReactNode } from 'react';
import { Icon } from '../Icon';
import icons from '../Icon/iconPaths';
import { v4 as uuid } from 'uuid';

export type RatingProps = {
  rating: number;
  className?: string;
  children?: ReactNode | ReactNode[];
  starSize?: number;
  starsGap?: number;
};

export type RatingStarProps = {
  starSize: number;
  fillPercentage?: number;
  className?: string;
};

export const RatingStar: FC<RatingStarProps> = ({
  starSize,
  fillPercentage = 0,
  className = '',
}) => {
  return (
    <div
      className={`rating-star ralative inline-flex ${className}`}
      style={{ width: starSize, height: starSize }}
    >
      <div
        className={`relative overflow-hidden flex`}
        style={{ width: (fillPercentage / 100) * starSize }}
      >
        <Icon
          src={icons.activeStar}
          alt='Star'
          style={{ width: starSize, height: starSize, maxWidth: starSize, top: 0 }}
        />
      </div>
      <div
        className={`relative overflow-hidden flex`}
        style={{ width: ((100 - fillPercentage) / 100) * starSize }}
      >
        <Icon
          src={icons.inactiveStar}
          alt='Star'
          style={{
            width: starSize,
            height: starSize,
            maxWidth: starSize,
            transform: `translateX(calc(-${fillPercentage}% - 0.5px))`,
          }}
        />
      </div>
    </div>
  );
};

const Rating: FC<RatingProps> = ({ rating, children, className = '', starSize = 18 }) => {
  return (
    <div className={`rating-container relative ${className}`}>
      <div className='stars flex self-center' style={{ height: starSize }}>
        {[...Array(5)].map((_, index) => {
          if (rating - index >= 1) {
            return (
              <RatingStar
                key={uuid()}
                starSize={starSize}
                fillPercentage={100}
                className={`ml-2 first:ml-0`}
              />
            );
          }

          if (rating - index >= 0 && rating - index < 1) {
            return (
              <RatingStar
                key={uuid()}
                starSize={starSize}
                fillPercentage={(rating - index) * 100}
                className={`ml-2 first:ml-0`}
              />
            );
          }

          return <RatingStar key={uuid()} starSize={starSize} className={`ml-2 first:ml-0`} />;
        })}
      </div>
      {children}
    </div>
  );
};

export default Rating;
