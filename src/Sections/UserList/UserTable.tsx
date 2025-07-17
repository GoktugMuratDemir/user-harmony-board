import React from "react";
import type { User } from "../../types/types";
import CustomTable from "../../components/CustomTable";
import Colors from "../../Styles/Colors";

type UserTableProps = {
  users: User[];
};

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const columns = [
    { field: "name", headerName: "Ad" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Rol", grouping: true },
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
      valueGetter: (value: string | number | Date) => {
        const d = new Date(value);
        return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
      },
    },
    {
      field: "actions",
      sortable: false,
      headerName: "İşlemler",
      renderCell: (row: User) => (
        <a
          href={`/users/${row.id}`}
          style={{
            display: "inline-block",
            padding: "7px 18px",
            background: Colors.primary[500],
            color: Colors.textLight,
            borderRadius: 8,
            fontWeight: 700,
            fontSize: "0.98rem",
            textDecoration: "none",
            boxShadow: `0 2px 8px 0 ${Colors.primary[200]}`,
            transition: "background 0.18s, color 0.18s, box-shadow 0.18s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = Colors.primary[600])
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = Colors.primary[500])
          }
        >
          Detaylar
        </a>
      ),
    },
  ];

  const rows = users.map((user) => ({ ...user }));

  return (
    <div
      style={{
        background: `linear-gradient(120deg, ${Colors.surface} 80%, #f6fafd 100%)`,
        borderRadius: 24,
        boxShadow: `0 8px 32px 0 ${Colors.primary[100]}`,
        border: `1.5px solid ${Colors.primary[200]}`,
        padding: 32,
        marginTop: 32,
        width: "100%",
        maxWidth: 1000,
        transition: "box-shadow 0.2s, border 0.2s",
      }}
    >
      <div
        style={{
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: "1.25rem",
            color: Colors.primary[600],
            letterSpacing: 0.5,
            borderLeft: `4px solid ${Colors.primary[400]}`,
            paddingLeft: 12,
          }}
        >
          Kullanıcı Tablosu
        </span>
      </div>
      <CustomTable<User> columns={columns} rows={rows} />
    </div>
  );
};

export default UserTable;
