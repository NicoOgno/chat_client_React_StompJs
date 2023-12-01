import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import styles from './chatRoom.module.css';


function ChatRoom() {
  // Estados para el componente
  const [stompClient, setStompClient] = useState(null); // Cliente STOMP
  const [connected, setConnected] = useState(false); // Indica si el usuario está conectado
  const [room, setRoom] = useState(''); // Sala actual
  const [user, setUser] = useState(''); // Nombre de usuario
  const [message, setMessage] = useState(''); // Mensaje a enviar
  const [messages, setMessages] = useState({}); // Almacena los mensajes por sala

  // Efecto para la inicialización del cliente STOMP
  useEffect(() => {
    // Crea una instancia del cliente STOMP
    const stomp = new Client({
      brokerURL: 'ws://localhost:8080/chat-websocket-service', // URL del servidor WebSocket
    });

    // Configura manejadores de eventos para el cliente STOMP
    stomp.onConnect = (frame) => {
      setConnected(true); // Establece la conexión como exitosa
      console.log('Connected: ' + frame);

      // No es necesario crear un nuevo arreglo de mensajes aquí
    };

    stomp.onWebSocketError = (error) => {
      console.error('Error with WebSocket', error);
    };

    stomp.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers.message);
      console.error('Additional details: ' + frame.body);
    };

    // Almacena la instancia del cliente STOMP en el estado
    setStompClient(stomp);

    // Limpieza al desmontar el componente
    return () => {
      stomp.deactivate();
    };
  }, [room]);

  // Función para conectarse a la sala
  const connect = () => {
    stompClient.activate();
    // Suscríbete a la sala actual cuando se conecte
    stompClient.onConnect = (frame) => {
      setConnected(true);
      console.log('Connected: ' + frame);

      stompClient.subscribe('/topic/' + room, (message) => {
        showMessage(JSON.parse(message.body).content, room);
      });
    };
  };

  // Función para desconectarse
  const disconnect = () => {
    stompClient.deactivate();
    setConnected(false);
    console.log('Disconnected');
  };

  // Función para enviar un mensaje
  const sendMessage = () => {
    if (connected) {
      stompClient.publish({
        destination: '/app/chat/' + room,
        body: JSON.stringify({
          content: message,
          user: user,
        }),
      });
      setMessage(""); // Elimina el texto del mensaje luego de enviar el mensaje
    } else {
      console.error("No hay una conexión STOMP establecida.");
    }
  };

  // Función para mostrar un mensaje y agregarlo al estado
  const showMessage = (message, room) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [room]: [...(prevMessages[room] || []), message],
    }));
  };

  // Función para manejar el envío de formulario (puede dejarse vacía)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Renderizado del componente
  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.chatTitle}>Chat</h1>
      <div className={styles.chatBox}>
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
          >{/*Dar un value a Select a room para que sea la sala inicial por default*/}
            <option value="">Select a room</option>
            <option value="1">Code</option>
            <option value="2">Sports</option>
            <option value="3">Cooking</option>
            <option value="4">Nature</option>
            {/* Crear arreglo y renderizar salas */}
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