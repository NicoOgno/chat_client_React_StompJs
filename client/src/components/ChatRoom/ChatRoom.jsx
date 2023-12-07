import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import styles from './chatRoom.module.css';
import Buttons from '../Buttons/Buttons';


function ChatRoom() {
  // Estados para el componente
  const [stompClient, setStompClient] = useState(null); // Cliente STOMP
  const [connected, setConnected] = useState(false); // Indica si el usuario está conectado
  const [room, setRoom] = useState(''); // Sala actual
  const [roomsSuscribed, setRoomsSuscribed] = useState([]); // Salas a las que está suscrito
  const [user, setUser] = useState(''); // Nombre de usuario
  const [message, setMessage] = useState(''); // Mensaje a enviar
  const [messages, setMessages] = useState({}); // Almacena los mensajes por sala
  
  // Efecto para la inicialización del cliente STOMP
  useEffect(() => {
    // Crea una instancia del cliente STOMP
    if (!stompClient) {
      const stomp = new Client({
        brokerURL: 'ws://localhost:8080/chat-websocket-service', // URL del servidor WebSocket
      });

    // Configura manejadores de eventos para el cliente STOMP
    stomp.onConnect = (frame) => {
      setConnected(true); // Establece la conexión como exitosa
      console.log('Connected: ' + frame);
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
    
    // Limpieza al desmontar el componente (Tiraba error)
    // return () => {
    //   stomp.deactivate();
    // };
  }
  }, [room]);

  // Función para conectarse
  const connect = () => {
    stompClient.activate();
    stompClient.onConnect = (frame) => {
      setConnected(true);
      console.log('Connected: ' + frame);
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

  // Función para seleccionar sala
  const selectChatRoom = (room) => {
    if (!roomsSuscribed.includes(room)) { // Condicional para evitar multiple suscripción a la misma sala
      setRoomsSuscribed([...roomsSuscribed, room])
      stompClient.subscribe('/topic/' + room, (message) => {
        showMessage(JSON.parse(message.body).content, room);
      });
    }
    setRoom(room);
  }

  // Función para manejar el envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Renderizado del componente
  return (
    <>
    <Buttons connect={connect} disconnect={disconnect} setRoom={selectChatRoom} room={room} user={user} connected={connected} setUser={setUser} />
    <div className={styles.chatContainer}>
      <h1 className={styles.chatTitle}>User: {user} :: ChatRoom: {room} </h1>
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
        <button onClick={sendMessage} disabled={!connected}>
          Send
        </button>
      </form>
    </div>
    </>
  );
}

export default ChatRoom;