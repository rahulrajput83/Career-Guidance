import React from 'react'


function CopyrightLink(props) {
  return (
    <a className='small fw-medium text-decoration-none text-primary' href={props.link} rel="noreferrer" target='_blank' >{props.name}</a>
  )
}

export default CopyrightLink;