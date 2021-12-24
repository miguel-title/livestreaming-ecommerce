import styled from "styled-components";

export const ProductCatalogWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  padding: 25px 35px;
  width: 100%;

  @media (max-width: 992px) {
    width: calc(100% - 60px);
  }

  @media (max-width: 625px) {
    padding: 25px 10px;
    width: 100%;
  }

  .HeaderPart {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 625px) {
      font-size: 10px;
    }
  }

  .HeaderPart > div {
    text-align: left;

    background-color: #eeeeee;
    color: #555555;

    /* width: 23%; */
    padding: 3px 0 3px 1%;

    /* border-radius: 10px; */
  }

  .ContentPart {
    height: 30px;
    color: #555555;
    font-size: 14px;

    display: flex;

    > div {
      text-align: left;
      color: #555555;
      padding: 0 0 0 1%;
      line-height: 30px;
    }

    @media (max-width: 625px) {
      font-size: 8px;
    }
  }
`;

export const CRUDButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 50px;
  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
  }
  a {
    text-decoration: none;
    width: 30%;
    @media (max-width: 992px) {
      display: flex;
      width: 70%;
      justify-content: center;
    }
  }

  @media (max-width: 625px) {
    margin-top: 10px;
  }
`;

type ButtonProps = { color: string; width: string };
export const CRUDButton = styled.div<ButtonProps>`
  text-transform: uppercase;
  color: #ffffff;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  border-radius: 50px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 600;

  cursor: pointer;
  margin: 0.5rem 0;

  @media (max-width: 992px) {
    width: 80%;
  }

  @media (max-width: 625px) {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }
`;

export const ProductCatalogTextField = styled.input`
  margin-bottom: 20px;
  margin-top: 30px;

  border: none;
  height: 40px;
  width: 100%;
  justify-content: space-between;
  border-radius: 10px;

  padding-left: 15px;

  background-color: #eeeeee;

  font-size: 20px;

  @media (max-width: 625px) {
    font-size: 14px;
    margin: 10px 0;
    height: 30px;
    width: 95%;
  }
`;

export const ProductCatalogTable = styled.div`
  margin-top: 30px;

  @media (max-width: 992px) {
    background-color: #ffffff;
    padding: 1rem 1rem;
  }

  @media (max-width: 625px) {
    margin-top: 0;
    padding: 0;
  }

  .HeaderSubpart {
    /* overflow: auto; */
    contain: content;
    /* min-width: 480px; */
  }
  /* overflow: auto; */
`;

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 1px;

  /* max-width: 90%; */

  @media (max-width: 625px) {
    margin: 0;
  }
  /* 
  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }

  @media (min-width: 1400px) {
    max-width: 1320px;
  } */
`;
