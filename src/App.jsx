import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { BackDrop, ExpenseId, Home, Login, Register, UpdateExpense } from './components'
import { ToastContainer } from 'react-toastify'
import { updateOn } from './store/atoms/updateOn'
import { useRecoilValue } from 'recoil'

function App() {
    const updateon = useRecoilValue(updateOn)
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={ <Login />} />
        <Route exact path="/register" element={ <Register />} />
        <Route exact path='/expense/:id' element={<ExpenseId/>} />
      </Routes>
    </Router>
    {updateon && <UpdateExpense/>}
    <BackDrop/>
    <ToastContainer />
    </>
  )
}

export default App
