import styled from "styled-components";

export const DashboardWrapper = styled.div`
  width: 100%;
  padding: 25px 35px;
  @media (max-width: 992px) {
    width: calc(100% - 60px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px 0;
  }

  .rdw-editor-main {
    background: #fff;
    min-height: 200px;
    padding: 0 20px;
    overflow: auto;
    max-height: 400px;

    .public-DraftStyleDefault-block {
      margin: 5px 0;
    }
  }

  .ButtonPart {
    display: flex;
    justify-content: center;

    margin-top: 30px;

    @media (max-width: 625px) {
      margin-top: 0;
    }
  }
`;

export const DashboardTitle = styled.div`
  color: #e8b89b;
  font-size: 40px;
  font-weight: 600;

  @media (max-width: 992px) {
    text-align: left;
    font-size: 36px;
  }

  @media (max-width: 992px) {
    text-align: left;
    font-size: 28px;
  }

  @media (max-width: 572px) {
    text-align: left;
    font-size: 20px;
  }

  @media (max-width: 470px) {
    text-align: left;
    font-size: 14px;
  }
`;

export const DashboardSubTitle = styled.div`
  color: #e8b89b;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 992px) {
    text-align: left;
    font-size: 20px;
  }

  @media (max-width: 992px) {
    text-align: left;
    font-size: 18px;
  }

  @media (max-width: 572px) {
    text-align: left;
    font-size: 14px;
  }

  @media (max-width: 470px) {
    text-align: left;
    font-size: 12px;
  }
`;

export const SubContainer = styled.div`
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  padding: 25px 35px;
  margin: 30px 0;

  &.viewSubContainer {
    padding-bottom: 60px;
  }

  @media (max-width: 992px) {
    width: calc(100% - 60px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 15px 10px;

    transform: translateX(-10px);
  }

  @media (max-width: 625px) {
    margin: 10px 0;
  }
`;

export const TableContainer = styled.div`
  width: 100%;

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
    color: #555555;
    padding: 3px 0 3px 1%;
  }

  .HeaderSubpart {
    width: 100%;
    /* overflow: auto; */
    contain: content;
    /* min-width: 250px; */
  }
  overflow: auto;

  @media (max-width: 992px) {
    padding: 10px 0;
  }
`;

export const TableRow = styled.div`
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
`;
