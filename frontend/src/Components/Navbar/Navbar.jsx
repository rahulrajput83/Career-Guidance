/* Imports */
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

/* Navbar Menu Items */
const Data = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Dashboard',
        link: '/dashboard'
    },
    {
        name: 'QnA',
        link: '/qna'
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
        name: 'Account',
        link: '/account'
    }
]

/* NavbarComponent function */
function NavbarComponent() {
    /* GEts data from redux */
    const user = useSelector((state) => state.userData).email;

    const [expanded, setExpanded] = useState(false);
    return (
        /* Navbar imported from Bootstrap */
        <Navbar bg="primary" expand="md">
            {/* Container imported from Bootstrap */}
            <Container>
                {/* Navbar.Brand imported from Bootstrap shown to left side. */}
                <Navbar.Brand><Link to='/' className='text-white fw-bolder text-decoration-none'>Career Guidance</Link></Navbar.Brand>
                {/* Navbar.Toggle imported from Bootstrap shown in small screen to open menu. */}
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" className='fs-6 bg-white shadow-none py-1 px-2' />
                {/* Navbar Items. */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 d-flex justify-content-end">
                        {/* Mapfunction in Data for navbar items. */}
                        {
                            Data.map((data, index) => {
                                return (
                                    <div key={index}>
                                        {/* Conditional Rendering.  */}
                                        {(data.name === 'Login' && user !== '') || (data.name === 'Register' && user !== '') || (data.name === 'Dashboard' && user === '') || (data.name === 'Account' && user === '')
                                            ? null
                                            :
                                            <Link onClick={() => setExpanded(false)} className='mx-md-4 text-decoration-none text-white' to={data.link}>
                                                {data.name}
                                            </Link>}
                                    </div>
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