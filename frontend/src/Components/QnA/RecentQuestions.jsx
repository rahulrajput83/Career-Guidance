import React, { useEffect } from 'react'
import { useState } from 'react'
import profile from '../../Images/profile1.png'
import { Link } from 'react-router-dom';
import Post from './Post';


function RecentQuestions() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:2800/getask', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                if (response.value.length >= 1) {
                    const item = response.value.reverse();
                    setData(item);
                }
            })
            .catch((err) => {
                console.log('err');
            })
    }, [])
    return (
        <div className='d-flex w-100 flex-column'>
            <span className='fw-bold mb-3 fs-5'>
                Recent Questions
            </span>
            {data.length >= 1 ?
                <div className='w-full shadow ps-3 bg-white rounded d-flex flex-column'>
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} className="d-flex ">
                                    {/* <div className='d-flex flex-row align-items-center'>
                                        <img src={profile} alt='' />
                                        <div className='d-flex mx-3 flex-column flex-md-row justify-content-start align-items-start'>
                                            <div className='text-start small text-break'>{item.userName}</div>
                                            <div className='small ms-0 ms-md-2 text-start text-black-50'>{new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
                                        </div>
                                    </div>
                                    <div className='mt-2 fs-6 text-break'>
                                        {item.question}
                                    </div> */}
                                    <Post userName={item.userName} question={item.question} data={item.date} />
                                    <div className='w-full mt-1 d-flex justify-content-end align-items-center'>
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