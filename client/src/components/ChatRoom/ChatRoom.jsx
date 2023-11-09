import styles from './chatRoom.module.css'
import { Client } from '@stomp/stompjs';

function ChatRoom() {
  
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

      const connect = () => {
        stompClient.activate();
      };
    
      const disconnect = () => {
        stompClient.deactivate();
        console.log('Disconnected');
      };

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.chatTitle}>Chat</h1>
      <div className={styles.chatBox}>
        <h2>Messages</h2>
      </div>
        <button onClick={connect}>
          Connect
        </button>
        <button onClick={disconnect}>
          Disconnect
        </button>
        <button>
          Send
        </button>
    </div>
  );
}

export default ChatRoom;