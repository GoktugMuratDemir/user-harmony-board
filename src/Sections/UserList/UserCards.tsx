import React, { useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import type { User } from '../types/types';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const CardField = styled.p`
  margin: 5px 0;
  color: #666;
`;

const DetailButton = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

interface UserCardsProps {
  users: User[];
  paginationMode: 'paginated' | 'all';
}

const UserCards: React.FC<UserCardsProps> = ({ users, paginationMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Kart görünümü için sayfa başına daha fazla öğe

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = paginationMode === 'paginated' 
    ? users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : users;

  return (
    <>
      <CardsContainer>
        {paginatedUsers.map(user => (
          <Card key={user.id}>
            <CardHeader>{user.name}</CardHeader>
            <CardField><strong>Email:</strong> {user.email}</CardField>
            <CardField><strong>Rol:</strong> {user.role}</CardField>
            <CardField>
              <strong>Oluşturulma Tarihi:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </CardField>
            <DetailButton to={`/users/${user.id}`}>Detaylar</DetailButton>
          </Card>
        ))}
      </CardsContainer>

      {paginationMode === 'paginated' && (
        <Pagination>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Önceki
          </button>
          <span>Sayfa {currentPage} / {totalPages}</span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Sonraki
          </button>
        </Pagination>
      )}
    </>
  );
};

export default UserCards;