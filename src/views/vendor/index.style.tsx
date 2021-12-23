import styled from "styled-components";

export const FormPart = styled.form`
  margin-top: 50px;
  margin-bottom: 70px;
  .ButtonPart {
    display: flex;
    justify-content: center;
  }

  .formSelectField > div:first-child {
    width: 100%;
    border-radius: 10px;
    height: 30px;
    border: none;

    margin-bottom: 30px;
    background: #ffffff;
    padding-left: 15px;
    font-size: 20px;
  }

  .invisible {
    display: none;
  }
`;

export const SubmitButtonContainer = styled.div`
  width: 200px;

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

    @media (max-width: 500px) {
      font-size: 12px;
    }
  }
`;

export const SubFullPart = styled.div`
  width: 100%;

  margin-top: 30px;
`;

export const SubPart = styled.div`
  width: 48%;

  margin-top: 30px;

  &.ImagePart {
    width: 200px;
  }

  @media (max-width: 992px) {
    width: 100%;

    &.ImagePart {
      width: 200px;
    }
  }
`;

export const FormLabel = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 15px;
`;

export const FormTextField = styled.input`
  background: #ffffff;
  border-radius: 10px;
  padding-left: 15px;

  font-size: 20px;
  width: 100%;
  border: none;
  height: 30px;
`;

export const SubPartContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  color: #e8b89b;
  font-size: 30px;
  font-weight: 600;

  padding-top: 70px;

  @media (max-width: 992px) {
    text-align: left;
  }
`;

export const RedLabel = styled.label`
  color: red;
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
`;

export const RadioButtonsContainer = styled.div`
  display: flex;
`;

export const DescriptionLabel = styled.div`
  font-size: 20px;
`;

export const EditUserAccountTextField = styled.input`
  margin-bottom: 20px;

  border: none;
  width: 100%;
  justify-content: space-between;
  border-radius: 10px;

  padding-left: 15px;

  background: #fff;

  font-size: 20px;
  height: 40px;
`;
