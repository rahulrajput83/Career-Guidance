import React from 'react'

function Card(props) {
  return (
    <div className='bg-white col-md-3 m-2 py-5 px-4 rounded rounded-4 d-flex flex-column justify-content-center align-items-start'>
      <div className='fs-3 fw-bold'>{props.head}</div>
      <div className='small mt-4 pb-4 fw-medium'>{props.content}</div>
    </div>
  )
}

export default Card;