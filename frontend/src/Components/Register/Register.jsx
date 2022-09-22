/* Imports */
import React, { useState } from 'react';
import { Data } from './Data';
import signinImg from '../../Images/Signup.svg'

/* Register Functional Component */
function Register() {

    /* registration state used to store data from input fields. */
    const [registration, setRegistration] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        reenter: ''
    });

    /* Invalid state used to show message when user enter invalid data. */
    const [invalid, setInvalid] = useState(false)
    /* Invalid Mesaage state used to show message when user enter invalid data. */
    const [invalidMessage, setInvalidMessage] = useState('Invalid, please check fields.')

    /* handleChange function triggered when input field data is changed. */
    const handleChange = (e) => {
        setInvalid(false);
        setRegistration({ ...registration, [e.target.name]: e.target.value })
    }

    /* handleSubmit function triggered when user submit the data to register. */
    const handleSubmit = (e) => {
        e.preventDefault();
        /* Conditions to validate form data. */
        if (registration.mobile.length !== 10 || registration.password.length < 6 || registration.password !== registration.reenter) {
            setInvalid(true);
            setInvalidMessage('Invalid, please check fields.')
        }
        else {
            fetch('http://localhost:2800/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registration)
            })
                .then(response => response.json())
                .then((response) => {
                    setInvalid(true);
                    setInvalidMessage(response.message);
                    setRegistration({
                        name: '',
                        email: '',
                        mobile: '',
                        password: '',
                        reenter: ''
                    })
                })
                .catch(() => {
                    setInvalid(true);
                    setInvalidMessage('err, please try again.')
                })
        }
    }

    return (
        <div className='w-100 d-flex flex-column flex-md-row p-3 justify-content-center justify-content-md-end' style={{
            background: `url(${signinImg}) no-repeat left center`, backgroundSize: 'contain'
        }}>
            <div className='col bg-white col-md-4 d-flex flex-column align-items-center py-2 justify-content-center shadow rounded'>
                <h5 className='fs-6'>Register</h5>
                {/* Form */}
                <form className='w-100 px-4 mt-2' onSubmit={handleSubmit}>
                    {
                        /* Map function on Data to render multiple input fields. */
                        Data.map((item, index) => {
                            return (
                                <div key={index} className='w-100 small mb-3'>
                                    <h6 className='small'>{item.title}<span className='text-danger'>*</span></h6>
                                    <input maxLength={item.name === 'mobile' ? 10 : null} value={registration[`${item.name}`]} onInvalid={() => setInvalid(true)} onChange={handleChange} name={item.name} type={item.type} required placeholder={item.placeholder} className="small form-control form-control-sm py-2 shadow-none" />
                                </div>
                            )
                        })
                    }
                    {/* Invalid Message */}
                    {invalid ? <span className='text-danger small'>{invalidMessage}<br /></span> : null}

                    {/* Button to Submit Form data. */}
                    <button type="submit" className="btn btn-sm py-2 px-4 w-auto my-2 btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

/* Export Register Component */
export default Register;