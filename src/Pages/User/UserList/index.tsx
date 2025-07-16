import React from "react";
import styled from "styled-components";
import UserTable from "../../../components/UserTable";
import CustomButton from "../../../components/CustomButton";
import CustomTextField from "../../../components/CustomTextField";
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
          <CustomButton
            text="Tablo Görünümü"
            onClick={() => setViewMode("table")}
          />
          <CustomButton
            text="Kart Görünümü"
            onClick={() => setViewMode("card")}
          />
        </div>
        <div>
          <CustomTextField
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
          />
        </div>
        <div>
          <CustomButton
            text={
              paginationMode === "paginated" ? "Tümünü Göster" : "Sayfalandır"
            }
            onClick={() =>
              setPaginationMode((p) =>
                p === "paginated" ? "all" : "paginated"
              )
            }
          />
          <CustomButton
            text="+ Kullanıcı Ekle"
            onClick={() => setShowModal(true)}
          />
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
