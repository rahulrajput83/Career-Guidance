import React from 'react';
import { IoWarningOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux';

function DeletAccount() {
  const user = useSelector((state) => state.userData).id;
  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-account`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: user})
  })
      .then(response => response.json())
      .then((response) => {
        console.log(response)
      })
  }
  return (
    <div className='w-100 shadow p-4 mt-5 mt-md-0 text-center shadow-5 rounded-3 d-flex flex-column'>
        <span className='fw-bold fs-5'>Delete Your Account</span>
        <span className='small'>Delete or Close your account permanently.</span>
        <div className='d-flex fs-5 justify-content-center align-items-center my-3 text-danger'>
            <IoWarningOutline/>
            <span className='mx-2'>Warning</span>
        </div>
        <span>If you delete your account, all data associated with your account will be deleted forever and all questions/answers you have posted will also be deleted. Once deleted, this process can't be reverse.</span>
        <button onClick={handleDelete} type="button" className="btn col col-md-5 mx-auto my-4 btn-outline-danger">Sure, Delete Now</button>
    </div>
  )
}

export default DeletAccount