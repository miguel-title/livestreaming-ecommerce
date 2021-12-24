import styled from "styled-components";

export const BackButton = styled.div`
  border: 2px solid transparent;
  background-color: #e8b89b;
  border-radius: 50px;
  color: #ffffff;
  text-transform: uppercase;

  padding: 0.5rem 3rem;

  margin-top: 1.5rem;
  display: inline-block;
  text-align: center;
  font-weight: 400;
  font-size: calc(1.275rem + 0.3vw);

  cursor: pointer;
`;

export const BackButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

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

export const FormTextField = styled.input`
  background: #ffffff;
  border-radius: 10px;
  padding-left: 15px;

  font-size: 14px;
  width: calc(100% - 20px);
  border: none;
  height: 30px;

  margin: 30px 0;
`;

export const PageContainer = styled.div`
  display: flex;
  float: right;
`;
