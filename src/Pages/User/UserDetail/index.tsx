import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { User } from "../../../types/types";

import Colors from "../../../Styles/Colors";
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

const Card = styled.div`
  background: ${Colors.surface};
  border-radius: 32px;
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

const MapWrapper = styled.div`
  height: 320px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px 0 ${Colors.primary[100]};
  margin-top: 18px;
  margin-bottom: 8px;
`;

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

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

  // Leaflet marker icon sorununu çözmek için
  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Bg>
      <Card>
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
            <span
              style={{
                color: user.active ? Colors.primary[600] : Colors.primary[200],
                fontWeight: 700,
              }}
            >
              {user.active ? "Aktif" : "Pasif"}
            </span>
          </p>
        </UserInfo>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: 8,
          }}
        >
          <h3
            style={{
              margin: 0,
              color: Colors.primary[600],
              fontWeight: 700,
              fontSize: "1.2rem",
              letterSpacing: 0.2,
            }}
          >
            Konum
          </h3>
        </div>
        <MapWrapper>
          <MapContainer
            center={[user.latitude, user.longitude]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
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
