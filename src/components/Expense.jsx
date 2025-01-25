import axios from "axios";
import React from "react";
import styled from "styled-components";
import { updateExpense } from "../store/atoms/udateExpense";
import { useSetRecoilState } from "recoil";
import { updateOn } from "../store/atoms/updateOn";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ExpenseContainer = styled.div`
  width: 40vw;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
`;

const Details = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  cursor: pointer;
  margin: 0 0 8px;
`;

const Amount = styled.p`
  margin: 4px 0;
`;

const Category = styled.p`
  margin: 4px 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &.update {
    background-color: #007bff;
  }

  &.delete {
    background-color: #dc3545;
  }
`;

const Expense = ({id, title, amount, category }) => {
  const setExp = useSetRecoilState(updateExpense)
  const setUpdateOn = useSetRecoilState(updateOn)
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    try {
      let res = await axios.delete(`http://localhost:8000/expense/${id}`, {
        withCredentials: true,
      })
      if(res.status === 200) {
        e.target.parentElement.parentElement.style.display="none"
        toast("Expense Deleted")
      }
    } catch (error) {
      console.log("error in deleting expense", error);
      
    }
  }

  const handleUpdate = () => {
    setExp({id, title, amount, category})
    setUpdateOn(true)
  }

  const handleClick = () => {
    navigate(`/expense/${id}`)
  }
  return (
    <ExpenseContainer>
      <Details>
        <Title onClick={handleClick} >{title}</Title>
        <Amount>Amount: ${amount}</Amount>
        <Category>Category: {category}</Category>
      </Details>
      <Actions>
        <Button className="update" onClick={handleUpdate} >Update</Button>
        <Button className="delete" onClick={handleDelete}>Delete</Button>
      </Actions>
    </ExpenseContainer>
  );
};

export default Expense;
