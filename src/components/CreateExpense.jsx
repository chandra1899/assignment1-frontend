import axios from "axios";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { expenses } from "../store/atoms/expenses";
import { toast } from "react-toastify";

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

const CreateExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const setExp = useSetRecoilState(expenses)

  const handleCreateExpense = async () => {
    if(title === "" || amount === "" || category === "") {
      alert("all feild are required")
      return ;
    }
      try {
        let res = await axios.post("http://localhost:8000/expense", {
          title, amount, category
        }, {
          withCredentials: true, 
        })
        if(res.status === 200) {
          setExp((prev) => [res.data, ...prev])
          setAmount("")
          setCategory("")
          setTitle("")
          toast("Expense Created")
        }
      } catch (error) {
        console.log("errro in creating expense", error);
        
      }
  }

  return (
    <FormContainer >
      <TitleInput
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Row>
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Row>
      <Button onClick={handleCreateExpense}>Create Expense</Button>
    </FormContainer>
  );
};

export default CreateExpense;

