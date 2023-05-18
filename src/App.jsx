import React from "react";
import InfoSection from "./components/InfoSection";
import ConversationSection from "./components/ConversationSection";

export default function App() {      
  const [messageText, setMessageText] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('none')
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
    setPhoneNumber(phoneNum)
    document.getElementById('pn').value = ''
    setMessagesData(() => [])
  }

  function handleChangeIdAndToken() {
    const enteredIdInstance = document.getElementById('id_instance').value
    const enteredApiToken = document.getElementById('apitoken').value
    if (enteredIdInstance && enteredApiToken) {
      setIdInstance(() => enteredIdInstance)
      setApiTokenInstance(() => enteredApiToken)
    } else {
      console.log('invalid id and token')
    }
    // console.log(idInstance)
    // console.log(apiTokenInstance)
    document.getElementById('id_instance').value = ''
    document.getElementById('apitoken').value = ''
  }

  React.useEffect(() => {
    const fetchMessages = async () => {
      if (idInstance && apiTokenInstance) {
        try {
          const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
          const message = await response.json();
          const receivedMessageId = message.receiptId.toString()
          addNewMessage(message.body.messageData.textMessageData.textMessage, receivedMessageId, true)
          await fetch(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receivedMessageId}`, { method: 'DELETE' })
        } catch (error) {
          console.log('No messages yet');
        }
  
        setTimeout(fetchMessages, 1000);
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
          phoneNumber = {phoneNumber}
          sentMessages = {messagesData}
        />
      </div>
    </main>
  )
}