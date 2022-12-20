import React from 'react';
import { Form, Button, Navbar, NavbarBrand, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Search } from '@mui/icons-material';
import { Link } from "react-router-dom";

const NavbarTop = () => {
    return (
        <>
            <Navbar bg='light' expand="lg" collapseOnSelect>
                <Container>
                    <Link to="/">
                        <NavbarBrand className='px-2 py-1'>
                            Online Blogging
                        </NavbarBrand>
                    </Link>
                    <div className='text-right px-2 py-1'>
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
                    </div>

                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />

                    <Navbar.Collapse id='responsive-navbar-nav'>

                        <Nav className='mx-auto'>
                        <Nav.Link href="/">
                                Home
                            </Nav.Link>
                            <Nav.Link href="/feed">
                                Feeds
                            </Nav.Link>
                            <Nav.Link href='/following'>
                                Following & Followers
                            </Nav.Link>
                            <NavDropdown title="profile" id="collasible-nav-dropdown">
                                <NavDropdown.Item href='/profile'>View Profile</NavDropdown.Item>
                                <NavDropdown.Item href='#'>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarTop