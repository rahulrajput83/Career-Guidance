import React from 'react'
import Contributor from './Contributor'
import Lines from './Lines'

function About() {
    return (
        <div className='container py-4'>
            <div className='fs-5 text-center text-primary'>About Career Guidance</div>
            <div className='py-2 d-flex flex-column'>
                <span>We all have gone through the same career phases where we felt the need of having a go-to person. The stress, anxiety and confusion of what to do in life, what to do after 10<sup>th</sup>, 12<sup>th</sup>. We have created this to help you to choose best career for you by providing detail about careers. You can also talk to our experts for guidance for FREE.</span>
                <div className='py-3 d-flex flex-column justify-content-center'>
                    <div className='fs-5 mb-2 text-center text-primary d-flex justify-content-center'>
                        <Lines />
                        <div className=''>Contributors</div>
                        <Lines />
                    </div>
                    <Contributor name='Afreen Ansari' github='https://github.com' linkedin='https://linkedin.com' />
                    <Contributor name='Rahul Rajput' github='https://github.com' linkedin='https://linkedin.com' />
                </div>
            </div>
        </div>
    )
}

export default About