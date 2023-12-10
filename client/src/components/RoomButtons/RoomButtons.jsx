import React from 'react'

const RoomButtons = ({ selectChatRoom }) => {
  return (
    <>
      <div className="rooms-button-container">
          <button className="room-buttons"  onClick={() => selectChatRoom('Code') } >Code</button>
          <button className="room-buttons"  onClick={() => selectChatRoom('Cooking') } >Cooking</button>
          <button className="room-buttons"  onClick={() => selectChatRoom('Sports') } >Sports</button> 
          <button className="room-buttons"  onClick={() => selectChatRoom('Nature') } >Nature</button>
      </div>
    </>
  )
}

export default RoomButtons;