import React from 'react'

export default function OutgoingMessages(props) {
  return (
    <div className={`message_container ${props.received ? 'received' : 'sent'}`} >
        <p>{props.message}</p>
    </div>
  )
}
