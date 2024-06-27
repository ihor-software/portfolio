import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DynamicProgressIcon = ({ percentage }) => {
  return (
    <div style={{ width: '50px', height: '50px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: '32px',
          pathColor: '#36A2EB',
          textColor: '#000',
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default DynamicProgressIcon;
