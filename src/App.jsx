import React from "react";
import InfoSection from "./components/InfoSection";
import ConversationSection from "./components/ConversationSection";

export default function App() {      
  const [messageText, setMessageText] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [messagesData, setMessagesData] = React.useState([])
  const [idInstance, setIdInstance] = React.useState('')
  const [apiTokenInstance, setApiTokenInstance] = React.useState('')
  
  const sendingMessageText = {
    chatId: `${phoneNumber}@c.us`,
    message: messageText
  }
  
  const sendMessageOptions = {
    method: 'POST',
    body: JSON.stringify(sendingMessageText)
  }

  function handleMessageChange(event) {
    setMessageText(() => event.target.value)
  }

  function handleChangeNumber() {
    const phoneNum = document.getElementById('pn').value
    if (!phoneNum) window.alert('Enter the phone number')
    setPhoneNumber(phoneNum)
    document.getElementById('pn').value = ''
    setMessagesData(() => [])
  }

  function handleChangeIdAndToken() {
    const enteredIdInstance = document.getElementById('id_instance').value
    const enteredApiToken = document.getElementById('apitoken').value
    if (!enteredIdInstance || !enteredApiToken) {
      window.alert('Enter idInstance и apiTokenInstance')
      return 1
    }
    if (enteredIdInstance.length != 10 || enteredApiToken.length != 50) {
      window.alert('Invalid idInstance или apiTokenInstance')
      return 1
    }
    setIdInstance(() => enteredIdInstance)
    setApiTokenInstance(() => enteredApiToken)
    document.getElementById('id_instance').value = ''
    document.getElementById('apitoken').value = ''
  }

  React.useEffect(() => {
    const fetchMessages = async () => {
      if (idInstance && apiTokenInstance) {
        console.log(1)
        try {
          const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
          const message = await response.json();
          console.log('message')
          const receivedMessageId = message.receiptId.toString()
          console.log('receivedMessageId')
          if (!message?.body?.messageData?.textMessageData?.textMessage) {
            await fetch(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receivedMessageId}`, { method: 'DELETE' })
            return 1
          }
          addNewMessage(message.body.messageData.textMessageData.textMessage, receivedMessageId, true)
          await fetch(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receivedMessageId}`, { method: 'DELETE' })
        } catch (error) {
          console.log(error);
        }
        
        setTimeout(fetchMessages, 5);
      }
    };
    fetchMessages();
  }, [idInstance]);
  
  function handleSendMessage() {
    if (!messageText) return 1
    fetch(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, sendMessageOptions)
      .then(res => res.json())
      .then(data => {
      addNewMessage(messageText, data.idMessage, false) 
    })
    setMessageText(() => '')
    document.getElementById('enter_message_area').value = ''
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  function addNewMessage(text, id, isReceived) {
    setMessagesData((prevSentMessages) => {
      const newMessage = {
        id: isReceived ? `received_${id}` : id,
        text: text,
        received: isReceived,
      }
      return [newMessage, ...prevSentMessages]
    })
  }

  return(
    <main>
      <div className="messenger_container">
        <InfoSection 
          handleChangeNumber = {handleChangeNumber}
          handleChangeIdAndToken = {handleChangeIdAndToken}
        />
        <ConversationSection 
          handleMessageChange = {handleMessageChange}
          handleSendMessage = {handleSendMessage}
          handleKeyPress = {handleKeyPress}
          phoneNumber = {phoneNumber}
          sentMessages = {messagesData}
        />
      </div>
    </main>
  )
}