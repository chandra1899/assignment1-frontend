import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Create a styled button component using styled-components
const LogoutButton = styled.button`
  width: 40vw;
  padding: 10px 20px;
  background-color: #c70d0d;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  
  &:hover {
    background-color: #b80707;
  }
`;

const Logout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    navigate("/login")
    toast("Logged out!")
  };

  return (
    <div>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </div>
  );
};

export default Logout;
