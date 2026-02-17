import React, { useState } from 'react';

function ChatFooter ({ sendMessage }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder=''

        />
        <button type="submit">Send</button>
      </form>
    );
}

export default ChatFooter;