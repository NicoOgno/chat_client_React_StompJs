import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'


const Login = ({ user, setUser}) => {
    const navigate = useNavigate();
    const userInputRef = useRef(null);

    useEffect(() => {
      userInputRef.current.focus();
    }, [])

      const handleSubmit = (e) => {
        e.preventDefault();
      };
      

  return (
    <>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit}>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="User"
              ref={userInputRef}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button onClick={() => navigate('/chatpage')} className={styles.buttonLogin} >
              Sign in
            </button>
        </form>
      </div>
    </>
  )
}

export default Login;