import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const socket = io.connect(URL);

function App() {

  {/* Get's the state ie message the user has typed  */}
  const [message, setMessage] = useState("");
  const [messageReceived, setmessageReceived] = useState("");

  {/* Step 2. sendMessage functions emits a 'packet' to the server (index.js) with event name of 'send_message' with a message of 'hello'  */}
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  {/* Step 4. useEffect function listens for packets with the event name 'receive_message' being emitted by the server and triggers an alert with the message when that 'packet is recived */}
  useEffect(() => {
      socket.on('receive_message', (data) => {
        setmessageReceived(data.message)
      })
  },[socket]);

  return (
    <div className="App">
      <input 
        placeholder='Message....' 
        onChange={(event) => {
          setMessage(event.target.value)
        }} 
      />
      {/* Step 1. sendMessage function is called when button is clicked */}
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
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
