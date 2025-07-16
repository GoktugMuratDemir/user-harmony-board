import React from "react";
import { Link } from "react-router-dom";
import type { User } from "../../types/types";
import CustomTable from "../../components/CustomTable";

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
      valueGetter: (value: unknown) => {
        if (value instanceof Date) return value.toLocaleDateString();
        if (typeof value === "string" || typeof value === "number") {
          const d = new Date(value);
          return d.toLocaleDateString();
        }
        return "-";
      },
    },
    {
      field: "actions",
      sortable: false,
      headerName: "İşlemler",
      valueGetter: (_: unknown, row: User) => {
        return <Link to={`/users/${row.id}`}>Detaylar</Link>;
      },
    },
  ];

  const rows = users.map((user) => ({ ...user }));

  return <CustomTable<User> columns={columns} rows={rows} />;
};

export default UserTable;
