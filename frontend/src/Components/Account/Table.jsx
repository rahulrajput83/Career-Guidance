import React from 'react'

function Table(props) {
    return (
        <tr>
            <td className='small'>{props.title}</td>
            <td className='small'>{props.data}</td>
        </tr>
    )
}

export default Table