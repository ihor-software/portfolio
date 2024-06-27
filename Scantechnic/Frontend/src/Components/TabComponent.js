import React, { useState, useEffect } from 'react';
import '../style/style.css';
import '../style/bootstrap.css';
import { Link, Outlet, useLocation } from "react-router-dom";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('diagnostics');
  const { pathname } = useLocation();

  useEffect(() => {
    const baseName = pathname.split('/')[1];
    setActiveTab(baseName);
  }, [pathname]);

  return (
    <div className="main_menu">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/diagnostics" className={`nav-link ${activeTab === 'diagnostics' ? 'active' : ''}`} onClick={() => setActiveTab('diagnostics')}>Diagnostics</Link>
        </li>
        <li className="nav-item">
          <Link to="/optimization" className={`nav-link ${activeTab === 'optimization' ? 'active' : ''}`} onClick={() => setActiveTab('optimization')}>Optimization</Link>
        </li>
        <li className="nav-item">
          <Link to="/visualization" className={`nav-link ${activeTab === 'visualization' ? 'active' : ''}`} onClick={() => setActiveTab('visualization')}>Visualization</Link>
        </li>
        <li className="nav-item">
          <Link to="/configurator" className={`nav-link ${activeTab === 'configurator' ? 'active' : ''}`} onClick={() => setActiveTab('configurator')}>Configurator</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default TabComponent;
