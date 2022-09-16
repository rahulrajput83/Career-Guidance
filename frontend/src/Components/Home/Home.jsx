/* Imports */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import poster from '../../Images/poster.png'
import Card from './Card';
import Label from './Label';

/* Home Component */
function Home() {
    /* Gets data from redux */
    const userEmail = useSelector((state) => state.userData).email;

    return (
        <div className='w-full d-flex flex-column bg-primary'>
            <div className='d-flex flex-column-reverse flex-md-row justify-content-evenly py-5 w-100'>
                <div className='col-md-5 mt-5 mt-md-0 d-flex flex-column justify-content-center align-items-md-start align-items-center'>
                    <div className='w-full text-center text-md-start display-3 text-white fw-bold'>
                        Find your Best Career Fit & more
                    </div>
                    {/* Renders Label Component with title. */}
                    <Label title='Career Counselling Online' />
                    {/* Login button */}
                    {!userEmail ? <Link to='/login' className='mt-2 py-2 px-4 border border-2 border-white text-decoration-none rounded text-white fw-800'>Login</Link> : null}
                    {/* Renders Label Component with title. */}
                    <Label title='Now, experience the benefits of career counselling free of all hassles from the comfort of your home !' />
                </div>
                {/* Image */}
                <div className='col-md-5 d-flex justify-content-center align-items-center'>
                    <img className='w-100' src={poster} alt='' />
                </div>
            </div>
            {/* Heading 3 */}
            <h3 className='text-center text-white'>Career Counselling</h3>
            <div className='w-full d-flex mb-5 flex-column flex-md-row justify-content-center'>
                {/* Renders Card Component with head & content. */}
                <Card head='Know Yourself' content='Explore your aptitudes and interests through our test.' link={userEmail ? '/psychometric-test' : '/login'} />
                {/* Renders Card Component with head & content. */}
                <Card head='Inform Yourself' content='The right information at the right time will get you to the right opportunity.' link='/login' />
                {/* Renders Card Component with head & content. */}
                <Card head='Plan for Yourself' content='Expert guidance helps you make the most of your opportunities and succeed. Talk to our counsellors.' link='/login' />
            </div>
        </div>
    )
}

/* Exports Home Component. */
export default Home