import React from 'react'

export default function InfoSection(props) {

  return (
    <div className='choose_number_section'>
        <input id='pn' type="text" placeholder='Введите номер в формате 79998887766'/>
        <button onClick={props.handleChangeNumber} className='enter_number_button'>
          <img src="plus_icon.svg" alt="" />
        </button>
        <div className="instance_token_enter_section">
          <div>idInstance:</div>
          <input type="text" id="id_instance" />
          <div>apiTokenInstance:</div>
          <input type="text" id="apitoken" />
        </div>
        <button onClick={props.handleChangeIdAndToken} className='enter_id_button'>Enter</button>
    </div>
  )
}
