import React from 'react'

function Table(props) {
    return (
        <div className='d-flex mt-3 flex-column'>
            <span className='small'>{props.title}</span>
            <input className='small py-2 px-3 mt-1 w-100 form-control shadow-none ' value={props.title === 'Career Field' ? props.data === '' || props.data === undefined ? 'Not Yet Selected' : props.data : props.data} readOnly={true} />
          </div>
    )
}

export default Table