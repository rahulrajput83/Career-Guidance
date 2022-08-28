import React from 'react';
import { useState } from 'react';
import { Step1 } from './Data';
import { Step2 } from './Data';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useEffect } from 'react';

function PsychometricTest() {
    const [value, setValue] = useState('')
    const [invalid, setInvalid] = useState(false);
    const [test, setTest] = useState({
        education: '',
        interestSubject: ''
    })
    const [stepNumber, setStepNumber] = useState(1);
    const [data, setData] = useState(Step1)

    const handleCard = (title) => {
        setInvalid(false)
        if(stepNumber === 1){
            setValue(title)
            setTest({...test, education: title})
        }
        else if(stepNumber === 2){
            setValue(title)
            setTest({...test, interestSubject: title})
        }
    }
    const stepForward = () => {
        if(value !== '') {
            if(stepNumber < 2) {
                setStepNumber(stepNumber + 1);
                setValue('')
            }
        }
        else {
            setInvalid(true)
        }
    }
    const stepBackward = () => {
        if(stepNumber > 1) {
            setStepNumber(stepNumber - 1)
            setValue('')
        }
    }

    useEffect(() => {
        if(stepNumber === 1) {
            setData(Step1)
        }
        else if(stepNumber ===2) {
            setData(Step2)
        }
    }, [stepNumber])


    return (
        <div className='w-100 d-flex flex-column flex-md-row p-3 justify-content-center'>
            <div className='col bg-white px-4 col-md-7 d-flex flex-column py-4 justify-content-start shadow rounded'>
                
                <div className='w-100 mt-2'>
                    {
                        data.map((item, index) => {
                            return (
                                <div key={`Step_${index}`}>
                                    <h4 className='fs-5'>{item.title}</h4>
                                    {
                                        item.Question.map((val, ind) => {
                                            return (
                                                <div key={`Question_${ind}`} className='w-100 mb-3'>
                                                <h6 className='small'>{val.title}</h6>
                                                <div className='d-flex flex-row flex-wrap justify-content-start'>
                                                    {
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
                    {invalid ? <span className='text-danger'>Please choose one.<br /></span> : null}
                    <div className='d-flex py-3 w-full mb-4 justify-content-around position-relative flex-row'>
                        {stepNumber !== 1 ? <button onClick={stepBackward} className="btn position-absolute start-0"><FaArrowLeft /></button>: null}
                        <button className="btn position-absolute end-0" onClick={stepForward}><FaArrowRight /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PsychometricTest;