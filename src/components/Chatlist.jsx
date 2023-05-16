import React from 'react'

export default function Chatlist(props) {

  return (
    <div className='choose_number_container'>
        <div className="number_input_container">
            <input id='pn' type="text" placeholder='Введите номер в формате 79998887766'/>
            <button  onClick={props.handleChangeNumber}>
              <img src="message_icon.svg" alt="" />
            </button>
        </div>
    </div>
  )
}
