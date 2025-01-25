import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { updateExpense } from "../store/atoms/udateExpense";
import { updateOn } from "../store/atoms/updateOn";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  margin: -100px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 300px;
  text-align: center;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 150px;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0 0 8px;
  color: #343a40;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #495057;
  font-size: 16px;
`;

const UpdateButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ExpenseId = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")

    const setExp = useSetRecoilState(updateExpense)
    const setUpdateOn = useSetRecoilState(updateOn)
      
    const getExpenseById = async () => {
        try {
            let res = await axios.get(`http://localhost:8000/user/expense/${id}`, {
                withCredentials: true
            })
            console.log(res);
            
            if(res.status === 200) {
                let data = res.data
                setTitle(data.title)
                setAmount(data.amount)
                setCategory(data.category)
            }
        } catch (error) {
            if(error.response.status === 404) {
                console.log("expense not found");
                
            }
        }
    }

    const handleUpdate = () => {
        setExp({id, title, amount, category})
        setUpdateOn(true)
      }

    useEffect(() => {
        getExpenseById()
    }, [id])
  return (
    <Container>
      <Card>
        <ImagePlaceholder>Image Not Found</ImagePlaceholder>
        <Title>{title}</Title>
        <InfoRow>
          <span>{category}</span>
          <span>$ {amount}</span>
        </InfoRow>
        <UpdateButton onClick={handleUpdate} >Update</UpdateButton>
      </Card>
    </Container>
  );
};

export default ExpenseId