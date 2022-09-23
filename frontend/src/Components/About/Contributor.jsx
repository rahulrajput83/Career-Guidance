import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

function Contributor(props) {
  return (
    <div className='d-flex mt-4 flex-row justify-content-center'>
      <div className='col col-md-6 text-white bg-primary p-2 rounded d-flex justify-content-between align-items-center'>
        <span>{props.name}</span>
        <div className='d-flex justify-content-center align-items-center'>
          <a href={props.github} target='_blank' rel='noreferrer' className='bg-white text-primary me-3 rounded-pill' type='button'>
            <FaGithub className='m-2' />
          </a>
          <a href={props.linkedin} target='_blank' rel='noreferrer' className='bg-white text-primary rounded-pill' type='button'>
            <FaLinkedinIn className='m-2' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contributor