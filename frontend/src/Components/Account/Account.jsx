import React from 'react'
import { useState } from 'react';
import AccountDetails from './AccountDetails';

const Data = ["Profile", 'Password', 'My Plan', 'Delete Account']

function Account() {
    const [account, setAccount] = useState('Profile')
    return (
        <div className='d-flex my-5 h-auto flex-column flex-md-row justify-content-evenly align-items-center align-items-md-start '>
            <div className='col-11 px-2 col-md-4 my-2'>
                <table className="table table-hover">
                    <tbody>
                        {
                            Data.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => setAccount(item)}>
                                        <td className={`small ${item === 'Delete Account' ? 'text-danger' : ''}`}>{item}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='col-11 col-md-6 mt-2 d-flex flex-column align-items-start '>
                <AccountDetails title={account} />
            </div>
        </div>
    )
}

export default Account;