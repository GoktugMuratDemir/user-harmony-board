import { useState, useMemo, useEffect } from "react";
import type { User } from "../../../types/types";

export function useUserCards(users: User[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationMode, setPaginationMode] = useState<"paginated" | "all">(
    "paginated"
  );
  // Infinite scroll için gösterilecek item sayısı
  const [visibleItemsCount, setVisibleItemsCount] = useState(10);

  // Filtre veya arama değiştiğinde visible item count'u resetle
  useEffect(() => {
    setVisibleItemsCount(10);
  }, [searchTerm, filterRole, sortKey, sortOrder]);

  // Rolleri dinamik olarak çıkar
  const roleOptions = useMemo(() => {
    const roles = Array.from(new Set(users.map((u) => u.role)));
    return [
      { value: "all", label: "Tümü" },
      ...roles.map((r) => ({
        value: r,
        label: r.charAt(0).toUpperCase() + r.slice(1),
      })),
    ];
  }, [users]);

  // Filtreleme ve sıralama
  const processedUsers = useMemo(() => {
    let filtered = users;

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Rol filtresi
    if (filterRole !== "all") {
      filtered = filtered.filter((u) => u.role === filterRole);
    }

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";
      if (sortKey === "name") {
        aVal = a.name?.toLowerCase?.() || "";
        bVal = b.name?.toLowerCase?.() || "";
      } else if (sortKey === "createdAt") {
        aVal = new Date(a.createdAt).getTime();
        bVal = new Date(b.createdAt).getTime();
      } else {
        // fallback: name
        aVal = a.name?.toLowerCase?.() || "";
        bVal = b.name?.toLowerCase?.() || "";
      }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [users, searchTerm, filterRole, sortKey, sortOrder]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    if (paginationMode === "all") {
      // Infinite scroll modunda sadece visibleItemsCount kadar göster
      return processedUsers.slice(0, visibleItemsCount);
    }
    return processedUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [
    processedUsers,
    currentPage,
    itemsPerPage,
    paginationMode,
    visibleItemsCount,
  ]);

  // Infinite scroll için daha fazla veri yükleme fonksiyonu
  const loadMoreItems = () => {
    if (paginationMode === "all" && visibleItemsCount < processedUsers.length) {
      setVisibleItemsCount((prev) =>
        Math.min(prev + 10, processedUsers.length)
      );
    }
  };

  // Filtre veya arama değiştiğinde visible item count'u resetle
  const resetVisibleItems = () => {
    setVisibleItemsCount(10);
  };

  // Tüm kullanıcıları gösterme durumu
  const hasMoreItems =
    paginationMode === "all" && visibleItemsCount < processedUsers.length;

  return {
    currentPage,
    setCurrentPage,
    filterRole,
    setFilterRole,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    searchTerm,
    setSearchTerm,
    paginationMode,
    setPaginationMode,
    roleOptions,
    processedUsers,
    paginatedUsers,
    itemsPerPage,
    totalPages,
    // Infinite scroll için yeni özellikler
    loadMoreItems,
    resetVisibleItems,
    hasMoreItems,
    visibleItemsCount,
  };
}
