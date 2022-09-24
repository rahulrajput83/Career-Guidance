/* Imports */
import React, { useState } from 'react';
import Question from '../../Images/icon-question.png'
import Details from './Details';
import RecentQuestions from './RecentQuestions';
import { useSelector } from 'react-redux'
import { useCallback } from 'react';
import { useEffect } from 'react';


/* QnA Function Component */
function QnA() {
    /* const variable to store user id from redux store. */
    const user = useSelector((state) => state.userData).id;
    /* const variable to store user name from redux store. */
    const userName = useSelector((state) => state.userData).Name;
    /* const variable to store user email address from redux store. */
    const email = useSelector((state) => state.userData).email;
    /* useState to show error in input box by changing border color. */
    const [invalid, setInvalid] = useState('border-primary')
    /* useState to show error message */
    const [message, setMessage] = useState('');
    /* useState to show loading on posting new question. */
    const [loadingPostQuestion, setLoadingPostQuestion] = useState(false)
    /* useState to store newQuestion required data. */
    const [newQuestion, setNewQuestion] = useState({
        userId: user,
        userName: userName,
        email: email,
        question: ''
    });
    /* useState to store question from database. */
    const [data, setData] = useState([]);
    /* useState to show loading while all questions are fetching. */
    const [loadingQuestions, setLoadingQuestions] = useState(false);

    /* Callback to get all questions from database. */
    const loadData = useCallback(() => {
        /* Set loadingQuestions to true. */
        setLoadingQuestions(true);
        /* fetch with get method */
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getask`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((response) => {
                /* if response length is greater than or equals to 1. */
                if (response.value.length >= 1) {
                    /* reverse the response */
                    const item = response.value.reverse();
                    /* Store in data useState. */
                    setData(item);
                }
                setLoadingQuestions(false)
            })
            .catch((err) => {
                console.log('err');
            })
    }, [])

    useEffect(() => {
        loadData();
    }, [loadData])

    /* Arrow function triggers when input field data changes. */
    const handleChange = (e) => {
        setInvalid('border-primary')
        setNewQuestion({ ...newQuestion, question: e.target.value })
    }

    /* Arrow function triggers when Ask button is clicked. */
    const handleSubmit = (e) => {
        e.preventDefault();
        /* If email variable is empty, show error message. */
        if (email === '') {
            setMessage('Please Login First');
        }
        /* if newQuestion.question is empty, change input border and show error message. */
        else if (newQuestion.question === '') {
            setInvalid('border-danger');
            setMessage('Please add your question.');
        }
        /* Else Post question. */
        else {
            setMessage('');
            setLoadingPostQuestion(true);
            /* Fetch with post */
            fetch(`${process.env.REACT_APP_BACKEND_URL}/postask`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestion)
            })
                .then(response => response.json())
                .then((response) => {
                    if (response.message === 'Saved') {
                        loadData()
                        setLoadingPostQuestion(false);
                        setMessage('Successfully Added...');
                        setNewQuestion({
                            userId: user,
                            userName: userName,
                            email: email,
                            question: ''
                        })
                        setTimeout(() => {
                            setMessage('');
                        }, 2000)
                    }
                })
                .catch((err) => {
                    setMessage('Error, please try again...');
                    setLoadingPostQuestion(false);
                    setTimeout(() => {
                        setMessage('');
                    }, 2000)
                })
        }

    }


    return (
        <div className='w-full d-flex flex-column'>
            <div className='bg-primary d-flex flex-column justify-content-center align-items-center'>
                <img className='my-4' src={Question} alt='' />
                <span className='fw-bold fs-5 text-white'> It's a Question of your career !</span>
                <div className='d-flex mb-2 flex-column flex-md-row'>
                    {/* Renders Details Component. */}
                    <Details title='1000+' content='Questions' />
                    <Details title='100+' content='Active Users' />
                    <Details title='10hrs max' content='Answering Time' />
                </div>
                <div className='w-100 d-flex flex-row justify-centent-center align-items-center'>
                    <form onSubmit={handleSubmit} className={`col-11 border border-2 ${invalid} py-2 px-3 rounded  rounded-3 bg-white col-md-6 d-flex flex-row mx-auto justify-centent-center align-items-center`} >
                        {/* Input field */}
                        <input value={newQuestion.question} onChange={handleChange} type='text' placeholder='Ask your questions, try to be as detailed as possible.' className="w-100 border border-0 bg-transparent small form-control form-control-sm shadow-none" />
                        {/* Ask Button */}
                        <button type='submit' className='py-2 d-flex justify-content-center align-items-center pe-3 btn bg-primary rounded text-white small'>
                            {loadingPostQuestion ? <span className="spinner-border mx-1 spinner-border-sm" role="status" aria-hidden="true"></span> : null}
                            Ask
                        </button>
                    </form>
                </div>
                <span className='mt-2 mb-5 text-white fs-6'>{message}</span>
            </div>
            <div className='w-100 d-flex flex-row justify-centent-center align-items-center'>
                <div className='col-11 mt-4 mx-auto col-md-9'>
                    {/* Renders RecentQuestions Component */}
                    <RecentQuestions data={data} loadingQuestions={loadingQuestions} />
                </div>
            </div>
        </div>
    )
}

export default QnA