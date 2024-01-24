import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import UserIcon from './UserIconComponent';


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }


    render() {
        return (
            <>
                <Navbar dark className="header-nav" expand="lg">
                    <div className="container">
                        <NavbarBrand href="/">
                            <img src="assets/images/logo.png" width="300" height="52"></img>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} className="navbar-toggler-right"></NavbarToggler>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="mx-auto" navbar>
                                <NavItem>
                                    <NavLink className="nav-link-custom" to="/">
                                        <span>Главная</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link-custom" to="/">
                                        <span>О нас</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link-custom" to="/">
                                        <span>Помощь</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/">
                                        <UserIcon></UserIcon>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>

                </Navbar>
            </>
        );
    }
}

export default Header;