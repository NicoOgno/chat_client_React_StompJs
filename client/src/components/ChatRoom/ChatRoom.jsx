import styles from './chatRoom.module.css';
import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

function ChatRoom() {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState(''); // Sala actual
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({}); // Mensajes se mantendrán aquí

  useEffect(() => {
    const stomp = new Client({
      brokerURL: 'ws://localhost:8080/chat-websocket-service',
    });

    stomp.onConnect = (frame) => {
      setConnected(true);
      console.log('Connected: ' + frame);

      // No es necesario crear un nuevo arreglo de mensajes aquí
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
    // Suscríbete a la sala actual
    stompClient.onConnect = (frame) => {
      setConnected(true);
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/' + room, (message) => {
        showMessage(JSON.parse(message.body).content, room);
      });
    };
  };

  const disconnect = () => {
    stompClient.deactivate();
    setConnected(false);
    console.log('Disconnected');
  };

  const sendMessage = () => {
    if (connected) {
    stompClient.publish({
      destination: '/app/chat/' + room,
      body: JSON.stringify({
        content: message,
        user: user,
      }),
    });
  } else {
    console.error("No hay una conexión STOMP establecida.");
  }
  };

  const showMessage = (message, room) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [room]: [...(prevMessages[room] || []), message],
    }));
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
          {messages[room] &&
            messages[room].map((message, index) => (
              <li key={index}>{message}</li>
            ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="">Select a room</option>
            <option value="room1">Room 1</option>
            <option value="room2">Room 2</option>
          </select>
        </div>
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