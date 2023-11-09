import styles from './chatRoom.module.css'
import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

function ChatRoom() {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState('');
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stomp = new Client({
      brokerURL: 'ws://localhost:8080/chat-websocket-service',
    });

    stomp.onConnect = (frame) => {
      setConnected(true);
      console.log('Connected: ' + frame);
      stomp.subscribe('/topic/' + room, (message) => {
        showMessage(JSON.parse(message.body).content);
      });
    };

    stomp.onWebSocketError = (error) => {
      console.error('Error with websocket', error);
    };

    stomp.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers.message);
      console.error('Additional details: ' + frame.body);
    };

    setStompClient(stomp);

    return () => {
      stomp.deactivate();
    };
  }, [room]);

  const connect = () => {
    stompClient.activate();
  };

  const disconnect = () => {
    stompClient.deactivate();
    setConnected(false);
    console.log('Disconnected');
  };

  const sendMessage = () => {
    stompClient.publish({
      destination: '/app/chat/' + room,
      body: JSON.stringify({
        content: message,
        user: user,
      }),
    });
  };

  const showMessage = (message) => {
    setMessages([...messages, message]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.chatTitle}>Chat</h1>
      <div className={styles.chatBox}>
        <h2>Messages</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="text"
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={connect} disabled={connected}>
          Connect
        </button>
        <button onClick={disconnect} disabled={!connected}>
          Disconnect
        </button>
        <button onClick={sendMessage} disabled={!connected}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;