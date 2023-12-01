import React from 'react'

const Buttons = ({ connect, disconnect, setRoom, room, user, connected, setUser}) => {
    // const [room, setRoom] = React.useState(''); // Sala actual
    // const [user, setUser] = React.useState(''); // Nombre de usuario
    // const [connected, setConnected] = React.useState(false);

    // const connect = () => {
    //     stompClient.activate();
    //     // Suscríbete a la sala actual cuando se conecte
    //     stompClient.onConnect = (frame) => {
    //       setConnected(true);
    //       console.log('Connected: ' + frame);
    
    //       stompClient.subscribe('/topic/' + room, (message) => {
    //         showMessage(JSON.parse(message.body).content, room);
    //       });
    //     };
    //   };

    // const disconnect = () => {
    //     stompClient.deactivate();
    //     setConnected(false);
    //     console.log('Disconnected');
    //   };

      const handleSubmit = (e) => {
        e.preventDefault();
      };
      

  return (
    <>
    <div className="rooms-button-container">
        <button className="room-buttons"  onClick={() => {
            setRoom('1')
            }}>Code</button>
        <button className="room-buttons"  onClick={() => setRoom('2')} >Cooking</button>
        <button className="room-buttons"  onClick={() => setRoom('3')} >Sports</button> 
        <button className="room-buttons"  onClick={() => setRoom('4')} >Nature</button>
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

export default Buttons