import styled from "styled-components";

export const NavbarWrapper = styled.div`
  padding: 20px 35px;
  display: flex;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  grid-gap: 40px;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
  }
  position: fixed;
  width: calc(100vw - 250px);
  z-index: 1;

  @media (max-width: 992px) {
    display: none;
  }

  svg {
    vertical-align: middle;
  }

  #avatar-tip {
    background-color: #e8b89b;
    color: #fff;
    border: 1px solid #e8b89b;
    font-weight: bold;
    font-size: 14px;

    &:after {
      border-top-color: #e8b89b;
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 60px;

    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);

    .item {
      color: #fff;
      background-color: #e8b89b;
      padding: 10px;

      cursor: pointer;

      :hover {
        background-color: #c5b097;
      }
    }
  }
`;

export const MenuLabel = styled.span`
  color: #ecc5ac;
  font-weight: 600;
  font-size: 1.1em;
  text-transform: uppercase;
`;

export const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const UserButton = styled.button`
  cursor: pointer;
  color: #e8b89b;
  font-weight: 600;
  border-radius: 50%;
  background-color: transparent;
  border: 0;
`;

export const ProfileImage = styled.img`
  width: 35px;
  height: 35px;

  border-radius: 50%;
  border: 3px solid;
`;

export const UserAction = styled.div`
  display: flex;
  justify-content: right;
`;
