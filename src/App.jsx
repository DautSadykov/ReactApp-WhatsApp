import React from "react";
import Chatlist from "./components/Chatlist";
import ConversationSection from "./components/ConversationSection";

export default function App() {
  const host = 'https://api.green-api.com'
  const idInstance = '1101820862'
  const apiTokenInstance = '10735b7e0cb2492db24f66f79e059652a937254ba6b84ee7bf'

  const getMessage = `${host}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
  const sendMessageAPI = `${host}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`

  // React.useEffect(() => {
    //   fetch(getMessage)
    //     .then(res => res.json())
    //     .then(data => {
      //       console.log(data.body.messageData)
      //     })
      // })
      
  const [messageText, setMessageText] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  
  const message = {
    chatId: `${phoneNumber}@c.us`,
    message: messageText
  }
  
  const sendMessageOptions = {
    method: 'POST',
    body: JSON.stringify(message)
  }
  
  function handleMessageChange(event) {
    setMessageText(() => event.target.value)
  }

  function handleSendMessage() {
    fetch(sendMessageAPI, sendMessageOptions)
    .then(res => res.json())
    .then(data => console.log(data))
  }

  function handleChangeNumber() {
    const inputElement = document.getElementById('pn').value
    setPhoneNumber(inputElement)
    document.getElementById('pn').value = ''
  }

  return(
    <main>
      <div className="messenger_container">
        <Chatlist 
          handleChangeNumber = {handleChangeNumber}
        />
        <ConversationSection 
          handleMessageChange = {handleMessageChange}
          handleSendMessage = {handleSendMessage}
          phoneNumber = {phoneNumber}
        />
      </div>
    </main>
  )
}