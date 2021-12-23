import styled from "styled-components";

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LoadMoreButton = styled.div`
  text-transform: uppercase;
  color: #ffffff;
  background-color: #e8b89b;
  width: 200px;
  border-radius: 30px;
  border: none;
  text-align: center;
  margin: auto;

  height: 50px;

  font-size: 20px;

  line-height: 50px;
  font-weight: 600;

  cursor: pointer;

  margin-top: 40px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
