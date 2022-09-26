/* Imports */
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Data } from './Data';

/* Register Functional Component */
function Register() {
    const [showRegister, setShowRegister] = useState('');
    const [showVerify, setShowVerify] = useState('visually-hidden');
    const [sendAgainLoading, setSendAgainLoading] = useState(false);

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

    /* useState for loading spinner. */
    const [loading, setLoading] = useState(false);

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
            setLoading(true)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registration)
            })
                .then(response => response.json())
                .then((response) => {
                    setLoading(false)
                    if (response.message === 'User successfully registered.') {
                        setShowRegister('visually-hidden');
                        setShowVerify('')
                    }
                    else {
                        setInvalid(true);
                        setInvalidMessage(response.message);
                    }
                })
                .catch(() => {
                    setLoading(false)
                    setInvalid(true);
                    setInvalidMessage('err, please try again.')
                })
        }
    }

    useEffect(() => {
        setShowRegister('')
        setShowVerify('visually-hidden');
        setRegistration({
            name: '',
            email: '',
            mobile: '',
            password: '',
            reenter: ''
        })
    }, [])

    const handleSendAgain = () => {
        setSendAgainLoading(true)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/sendagain`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration)
        })
            .then(response => response.json())
            .then((response) => {
                setSendAgainLoading(false)

            })
            .catch(() => {
                setSendAgainLoading(false)
            })
    }

    return (
        <div className='w-100 d-flex flex-column flex-md-row p-3 justify-content-center justify-content-md-end'>
            {/* Registration Form */}
            <div className={`col bg-white ${showRegister} col-md-4 d-flex flex-column align-items-center py-2 justify-content-center shadow rounded`}>
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
                    <button type="submit" className="btn d-flex justify-content-center align-items-center btn-sm py-2 px-3 w-auto my-4 btn-primary">
                        {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                        <span>Submit</span>
                    </button>
                </form>
            </div>

            {/* Email Verification */}
            <div className={`col bg-white ${showVerify} col-md-4 d-flex flex-column align-items-center py-2 px-2 px-md-4 justify-content-center shadow rounded`}>
                <h5 className='fs-6'>Verify Email Address</h5>
                <h6 className='small mt-4'>We have send an email to your email address</h6>
                <input type="text" readOnly={true} className="form-control py-2 border-primary form-control-sm small shadow-none" value={registration.email} aria-label="Username" aria-describedby="input-group-right" />
                <h6 className='small mt-2'>Please verify your account first by clicking the link send to your email address.</h6>
                <button onClick={handleSendAgain} className='btn btn-primary my-4 d-flex justify-content-center align-items-center '>
                    {sendAgainLoading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                    <span>Send Again</span></button>
            </div>
        </div>
    )
}

/* Export Register Component */
export default Register;