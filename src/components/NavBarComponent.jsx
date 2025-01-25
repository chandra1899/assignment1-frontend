import React, { useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  background-color: #343a40;
  color: #ffffff;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 50%;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
`

const ResultContainer = styled.div`
  position: absolute;
  background-color: white;
  color: black;
  width: 100%;
  /* padding: 12px; */
  font-size: 16px;
`

const Noresults = styled.div`
  position: absolute;
  background-color: white;
  color: red;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
`

const ResultDiv = styled.div`
  padding-top: 1px;
  padding-bottom: 1px;
  cursor: pointer;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  &:hover {
    background-color: rgba(157, 150, 150, 0.1);
  }
`

const NavbarComponent = () => {
    const [results, setResults] = useState([])
    const [opened, setOpened] = useState(false)
    const navigate = useNavigate()
    const handleChange = async (e) => {
      if(e.target.value.length >= 1) 
        setOpened(true)
      else 
        setOpened(false)
      try {
        let res = await axios.get(`http://localhost:8000/expense/search?keyword=${e.target.value}`, {
          withCredentials: true
        })
        if(res.status === 200) {
          console.log(res.data);
          
          setResults(res.data)
        }
      } catch (error) {
        console.log("error in fetching results", error);
        
      }
    }

    const handleBlur = () => {
      setTimeout(() => setOpened(false), 200);
    };

  return (
    <Navbar>
      <div></div>
      <SearchContainer onBlur={handleBlur} >
          <SearchInput onChange={handleChange} type="text" placeholder="Search..." />
          {opened && (results.length !== 0?
          <ResultContainer>
            {results.length !== 0 && results.map((exp, ind) => {
              return <ResultDiv key={ind} onMouseDown={(e) => {
                e.preventDefault();
                navigate(`/expense/${exp.id}`);
              }} >
                <p style={{margin:"20px"}} > Title:- {exp.title}</p>
                <p style={{margin:"20px"}} >Category:- {exp.category}</p>
              </ResultDiv>
            })}
          </ResultContainer>
          :<Noresults>No Expenses Found</Noresults>)}
      </SearchContainer>
      
      <Logout/>
    </Navbar>
  );
};

export default NavbarComponent;
