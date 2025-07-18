/**
 * Header.tsx - Dashboard Üst Başlık Bileşeni
 *
 * Bu bileşen uygulamanın üst kısmında yer alan header alanını oluşturur.
 * Logo, başlık ve navigasyon butonlarını içerir.
 *
 * Özellikler:
 * - Gradient arka plan rengi
 * - Sticky konumlandırma (sayfa kaydırıldığında üstte kalır)
 * - Geri/İleri navigasyon butonları
 * - Responsive tasarım
 * - Modern gölge efektleri
 *
 * Styled Components kullanılarak CSS-in-JS yaklaşımı benimsenmiştir.
 *
 * @component
 * @returns {JSX.Element} Header bileşeni
 */

import styled from "styled-components";
import Colors from "../Styles/Colors";
import { useNavigate } from "react-router-dom";

/**
 * Ana header container'ı
 * Gradient arka plan ve sticky konumlandırma ile tasarlanmıştır
 */
const StyledHeader = styled.header`
  width: 100%;
  height: 68px;
  min-height: 68px;
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

/**
 * Logo container'ı
 * Dairesel gradient arka plan ile şirket logosunu temsil eder
 */
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

/**
 * Ana başlık elementi
 * Dashboard yazısını stilize eder
 */
const Title = styled.h1`
  margin: 0;
  font-size: 1.7rem;
  color: ${Colors.textLight};
  font-weight: 800;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px ${Colors.primary[200]};
`;

/**
 * Navigasyon butonları container'ı
 * Geri/İleri butonlarını düzenler
 */
const NavBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

/**
 * Navigasyon butonu stili
 * Dairesel tasarım ve hover efektleri içerir
 */
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

/**
 * Header Ana Bileşeni
 *
 * Dashboard'un üst kısmında yer alır ve navigasyon imkanı sağlar.
 * React Router'ın useNavigate hook'u ile sayfa navigasyonu yapılır.
 *
 * @returns {JSX.Element} Header bileşeni
 */
const Header = () => {
  const navigate = useNavigate(); // Sayfa navigasyonu için React Router hook'u

  return (
    <StyledHeader>
      {/* Sol taraf: Logo ve başlık */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo>E</Logo> {/* Evreka logosu */}
        <Title>Dashboard</Title>
      </div>

      {/* Sağ taraf: Navigasyon butonları */}
      <NavBtns>
        {/* Geri butonu */}
        <NavBtn onClick={() => navigate(-1)} title="Geri">
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>←</span>
        </NavBtn>

        {/* İleri butonu */}
        <NavBtn onClick={() => navigate(1)} title="İleri">
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>→</span>
        </NavBtn>
      </NavBtns>
    </StyledHeader>
  );
};

export default Header;
