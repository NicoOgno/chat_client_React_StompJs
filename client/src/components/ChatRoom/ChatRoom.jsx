import styles from './chatRoom.module.css'

function ChatRoom() {
  



  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.chatTitle}>Chat</h1>
      <div className={styles.chatBox}>
        <h2>Messages</h2>
      </div>
        <button>
          Connect
        </button>
        <button >
          Disconnect
        </button>
        <button>
          Send
        </button>
    </div>
  );
}

export default ChatRoom;