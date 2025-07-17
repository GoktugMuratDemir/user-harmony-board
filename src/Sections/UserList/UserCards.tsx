import React, { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";

import styled from "styled-components";
import Colors from "../../Styles/Colors";

import { Link } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import type { User } from "../../types/types";

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px 28px;
  padding: 36px 8px 16px 8px;
  justify-items: center;
  align-items: stretch;
  @media (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  border: 1.5px solid ${Colors.primary[200]};
  border-radius: 24px;
  padding: 32px 22px 24px 22px;
  background: linear-gradient(
    120deg,
    ${Colors.surface} 85%,
    ${Colors.primary[100]} 100%
  );
  box-shadow: 0 4px 24px 0 ${Colors.primary[100]};
  transition: transform 0.18s, box-shadow 0.18s, border 0.18s;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 260px;
  width: 100%;
  max-width: 370px;
  position: relative;
  overflow: hidden;
  &:hover {
    transform: translateY(-8px) scale(1.025);
    box-shadow: 0 10px 32px 0 ${Colors.primary[200]};
    border: 1.5px solid ${Colors.primary[400]};
    background: linear-gradient(
      120deg,
      ${Colors.primary[100]} 60%,
      ${Colors.surface} 100%
    );
  }
`;

const CardHeader = styled.h3`
  margin: 0 0 18px 0;
  color: ${Colors.primary[600]};
  font-size: 1.32rem;
  font-weight: 900;
  letter-spacing: 0.03em;
  text-align: center;
`;

const CardField = styled.p`
  margin: 12px 0;
  color: ${Colors.text};
  font-size: 1.09rem;
  letter-spacing: 0.01em;
  text-align: center;
`;

const DetailButton = styled(Link)`
  display: inline-block;
  margin-top: 22px;
  padding: 13px 34px;
  background: linear-gradient(
    90deg,
    ${Colors.primary[500]},
    ${Colors.primary[400]}
  );
  color: ${Colors.textLight};
  text-decoration: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.09rem;
  box-shadow: 0 2px 12px 0 ${Colors.primary[200]};
  letter-spacing: 0.02em;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  &:hover {
    background: linear-gradient(
      90deg,
      ${Colors.primary[600]},
      ${Colors.primary[400]}
    );
    color: #fff;
    box-shadow: 0 6px 20px 0 ${Colors.primary[300]};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  gap: 12px;
  & > button {
    padding: 8px 18px;
    border: 1.5px solid ${Colors.primary[300]};
    background: ${Colors.primary[100]};
    color: ${Colors.primary[600]};
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px 0 ${Colors.primary[100]};
    transition: background 0.2s, color 0.2s, border 0.2s;
    &:hover:not(:disabled) {
      background: ${Colors.primary[200]};
      color: ${Colors.primary[500]};
      border: 1.5px solid ${Colors.primary[400]};
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

interface UserCardsProps {
  users: User[];
  paginationMode: "paginated" | "all";
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const UserCards: React.FC<UserCardsProps> = ({
  users,
  paginationMode,
  searchTerm,
  setSearchTerm,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers =
    paginationMode === "paginated"
      ? users.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : users;

  return (
    <div>
      <CustomTextField
        placeholder="Ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
      />
      <CardsContainer>
        {paginatedUsers.map((user: User) => (
          <Card key={user.id}>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                width: 54,
                height: 54,
                background: `linear-gradient(135deg, ${Colors.primary[400]} 60%, ${Colors.primary[200]} 100%)`,
                borderRadius: "50%",
                boxShadow: `0 2px 10px 0 ${Colors.primary[100]}`,
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  fontSize: "2rem",
                  color: Colors.surface,
                  letterSpacing: "1px",
                  userSelect: "none",
                }}
              >
                {user.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <CardHeader>{user.name}</CardHeader>
            <CardField>
              <strong>Email:</strong> {user.email}
            </CardField>
            <CardField>
              <strong>Rol:</strong> {user.role}
            </CardField>
            <CardField>
              <strong>Oluşturulma Tarihi:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </CardField>
            <DetailButton to={`/users/${user.id}`}>Detaylar</DetailButton>
          </Card>
        ))}
      </CardsContainer>

      {paginationMode === "paginated" && (
        <Pagination>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Önceki
          </button>
          <span>
            Sayfa {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Sonraki
          </button>
        </Pagination>
      )}
    </div>
  );
};

export default UserCards;
