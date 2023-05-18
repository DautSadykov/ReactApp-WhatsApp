import React from 'react'

export default function Chatlist(props) {

  return (
    <div className='choose_number_section'>
        <div className="number_input_container">
            <input id='pn' type="text" placeholder='Введите номер в формате 79998887766'/>
            <button  onClick={props.handleChangeNumber}>
              <img src="message_icon.svg" alt="" />
            </button>
        </div>
        <div className="instancetoken_enter_section">
          <div>idInstance</div>
          <input type="text" id="id_instance" />
          <div>apiTokenInstance</div>
          <input type="text" id="apitoken" />
        </div>
        <button onClick={props.handleChangeIdAndToken}>Enter</button>
    </div>
  )
}
