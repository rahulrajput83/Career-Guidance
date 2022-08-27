/* Imports */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

/* Navbar Menu Items */
const Data = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About',
        link: '/about'
    },
    {
        name: 'Login',
        link: '/login'
    },
    {
        name: 'Register',
        link: '/register'
    },
    {
        name: 'Post Question',
        link: '/questions'
    }
]

/* NavbarComponent function */
function NavbarComponent() {
    const user = 'H'
    return (
        /* Navbar imported from Bootstrap */
        <Navbar bg="primary" expand="md">
            {/* Container imported from Bootstrap */}
            <Container>
                {/* Navbar.Brand imported from Bootstrap shown to left side. */}
                <Navbar.Brand href="/" className='text-white'>Career Guidance</Navbar.Brand>
                {/* Navbar.Toggle imported from Bootstrap shown in small screen to open menu. */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='fs-6 bg-white shadow-none py-1 px-2' />
                {/* Navbar Items. */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 d-flex justify-content-end">
                        {/* Mapfunction in Data for navbar items. */}
                        {
                            Data.map((data) => {
                                return (
                                    <>
                                        {/* Conditional Rendering.  */}
                                        {(data.name === 'Login' && user !== '') || (data.name === 'Register' && user !== '')
                                            ? null
                                            :
                                            <Link className='mx-md-4 text-decoration-none text-white' to={data.link}>
                                                {data.name}
                                            </Link>}
                                    </>
                                )
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

/* Export Component */
export default NavbarComponent;