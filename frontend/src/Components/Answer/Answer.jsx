import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import profile from '../../Images/mf-avatar.svg';
import { useSelector } from 'react-redux'


function Answer() {
    const { questionId } = useParams();
    const [invalid, setInvalid] = useState('border-primary');
    const user = useSelector((state) => state.userData).id;
    const userName = useSelector((state) => state.userData).Name;
    const email = useSelector((state) => state.userData).email;
    const [data, setData] = useState([])
    const [question, setQuestion] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingAnswer, setLoadingAnswer] = useState(false);

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
            setLoadingAnswer(true);
            fetch(`${process.env.REACT_APP_BACKEND_URL}/postanswer`, {
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
                        setLoadingAnswer(false)
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

    const loadQuestion = useCallback(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getask`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                if (response.value.length >= 1) {
                    const filtered = response.value.filter(data => {
                        return data._id === questionId
                    })
                    setQuestion(filtered);
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log('err')
            })
    }, [questionId]);

    const loadAnswer = useCallback(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getanswer`, {
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
    }, [questionId])

    useEffect(() => {
        loadQuestion();
        loadAnswer();
    }, [loadQuestion, loadAnswer]);

    return (
        <div className='w-full mt-3 d-flex flex-row justify-content-center align-items-center'>
            <div className='col-11 p-3 col-md-7 shadow d-flex flex-column'>
                {
                    loading
                        ?
                        <div className='w-100 mb-5 d-flex bg-primary position-relative'>
                            <span className="spinner-border text-primary position-absolute top-0 start-50" role="status" aria-hidden="true">
                            </span>
                        </div> :
                        null
                }
                {
                    question.length >= 1 ?
                        <div className='w-full'>
                            {
                                question.map((item, index) => {
                                    return (
                                        <div className='w-full' key={index}>
                                            <div className='d-flex flex-row align-items-center justify-content-start'>
                                                <div style={{ width: '25px' }} className='d-flex justify-content-center align-items-center'>
                                                    <img src={profile} alt='' className='w-100' />
                                                </div>
                                                <div className='d-flex mx-3 flex-column flex-md-row justify-content-center align-items-start align-items-md-center'>
                                                    <div className='text-start small text-break'>{item.userName}</div>
                                                    <div style={{fontSize:'12px'}} className='ms-0 ms-md-2 text-start text-black-50'>{new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
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
                {email ? <div className='w-100 mt-5 mb-3 d-flex flex-row justify-centent-center align-items-center'>
                    <form onSubmit={handleSubmit} className={`col border border-2 px-1 py-1 rounded ${invalid} rounded-3 bg-white col-md-12 d-flex flex-row mx-auto justify-centent-center align-items-center`} >
                        <input value={newAnswer.answer} onChange={handleChange} type='text' placeholder='Enter your answer here.' className="w-100 border border-0 bg-transparent small form-control form-control-sm shadow-none" />
                        <button type='submit' className='py-1 px-2 btn bg-primary d-flex justify-content-center align-items-center rounded text-white small'>
                            {loadingAnswer ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                            <span>Submit</span></button>
                    </form>
                </div> : <div className='w-100 mt-5 mb-3 text-center d-flex flex-row justify-centent-center align-items-center mx-auto'>
                    <span className='mx-auto'>!! Login to submit your answer !!</span>
                </div>}

                {data.length >= 1 ?
                    <div className='w-full'>
                        {
                            data.map((item, index) => {
                                return (
                                    <div key={index} className="w-full mx-md-4 mx-0 mt-4 rounded d-flex flex-column opacity-100 p-2 bg-primary text-light ">
                                        <div className='d-flex flex-row align-items-center'>
                                            <div style={{ width: '25px' }} className='d-flex justify-content-center align-items-center'>
                                                <img src={profile} alt='' className='w-100' />
                                            </div>
                                            <div className='d-flex mx-3 flex-column flex-md-row justify-content-center align-items-start align-items-md-center'>
                                                <div className='text-start small text-break text-light'>{item.userName}</div>
                                                <div style={{fontSize:'12px'}} className=' ms-0 ms-md-2 text-start text-light'>{new Date(item.date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })}</div>
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