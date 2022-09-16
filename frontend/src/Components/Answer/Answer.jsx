import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import profile from '../../Images/profile1.png';
import { useSelector } from 'react-redux'


function Answer() {
    const { questionId } = useParams();
    const [invalid, setInvalid] = useState('border-primary');
    const user = useSelector((state) => state.userData).id;
    const userName = useSelector((state) => state.userData).Name;
    const email = useSelector((state) => state.userData).email;
    const [data, setData] = useState([])
    const [question, setQuestion] = useState([])

    const [newAnswer, setNewAnswer] = useState({
        userId: user,
        userName: userName,
        email: email,
        answer: '',
        questionId: questionId
    });

    const handleChange = (e) => {
        setInvalid('border-primary')
        setNewAnswer({ ...newAnswer, answer: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newAnswer.answer === '') {
            setInvalid('border-danger')
        }
        else {
            fetch('https://career-guidance-backend.vercel.app/postanswer', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAnswer)
            })
                .then(response => response.json())
                .then((response) => {
                    if (response.message === 'Saved') {
                        loadAnswer();
                        setNewAnswer({
                            userId: user,
                            userName: userName,
                            email: email,
                            answer: '',
                            questionId: questionId
                        })
                    }
                });
        }

    }

    const loadAnswer = useCallback(() => {
        fetch('https://career-guidance-backend.vercel.app/getanswer', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                if (response.value.length >= 1) {
                    const filtered = response.value.filter(data => {
                        return data.questionId === questionId
                    })
                    const item = filtered.reverse();
                    setData(item);
                }
            })
            .catch((err) => {
                console.log('err')
            })
        fetch('https://career-guidance-backend.vercel.app/getask', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                if (response.value.length >= 1) {
                    const filtered = response.value.filter(data => {
                        return data._id === questionId
                    })
                    setQuestion(filtered)
                }
            })
            .catch((err) => {
                console.log('err')
            })
    }, [questionId])

    useEffect(() => {
        loadAnswer();
    }, [loadAnswer]);

    return (
        <div className='w-full mt-3 d-flex flex-row justify-content-center align-items-center'>
            <div className='col-11 p-3 col-md-7 shadow'>
                {
                    question.length >= 1 ?
                        <div className='w-full'>
                            {
                                question.map((item, index) => {
                                    return (
                                        <div className='w-full' key={index}>
                                            <div className='d-flex flex-row align-items-center justify-content-start'>
                                                <img src={profile} alt='' />
                                                <div className='d-flex mx-3 flex-column flex-md-row justify-content-start align-items-start'>
                                                    <div className='text-start small text-break'>{item.userName}</div>
                                                    <div className='small ms-0 ms-md-2 text-start text-black-50'>{new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
                                                </div>
                                            </div>
                                            <div className='mt-2 text-break fs-6'>
                                                {item.question}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> :
                        null
                }
                <div className='w-100 mt-5 mb-3 d-flex flex-row justify-centent-center align-items-center'>
                    <form onSubmit={handleSubmit} className={`col border border-2 px-1 py-1 rounded ${invalid} rounded-3 bg-white col-md-12 d-flex flex-row mx-auto justify-centent-center align-items-center`} >
                        <input value={newAnswer.answer} onChange={handleChange} type='text' placeholder='Enter your answer here.' className="w-100 border border-0 bg-transparent small form-control form-control-sm shadow-none" />
                        <button type='submit' className='py-1 px-2 btn bg-primary rounded text-white small'>Submit</button>
                    </form>
                </div>
                {data.length >= 1 ?
                    <div className='w-full'>
                        {
                            data.map((item, index) => {
                                return (
                                    <div key={index} className="w-full pt-3 mt-4 bg-white rounded d-flex flex-column">
                                        <div className='d-flex flex-row align-items-center'>
                                            <img src={profile} alt='' />
                                            <div className='d-flex mx-3 flex-column flex-md-row justify-content-start align-items-start'>
                                                <div className='text-start small text-break'>{item.userName}</div>
                                                <div className='small ms-0 ms-md-2 text-start text-black-50'>{new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
                                            </div>
                                        </div>
                                        <div className='mt-2 small text-break'>
                                            {item.answer}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default Answer;