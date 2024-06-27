import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiagnosticsPage from './Pages/DiagnosticsPage';
import OptimizationPage from './Pages/OptimizationPage';
import VisualizationPage from './Pages/VisualizationPage';
import ConfiguratorPage from './Pages/ConfiguratorPage';
import TabComponent from './Components/TabComponent';
import HeaderComponent from './Components/HeaderComponent';
import LaunchParametersComponent from './Components/LaunchParametersComponent';
import AccountDetailsComponent from './Components/AccountDetailComponent';

export default function App() {
const [launchParameters, setLaunchParameters] = useState(null);

const handleSetLaunchParameters = (parameters) => {
console.log('Setting launch parameters:', parameters);
localStorage.setItem('launchParameters', JSON.stringify(parameters));

setLaunchParameters(parameters);
};

useEffect(() => {
const storedParameters = JSON.parse(localStorage.getItem('launchParameters'));
if (storedParameters) {
setLaunchParameters(storedParameters);
}
}, []);

return (
<BrowserRouter>
<HeaderComponent />
<div className="tab-component">
<TabComponent />
</div>
<div className="horizontal-layout">
<div className="launch-parameters">
{launchParameters && (
<LaunchParametersComponent launchParameters={launchParameters} />
)}
</div>
<div>
<Routes>
<Route
path="/"
element={<DiagnosticsPage setLaunchParameters={handleSetLaunchParameters} />}
/>
<Route
path="diagnostics"
element={<DiagnosticsPage setLaunchParameters={handleSetLaunchParameters} />}
/>
<Route path="optimization" element={<OptimizationPage />} />
<Route path="visualization" element={<VisualizationPage />} />
<Route path="configurator" element={<ConfiguratorPage />} />
</Routes>
</div>
<div className="account-details">
<AccountDetailsComponent />
</div>
</div>
</BrowserRouter>
);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);