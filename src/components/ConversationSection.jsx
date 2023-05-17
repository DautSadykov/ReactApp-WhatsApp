import React from 'react'
import OutgoingMessages from './OutgoingMessages'

export default function ConversationSection(props) {

    const mappedMessages = props.sentMessages.map((message) => 
        <OutgoingMessages
            message = {message.text}
            key = {message.id}
            received = {message.received}
        />
    )
  
    return (
    <div className='send_message_container'>
        <div className='reciever_info'>
            <h3>Получатель: {props.phoneNumber}</h3>
        </div>
        <div className="message_display_container">
            {mappedMessages}
        </div>
        <input className='enter_message_area' id='enter_message_area' onChange={props.handleMessageChange} type="text" placeholder='Введите сообщение'/>
        <button className='send_message_button' onClick={props.handleSendMessage}>
            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24" xmlSpace="preserve"><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
        </button>
    </div>
  )
}
