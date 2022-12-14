/* Imports */
import React from 'react';
import { useState } from 'react';
import { Step1 } from './Data';
import { Step2 } from './Data';
import { Step3 } from './Data';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useEffect } from 'react';
import CareerPaths from '../Dashboard/mock_data.json';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


/* PsychometricTest Component */
function PsychometricTest() {
    /* useNavigate to navigate to other route */
    const navigate = useNavigate();
    /* value useState to store answer of an question. */
    const [value, setValue] = useState('');
    /* useState to store Choose Career Fiels */
    const [careerField, setCareerField] = useState('')
    /* invalid useState to show error message when user didn't answered of question. */
    const [invalid, setInvalid] = useState(false);
    /* test useState to store answers of all questions. */
    const [test, setTest] = useState({
        education: '',
        interestSubject: '',
        hobby: ''
    })
    /* stepNumber to show question number. */
    const [stepNumber, setStepNumber] = useState(1);
    /* data useState to set data to Step value */
    const [data, setData] = useState(Step1);
    const [psyTest, setPsyTest] = useState('d-flex');
    const [psySuccess, setPsySuccess] = useState('visually-hidden');

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);
    const userId = useSelector((state) => state.userData).id;
    const [userCareerPaths, setUserCareerPaths] = useState([]);
    const [loading, setLoading] = useState(false);

    /* handleCard when user clicked on answer. */
    const handleCard = (title) => {
        setInvalid(false)
        if (stepNumber === 1) {
            setValue(title)
            setTest({ ...test, education: title })
        }
        else if (stepNumber === 2) {
            setValue(title)
            setTest({ ...test, interestSubject: title })
        }
        else if (stepNumber === 3) {
            setValue(title)
            setTest({ ...test, hobby: title })
        }
    }

    /* When button click to go to next question. */
    const stepForward = () => {
        if (value !== '') {
            if (stepNumber < 3) {
                setStepNumber(stepNumber + 1);
                setValue('d-flex')
            }
            else {
                const shuffled = [...CareerPaths].sort(() => 0.5 - Math.random());
                setUserCareerPaths(shuffled.slice(0, 6))
                setPsyTest('visually-hidden');
                setPsySuccess('');
            }
        }
        else {
            setInvalid(true)
        }
    }

    /* When button click to go to previous question. */
    const stepBackward = () => {
        if (stepNumber > 1) {
            setStepNumber(stepNumber - 1)
            setValue('')
        }
    }

    /* useEffect on stepNumber updates. */
    useEffect(() => {
        if (stepNumber === 1) {
            setData(Step1)
        }
        else if (stepNumber === 2) {
            setData(Step2)
        }
        else if (stepNumber === 3) {
            setData(Step3)
        }
    }, [stepNumber])

    /* Career Field is selected */
    const submitCareerField = (career) => {
        setCareerField(career);
    }

    /* When finish button clicked */
    const handleSubmitTest = () => {
        if (careerField === '') {
            setInvalid(true)
        }
        else {
            setInvalid(false);
            setLoading(true)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/careerfield`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: userId, careerField: careerField})
            })
                .then(response => response.json())
                .then((response) => {
                    setLoading(false)
                    saveData();
                    
                })
                .catch(() => {
                    setLoading(false)
                    console.log('err')
                })
            
        }
    }

    /* Dispatch to redux store */
    const saveData = () => {
        let action = {
            type: 'ADD_USER',
            payload: { ...userData, careerField: careerField }
        };
        dispatch(action)
        navigate('/dashboard');
    }

    return (
        <div className='w-100 d-flex flex-column flex-md-row p-3 justify-content-center'>

            {/* Psychometric Test */}
            <div className={`col bg-white px-4 col-md-8 ${psyTest} flex-column py-4 justify-content-start shadow rounded`}>
                <div className='w-100 mt-2'>
                    {
                        /* Map function on data. */
                        data.map((item, index) => {
                            return (
                                <div key={`Step_${index}`}>
                                    <h4 className='fs-5'>{item.title}</h4>
                                    {
                                        /* Map function on item.Question. */
                                        item.Question.map((val, ind) => {
                                            return (
                                                <div key={`Question_${ind}`} className='w-100 mb-3'>
                                                    <h6 className='small'>{val.title}</h6>
                                                    <div className='d-flex flex-row flex-wrap justify-content-start'>
                                                        {
                                                            /* Map function on val.value. */
                                                            val.value.map((data) => {
                                                                return (
                                                                    <div onClick={() => handleCard(data.title)} role='button' key={`Valu_${data.title}`} className='me-3'>
                                                                        {data.title === value ?
                                                                            <div className='bg-primary small text-white rounded shadow p-2 my-2'>{data.title}</div>
                                                                            :
                                                                            <div className='bg-white small rounded shadow p-2 my-2'>{data.title}</div>
                                                                        }

                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    {/* To show invalid  */}
                    {invalid ? <span className='text-danger'>Please choose one.<br /></span> : null}
                    <div className='d-flex py-3 w-full mb-4 justify-content-around position-relative flex-row'>
                        {/* Button to go to previous question. */}
                        {stepNumber !== 1 ? <button onClick={stepBackward} className="btn position-absolute start-0"><FaArrowLeft /></button> : null}
                        {/* Button to go to next question. */}
                        <button className="btn position-absolute end-0" onClick={stepForward}><FaArrowRight /></button>
                    </div>
                </div>
            </div>


            {/* Psychometric Test Success */}
            <div className={`col bg-white px-3 col-md-8 ${psySuccess} flex-column py-4 justify-content-start shadow rounded`}>
                <div className='w-100 mt-2'>
                    <h4 className='fs-6'>Your Test has generated the following indicative Career Fields</h4>
                    <span className='small'>Select field closest to you</span>
                    <div className='d-flex flex-row flex-wrap justify-content-start mb-4'>
                        {
                            userCareerPaths.map((item, index) => {
                                return (
                                    <div onClick={() => submitCareerField(item.career)} role='button' key={`Field_${item.career}${index}`} className='col-6 col-md-4' >
                                        {
                                            item.career === careerField ?
                                                <div style={{ fontSize: '12px' }} className='bg-primary small text-white text-justify rounded d-flex flex-column shadow p-2 my-2'>
                                                    <span className='fw-bold text-center'>{item.career}</span>
                                                    <span className='fw-normal text-justify'>{item.description}</span>
                                                </div>
                                                :
                                                <div style={{ fontSize: '12px' }} className='bg-white small rounded d-flex text-justify flex-column shadow p-2 my-2'>
                                                    <span className='fw-bold text-center'>{item.career}</span>
                                                    <span className='fw-normal text-justify'>{item.description}</span>
                                                </div>
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* To show invalid  */}
                    {invalid ? <span className='text-danger mt-4'>Please choose one.<br /></span> : null}
                    <div className='d-flex py-3 w-full mb-4 justify-content-around position-relative flex-row'>
                        {/* Button to go to next question. */}
                        <button onClick={handleSubmitTest} className="btn d-flex justify-content-center align-items-center btn-primary position-absolute end-0">
                        {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                            <span>Finish</span></button>
                    </div>
                </div>
            </div>
        </div >
    )
}

/* Export PsychometricTest Component. */
export default PsychometricTest;