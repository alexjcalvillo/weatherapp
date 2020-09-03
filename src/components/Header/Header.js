import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';

// Building this project using functional components as much as
// possible to challenge myself and try something new. Start with this header
// component.

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Header(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  //   const [heading, setHeading] = useState('Nav Bar');

  return (
    <div>
      <>
        <Navbar
          className="navbar-horizontal navbar-dark bg-primary"
          // style={{ backgroundColor: '#7A38A6' }}
          expand="lg"
        >
          <Container>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              Default Color
            </NavbarBrand>
            <button
              aria-controls="navbar-default"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-default"
              data-toggle="collapse"
              id="navbar-default"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-default">
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6"></Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-default"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-default"
                      data-toggle="collapse"
                      id="navbar-default"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-lg-auto" navbar>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-favourite-28" />
                    <span className="nav-link-inner--text d-lg-none">
                      Discover
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-notification-70" />
                    <span className="nav-link-inner--text d-lg-none">
                      Profile
                    </span>
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav>
                  <NavLink
                    aria-expanded={false}
                    aria-haspopup={true}
                    className="nav-link-icon"
                    data-toggle="dropdown"
                    href="#pablo"
                    id="navbar-default_dropdown_1"
                    onClick={(e) => e.preventDefault()}
                    role="button"
                  >
                    <i className="ni ni-settings-gear-65" />
                    <span className="nav-link-inner--text d-lg-none">
                      Settings
                    </span>
                  </NavLink>
                  <DropdownMenu
                    aria-labelledby="navbar-default_dropdown_1"
                    right
                  >
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else here
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    </div>
  );
}

export default connect()(Header);
