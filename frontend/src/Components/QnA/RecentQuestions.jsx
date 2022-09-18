/* Imports */
import React from 'react'
import { Link } from 'react-router-dom';
import profile from '../../Images/mf-avatar.svg'

/* RecentQuestions Functional Component */
function RecentQuestions(props) {

    return (
        <div className='d-flex w-100 flex-column'>
            <span className='fw-bold fs-5'>
                Recent Questions
            </span>

            {
                props.loadingQuestions
                    ?
                    <div className='w-100 mb-5 d-flex bg-primary position-relative'>
                        <span className="spinner-border text-primary position-absolute top-0 start-50" role="status" aria-hidden="true">
                        </span>
                    </div> :
                    null
            }

            {props.data.length >= 1 ?
                <div className='w-full d-flex flex-column'>
                    {
                        /* Map function on data. */
                        props.data.map((item, index) => {
                            return (
                                <div key={index} className="d-flex shadow mt-4 w-full rounded ps-3 pt-3 flex-column">
                                    <div className='d-flex flex-row align-items-center justify-content-start'>
                                        <div style={{ width: '25px' }} className='d-flex justify-content-center align-items-center'>
                                            <img src={profile} alt='' className='w-100' />
                                        </div>
                                        <div className='d-flex mx-3 flex-column flex-md-row justify-content-start align-items-start'>
                                            <div className='text-start small text-break'>{item.userName}</div>
                                            <div className='small ms-0 ms-md-2 text-start text-black-50'>{new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
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
                : null
            }

        </div>
    )
}

export default RecentQuestions