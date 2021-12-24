import styled from "styled-components";

export const NewPostButton = styled.div`
  text-transform: uppercase;
  color: #ffffff;
  background-color: #e8b89b;
  width: 300px;
  border-radius: 30px;
  text-align: center;

  height: 50px;

  font-size: 20px;

  line-height: 50px;
  font-weight: 600;

  cursor: pointer;

  margin-top: 50px;
  margin-bottom: 10px;
  margin-left: 0;

  @media (max-width: 992px) {
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 625px) {
    font-size: 12px;
    width: 150px;
    height: 30px;
    line-height: 30px;

    margin-top: 10px;
    margin-bottom: 0;
  }
`;

export const FormTextField = styled.input`
  background: #ffffff;
  border-radius: 10px;
  padding-left: 15px;

  font-size: 14px;
  width: calc(100% - 20px);
  border: none;
  height: 30px;

  margin-bottom: 30px;
`;

export const PageContainer = styled.div`
  display: flex;
  float: right;
`;
