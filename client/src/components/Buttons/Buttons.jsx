import React from 'react'

const Buttons = ({ connect, disconnect, selectChatRoom, user, connected, setUser}) => {

      const handleSubmit = (e) => {
        e.preventDefault();
      };
      

  return (
    <>
      <div className="rooms-button-container">
          <button className="room-buttons"  onClick={() => selectChatRoom('Code') } >Code</button>
          <button className="room-buttons"  onClick={() => selectChatRoom('Cooking') } >Cooking</button>
          <button className="room-buttons"  onClick={() => selectChatRoom('Sports') } >Sports</button> 
          <button className="room-buttons"  onClick={() => selectChatRoom('Nature') } >Nature</button>
      </div>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button onClick={() => connect()} disabled={connected}>
            Connect
          </button>
          <button onClick={() => disconnect()} disabled={!connected}>
            Disconnect
          </button>
      </form>
    </>
  )
}

export default Buttons;