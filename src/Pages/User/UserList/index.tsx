import React from "react";
import styled from "styled-components";
import UserTable from "../../../Sections/UserList/UserTable";
import CustomButton from "../../../components/CustomButton";
import { useUserList } from "../../../hooks/Users/UserList";
import UserCards from "../../../Sections/UserList/UserCards";
import CustomModal from "../../../components/CustomModal";
import AddUserForm from "../../../components/AddUserForm";

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
        <UserTable users={filteredUsers} />
      ) : (
        <UserCards
          users={filteredUsers}
          paginationMode={paginationMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        width="400px"
      >
        <AddUserForm
          onClose={() => setShowModal(false)}
          onAddUser={handleAddUser}
        />
      </CustomModal>
    </Container>
  );
};

export default UserList;
