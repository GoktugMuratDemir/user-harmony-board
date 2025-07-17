import styled from "styled-components";
import Colors from "../Styles/Colors";
import { Link, useLocation } from "react-router-dom";

const Aside = styled.aside`
  width: 240px;
  background: ${Colors.primary[600]};
  color: ${Colors.textLight};
  // height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  box-shadow: 2px 0 8px 0 ${Colors.border};
`;

const Logo = styled.div`
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    ${Colors.primary[400]},
    ${Colors.secondary[400]}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.1rem;
  font-weight: 900;
  color: ${Colors.textLight};
  box-shadow: 0 2px 8px 0 ${Colors.primary[200]};
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${Colors.textLight};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.08rem;
  padding: 10px 24px;
  border-radius: 8px;
  margin: 0 16px;
  text-align: center;
  background: ${({ $active }) =>
    $active ? Colors.primary[300] : Colors.primary[500]};
  box-shadow: ${({ $active }) =>
    $active ? `0 2px 8px 0 ${Colors.primary[200]}` : "none"};
  border: ${({ $active }) =>
    $active ? `2px solid ${Colors.secondary[400]}` : "2px solid transparent"};
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover {
    background: ${Colors.primary[400]};
    color: ${Colors.textLight};
  }
`;

const Divider = styled.div`
  width: 80%;
  height: 1.5px;
  background: ${Colors.primary[200]};
  margin: 18px auto 10px auto;
  border-radius: 2px;
`;

const Sidebar = () => {
  const location = useLocation();
  return (
    <Aside>
      <Logo>E</Logo>
      <Nav>
        <NavLink to="/" $active={location.pathname === "/"}>
          Home
        </NavLink>
        <NavLink to="/users" $active={location.pathname.startsWith("/users")}>
          User Table
        </NavLink>
        <Divider />
        {/* Ekstra menü veya ayırıcılar eklenebilir */}
      </Nav>
    </Aside>
  );
};

export default Sidebar;
