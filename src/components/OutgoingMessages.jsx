import React from 'react'

export default function OutgoingMessages(props) {
  return (
    <div className='sent_message_container'>
        <p>{props.message}</p>
    </div>
  )
}
