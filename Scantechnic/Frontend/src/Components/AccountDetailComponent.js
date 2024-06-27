import React from 'react';
import { Nav } from 'react-bootstrap';

const AccountDetailsComponent = ({ toggleMenu }) => {
  return (
    <div className="component-card account">
      <h4 style={{ color: "#800080", fontFamily: "cursive" }}>Menu</h4>
      <Nav className="right-menu">
        <Nav.Link href="/account">General</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav>
    </div>
  );
};

export default AccountDetailsComponent;
