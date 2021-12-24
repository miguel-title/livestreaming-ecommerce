import React, { ReactNode } from "react";
import styled from "styled-components";

import SideBar from "../views/sidebar";
import NavBar from "../views/navbar";

const Container = styled.div`
  background: #c5b0971a;
  width: 100vw;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 25px 40px;
  display: flex;
  flex-direction: column;
  margin-left: 100px;

  @media (max-width: 625px) {
    margin-left: 60px;
    padding: 25px 0;
    margin-right: 20px;
  }
`;

const ContentWrapper = styled.div`
  padding: 35px 0;
  display: flex;
  width: 100%;
  margin-top: 70px;

  @media (max-width: 992px) {
    margin-top: 0;
  }
`;

export default function vendordashboard({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Container>
      <SideBar />
      <Content>
        <NavBar />
        <ContentWrapper>{children}</ContentWrapper>
      </Content>
    </Container>
  );
}
