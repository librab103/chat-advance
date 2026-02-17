import React, { useState } from 'react';

function ChatBody ({ messagesReceived }) {

  return (
    <ul>
      {messagesReceived.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
}

export default ChatBody;

