import React from 'react';
import { useSelector } from 'react-redux';
import Table from './Table';
import avtar from '../../Images/mf-avatar.svg'

function AccountDetails(props) {
  const user = useSelector((state) => state.userData).id;
  const userName = useSelector((state) => state.userData).Name;
  const userEmail = useSelector((state) => state.userData).email;
  return (
    <div className='w-100 justify-content-center align-items-center mt-2 d-flex text-primary'>
      {
        props.title === 'Profile' ?
          <div className='w-100 d-flex flex-column justify-centent-center align-items-center'>
            <img src={avtar} alt='' className='w-25 small' />
            <table class="table table-hover mt-4">
              <tbody>
                <Table title='User ID' data={user} />
                <Table title='Full Name' data={userName} />
                <Table title='Email Address' data={userEmail} />
                <Table title='Mobile Number' data='45815184855' />
                <Table title='Joined on' data='252265645' />
              </tbody>
            </table>
          </div>

          :

          <div className='bg-opacity-10 rounded rounded-4 d-flex justify-content-center py-5 bg-primary w-100'>Coming Soon</div>
      }
    </div>
  )
}

export default AccountDetails;