/**
 * UserDetail/index.tsx
 *
 * Kullanıcı Detay Sayfası
 *
 * Bu dosya, tek bir kullanıcının detaylı bilgilerini gösteren sayfa bileşenidir.
 * Kullanıcının kişisel bilgileri, durumu ve harita üzerinde konumu gösterilir.
 *
 * Özellikler:
 * - ✅ Kullanıcı kişisel bilgileri
 * - ✅ Aktif/pasif durum gösterimi
 * - ✅ Leaflet harita entegrasyonu
 * - ✅ Konum marker'ı ve popup
 * - ✅ Modern kart tasarımı
 * - ✅ Gradient arka plan
 * - ✅ Responsive tasarım
 * - ✅ URL parametresi ile kullanıcı seçimi
 *
 * Routing:
 * - /user/:id şeklinde erişilir
 * - ID localStorage'dan kullanıcıyı bulur
 *
 * Kullanım:
 * ```tsx
 * // Router.tsx içinde
 * <Route path="/user/:id" element={<UserDetail />} />
 * ```
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { User } from "../../../types/types";

import Colors from "../../../Styles/Colors";

/**
 * Arka Plan Container
 * Gradient arka plan ve merkezleme sağlar
 */
const Bg = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    120deg,
    ${Colors.primary[100]},
    ${Colors.surface} 80%
  );
  padding: 40px 0;
`;

/**
 * Ana Kart Container
 * Kullanıcı bilgilerini içeren ana container
 */
const Card = styled.div`
  background: ${Colors.surface};
  box-shadow: 0 8px 40px 0 ${Colors.primary[200]};
  min-width: 340px;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 32px 32px 32px;
  margin: 0 16px;
`;

/**
 * Kullanıcı Bilgi Bölümü
 * Kişisel bilgileri gösteren styled component
 */
const UserInfo = styled.div`
  margin-bottom: 24px;
  color: ${Colors.text};
  background: ${Colors.surface};
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 ${Colors.primary[100]};
  padding: 28px 24px 20px 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  h2 {
    color: ${Colors.primary[600]};
    font-size: 2.1rem;
    font-weight: 800;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
  }

  p {
    font-size: 1.08rem;
    margin: 0;
    font-weight: 500;
    letter-spacing: 0.1px;
  }
`;

/**
 * Harita Container
 * Leaflet haritasını saran wrapper
 */
const MapWrapper = styled.div`
  height: 320px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px 0 ${Colors.primary[100]};
  margin-top: 18px;
  margin-bottom: 8px;
`;

/**
 * Durum Span
 * Kullanıcının aktif/pasif durumunu gösteren styled component
 */
const StatusSpan = styled.span<{ $active: boolean }>`
  color: ${({ $active }) =>
    $active ? Colors.primary[600] : Colors.primary[200]};
  font-weight: 700;
`;

/**
 * Konum Başlık Container
 * Konum başlığını içeren container
 */
const LocationHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 8px;
`;

/**
 * Konum Başlığı
 * Konum başlık text'i
 */
const LocationTitle = styled.h3`
  margin: 0;
  color: ${Colors.primary[600]};
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
`;

/**
 * Kullanıcı Detay Bileşeni
 *
 * URL parametresinden ID alarak ilgili kullanıcının detaylarını gösterir.
 * Harita üzerinde kullanıcının konumunu işaretler.
 *
 * @returns JSX.Element - Kullanıcı detay sayfası
 */
const UserDetail: React.FC = () => {
  // URL parametresinden kullanıcı ID'sini al
  const { id } = useParams<{ id: string }>();

  // Kullanıcı verisi state'i
  const [user, setUser] = useState<User | null>(null);

  /**
   * Kullanıcı Verisi Yükleme
   * localStorage'dan kullanıcıları alıp ID ile eşleşeni bulur
   */
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users: User[] = JSON.parse(storedUsers);
      const foundUser = users.find((u) => u.id === id);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [id]);

  // Kullanıcı bulunamadığında gösterilecek hata durumu
  if (!user) {
    return (
      <Bg>
        <Card>
          <UserInfo>
            <h2>Kullanıcı Bulunamadı</h2>
            <p>Aradığınız kullanıcıya ulaşılamadı.</p>
          </UserInfo>
        </Card>
      </Bg>
    );
  }

  /**
   * Leaflet Marker Icon Konfigürasyonu
   * Varsayılan marker ikonunu Leaflet CDN'den yükler
   */
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41], // İkon boyutu
    iconAnchor: [12, 41], // İkon merkez noktası
    popupAnchor: [1, -34], // Popup pozisyonu
    shadowSize: [41, 41], // Gölge boyutu
  });

  return (
    <Bg>
      <Card>
        {/* Kullanıcı Kişisel Bilgileri */}
        <UserInfo>
          <h2>{user.name}</h2>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Rol:</b> {user.role}
          </p>
          <p>
            <b>Oluşturulma Tarihi:</b>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <b>Durum:</b>{" "}
            <StatusSpan $active={user.active}>
              {user.active ? "Aktif" : "Pasif"}
            </StatusSpan>
          </p>
        </UserInfo>

        {/* Konum Başlığı */}
        <LocationHeader>
          <LocationTitle>Konum</LocationTitle>
        </LocationHeader>

        {/* Leaflet Harita */}
        <MapWrapper>
          <MapContainer
            center={[user.latitude, user.longitude]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            {/* OpenStreetMap Tile Layer */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Kullanıcı Konum Marker'ı */}
            <Marker
              position={[user.latitude, user.longitude]}
              icon={defaultIcon}
            >
              <Popup>{user.name}</Popup>
            </Marker>
          </MapContainer>
        </MapWrapper>
      </Card>
    </Bg>
  );
};

export default UserDetail;
