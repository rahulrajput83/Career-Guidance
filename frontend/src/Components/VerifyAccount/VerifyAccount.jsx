import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountStatus from './AccountStatus';

function VerifyAccount() {
    const { id } = useParams();
    const { email } = useParams();
    const [start, setStart] = useState(true);
    const [verifing, setVerifying] = useState(false);
    const [alreadyVerified, setAlreadyVerified] = useState(false);
    const [successfullyVerified, setSuccessfullyVerified] = useState(false);
    const [failed, setFailed] = useState(false);
    const data = {
        userId: id,
        userEmail: email
    }

    const startVerification = (e) => {
        e.preventDefault();
        setStart(false);
        console.log(process.env.REACT_APP_BACKEND_URL);
        setVerifying(true);
        setAlreadyVerified(false);
        setSuccessfullyVerified(false);
        setFailed(false)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((response) => {
                if (response.message === 'Already Verified') {
                    setVerifying(false);
                    setAlreadyVerified(true);
                    setSuccessfullyVerified(false);
                    setFailed(false);
                }
                else if (response.message === 'Successfully Verified') {
                    setVerifying(false);
                    setAlreadyVerified(false);
                    setSuccessfullyVerified(true);
                    setFailed(false);
                }
                else {
                    setVerifying(false);
                    setAlreadyVerified(false);
                    setSuccessfullyVerified(false);
                    setFailed(true)
                }
            })
            .catch((err) => {
                setVerifying(false);
                setAlreadyVerified(false);
                setSuccessfullyVerified(false);
                setFailed(true)
                console.log(err)
            })
    }

    return (
        <div className='container w-100 d-flex flex-column justify-content-center my-5 align-items-center'>
            {start ? 
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h5 className='mb-2'>Verify Account</h5>
                <span className='fs-6 text-center mt-1 mb-3'>Click on below button to verify <span className='fw-bold'>{email}</span>.</span>
                <button onClick={startVerification} className='btn btn-outline-primary'>Verify Account</button>
            </div>
             : null}
            {verifing ?
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <span className="spinner-border text-primary" role="status" aria-hidden="true"></span>
                    <span className='mt-3'>Please wait, we are verifying your account.</span>
                </div>
                :
                null}
            {alreadyVerified ? <AccountStatus title='Your account is already verified.' button='Go to Login' link='/login' /> : null}
            {successfullyVerified ? <AccountStatus title='Your account is successfully verified, you can now login to your account.' button='Go to Login' link='/login' /> : null}
            {failed ? <div className='d-flex text-center flex-column justify-content-center align-items-center'>
                <span className='mt-3'>Failed to verify your account, please try again...</span>
                <button onClick={() => startVerification()} className='btn mt-3 btn-outline-primary'>Try Again</button>
            </div> :
                null}
        </div>
    )
}

export default VerifyAccount;