import React from 'react';
import { useSelector } from 'react-redux';
import Table from './Table';
import avatar from '../../Images/avatar.jpg'

function AccountDetails() {
  const user = useSelector((state) => state.userData);
  return (
    <div className='w-100 shadow p-4 mt-5 mt-md-0  shadow-5 rounded-3 d-flex'>
      <div className='w-100 d-flex flex-column'>
        <div className='w-100 d-flex flex-row align-items-center'>
          <img style={{ width: '5rem' }} src={avatar} alt='' className='rounded-pill' />
          <span className='ms-4 fw-bold fs-5'>{user.Name}</span>
        </div>
        <hr className="mt-5 mb-4" />
        <div className='d-flex flex-column'>
          <span className='fs-6 fw-bold'>Personal Details</span>
          <Table title='User ID' data={user.id} />
          <Table title='Email Address' data={user.email} />
          <Table title='Mobile Number' data={`+91${user.mobile}`} />
          <Table title='Career Field' data={user.careerField} />
        </div>
      </div>
    </div>
  )
}

export default AccountDetails;