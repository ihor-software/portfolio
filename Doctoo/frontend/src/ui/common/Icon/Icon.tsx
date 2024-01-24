import { CSSProperties } from 'react';
import styles from './Icon.module.css';
import PropTypes from 'prop-types';

interface IconProps {
  src: string;
  alt: string;
  iconColor?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  src,
  alt,
  iconColor,
  width,
  height,
  className = '',
  style,
}) => {
  return (
    <>
      <img
        width={width}
        height={height}
        src={src}
        alt={alt + ' icon'}
        className={`${styles.icon} ${iconColor ? styles[iconColor] : ''} ${className}`}
        style={style}
      />
    </>
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
