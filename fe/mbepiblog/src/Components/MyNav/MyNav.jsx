import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../MyNav/MyNav.css'
import { Link, NavLink } from 'react-router-dom';
import nekoLight from '../../Assets/nekoLight.png'
import nekoDark from '../../Assets/nekoDark.png'

import React, { useEffect } from 'react'
import { changeTheme } from '../../Store/themeSlice';

import { TbBulbOff, TbBulb } from 'react-icons/tb';
import { nanoid } from '@reduxjs/toolkit';
import { useSession } from '../../middlewares/ProtectedRoutes';
import { getAuthors } from '../../Store/authorSlice';



const MyNav = () => {

  const dispatch = useDispatch()
  const actualTheme = useSelector(state => state.theme.theme)
  const allAuthors = useSelector(state => state.authors.authors)
  const session = useSession()

 
  function selectTheme() {
    dispatch(changeTheme())
  }

  function logOut() {
    localStorage.removeItem('userLoggedIn')
    window.location.reload();
  }

  return (
    <Navbar
      expand="lg"
      className={actualTheme ? "bg-light" : "bg-dark"}
      variant={actualTheme ? "bg-light" : "dark"}
      sticky='top'
    >
      <Container className='container'>
        <Link style={{ textDecoration: 'none' }} to={'/'}>
          {actualTheme && (
            <Navbar.Brand href="#"><img src={nekoLight} alt="logo" /></Navbar.Brand>
          )}
          {!actualTheme && (
            <Navbar.Brand href="#"><img src={nekoDark} alt="logo" /></Navbar.Brand>
          )}

        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to={'/authors'}>All Authors</Nav.Link>
            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item> </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            {!localStorage.getItem('userLoggedIn') ?
              <Link to={`/login`}><Button variant="outline-success" >Log-In</Button></Link> :
              <>
                <NavDropdown
                  title={<img style={{ width: '45px', height: '45px', borderRadius: '50px', border: 'solid 3px green' }} src={session.avatar} />}
                  id="navbarScrollingDropdown"
                  className='mx-2'>
                    <NavDropdown.Item><span>User: {session.name} {session.surname}</span></NavDropdown.Item>
                    <NavDropdown.Item><span>Role: {session.role}</span></NavDropdown.Item>
                </NavDropdown>
                <Button onClick={() => logOut()} variant="outline-success" >Log-out</Button>
              </>
            }

            {actualTheme && (
              <TbBulbOff className='light' style={{ fontSize: '2.5rem' }} onClick={() => selectTheme()} />
            )}
            {!actualTheme && (
              <TbBulb className='dark' style={{ fontSize: '2.5rem' }} onClick={() => selectTheme()} />
            )}

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav