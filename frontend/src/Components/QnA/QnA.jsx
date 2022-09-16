import React, { useState} from 'react';
import Question from '../../Images/icon-question.png'
import Details from './Details';
import RecentQuestions from './RecentQuestions';
import { useSelector } from 'react-redux'


function QnA() {
    const user = useSelector((state) => state.userData).id;
    const userEmail = useSelector((state) => state.userData).email;
    const userName = useSelector((state) => state.userData).Name;
    const email = useSelector((state) => state.userData).email;
    const [invalid, setInvalid] = useState('border-primary')
    const [message, setMessage] = useState('')

    const [newQuestion, setNewQuestion] = useState({
        userId: user,
        userName: userName,
        email: email,
        question: ''
    });

    const handleChange = (e) => {
        setInvalid('border-primary')
        setNewQuestion({ ...newQuestion, question: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userEmail === '') {
            setInvalid('border-danger');
            setMessage('Please Login First');
        }
        else if (newQuestion.question === '') {
            setInvalid('border-danger');
            setMessage('Please add your question.');
        }
        else {
            setMessage('');
            fetch('https://career-guidance-backend.vercel.app/postask', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestion)
            })
                .then(response => response.json())
                .then((response) => {
                    if(response.message === 'Saved') {
                        setNewQuestion({
                            userId: user,
                            userName: userName,
                            email: email,
                            question: ''
                        })
                    }
                });
        }

    }


    return (
        <div className='w-full d-flex flex-column'>
            <div className='bg-primary d-flex flex-column justify-content-center align-items-center'>
                <img className='my-4' src={Question} alt='' />
                <span className='fw-bold fs-5 text-white'> It's a Question of your career !</span>
                <div className='d-flex mb-2 flex-column flex-md-row'>
                    <Details title='1000+' content='Questions' />
                    <Details title='100+' content='Active Users' />
                    <Details title='10hrs max' content='Answering Time' />
                </div>
                <div className='w-100 d-flex flex-row justify-centent-center align-items-center'>
                    <form onSubmit={handleSubmit} className={`col-11 border border-2 ${invalid} py-2 px-3 rounded  rounded-3 bg-white col-md-6 d-flex flex-row mx-auto justify-centent-center align-items-center`} >
                        <input value={newQuestion.question} onChange={handleChange} type='text' placeholder='Ask your questions, try to be as detailed as possible.' className="w-100 border border-0 bg-transparent small form-control form-control-sm shadow-none" />
                        <button type='submit' className='py-2 px-4 btn bg-primary rounded text-white small'>Ask</button>
                    </form>
                </div>
                <span className='mt-2 mb-5 text-white fs-6'>{message}</span>
            </div>
            <div className='w-100 d-flex flex-row justify-centent-center align-items-center'>
                <div className='col-11 mt-4 mx-auto col-md-9'>
                    <RecentQuestions />
                </div>
            </div>
        </div>
    )
}

export default QnA