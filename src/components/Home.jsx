import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [expenses, setExpenses] = useState([])
    const navigate = useNavigate()

    const getExpenses = async () => {
        let res;
        try {
            res = await axios.get("http://localhost:8000/user/expenses", {
                withCredentials: true,
            })
            console.log("data ", res.data);
            
            
        } catch (error) {
            if(error.response.status === 401) {
                navigate("/login")
            }
        }
    }
    useEffect(() => {
        getExpenses()
    }, [])
  return (
    <div>Home</div>
  )
}

export default Home