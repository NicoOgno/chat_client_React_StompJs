import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import ChatRoom from './components/ChatRoom/ChatRoom'
import HomePage from './Pages/HomePage'
import Layout from './components/Layout/Layout'
import './App.css'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import ChatPage from './Pages/ChatPage';


function App() {
  const [user, setUser] = useState('');

  return (
    <>
    <Routes>
      <Route path='/' element={<Login user={user} setUser={setUser} />} />
      <Route path='/chatpage' element={<ChatPage user={user} />} />
    </Routes>
    </>
    /*
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Route>
    </Routes>   
    */ 
  )
}

export default App
