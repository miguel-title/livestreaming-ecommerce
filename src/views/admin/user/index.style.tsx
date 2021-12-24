import styled from "styled-components";

export const PaymentContainer = styled.div`
  display: flex;
`;

export const PaymentItem = styled.div`
  margin-right: 20px;
`;

export const PaymentTitle = styled.div`
  font-size: 40px;

  margin-bottom: 20px;
  color: #555555;
`;

export const PaymentTextField = styled.input`
  background: #eeeeee;
  height: 40px;
  font-size: 18px;
  border: none;

  width: 200px;

  padding-left: 10px;
`;

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
