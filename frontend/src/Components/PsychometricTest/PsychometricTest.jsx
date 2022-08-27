import React from 'react';
import { useState } from 'react';
import { Step1 } from './Data';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

function PsychometricTest() {
    const [value, setValue] = useState('')
    const [invalid, setInvalid] = useState(false)

    const handleCard = (title) => {
        setValue(title)
    }
    console.log(value)

    return (
        <div className='w-100 d-flex flex-column flex-md-row p-3 justify-content-center'>
            <div className='col bg-white px-4 col-md-7 d-flex flex-column py-4 justify-content-start shadow rounded'>
                <h4 className='fs-5'>Where are you now ?</h4>
                <form className='w-100 mt-2'>
                    {
                        Step1.map((item, index) => {
                            return (
                                <div key={`Step_${index}`}>
                                    {
                                        item.Question.map((val, ind) => {
                                            return (
                                                <div key={`Question_${ind}`} className='w-100 mb-3'>
                                                <h6 className='small'>{val.title}</h6>
                                                <div className='d-flex flex-row flex-wrap justify-content-center justify-content-md-start'>
                                                    {
                                                        val.value.map((data, inde) => {
                                                            return (
                                                                <div onClick={() => handleCard(data.title)} role='button' key={`Valu_${data.title}`} className=' me-3'>
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
                    {invalid ? <span className='text-danger'>Please select required fields.<br /></span> : null}
                    <div className='d-flex py-3 w-full justify-content-between flex-row'>
                        <button type="submit" className="btn w-auto"><FaArrowLeft /></button>

                        <button type="submit" className="btn w-auto "><FaArrowRight /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PsychometricTest;