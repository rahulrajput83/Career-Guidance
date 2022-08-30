/* Imports */
import React from 'react'

/* Label Component */
function Label(props) {
    return (
        /* title value from props */
        <div className='text-center text-md-start mt-3 text-white fs-6'>
            {props.title}
        </div>
    )
}

export default Label;