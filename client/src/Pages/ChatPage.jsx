import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import ChatRoom from '../components/ChatRoom/ChatRoom'

const ChatPage = ({ user }) => {
  return (
    <>
        <div>
            <Sidebar />
        </div>
        <div>
            <ChatRoom user={user} />
        </div>
    </>
  )
}

export default ChatPage