import React from 'react';
import { Link } from 'react-router-dom';
import poster from '../../Images/poster.png'
import Card from './Card';
import Label from './Label';

function Home() {
    return (
        <div className='w-full d-flex flex-column bg-primary'>
            <div className='d-flex flex-column-reverse flex-md-row justify-content-evenly py-5 w-100'>
                <div className='col-md-5 mt-5 mt-md-0 d-flex flex-column justify-content-center align-items-md-start align-items-center'>
                    <div className='w-full text-center text-md-start display-3 text-white fw-bold'>
                        Find your Best Career Fit & more
                    </div>
                    <Label title='Career Counselling Online' />
                    <Link to='/login' className='mt-2 py-2 px-4 border border-2 border-white text-decoration-none rounded text-white fw-800'>Login</Link>
                    <Label title='Now, experience the benefits of career counselling free of all hassles from the comfort of your home !' />
                </div>
                <div className='col-md-5 d-flex justify-content-center align-items-center'>
                    <img className='w-100' src={poster} alt='' />
                </div>
            </div>
            <h3 className='text-center text-white'>Career Counselling</h3>
            <div className='w-full d-flex flex-column flex-md-row justify-content-center'>
                <Card head='Know Yourself' content='Explore your aptitudes and interests through our test.' />
                <Card head='Inform Yourself' content='The right information at the right time will get you to the right opportunity.' />
                <Card head='Plan for Yourself' content='Expert guidance helps you make the most of your opportunities and succeed. Talk to our counsellors.' />
            </div>
        </div>
    )
}

export default Home