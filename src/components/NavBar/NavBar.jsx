import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './NavBar.css';
import logo from '../../img/logo.svg';

function NavBar({ user, logout }) {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img
            src={logo}
            width='30'
            height='30'
            className='d-inline-block align-top'
            alt='Game Swap logo'
          />{' '}
          Game Swap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            \
            {user && (
              <>
                <Nav.Link as={Link} to='/Sell'>
                  Sell
                </Nav.Link>
                <Nav.Link as={Link} to='/Cart'>
                  Cart 🛒
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user && (
              <>
                <Navbar.Text>Hi, {user.firstName} </Navbar.Text>
                <NavDropdown title='Account' id='navbarScrollingDropdown'>
                  <NavDropdown.Item as={Link} to='/Review'>
                    Review a Purchase
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to='/' onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {!user && (
              <>
                <Nav.Link as={Link} to='/Login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/Register'>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          {/* 
          <ul class='navList'>
            <li>
              <Link class='btn btn-secondary' to='/'>
                {' '}
                Home{' '}
              </Link>
            </li>
            {!user && (
              <React.Fragment>
                <li>
                  <Link to='/Login' class='btn btn-secondary'>
                    {' '}
                    Login{' '}
                  </Link>
                </li>
                <li>
                  <Link to='/Register' class='btn btn-secondary'>
                    {' '}
                    Register{' '}
                  </Link>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <li>
                  <Link
                    to='/'
                    onClick={() => logout()}
                    class='btn btn-secondary'
                  >
                    {' '}
                    Logout{' '}
                  </Link>
                </li>
                <li>
                  <Link to='/Sell' class='btn btn-secondary'>
                    {' '}
                    Sellers Page{' '}
                  </Link>
                </li>
                <li>
                  <Link to='/Cart' class='btn btn-secondary'>
                    {' '}
                    Cart 🛒
                  </Link>
                </li>
                <li>
                  <Link to='/Review' class='btn btn-secondary'>
                    {' '}
                    Review Page
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
