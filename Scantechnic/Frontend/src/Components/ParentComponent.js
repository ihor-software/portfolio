import React, { useState } from 'react';
import DiagnosticsComponent from './DiagnosticsComponent';
import LaunchParametersComponent from './LaunchParametersComponent';
import '../style/style.css';

const ParentComponent = () => {
  const [launchParameters, setLaunchParameters] = useState(null);

  return (
    <div>
      <DiagnosticsComponent setLaunchParameters={setLaunchParameters} />
      {launchParameters && <LaunchParametersComponent launchParameters={launchParameters} />}
    </div>
  );
};

export default ParentComponent;

