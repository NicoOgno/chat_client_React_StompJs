import React from 'react'

const Buttons = ({ connect, disconnect, setRoom, room, user, connected, setUser}) => {

      const handleSubmit = (e) => {
        e.preventDefault();
      };
      

  return (
    <>
      <div className="rooms-button-container">
          <button className="room-buttons"  onClick={() => setRoom('Code') } >Code</button>
          <button className="room-buttons"  onClick={() => setRoom('Cooking') } >Cooking</button>
          <button className="room-buttons"  onClick={() => setRoom('Sports') } >Sports</button> 
          <button className="room-buttons"  onClick={() => setRoom('Nature') } >Nature</button>
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