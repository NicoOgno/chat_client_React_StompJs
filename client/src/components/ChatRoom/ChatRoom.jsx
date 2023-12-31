import React, { useEffect, useReducer } from 'react';
import { Client } from '@stomp/stompjs';
import RoomButtons from '../RoomButtons/RoomButtons';
import ChatRoomUI from '../ChatRoomUI/ChatRoomUI';
import { chatRoomReducer, chatroomInitialState } from '../../reducers/chatRoomReducer';
import { actionTypes } from '../../actions/chatRoomActions';


function ChatRoom({ user }) {
  const [state, dispatch] = useReducer(chatRoomReducer, chatroomInitialState);
  const { stompClient, connected, room, roomsSuscribed, message, messages } = state;

  
  useEffect(() => {
    // Crea una instancia del cliente STOMP
    if (!stompClient) {
      const stomp = new Client({
        brokerURL: 'ws://localhost:8080/chat-websocket-service', // URL del servidor WebSocket
      });

    // Configura manejadores de eventos para el cliente STOMP
    stomp.onConnect = (frame) => {
      dispatch({ type: actionTypes.SET_CONNECTED, payload: true }); // Establece la conexión como exitosa
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
    dispatch({ type: actionTypes.SET_STOMP_CLIENT, payload: stomp });
    stomp.activate();
  }
  }, [stompClient]);

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
      dispatch({ type: actionTypes.SET_MESSAGE, payload: '' }); // Elimina el texto del mensaje luego de enviar el mensaje
    } else {
      console.error("No hay una conexión STOMP establecida.");
    }
  };

  // Función para mostrar un mensaje y agregarlo al estado
  const showMessage = (message, room) => {
    dispatch({ type: actionTypes.ADD_MESSAGE, payload: { room, message } });
  };

  // Función para seleccionar sala
  const selectChatRoom = (room) => {
    if (!roomsSuscribed.includes(room)) { // Condicional para evitar multiple suscripción a la misma sala
      dispatch({ type: actionTypes.ADD_ROOM, payload: room });
      stompClient.subscribe('/topic/' + room, (message) => {
        showMessage(JSON.parse(message.body).content, room);
      });
    }
    dispatch({ type: actionTypes.SET_ROOM, payload: room });
  }

  const setMessage = newMessage => dispatch({ type: actionTypes.SET_MESSAGE, payload: newMessage });

  // Renderizado del componente
  return (
    <>
    {room === '' ? 
      <RoomButtons selectChatRoom={selectChatRoom} /> :
      <ChatRoomUI
        room={room}
        setMessage={setMessage}
        messages={messages}
        message={message}
        sendMessage={sendMessage}
        selectChatRoom={selectChatRoom} />}
    </>
  );
}

export default ChatRoom;