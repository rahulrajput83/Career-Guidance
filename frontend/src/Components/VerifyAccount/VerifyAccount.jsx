import React from 'react'
import { useParams } from 'react-router-dom'

function VerifyAccount() {
    const {id} = useParams();
    const {email} = useParams();
  return (
    <div>{id}{email}</div>
  )
}

export default VerifyAccount