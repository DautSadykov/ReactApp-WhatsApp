import React from "react";
import Chatlist from "./components/Chatlist";
import ConversationSection from "./components/ConversationSection";

export default function App() {
  const host = 'https://api.green-api.com'
  const idInstance = '1101820862'
  const apiTokenInstance = '10735b7e0cb2492db24f66f79e059652a937254ba6b84ee7bf'
      
  const [messageText, setMessageText] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('79223519045')
  
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
      text: 'recieved message',
      received: true
    },
    {
      id: 2,
      text: 'sent message',
      received: false
    },
  ])

  function handleMessageChange(event) {
    setMessageText(() => event.target.value)
  }

  // function recieveMessage() {
    
  //   fetch(`${host}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       const recievedMessageId = data.receiptId.toString()
  //       console.log(recievedMessageId)
  //       // console.log(data.body.messageData)
  //       console.log(data.body.messageData.textMessageData.textMessage)
  //       fetch(`${host}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${recievedMessageId}`, {method: 'DELETE'})
  //     })
  //   }

  // React.useEffect(() => {
  //   recieveMessage()
  // })

  React.useEffect(() => {
    const receiveMessages = async () => {
      let hasMoreMessages = true

      while (hasMoreMessages) {
        try {
          const response = await fetch(`${host}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
          const data = await response.json()

          if (data) {
            const receivedMessageId = data.receiptId.toString()
            console.log(data.body.messageData.textMessageData.textMessage)
            addNewMessage(data.body.messageData.textMessageData.textMessage, receivedMessageId, true)
            await fetch(`${host}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receivedMessageId}`, { method: 'DELETE' })
          } else {
            hasMoreMessages = false 
          }
        } catch (error) {
          console.error('An error occurred while receiving messages:', error)
        }

        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    };

    receiveMessages();
  }, []);


  function handleSendMessage() {
    fetch(`${host}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, sendMessageOptions)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      addNewMessage(messageText, data.idMessage, false) 
    })
    setMessageText(() => '')
    document.getElementById('enter_message_area').value = ''
  }

  function addNewMessage(text, id, isReceived) {
    setSentMessages((prevSentMessages) => {
      const newMessage = {
        id: id,
        text: text,
        received: isReceived,
      }
      return [newMessage, ...prevSentMessages]
    })
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