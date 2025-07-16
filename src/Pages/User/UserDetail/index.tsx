import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { User } from "../../../types/types";

const Container = styled.div`
  padding: 20px;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
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
    return <div>Kullanıcı bulunamadı</div>;
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
    <Container>
      <UserInfo>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Rol: {user.role}</p>
        <p>
          Oluşturulma Tarihi: {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p>Durum: {user.active ? "Aktif" : "Pasif"}</p>
      </UserInfo>

      <h3>Konum</h3>
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
          <Marker position={[user.latitude, user.longitude]} icon={defaultIcon}>
            <Popup>{user.name}</Popup>
          </Marker>
        </MapContainer>
      </MapWrapper>
    </Container>
  );
};

export default UserDetail;
