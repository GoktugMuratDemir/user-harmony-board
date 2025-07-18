/**
 * Sidebar.tsx - Sol Navigasyon Menüsü Bileşeni
 *
 * Bu bileşen uygulamanın sol tarafında yer alan navigasyon menüsünü oluşturur.
 * Ana sayfalar arası geçiş için link'ler ve aktif sayfa vurgulaması içerir.
 *
 * Özellikler:
 * - React Router ile sayfa navigasyonu
 * - Aktif sayfa vurgulaması (active state)
 * - Responsive tasarım
 * - Gradient logo tasarımı
 * - Hover efektleri ve geçiş animasyonları
 *
 * Navigasyon Menüsü:
 * - Home: Ana sayfa
 * - User Table: Kullanıcı listesi ve yönetimi
 *
 * @component
 * @returns {JSX.Element} Sidebar navigasyon bileşeni
 */

import styled from "styled-components";
import Colors from "../Styles/Colors";
import { Link, useLocation } from "react-router-dom";

/**
 * Ana sidebar container'ı
 * Sabit genişlik ve dikey düzenleme ile tasarlanmıştır
 */
const Aside = styled.aside`
  width: 240px;
  background: ${Colors.primary[600]};
  color: ${Colors.textLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  box-shadow: 2px 0 8px 0 ${Colors.border};
`;

/**
 * Sidebar logosu
 * Gradient arka plan ile büyük Evreka logosu
 */
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

/**
 * Navigasyon menüsü container'ı
 * Tüm menü öğelerini dikey olarak düzenler
 */
const Nav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/**
 * Navigasyon linki stili
 * Aktif sayfa vurgulaması ve hover efektleri içerir
 *
 * @param $active - Link'in aktif olup olmadığını belirten boolean
 */
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

/**
 * Menü öğeleri arası ayırıcı çizgi
 * Görsel ayrım sağlamak için kullanılır
 */
const Divider = styled.div`
  width: 80%;
  height: 1.5px;
  background: ${Colors.primary[200]};
  margin: 18px auto 10px auto;
  border-radius: 2px;
`;

/**
 * Sidebar Ana Bileşeni
 *
 * Sol navigasyon menüsünü oluşturur ve aktif sayfa vurgulaması yapar.
 * useLocation hook'u ile mevcut sayfa konumunu alır ve aktif menüyü belirler.
 *
 * @returns {JSX.Element} Sidebar bileşeni
 */
const Sidebar = () => {
  const location = useLocation(); // Mevcut sayfa konumunu almak için React Router hook'u

  return (
    <Aside>
      {/* Sidebar logosu */}
      <Logo>E</Logo>

      {/* Navigasyon menüsü */}
      <Nav>
        {/* Ana sayfa linki */}
        <NavLink to="/" $active={location.pathname === "/"}>
          Home
        </NavLink>

        {/* Kullanıcı tablosu linki - /users ile başlayan tüm rotalar için aktif */}
        <NavLink to="/users" $active={location.pathname.startsWith("/users")}>
          User Table
        </NavLink>

        {/* Ayırıcı çizgi */}
        <Divider />

        {/* Gelecekte eklenebilecek ek menü öğeleri için yer */}
      </Nav>
    </Aside>
  );
};

export default Sidebar;
