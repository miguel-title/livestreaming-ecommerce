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

  @media (max-width: 992px) {
    width: 100%;
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
