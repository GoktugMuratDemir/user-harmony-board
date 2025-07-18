/**
 * UserList/index.tsx - Kullanıcı Listesi Sayfası
 *
 * Bu sayfa uygulamanın kullanıcı yönetim merkezidir. Kullanıcıları tablo ve
 * kart görünümlerinde listeler, yeni kullanıcı ekleme imkanı sağlar.
 *
 * Özellikler:
 * - İki farklı görünüm modu (tablo/kart)
 * - Yeni kullanıcı ekleme modal'ı
 * - Custom hook ile state yönetimi
 * - Modern UI tasarımı ve responsive yapı
 * - Toolbar ile hızlı erişim butonları
 *
 * Görünüm Modları:
 * - Tablo Görünümü: Detaylı veri tablosu
 * - Kart Görünümü: Görsel kart tasarımı
 *
 * Fonksiyonellikler:
 * - Kullanıcı ekleme
 * - Görünüm değiştirme
 * - Modal yönetimi
 *
 * @component
 * @returns {JSX.Element} Kullanıcı listesi sayfası
 */

import React from "react";
import styled from "styled-components";
import UserTable from "../../../Sections/UserList/UserTable";
import CustomButton from "../../../components/CustomButton";
import { useUserList } from "../../../hooks/Users/UserList";
import UserCards from "../../../Sections/UserList/UserCards";
import CustomModal from "../../../components/CustomModal";
import AddUserForm from "../../../components/AddUserForm";

import Colors from "../../../Styles/Colors";

/**
 * Sayfa arka plan container'ı
 * Gradient arka plan ve merkezi hizalama sağlar
 */
const Bg = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(
    120deg,
    ${Colors.primary[100]},
    ${Colors.surface} 80%
  );
  overflow-x: hidden;
`;

/**
 * Ana içerik kartı
 * Sayfa içeriğini modern kart tasarımında sunar
 */
const Card = styled.div`
  background: ${Colors.surface};
  border-radius: 32px;
  box-shadow: 0 8px 40px 0 ${Colors.primary[200]};
  min-width: 340px;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 38px 32px 32px 32px;
  border: 1.5px solid ${Colors.border};
`;

/**
 * Üst toolbar alanı
 * Görünüm değiştirme ve aksiyon butonlarını içerir
 */
const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  background: ${Colors.surface};
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 ${Colors.primary[100]};
  padding: 22px 32px;
  margin-bottom: 28px;
`;

/**
 * Sayfa başlığı
 * Ana başlık metni için stil
 */
const Title = styled.h2`
  color: ${Colors.primary[600]};
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  text-align: left;
  width: 100%;
`;

/**
 * Sayfa açıklama metni
 * Kullanıcıya yol gösteren bilgilendirici metin
 */
const Description = styled.p`
  color: ${Colors.text};
  font-size: 1.08rem;
  margin-bottom: 24px;
  width: 100%;
  text-align: left;
`;

/**
 * Blur efektli modal
 * Arka planda bulanıklık efekti olan özelleştirilmiş modal
 */
const CustomModalBlur = styled(CustomModal)`
  & .modal-backdrop {
    backdrop-filter: blur(3px);
    background: rgba(0, 0, 0, 0.18);
  }
`;

/**
 * UserList Ana Bileşeni
 *
 * Kullanıcı listesini yönetir ve görüntüler. İki farklı görünüm modu
 * (tablo/kart) destekler ve yeni kullanıcı ekleme imkanı sağlar.
 *
 * State Yönetimi:
 * - useUserList custom hook'u ile merkezi state yönetimi
 * - Kullanıcı listesi, görünüm modu ve modal durumu
 *
 * İnteraktif Özellikler:
 * - Görünüm modu değiştirme (tablo/kart)
 * - Yeni kullanıcı ekleme modal'ı
 * - Dinamik buton durumları
 *
 * @returns {JSX.Element} Kullanıcı listesi sayfası
 */
const UserList: React.FC = () => {
  // Custom hook ile state ve fonksiyonları al
  const {
    users, // Kullanıcı listesi
    viewMode, // Mevcut görünüm modu (table/card)
    setViewMode, // Görünüm modu değiştirme
    showModal, // Modal görünürlük durumu
    setShowModal, // Modal durumu değiştirme
    handleAddUser, // Yeni kullanıcı ekleme fonksiyonu
  } = useUserList();

  return (
    <Bg>
      <Card>
        {/* Sayfa başlığı ve açıklaması */}
        <Title>Kullanıcı Listesi</Title>
        <Description>
          Tüm kullanıcıları tablo veya kart görünümünde inceleyebilir, arama
          yapabilir ve yeni kullanıcı ekleyebilirsiniz.
        </Description>

        {/* Üst toolbar - görünüm ve aksiyon butonları */}
        <Toolbar>
          {/* Sol taraf: Görünüm değiştirme butonları */}
          <div style={{ display: "flex", gap: 10 }}>
            {/* Tablo görünümü butonu */}
            <CustomButton
              text="Tablo Görünümü"
              onClick={() => setViewMode("table")}
              variant={viewMode === "table" ? "contained" : "outlined"}
              active={viewMode === "table"}
            />

            {/* Kart görünümü butonu */}
            <CustomButton
              text="Kart Görünümü"
              onClick={() => setViewMode("card")}
              variant={viewMode === "card" ? "contained" : "outlined"}
              active={viewMode === "card"}
            />
          </div>

          {/* Sağ taraf: Aksiyon butonları */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Kullanıcı ekleme butonu */}
            <CustomButton
              text="+ Kullanıcı Ekle"
              onClick={() => setShowModal(true)}
              variant="outlined"
            />
          </div>
        </Toolbar>

        {/* Seçili görünüm moduna göre içerik render etme */}
        {viewMode === "table" ? (
          <UserTable users={users} />
        ) : (
          <UserCards users={users} />
        )}

        {/* Kullanıcı ekleme modal'ı */}
        <CustomModalBlur
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          width="400px"
        >
          <AddUserForm
            onClose={() => setShowModal(false)}
            onAddUser={handleAddUser}
          />
        </CustomModalBlur>
      </Card>
    </Bg>
  );
};

export default UserList;
