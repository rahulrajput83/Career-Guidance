import React from 'react';
import { FaUser } from 'react-icons/fa'


function Post(props) {
    return (
        <div className='w-full d-flex flex-column rounded pt-3 mt-4'>
            <div className='d-flex flex-row align-items-center justify-content-start'>
                <div className='rounded rounded-pill bg-dark'>
                    <FaUser className='fs-6 m-2 text-white' />
                </div>
                <div className='d-flex mx-3 flex-column flex-md-row justify-content-start align-items-start'>
                    <div className='text-start small text-break'>{props.userName}</div>
                    <div className='small ms-0 ms-md-2 text-start text-black-50'>{new Date(props.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
                </div>
            </div>
            <div className='mt-2 text-break fs-6'>
                {props.question}
            </div>
        </div>
    )
}

export default Post