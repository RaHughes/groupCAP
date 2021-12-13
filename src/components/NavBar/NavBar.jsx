import { useState } from 'react';
import LogInForm from '../LogInForm/LogInForm';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Modal, Container } from 'react-bootstrap';
import './NavBar.css';
import logo from '../../img/logo.svg';

function NavBar({ user, logout }) {
  const [showModal, setShowModal] = useState(false);
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
                <Nav.Link onClick={() => setShowModal(true)}>Login</Nav.Link>
                <Nav.Link as={Link} to='/Register'>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Please Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LogInForm />
            </Modal.Body>
          </Modal>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
