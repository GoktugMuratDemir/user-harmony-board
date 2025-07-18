/**
 * Home/index.tsx - Ana Sayfa Bileşeni
 *
 * Bu bileşen uygulamanın ana sayfasını oluşturur. Kullanıcıları karşılayan
 * hoş geldin mesajı ve açıklama metni içerir.
 *
 * Özellikler:
 * - Merkezi yerleşim ve modern kart tasarımı
 * - Gradient arka plan ve gölge efektleri
 * - Responsive tasarım
 * - Kullanıcı dostu açıklama metni
 * - Modern UI bileşenleri
 *
 * Tasarım Elementi:
 * - Ana kartın gradient arka planı
 * - Büyük ev ikonu (🏠)
 * - Hoşgeldin başlığı
 * - Açıklayıcı metin
 *
 * @component
 * @returns {JSX.Element} Ana sayfa bileşeni
 */

import styled from "styled-components";
import Colors from "../../Styles/Colors";

/**
 * Ana sayfa arka plan container'ı
 * Gradient arka plan ve merkezi hizalama sağlar
 */
const HomeBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    120deg,
    ${Colors.primary[100]},
    ${Colors.surface} 80%
  );
`;

/**
 * Ana içerik kartı
 * Merkezi yerleştirilmiş modern kart tasarımı
 */
const HomeCard = styled.div`
  background: ${Colors.surface};
  box-shadow: 0 8px 40px 0 ${Colors.primary[200]};
  min-width: 340px;
  max-width: 1100px;
  border-radius: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 38px 32px 32px 32px;
  border: 1.5px solid ${Colors.border};
  margin-bottom: 24px;
`;

/**
 * Ana sayfa ikonu container'ı
 * Gradient arka plan ile büyük ikon alanı
 */
const HomeIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    ${Colors.primary[400]},
    ${Colors.secondary[400]}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  font-weight: 900;
  color: ${Colors.textLight};
  margin-bottom: 24px;
  box-shadow: 0 2px 12px 0 ${Colors.primary[200]};
`;

/**
 * Ana sayfa başlığı
 * Büyük ve vurgulu hoşgeldin mesajı
 */
const HomeTitle = styled.h2`
  color: ${Colors.primary[600]};
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  text-align: left;
  width: 100%;
`;

/**
 * Ana sayfa açıklama metni
 * Kullanıcıya yol gösteren bilgilendirici metin
 */
const HomeDesc = styled.p`
  color: ${Colors.text};
  font-size: 1.08rem;
  margin-bottom: 24px;
  width: 100%;
  text-align: left;
`;

/**
 * Home Ana Bileşeni
 *
 * Uygulamanın ana sayfasını oluşturur. Kullanıcıları karşılar ve
 * navigasyon hakkında bilgi verir.
 *
 * İçerik:
 * - Ev ikonu (🏠)
 * - Hoşgeldiniz başlığı
 * - Açıklayıcı bilgilendirme metni
 * - Modern kart tasarımı
 *
 * @returns {JSX.Element} Ana sayfa bileşeni
 */
const Home = () => {
  return (
    <HomeBg>
      <HomeCard>
        {/* Ana sayfa ikonu */}
        <HomeIcon>🏠</HomeIcon>

        {/* Hoşgeldin başlığı */}
        <HomeTitle>Hoşgeldiniz!</HomeTitle>

        {/* Açıklama metni */}
        <HomeDesc>
          Burası modern ve kullanıcı dostu bir ana sayfadır. Sol menüden
          kullanıcı listesine veya diğer sayfalara geçiş yapabilirsiniz.
        </HomeDesc>
      </HomeCard>
    </HomeBg>
  );
};

export default Home;
