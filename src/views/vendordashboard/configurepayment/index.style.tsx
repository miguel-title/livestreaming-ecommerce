import styled from "styled-components";

export const ConfigurePaymentContent = styled.div`
  margin-top: 30px;

  margin-top: 1.5rem;

  font-size: 18px;
  font-weight: 300;
  color: #555555;

  @media (max-width: 625px) {
    font-size: 14px;
  }
`;

export const ButtonContainer = styled.div``;

export const ConfigContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  border-radius: 10px;
  background: white;
  padding: 25px 30px;
`;

export const SaveButton = styled.div`
  text-transform: uppercase;
  color: #ffffff;
  background-color: #e8b89b;
  width: 45%;
  border-radius: 30px;
  text-align: center;
  margin: auto;

  height: 50px;

  font-size: 20px;

  line-height: 50px;
  font-weight: 600;

  cursor: pointer;

  @media (max-width: 992px) {
    width: 90%;

    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 625px) {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
`;

export const PaymentOptionContainer = styled.div`
  padding: 2rem 0;

  @media (max-width: 625px) {
    padding: 10px 0;
  }
`;

export const PaymentOption = styled.div`
  margin: 1rem 0;

  @media (max-width: 625px) {
    margin: 0;
  }
`;

export const RadioButtonLabel = styled.label`
  position: absolute;
  left: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;

  @media (max-width: 625px) {
    width: 14px;
    height: 14px;
  }
`;

export const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      background: #eeeeee;
    }
  }
  ${(props) =>
    props.checked &&
    ` 
  &:checked + ${RadioButtonLabel} {
    background: #e8b89b;
    border: 1px solid #e8b89b;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
      background: white;
    }
  }
`}

  @media (max-width:625px) {
    width: 14px;
    height: 14px;

    &:hover ~ ${RadioButtonLabel} {
      background: #bebebe;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin: 6px;
        background: #eeeeee;
      }
    }
    ${(props) =>
      props.checked &&
      ` 
      &:checked + ${RadioButtonLabel} {
        background: #e8b89b;
        border: 1px solid #e8b89b;
        &::after {
          content: "";
          display: block;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          margin: 2px;
          box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
          background: white;
        }
      }
    `}
  }
`;

export const PaymentDescription = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #555555;

  @media (max-width: 625px) {
    font-size: 14px;
  }
`;

export const KeyField = styled.input`
  margin-bottom: 20px;

  background: #eeeeee;
  border: none;
  height: 30px;
  width: 95%;
  justify-content: space-between;
  border-radius: 10px;
  padding-left: 15px;
  @media (max-width: 625px) {
    font-size: 14px;
    height: 20px;
    margin-bottom: 10px;
  }
`;

export const RadioButtonContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;

  display: flex;

  align-items: center;

  @media (max-width: 625px) {
    margin: 10px 0;
  }
`;

export const APIPart = styled.div``;

export const DescriptionLabel = styled.div`
  font-size: 20px;

  @media (max-width: 625px) {
    font-size: 14px;
  }
`;
