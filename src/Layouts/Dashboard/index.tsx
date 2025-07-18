/**
 * Dashboard/index.tsx - Ana Dashboard Layout Bileşeni
 *
 * Bu dosya uygulamanın ana layout yapısını tanımlar. Tüm sayfalar bu layout
 * içerisinde render edilir ve ortak UI elementlerini (Header, Sidebar) içerir.
 *
 * Yapı:
 * - Sidebar: Sol tarafta navigasyon menüsü
 * - Header: Üst kısımda başlık ve kullanıcı bilgileri
 * - Main: Ana içerik alanı (Outlet ile sayfa içerikleri render edilir)
 *
 * Styled Components kullanarak CSS-in-JS yaklaşımı benimsenmiştir.
 *
 * @component
 * @returns {JSX.Element} Dashboard layout yapısı
 */

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Colors from "../../Styles/Colors";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

/**
 * Ana wrapper container
 * Tam ekran boyutunda flexbox layout oluşturur
 */
const Wrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  background: ${Colors.background};
`;

/**
 * Ana içerik container'ı
 * Header ve main alanını dikey olarak düzenler
 */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;
`;

/**
 * Ana içerik alanı
 * Sayfa içeriklerinin görüntülendiği alan
 * Scroll özelliği ve gölge efekti içerir
 */
const Main = styled.main`
  background: ${Colors.surface};
  overflow-y: auto;
  width: 100%;
  box-shadow: 0 2px 8px 0 ${Colors.border};
`;

/**
 * Dashboard Layout Bileşeni
 *
 * Uygulamanın ana layout yapısını oluşturur.
 * React Router'ın Outlet bileşeni ile sayfa içeriklerini render eder.
 *
 * @returns {JSX.Element} Layout yapısı
 */
const DashboardLayout = () => {
  return (
    <Wrapper>
      {/* Sol navigasyon menüsü */}
      <Sidebar />

      <Content>
        {/* Üst başlık alanı */}
        <Header />

        {/* Ana içerik alanı - Sayfa içerikleri burada render edilir */}
        <Main>
          <Outlet />
        </Main>
      </Content>
    </Wrapper>
  );
};

export default DashboardLayout;
