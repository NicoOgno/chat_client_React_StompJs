import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import RoomButtons from '../RoomButtons/RoomButtons';
import ChatRoomUI from '../ChatRoomUI/ChatRoomUI';



function ChatRoom({ user }) {
  // Estados para el componente
  const [stompClient, setStompClient] = useState(null); // Cliente STOMP
  const [connected, setConnected] = useState(false); // Indica si el usuario está conectado
  const [room, setRoom] = useState(''); // Sala actual
  const [roomsSuscribed, setRoomsSuscribed] = useState([]); // Salas a las que está suscrito
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
    stomp.activate();
  }
  }, [room]);

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

  // Renderizado del componente
  return (
    <>
    {/*<Buttons connect={connect} disconnect={disconnect} selectChatRoom={selectChatRoom} user={user} connected={connected} setUser={setUser} />*/}
    {room === '' ? 
      <RoomButtons selectChatRoom={selectChatRoom} /> :
      <ChatRoomUI room={room} setMessage={setMessage} messages={messages} message={message} sendMessage={sendMessage} selectChatRoom={selectChatRoom} />}
      {/*<MessageDisplay room={room} setMessage={setMessage} messages={messages} message={message} sendMessage={sendMessage} />*/}
    </>
  );
}

export default ChatRoom;