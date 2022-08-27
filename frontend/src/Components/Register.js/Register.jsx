import React from 'react';
import { useState } from 'react';
import { Data } from './Data';
import signinImg from '../../Images/Signup.svg'

function Register() {
    const [registration, setRegistration] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        reenter: ''
    });
    const [invalid, setInvalid] = useState(false)

    const handleChange = (e) => {
        setInvalid(false);
        setRegistration({ ...registration, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (registration.mobile.length !== 10 || registration.password.length < 6 || registration.password !== registration.reenter) {
            setInvalid(true)
        }
        else {
            console.log(registration)
            setRegistration({
                name: '',
                email: '',
                mobile: '',
                password: '',
                reenter: ''
            })
        }
    }
    return (
        <div className='w-100 d-flex flex-column flex-md-row p-3 justify-content-center justify-content-md-end' style={{ 
            background: `url(${signinImg}) no-repeat left center`, backgroundSize: 'contain' 
          }}>
            <div className='col bg-white col-md-4 d-flex flex-column align-items-center py-2 justify-content-center shadow rounded'>
                <h5 className='fs-6'>Register</h5>
                <form className='w-100 px-4 mt-2' onSubmit={handleSubmit}>
                    {
                        Data.map((item, index) => {
                            return (
                                <div key={index} className='w-100 small mb-3'>
                                    <h6 className='small'>{item.title}<span className='text-danger'>*</span></h6>
                                    <input value={registration[`${item.name}`]} onInvalid={() => setInvalid(true)} onChange={handleChange} name={item.name} type={item.type} required placeholder={item.placeholder} className="small form-control form-control-sm py-2 shadow-none" />
                                </div>
                            )
                        })
                    }
                    {invalid ? <span className='text-danger small'>Invalid, please check fields.<br /></span> : null}
                    <button type="submit" className="btn btn-sm py-2 px-4 w-auto my-2 btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register;