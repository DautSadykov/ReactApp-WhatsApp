import React from "react";
import Chatlist from "./components/Chatlist";
import ConversationSection from "./components/ConversationSection";

export default function App() {
  const host = 'https://api.green-api.com'
  const idInstance = '1101820862'
  const apiTokenInstance = '10735b7e0cb2492db24f66f79e059652a937254ba6b84ee7bf'

  const getMessageAPI = `${host}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
  const sendMessageAPI = `${host}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`

  const sentMessagesData = []

  // React.useEffect(() => {
    //   fetch(getMessageAPI)
    //     .then(res => res.json())
    //     .then(data => {
      //       console.log(data.body.messageData)
      //     })
      // })
      
  const [messageText, setMessageText] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('none')
  
  const outMessageText = {
    chatId: `${phoneNumber}@c.us`,
    message: messageText
  }
  
  const sendMessageOptions = {
    method: 'POST',
    body: JSON.stringify(outMessageText)
  }
  
  const [sentMessages, setSentMessages] = React.useState([
    {
      id: 1,
      text: 'messageText',
      recieved: true
    },
    {
      id: 2,
      text: 'messageText',
      recieved: false
    },
    {
      id: 3,
      text: 'messageText',
      recieved: true
    },
  ])

  function handleMessageChange(event) {
    setMessageText(() => event.target.value)
  }

  function handleSendMessage() {
    fetch(sendMessageAPI, sendMessageOptions)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setSentMessages((prevSentMessages) => {
        const newMessage = {
          id: data.idMessage,
          text: messageText
        }
        return [newMessage, ...prevSentMessages]
      })
    })
    setMessageText(() => '')
    document.getElementById('enter_message_area').value = ''
  }

  function handleChangeNumber() {
    const phoneNum = document.getElementById('pn').value
    setPhoneNumber(phoneNum)
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
          sentMessages = {sentMessages}
        />
      </div>
    </main>
  )
}