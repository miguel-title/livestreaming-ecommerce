import styled from "styled-components";

export const EditUserAccountContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  padding: 25px 35px;
  @media (max-width: 992px) {
    width: calc(100% - 60px);
  }

  .invisible {
    display: none;
  }

  @media (max-width: 625px) {
    padding: 25px 10px;
    width: 100%;
  }
`;

export const EditUserAccountFormPart = styled.form`
  margin-top: 50px;

  .ButtonPart {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 625px) {
    margin-top: 20px;
  }
`;

export const EditUserAccountLabel = styled.div`
  font-size: 20px;
  color: #555555;
  font-weight: 600;

  margin-bottom: 10px;

  @media (max-width: 625px) {
    font-size: 14px;
  }
`;

export const EditUserAccountTextField = styled.input`
  margin-bottom: 20px;

  border: none;
  width: 100%;
  justify-content: space-between;
  border-radius: 10px;

  padding-left: 15px;

  background: #eeeeee;

  font-size: 20px;
  height: 40px;

  @media (max-width: 625px) {
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    width: 95%;
    margin-bottom: 10px;
  }
`;

export const SubPart = styled.div``;

export const RadioButtonsContainer = styled.div`
  display: flex;
`;

export const SubItemPart = styled.div`
  width: 48%;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-top: 0;
  }

  #condition {
    @media (max-width: 625px) {
      height: 30px;
      font-size: 12px;
    }
  }

  #city {
    @media (max-width: 625px) {
      height: 30px;
      font-size: 12px;
    }
  }
`;

export const EditUserAccountSelect = styled.select`
  margin-bottom: 20px;

  background: #eeeeee;
  border: none;
  height: 40px;
  width: 100%;
  justify-content: space-between;
  border-radius: 10px;

  padding-left: 15px;
`;

export const SubmitButtonPart = styled.div`
  width: 100%;

  margin-top: 30px;
`;

export const SendButton = styled.div`
  text-transform: uppercase;
  color: #ffffff;
  background-color: #e8b89b;
  width: 50%;
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
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 625px) {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }
`;

export const SubItemPartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FileUpload = styled.div`
  width: 100%;
  height: 40px;
  background: #eeeeee;
`;

export const RadioButtonContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;

  margin-right: 50px;

  display: flex;

  align-items: center;
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

export const DescriptionLabel = styled.div`
  font-size: 20px;
`;

export const SubmitButtonContainer = styled.div`
  width: 200px;

  @media (max-width: 625px) {
    width: 150px;
  }

  .submit {
    text-transform: uppercase;
    color: #ffffff;
    background-color: #e8b89b;
    width: 100%;
    border-radius: 30px;
    border: none;
    text-align: center;
    margin: auto;

    height: 50px;

    font-size: 20px;

    line-height: 50px;
    font-weight: 600;

    cursor: pointer;

    margin-top: 10px;
    margin-bottom: 10px;

    @media (max-width: 992px) {
      width: 90%;
    }

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 625px) {
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      width: 150px;
    }
  }
`;
