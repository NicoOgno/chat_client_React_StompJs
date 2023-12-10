import React from 'react'
import { useNavigate } from 'react-router-dom';


const Login = ({ user, setUser}) => {
    const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
      };
      

  return (
    <>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button onClick={() => navigate('/chatpage')} >
            Sign in
          </button>
      </form>
    </>
  )
}

export default Login;