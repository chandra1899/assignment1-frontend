import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast, ToastContainer } from 'react-toastify'

const  LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4rem;
    padding-top: 8rem;
    height: 100vh;
    width: 90vw;
    justify-content: start;
    align-items: center;
`

const Input = styled.input`
  width: 275px;
  padding: 10px;
  margin: 10px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  &:focus {
    border-color: #2109db;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
`

const Button = styled.button`
    width: 275px;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
    border: 2px solid #007BFF; 
    border-radius: 4px;
    font-size: 16px;
    font-family: Arial, sans-serif;
    background-color: #007BFF; 
    color: #ffffff; 
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &:hover {
      background-color: #0056b3; 
      border-color: #0056b3;
    }

    &:focus {
      border-color: #004085;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    &:active {
      background-color: #004085; 
      border-color: #004085;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const addTokenToCookie = (token) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); 
      document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
  };

    const handleLogin = async () => {
      try {
        let res = await axios.post("http://localhost:8000/login", {
          userEmail: email,
          password: password
        })
    
        if (res.status !== 200) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
    
        let data = res.data
        addTokenToCookie(data.token)
        navigate("/")
        toast("Logged In")
      } catch (error) {
        console.error("Error fetching token:", error);
        if(error.response.status === 401) {
          toast("Invalid Credentials")
        }
      }
    }

    useEffect(() => {
      const isTokenPresent = () => {
        const cookies = document.cookie.split('; ');
        return cookies.some(cookie => cookie.startsWith('token='));
      }
      if(isTokenPresent()){
        navigate("/")
      }
    })

    const handleKeyEnter=(e)=>{
      if(e.key=='Enter'){
          handleLogin()
      }
     }

  return (
    <>
    <LoginContainer onKeyUp={handleKeyEnter} >
        <Input placeholder='Enter Email' type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder='Enter Password' type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleLogin} >Login</Button>
        <a href="/register">Don't have account?, register</a>
    </LoginContainer>
    <ToastContainer />
    </>
  )
}

export default Login