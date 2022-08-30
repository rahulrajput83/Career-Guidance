/* Imports */
import React from 'react';
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom';

/* Card Component */
function Card(props) {
  return (
    <div className='bg-white position-relative col-md-3 m-2 py-5 px-4 rounded rounded-4 d-flex flex-column justify-content-center align-items-start'>
      {/* head value from props */}
      <div className='fs-3 fw-bold'>{props.head}</div>
      {/* content value from props */}
      <div className='small mt-4 pb-4 fw-medium'>{props.content}</div>
      <Link to='/login' className='text-decoration-none text-white bg-primary py-2 px-4 rounded btn'><FaAngleRight /></Link>
    </div>
  )
}

export default Card;