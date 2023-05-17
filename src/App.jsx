import React from "react";
import Chatlist from "./components/Chatlist";
import ConversationSection from "./components/ConversationSection";

export default function App() {
  const host = 'https://api.green-api.com'
  const idInstance = '1101820862'
  const apiTokenInstance = '10735b7e0cb2492db24f66f79e059652a937254ba6b84ee7bf'
      
  const [messageText, setMessageText] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('79651670920')
  
  const outMessageText = {
    chatId: `${phoneNumber}@c.us`,
    message: messageText
  }
  
  const sendMessageOptions = {
    method: 'POST',
    body: JSON.stringify(outMessageText)
  }
  
  const [messagesData, setMessagesData] = React.useState([])

  function handleMessageChange(event) {
    setMessageText(() => event.target.value) 
  }

  React.useEffect(() => {
    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    const fetchMessages = async () => {
      try {
        const response = await fetch(apiUrl);
        const message = await response.json();
        console.log(message)
        // const receivedMessageId = message.receiptId.toString()
        // await fetch(`${host}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receivedMessageId}`, { method: 'DELETE' })
      } catch (error) {
        console.error('Error fetching messages:', error);
      }

      setTimeout(fetchMessages, 1000);
    };

    // Start fetching messages
    fetchMessages();
  }, []);

  // React.useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     async function receiveMessage () {
  //       const response = await fetch(`${host}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
  //       const data = await response.json()
  //       console.log('function called')
  //       if (data) {
  //         console.log('data received')
  //         const receivedMessageId = data.receiptId.toString()
  //         addNewMessage(data.body.messageData.textMessageData.textMessage, receivedMessageId, true)
  //         await fetch(`${host}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receivedMessageId}`, { method: 'DELETE' })
  //       }
  //     }
  //     receiveMessage()

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, 2000);
  // }, []);

  // React.useEffect(() => {
  //   async function receiveMessages () {
  //     let hasMoreMessages = true

  //     while (hasMoreMessages) {
  //       try {
  //         const response = await fetch(`${host}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
  //         const data = await response.json()

  //         if (data) {
  //           const receivedMessageId = data.receiptId.toString()
  //           const messageExists = messagesData.find((message) => message.id === receivedMessageId)
  //           if (!messageExists) {
  //             addNewMessage(data.body.messageData.textMessageData.textMessage, receivedMessageId, true)
  //           }

  //           await fetch(`${host}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receivedMessageId}`, { method: 'DELETE' })
  //         } else {
  //           hasMoreMessages = false 
  //         }
  //       } catch (error) {
  //         console.error('An error occurred while receiving messages:', error)
  //       }

  //       await new Promise(resolve => setTimeout(resolve, 3000))
  //     }
  //   };

  //   receiveMessages();
  // }, []);
  
  
  function handleSendMessage() {
    if (!messageText) return 1
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
    setMessagesData((prevSentMessages) => {
      const newMessage = {
        id: isReceived ? `received_${id}` : id,
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
    setMessagesData(() => [])
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
          sentMessages = {messagesData}
        />
      </div>
    </main>
  )
}