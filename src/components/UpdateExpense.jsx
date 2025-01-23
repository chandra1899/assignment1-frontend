import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { updateExpense } from "../store/atoms/udateExpense";
import { updateOn } from "../store/atoms/updateOn";
import { toast } from "react-toastify";

const RootContainer = styled.div`
  position: absolute;
  width: 80vh;
  max-width: 600px;
  background-color: white;
  z-index: 10;
  top: 25vh;
  left: 32%;
  border-radius: 12px; /* Adjusted for better visual appearance */
  padding: 20px; 
  padding-bottom: 32px; /* Adjusted for better visual appearance */
`;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  flex: 1;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const UpdateExpense = () => {
    const exp = useRecoilValue(updateExpense)
    const setExp = useSetRecoilState(updateExpense)
    const setUpdateOn = useSetRecoilState(updateOn)

    const handleCreateExpense = async () => {
    if(exp === undefined) return ;
    if(exp.title === "" || exp.amount === "" || exp.category === "") {
      alert("all feild are required")
      return ;
    }
      try {
        let res = await axios.put("http://localhost:8000/expense", {
            id: exp.id,
            title: exp.title, 
            amount: exp.amount, 
            category: exp.category
        }, {
          withCredentials: true, 
        })
        if(res.status === 200) {
          toast("Expense Updated")
          setUpdateOn(false)
        }
      } catch (error) {
        console.log("errro in creating expense", error);
      }
  }

  const handleKeyEnter=(e)=>{
    if(e.key=='Enter'){
        handleCreateExpense()
    }
   }

  return (
    <RootContainer>
        <div>
            <span onClick={() => setUpdateOn(false)} style={{cursor:"pointer"}} >X</span>
        </div>
    <FormContainer onKeyUp={handleKeyEnter} >
      <TitleInput
        type="text"
        name="title"
        placeholder="Title"
        value={exp.title}
        onChange={e => setExp({...exp, title: e.target.value})}
      />
      <Row>
        <Input
          type="text"
          name="category"
          placeholder="Category"
          value={exp.category}
          onChange={e => setExp({...exp, category: e.target.value})}
        />
        <Input
          type="number"
          name="amount"
          placeholder="Amount"
          value={exp.amount}
          onChange={e => setExp({...exp, amount: e.target.value})}
        />
      </Row>
      <Button onClick={handleCreateExpense}>Create Expense</Button>
    </FormContainer>
    </RootContainer>
  );
};

export default UpdateExpense;

