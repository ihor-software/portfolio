import React from 'react';

const ApplyButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: '10px',
        padding: '10px',
        backgroundColor: 'blue',
        color: 'white',
        marginLeft: 'auto',
        marginRight: '0',  
        display: 'block', 
        borderRadius: '5px',
        border: '1px solid blue' 
      }}
    >
      Apply
    </button>
  );
};

export default ApplyButton;

