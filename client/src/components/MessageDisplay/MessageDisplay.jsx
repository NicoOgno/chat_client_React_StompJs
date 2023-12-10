import React from 'react'
import styles from './messagedisplay.module.css';

const MessageDisplay = ({ room, setMessage, messages, message, sendMessage }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
        <div className={styles.chatContainer}>
      <h1 className={styles.chatTitle}> {room} </h1>
      <div className={styles.chatBox}>
        <ul>
          {messages[room] &&
            messages[room].map((message, index) => (
              <li key={index}>{message}</li>
            ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} >
          Send
        </button>
      </form>
    </div>
    </div>
  )
}

export default MessageDisplay