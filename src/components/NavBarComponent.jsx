import React from "react";
import styled from "styled-components";
import Logout from "./Logout";

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
  width: 50%;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
`;

const LogoutButton = styled.button`
  
`;

const NavbarComponent = () => {
  return (
    <Navbar>
      <div></div>
      <SearchInput type="text" placeholder="Search..." />
      <Logout/>
    </Navbar>
  );
};

export default NavbarComponent;
