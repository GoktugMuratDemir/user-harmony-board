import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Colors from "../../Styles/Colors";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const Wrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  background: ${Colors.background};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Main = styled.main`
  background: ${Colors.surface};
  overflow-y: auto;
  width: 100%;
  box-shadow: 0 2px 8px 0 ${Colors.border};
`;

const DashboardLayout = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Wrapper>
  );
};

export default DashboardLayout;
