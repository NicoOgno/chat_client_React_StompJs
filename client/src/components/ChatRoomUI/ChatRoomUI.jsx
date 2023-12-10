import React from 'react'
import styles from './chatroomui.module.css'
import MessageDisplay from '../MessageDisplay/MessageDisplay'
import SideRoomButtons from '../SideRoomButtons/SideRoomButtons'


const ChatRoomUI = ({ room, setMessage, messages, message, sendMessage, selectChatRoom }) => {
  return (
    <div className={styles.chatRoomUIContainer}>
        <div className={styles.sideButtonsContainer}>
            <SideRoomButtons selectChatRoom={selectChatRoom} />
        </div>
        <div className={styles.messageDisplayContainer}>
            <MessageDisplay room={room} setMessage={setMessage} messages={messages} message={message} sendMessage={sendMessage} />
        </div>
    </div>
  )
}

export default ChatRoomUI