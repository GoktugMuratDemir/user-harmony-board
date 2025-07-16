import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
  background: #f5f5f5;
  padding: 24px;
  overflow-y: auto;
`;

const DashboardLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Content>
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Wrapper>
  );
};

export default DashboardLayout;
