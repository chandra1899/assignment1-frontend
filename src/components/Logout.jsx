import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const LogoutButton = styled.button`
  background-color: #dc3545;
    color: #ffffff;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 25px;
    &:hover {
      background-color: #a71d2a;
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
