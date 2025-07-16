import React, { useState } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import type { User } from '../types/types';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

interface UserTableProps {
  users: User[];
  paginationMode: 'paginated' | 'all';
}

const UserTable: React.FC<UserTableProps> = ({ users, paginationMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = paginationMode === 'paginated' 
    ? users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : users;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>Ad</Th>
            <Th>Email</Th>
            <Th>Rol</Th>
            <Th>Oluşturulma Tarihi</Th>
            <Th>İşlemler</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.createdAt.toLocaleDateString()}</Td>
              <Td>
                <Link to={`/users/${user.id}`}>Detaylar</Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

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

export default UserTable;