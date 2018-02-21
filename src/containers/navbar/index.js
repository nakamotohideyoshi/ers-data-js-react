import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { MenuItem, NavDropdown } from 'react-bootstrap';
import 'react-fa'
import DropdownContent from '../../components/DropdownContent';
import Logo from '../../images/logo.png'
import './style.css';

export default class HeaderNavigation extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">
              <img src={Logo} />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <li class="active"><a href="#"><i class="fa fa-home"></i></a></li>
            <NavDropdown eventKey={1} title={<DropdownContent title="Topics" />} id="basic-nav-dropdown">
              <MenuItem eventKey={1.1}>Action</MenuItem>
              <MenuItem eventKey={1.2}>Another action</MenuItem>
              <MenuItem eventKey={1.3}>Something else here</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={2} title={<DropdownContent title="Data Products" />} id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Action</MenuItem>
              <MenuItem eventKey={2.2}>Another action</MenuItem>
              <MenuItem eventKey={2.3}>Something else here</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title={<DropdownContent title="Publications" />} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title={<DropdownContent title="Newsroom" />} id="basic-nav-dropdown">
              <MenuItem eventKey={4.1}>Action</MenuItem>
              <MenuItem eventKey={4.2}>Another action</MenuItem>
              <MenuItem eventKey={4.3}>Something else here</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={5} title={<DropdownContent title="Calendar" />} id="basic-nav-dropdown">
              <MenuItem eventKey={5.1}>Action</MenuItem>
              <MenuItem eventKey={5.2}>Another action</MenuItem>
              <MenuItem eventKey={5.3}>Something else here</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={6} title={<DropdownContent title="Amber Waves Magazine" />} id="basic-nav-dropdown">
              <MenuItem eventKey={6.1}>Action</MenuItem>
              <MenuItem eventKey={6.2}>Another action</MenuItem>
              <MenuItem eventKey={6.3}>Something else here</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={7} title={<DropdownContent title="ERS Info" />} id="basic-nav-dropdown">
              <MenuItem eventKey={7.1}>Action</MenuItem>
              <MenuItem eventKey={7.2}>Another action</MenuItem>
              <MenuItem eventKey={7.3}>Something else here</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}