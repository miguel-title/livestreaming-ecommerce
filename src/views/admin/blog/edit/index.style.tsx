import styled from "styled-components";

export const SubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 625px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

export const FormPart = styled.form``;

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

    @media (max-width: 625px) {
      font-size: 12px;
      height: 30px;
      border-radius: 10px;
      line-height: 30px;
      margin-bottom: 0px;
    }
  }
`;

export const FormTextField = styled.input`
  background: #ffffff;
  border-radius: 10px;
  padding-left: 15px;

  font-size: 20px;
  width: calc(100% - 20px);
  border: none;
  height: 30px;
`;

export const SubPart = styled.div`
  width: 100%;

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
