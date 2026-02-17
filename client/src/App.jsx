import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import ChatBody from './components/ChatBody';
import ChatFooter from './components/ChatFooter';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import ChatPage from './components/ChatPage';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const socket = io.connect(URL);

function App() {

  {/* State for a message sent by a user  */}
  const [message, setMessage] = useState('');

  {/* State for messages users has typed  */}
  const [messagesReceived, setMessagesReceived] = useState([]);

  // const test = "This is a test!";

  {/* Step 4. useEffect function listens for packets with the event name 'receive_message' being emitted by the server and triggers an alert with the message when that 'packet is recived */}
  useEffect(() => {
    socket.on('receive_message', (message) => {
      console.log(`Received from server: ${message}`);
      setMessagesReceived((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup function to prevent memory leaks
    return () => {
      socket.off('receive_message');
    };
  }, []); // Empty array ensures this only runs on mount

  {/* Step 2. sendMessage functions emits a 'packet' to the server (index.js) with event name of 'send_message' with a message of 'hello'  */}
  const sendMessage = (message) => {
      socket.emit("send_message", message);
      console.log(`Message sent to server: ${message}`);
      setMessage('');
    }


  return (
    <div>
      <h1>Chat</h1>
      <ChatBody messagesReceived={messagesReceived} />
      <ChatFooter sendMessage={sendMessage} />
    </div>
  );
}

export default App;

{/*
  
      

<BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
</BrowserRouter>
*/}