import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, Login, Register } from './components'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={ <Login />} />
        <Route exact path="/register" element={ <Register />} />
      </Routes>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
