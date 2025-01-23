import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, Login, Register } from './components'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={ <Login />} />
        <Route exact path="/register" element={ <Register />} />
      </Routes>
    </Router>
  )
}

export default App
