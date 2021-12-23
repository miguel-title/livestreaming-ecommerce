import styled from "styled-components";

export const NavbarWrapper = styled.div`
  padding: 20px 35px;
  display: flex;
  border-radius: 10px;
  grid-gap: 40px;
  a {
    text-decoration: none;
  }
  position: fixed;
  width: calc(100vw - 250px);
  z-index: 1;

  position: relative;
`;

export const LogoutButton = styled.div`
  cursor: pointer;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #e8b89b;
  width: 80px;
  border-radius: 10px;
  border: none;
  text-align: center;
  margin: auto;

  height: 40px;

  font-size: 20px;

  line-height: 40px;
  font-weight: 400;

  cursor: pointer;

  margin-top: 10px;
  margin-bottom: 10px;

  box-shadow: rgba(0, 0, 0, 0.1) 0 15px 12px;

  position: absolute;
  right: 0;
`;
