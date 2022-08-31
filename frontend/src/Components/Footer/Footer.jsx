import React from 'react';
import { Link } from 'react-router-dom';
import CopyrightLink from './Link';

function Footer() {
    return (
        <div className='bg-white d-flex flex-column flex-md-row py-4'>
            <div className='col text-decoration-none col-md-7 ms-2 ms-md-5'>
                <Link to='/' className='text-decoration-none text-primary fw-bold fs-4'>
                    Career Guidance
                </Link>
            </div>
            <div className='col col-md-4 d-flex mt-2 flex-column ms-2 ms-md-0'>
                <div className='small'>
                    Copyright ©️ Career Guidance
                </div>
                <div className='mt-2 d-flex flex-column'>
                <CopyrightLink link='https://www.linkedin.com/in/rahulrajput83/' name='Rahul Rajput' />
                <CopyrightLink link='https://www.linkedin.com/in/rahulrajput83/' name='Afreen Ansari' />
                </div>
            </div>
        </div>
    )
}

export default Footer