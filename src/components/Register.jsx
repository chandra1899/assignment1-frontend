import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const  RegisterContainer = styled.div`
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
    border: 2px solid #007BFF; /* Blue border */
    border-radius: 4px;
    font-size: 16px;
    font-family: Arial, sans-serif;
    background-color: #007BFF; /* Blue background */
    color: #ffffff; /* White text */
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &:hover {
      background-color: #0056b3; /* Darker blue on hover */
      border-color: #0056b3;
    }

    &:focus {
      border-color: #004085;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    &:active {
      background-color: #004085; /* Even darker blue when clicked */
      border-color: #004085;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegistration = async () => {
      try {
        let res = await axios.post("http://localhost:8000/register", {
          name: name,
          email: email,
          password: password
        })
    
        if (res.status !== 200) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        console.log("registration success");
        
      } catch (error) {
        
      }
      navigate("/login")
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

  return (
    <RegisterContainer>
        <Input placeholder='Enter Name' type="text" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder='Enter Email' type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder='Enter Password' type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleRegistration}>Register</Button>
        <a href="/login">Already have account?, register</a>
    </RegisterContainer>
  )
}

export default Register