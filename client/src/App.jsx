import { Routes, Route } from 'react-router-dom'
import ChatRoom from './components/ChatRoom/ChatRoom'
import HomePage from './Pages/HomePage'
import Layout from './components/Layout/Layout'
import './App.css'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'


function App() {

  return (
    <>
      <ChatRoom />
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
