import React, { useState } from 'react';
import '../style/style.css';
import '../style/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import personIcon from '../files/images/person.png';
import configIcon from '../files/images/config.png';
import DynamicProgressIcon from '../UIComponents/DynamicProgressIcon';
import LaunchParametersComponent from './LaunchParametersComponent'
import AccountDetailsComponent from './AccountDetailComponent';

const HeaderComponent = () => {
const [showLaunchParameters, setShowLaunchParameters] = useState(false);
const [showAccountDetails, setShowAccountDetails] = useState(false);

const toggleLaunchParametersMenu = () => {
setShowLaunchParameters(!showLaunchParameters);
};

const toggleAccountDetailsMenu = () => {
setShowAccountDetails(!showAccountDetails);
};

return (
<Navbar bg="light" expand={false}>
<Nav.Link onClick={toggleLaunchParametersMenu}>
<img src={configIcon} alt="Launch parameters" style={{ width: '24px', height: '24px' }} />
</Nav.Link>

       <Nav.Item>
         <Nav.Link href="/launch-parameters" style={{ color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           <DynamicProgressIcon percentage={98} /><span>Accuracy</span>
         </Nav.Link>
      </Nav.Item>

<div style={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
        <div className="centered-card">
           <Nav.Item>
             <Nav.Link href="/" style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
              Scantechnic Device Management Tool
            </Nav.Link>
           </Nav.Item>
           <Nav.Item>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                 Leonardo
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Leonardo">Leonardo</Dropdown.Item>
                 <Dropdown.Item eventKey="Uno R3">Uno R3</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
           </Nav.Item>
        </div>
       </div>
<Nav.Item>
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Language
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Nav.Item>

  <Nav.Link onClick={toggleAccountDetailsMenu}>
    <img src={personIcon} alt="Account" style={{ width: '24px', height: '24px' }} />
  </Nav.Link>

</Navbar>

);
};

export default HeaderComponent;