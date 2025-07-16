import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { User } from '../types/types';
import { generateUsers } from '../utils/userGenerator';
import UserTable from '../components/UserTable';
import UserCards from '../components/UserCards';
import AddUserModal from '../components/AddUserModal';


const Container = styled.div`
  height: 100vh;
  padding: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationMode, setPaginationMode] = useState<'paginated' | 'all'>('paginated');
  
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const parsedUsers = (JSON.parse(storedUsers) as User[]).map(user => ({
        ...user,
        createdAt: new Date(user.createdAt)
      }));
      setUsers(parsedUsers);
    } else {
      const generatedUsers = generateUsers(5000);
      setUsers(generatedUsers);
      localStorage.setItem('users', JSON.stringify(generatedUsers));
    }
  }, []);

  const handleAddUser = (newUser: User) => {
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowModal(false);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Toolbar>
        <div>
          <button onClick={() => setViewMode('table')}>Tablo Görünümü</button>
          <button onClick={() => setViewMode('card')}>Kart Görünümü</button>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button onClick={() => setPaginationMode(p => p === 'paginated' ? 'all' : 'paginated')}>
            {paginationMode === 'paginated' ? 'Tümünü Göster' : 'Sayfalandır'}
          </button>
          <button onClick={() => setShowModal(true)}>+ Kullanıcı Ekle</button>
        </div>
      </Toolbar>

      {viewMode === 'table' ? (
        <UserTable users={filteredUsers} paginationMode={paginationMode} />
      ) : (
        <UserCards users={filteredUsers} paginationMode={paginationMode} />
      )}

      {showModal && (
        <AddUserModal 
          onClose={() => setShowModal(false)}
          onAddUser={handleAddUser}
        />
      )}
    </Container>
  );
};

export default UserListPage;