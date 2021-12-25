import styled from "styled-components";

export const EditUserAccounTitle = styled.div`
  padding-top: 80px;
  margin-bottom: 50px;

  color: #e8b89b;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: 425px) {
    padding-top: 50px;
    font-size: 20px;
  }
`;

export const EditUserAccountFormPart = styled.form`
  margin-bottom: 80px;

  @media (max-width: 425px) {
    margin-bottom: 50px;

    .ButtonPart {
      display: flex;
      justify-content: center;
    }
  }
`;

export const EditUserAccountLabel = styled.div`
  font-size: 20px;
  color: #555555;
  font-weight: 600;

  margin-bottom: 10px;

  @media (max-width: 425px) {
    font-size: 14px;
  }
`;

export const EditUserAccountTextField = styled.input`
  margin-bottom: 20px;

  border: none;
  height: 40px;
  width: 100%;
  justify-content: space-between;
  border-radius: 10px;

  padding-left: 15px;
  @media (max-width: 425px) {
    height: 30px;
    width: 95%;
  }
`;

export const SubPart = styled.div``;

export const SubItemPart = styled.div`
  width: 48%;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 425px) {
    #city {
      height: 30px;
      font-size: 12px;
      margin-bottom: 20px;
    }

    #condition {
      height: 30px;
      font-size: 12px;
      margin-bottom: 20px;
    }
  }
`;

export const EditUserAccountSelect = styled.select`
  margin-bottom: 20px;

  background: #ffffff;
  border: none;
  height: 40px;
  width: 100%;
  justify-content: space-between;
  border-radius: 10px;

  padding-left: 15px;

  @media (max-width: 425px) {
    height: 30px;
    font-size: 12px;
  }
`;

export const SubmitButtonPart = styled.div`
  width: 100%;

  margin-top: 30px;
`;

export const SendButton = styled.div`
  text-transform: uppercase;
  color: #ffffff;
  background-color: #e8b89b;
  width: 200px;
  border-radius: 30px;
  text-align: center;
  margin: auto;

  height: 70px;

  font-size: 20px;

  line-height: 70px;
  font-size: 28px;
  font-weight: 600;

  cursor: pointer;

  @media (max-width: 425px) {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    width: 100px;
    border-radius: 10px;
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
      border-radius: 10px;
    }
  }
`;
