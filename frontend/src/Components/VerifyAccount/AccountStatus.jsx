import React from 'react'
import { Link } from 'react-router-dom'

function AccountStatus(props) {
    return (
        <div className='d-flex text-center flex-column justify-content-center align-items-center'>
            <span className='mt-3'>{props.title}</span>
            <Link to={props.link} className='btn mt-3 btn-outline-primary'>{props.button}</Link>
        </div>
    )
}

export default AccountStatus