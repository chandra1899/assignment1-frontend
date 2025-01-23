import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Expense from './Expense'
import styled from 'styled-components'
import { BackDrop, CreateExpense, Logout, UpdateExpense } from '.'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { expenses } from '../store/atoms/expenses'
import { updateOn } from '../store/atoms/updateOn'
import { ToastContainer, toast } from 'react-toastify';

const HomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Home = () => {
    const exps = useRecoilValue(expenses)
    const setExps = useSetRecoilState(expenses)
    const navigate = useNavigate()
    const updateon = useRecoilValue(updateOn)

    const getExpenses = async () => {
        let res;
        try {
            res = await axios.get("http://localhost:8000/user/expenses", {
                withCredentials: true,
            })
            if(res.status === 200)
                setExps(res.data)
            
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
    <HomeDiv>
        <CreateExpense/>
        <h2>Your Expenses</h2>
        {exps !== undefined && exps.map((exp, ind) => {
            return <Expense id={exp.id} title={exp.title} amount={exp.amount} category={exp.category} key={ind} />
        })}
        <Logout/>
        {updateon && <UpdateExpense/>}
        <BackDrop/>
        <ToastContainer />
    </HomeDiv>
    
  )
}

export default Home