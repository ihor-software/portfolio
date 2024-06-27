import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LaunchParametersComponent = ({ launchParameters }) => {
  const [parameters, setParameters] = useState(null);

  useEffect(() => {
    const storedParameters = JSON.parse(localStorage.getItem('launchParameters'));
    if (storedParameters) {
      setParameters(storedParameters);
    }
  }, []);

  if (!parameters) {
    return <div>No launch parameters found.</div>;
  }

  return (
    <div className="component-card">
      <h4 style={{ color: "#800080", fontFamily: "cursive" }}>Launch Parameters</h4>
      {Object.entries(parameters).map(([groupName, params], index) => (
        <div key={index} style={{ marginBottom: '5px' }}>
          <h5>{groupName}</h5>
          <ul>
            {Array.isArray(params) ? params.map((param, idx) => (
              <li key={idx}>{param}</li>
            )) : <li>{params}</li>}
          </ul>
        </div>
      ))}
    </div>
  );
};

LaunchParametersComponent.propTypes = {
  launchParameters: PropTypes.object,
};

export default LaunchParametersComponent;
