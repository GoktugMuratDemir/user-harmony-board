import { useState, useEffect } from "react";
import type { User } from "../../../types/types";
import { generateUsers } from "../../../utils/userGenerator";

export function useUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers = (JSON.parse(storedUsers) as User[]).map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt),
      }));
      setUsers(parsedUsers);
    } else {
      const generatedUsers = generateUsers(5000);
      setUsers(generatedUsers);
      localStorage.setItem("users", JSON.stringify(generatedUsers));
    }
  }, []);

  const handleAddUser = (newUser: User) => {
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowModal(false);
  };

  return {
    users,
    setUsers,
    viewMode,
    setViewMode,
    showModal,
    setShowModal,
    handleAddUser,
  };
}
