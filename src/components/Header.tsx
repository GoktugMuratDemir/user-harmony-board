import styled from "styled-components";
import Colors from "../Styles/Colors";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
  width: 100%;
  height: 68px;
  background: linear-gradient(
    90deg,
    ${Colors.primary[600]} 0%,
    ${Colors.secondary[300]} 100%
  );
  color: ${Colors.textLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  box-shadow: 0 4px 18px 0 ${Colors.primary[200]};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${Colors.primary[400]},
    ${Colors.secondary[400]}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
  color: ${Colors.textLight};
  box-shadow: 0 2px 8px 0 ${Colors.primary[200]};
  margin-right: 14px;
  border: 2px solid ${Colors.primary[100]};
  letter-spacing: 1px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.7rem;
  color: ${Colors.textLight};
  font-weight: 800;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px ${Colors.primary[200]};
`;

const NavBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const NavBtn = styled.button`
  background: ${Colors.textLight};
  color: ${Colors.primary[600]};
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 ${Colors.primary[200]};
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover {
    background: ${Colors.primary[400]};
    color: ${Colors.textLight};
    box-shadow: 0 4px 16px 0 ${Colors.primary[300]};
  }
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo>E</Logo>
        <Title>Dashboard</Title>
      </div>
      <NavBtns>
        <NavBtn onClick={() => navigate(-1)} title="Geri">
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>←</span>
        </NavBtn>
        <NavBtn onClick={() => navigate(1)} title="İleri">
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>→</span>
        </NavBtn>
      </NavBtns>
    </StyledHeader>
  );
};

export default Header;
