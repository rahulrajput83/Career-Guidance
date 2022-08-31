import React, { useEffect } from 'react'
import { useState } from 'react'
import profile from '../../Images/profile1.png'
import { Link } from 'react-router-dom';


function RecentQuestions() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:2800/getask', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                const item = response.value.reverse();
                setData(item);
            });
    }, [])
    return (
        <div className='d-flex w-100 flex-column'>
            <span className='fw-bold mb-3 fs-5'>
                Recent Questions
            </span>
            {data.length >= 1 ?
                <div className='w-full'>
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} className="shadow p-3 mb-3 bg-white rounded d-flex flex-column">
                                    <div className='d-flex flex-row align-items-center'>
                                        <img src={profile} style={{ width: '35px', color: 'white' }} alt='' className=' bg-primary p-2 rounded-pill' />
                                        <div className='ms-3 small'>{item.userName}</div>
                                        <div className='small mx-1'>|</div>
                                        <div className='small text-black-50'>{new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
                                    </div>
                                    <div className='mt-2 fs-6'>
                                        {item.question}
                                    </div>
                                    <div className='w-full d-flex justify-content-end align-items-center'>
                                        <Link to='/' className='small text-decoration-none py-2 text-white rounded px-3 bg-primary'>Answers</Link>
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