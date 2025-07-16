import React from "react";
import styled from "styled-components";
import UserTable from "../../../components/UserTable";
import UserCards from "../../../components/UserCards";
import AddUserModal from "../../../components/AddUserModal";
import { useUserList } from "../../../hooks/Users/UserList";

const Container = styled.div`
  height: 100vh;
  padding: 20px;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserList: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    showModal,
    setShowModal,
    searchTerm,
    setSearchTerm,
    paginationMode,
    setPaginationMode,
    handleAddUser,
    filteredUsers,
  } = useUserList();

  return (
    <Container>
      <Toolbar>
        <div>
          <button onClick={() => setViewMode("table")}>Tablo Görünümü</button>
          <button onClick={() => setViewMode("card")}>Kart Görünümü</button>
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
          <button
            onClick={() =>
              setPaginationMode((p) =>
                p === "paginated" ? "all" : "paginated"
              )
            }
          >
            {paginationMode === "paginated" ? "Tümünü Göster" : "Sayfalandır"}
          </button>
          <button onClick={() => setShowModal(true)}>+ Kullanıcı Ekle</button>
        </div>
      </Toolbar>

      {viewMode === "table" ? (
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

export default UserList;
