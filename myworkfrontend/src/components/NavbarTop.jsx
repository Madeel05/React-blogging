import React from 'react';
import { Form, Button, Navbar, NavbarBrand, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Search } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { logOut } from '../redux/userRedux';
import { useDispatch } from 'react-redux';

const NavbarTop = () => {
    const dispatch = useDispatch();
    const logout = async () => {
        try {
            dispatch(logOut());
        } catch (err) {

        }

    }
    return (
        <>
            <Navbar bg='light' expand="lg" collapseOnSelect>
                <Container>
                    <Link to="/">
                        <NavbarBrand className='px-2 py-1 style-logo'>
                            Online Blogging
                        </NavbarBrand>
                    </Link>
                    {/* <div className='text-right px-2 py-1'>
                        <Form className="form-inline" autoComplete='off'>
                            <div className='input-group'>
                                <Form.Control type='text' aria-label="Recipient's username" aria-describedby="button-addon2"></Form.Control>
                                <div>
                                    <Button variant='outline-primary' type="button" id="button-addon2">
                                        <Search />
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div> */}

                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />

                    <Navbar.Collapse id='responsive-navbar-nav'>

                        <Nav className='mx-auto'>
                            <Nav.Link className='text-dark link-style' href="/">
                                Home
                            </Nav.Link>
                            <Nav.Link className='text-dark link-style' href="/feed">
                                Feeds
                            </Nav.Link>
                            <Nav.Link className='text-dark link-style' href='/following'>
                                Following & Followers
                            </Nav.Link>
                            <NavDropdown title="profile" className='text-dark link-style' id="collasible-nav-dropdown">
                                <NavDropdown.Item href='/profile'>View Profile</NavDropdown.Item>
                                <NavDropdown.Item href='#' onClick={() => logout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarTop