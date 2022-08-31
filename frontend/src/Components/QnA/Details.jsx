import React from 'react'

function  Details(props) {
  return (
    <div className='d-flex flex-column px-5 py-4 text-white justify-content-center align-items-center'>
        <span className='fs-6 fw-bold'>{props.title}</span>
        <span className='small'>{props.content}</span>
    </div>
  )
}

export default  Details