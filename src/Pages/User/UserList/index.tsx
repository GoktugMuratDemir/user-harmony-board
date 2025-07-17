import React from "react";
import styled from "styled-components";
import UserTable from "../../../Sections/UserList/UserTable";
import CustomButton from "../../../components/CustomButton";
import { useUserList } from "../../../hooks/Users/UserList";
import UserCards from "../../../Sections/UserList/UserCards";
import CustomModal from "../../../components/CustomModal";
import AddUserForm from "../../../components/AddUserForm";

import Colors from "../../../Styles/Colors";

const Bg = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(
    120deg,
    ${Colors.primary[100]},
    ${Colors.surface} 80%
  );
  overflow-x: hidden;
`;

const Card = styled.div`
  background: ${Colors.surface};
  border-radius: 32px;
  box-shadow: 0 8px 40px 0 ${Colors.primary[200]};
  min-width: 340px;
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 38px 32px 32px 32px;
  border: 1.5px solid ${Colors.border};
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  background: ${Colors.surface};
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 ${Colors.primary[100]};
  padding: 22px 32px;
  margin-bottom: 28px;
`;
const Title = styled.h2`
  color: ${Colors.primary[600]};
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  text-align: left;
  width: 100%;
`;

const Description = styled.p`
  color: ${Colors.text};
  font-size: 1.08rem;
  margin-bottom: 24px;
  width: 100%;
  text-align: left;
`;

const CustomModalBlur = styled(CustomModal)`
  & .modal-backdrop {
    backdrop-filter: blur(3px);
    background: rgba(0, 0, 0, 0.18);
  }
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
    <Bg>
      <Card>
        <Title>Kullanıcı Listesi</Title>
        <Description>
          Tüm kullanıcıları tablo veya kart görünümünde inceleyebilir, arama
          yapabilir ve yeni kullanıcı ekleyebilirsiniz.
        </Description>
        <Toolbar>
          <div style={{ display: "flex", gap: 10 }}>
            <CustomButton
              text="Tablo Görünümü"
              onClick={() => setViewMode("table")}
              variant="contained"
              active={viewMode === "table"}
            />
            <CustomButton
              text="Kart Görünümü"
              onClick={() => setViewMode("card")}
              variant="contained"
              active={viewMode === "card"}
            />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {viewMode === "card" && (
              <CustomButton
                text={
                  paginationMode === "paginated"
                    ? "Tümünü Göster"
                    : "Sayfalandır"
                }
                onClick={() =>
                  setPaginationMode((p) =>
                    p === "paginated" ? "all" : "paginated"
                  )
                }
                variant="outlined"
              />
            )}
            <CustomButton
              text="+ Kullanıcı Ekle"
              onClick={() => setShowModal(true)}
              variant="outlined"
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
        <CustomModalBlur
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          width="400px"
        >
          <AddUserForm
            onClose={() => setShowModal(false)}
            onAddUser={handleAddUser}
          />
        </CustomModalBlur>
      </Card>
    </Bg>
  );
};

export default UserList;
