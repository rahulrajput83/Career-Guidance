import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profile from '../../Images/mf-avatar.svg'

function UserQuestion() {
    const user = useSelector((state) => state.userData);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        /* Set loadingQuestions to true. */
        setLoading(true);
        /* fetch with get method */
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getask`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                /* if response length is greater than or equals to 1. */
                if (response.value.length >= 1) {
                    /* Filter with user */
                    let item = response.value.filter(item => {
                        return item.userId === user.id});
                    /* reverse the response */
                    item = item.reverse();
                    /* Store in data useState. */
                    setData(item);
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log('err');
            })
    }, [user.id])
    return (
        <div className='w-100 mt-5 mt-md-0 d-flex flex-column'>
            {
                loading
                    ?
                    <div className='w-100 mb-5 d-flex bg-primary position-relative'>
                        <span className="spinner-border text-primary position-absolute top-0 start-50" role="status" aria-hidden="true">
                        </span>
                    </div> :
                    null
            }

            {data.length >= 1 ?
                <div className='w-100 d-flex flex-column'>
                    <span className='mb-2'>You have asked {data.length} questions.</span>
                    {
                        /* Map function on data. */
                        data.map((item, index) => {
                            return (
                                <div key={index} className={`d-flex shadow w-100 ${index > 0 ? 'mt-4' : 'mt-0'} rounded ps-3 pt-3 flex-column`}>
                                    <div className='d-flex flex-row align-items-center justify-content-start'>
                                        <div style={{ width: '25px' }} className='d-flex justify-content-center align-items-center'>
                                            <img src={profile} alt='' className='w-100' />
                                        </div>
                                        <div className='d-flex mx-3 flex-column flex-md-row justify-content-center align-items-start align-items-md-center'>
                                            <div className='text-start small text-break'>{item.userName}</div>
                                            <div style={{ fontSize: '13px' }} className='ms-0 ms-md-2 text-start text-black-50'>{new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
                                        </div>
                                    </div>
                                    <div className='mt-3 text-break fs-6'>
                                        {item.question}
                                    </div>
                                    <div className='w-full d-flex justify-content-end align-items-center'>
                                        <Link to={`/answer/${item._id}`} className='small text-decoration-none py-2 text-white rounded px-3 bg-primary'>Answers</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                : <span>You didn't have asked any question yet.</span>
            }
        </div>
    )
}

export default UserQuestion