import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'


const Login = ({ user, setUser}) => {
    const navigate = useNavigate();

      const handleSubmit = (e) => {
        e.preventDefault();
      };
      

  return (
    <>
      <form onSubmit={handleSubmit}>
          <input
            className={styles.inputLogin}
            type="text"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button onClick={() => navigate('/chatpage')} className={styles.buttonLogin} >
            Sign in
          </button>
      </form>
    </>
  )
}

export default Login;