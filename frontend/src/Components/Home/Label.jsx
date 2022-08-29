import React from 'react'

function Label(props) {
    return (
        <div className='text-center text-md-start mt-3 text-white fs-6'>
            {props.title}
        </div>
    )
}

export default Label