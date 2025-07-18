/**
 * useUserCards.ts
 *
 * Kullanıcı Kartları Hook'u
 *
 * Bu dosya, kullanıcı kartlarının görüntülenmesi, filtrelenmesi, sıralanması
 * ve sayfalanması için gereken tüm state yönetimi ve işlemleri sağlar.
 *
 * Özellikler:
 * - ✅ Kullanıcı arama (isim, email, rol)
 * - ✅ Rol bazlı filtreleme
 * - ✅ İsim/tarih bazlı sıralama (ASC/DESC)
 * - ✅ Sayfalama (12 öğe/sayfa)
 * - ✅ Infinite scroll desteği
 * - ✅ Dinamik rol seçenekleri
 * - ✅ Responsive tasarım desteği
 *
 * Kullanım:
 * ```tsx
 * const {
 *   paginatedUsers,
 *   searchTerm,
 *   setSearchTerm,
 *   filterRole,
 *   setFilterRole,
 *   sortKey,
 *   setSortKey
 * } = useUserCards(users);
 * ```
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import { useState, useMemo, useEffect } from "react";
import type { User } from "../../../types/types";

/**
 * Kullanıcı Kartları Hook'u
 *
 * Kullanıcı listesi için arama, filtreleme, sıralama ve sayfalama
 * işlevselliği sağlar. Hem klasik sayfalama hem de infinite scroll
 * modlarını destekler.
 *
 * @param users - Tüm kullanıcı listesi
 * @returns Hook fonksiyonları ve state'leri
 */
export function useUserCards(users: User[]) {
  // Sayfalama kontrolü
  const [currentPage, setCurrentPage] = useState(1);

  // Filtreleme kontrolü
  const [filterRole, setFilterRole] = useState<string>("all");

  // Sıralama kontrolü
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  // Arama kontrolü
  const [searchTerm, setSearchTerm] = useState("");

  // Görüntüleme modu (sayfalama vs infinite scroll)
  const [paginationMode, setPaginationMode] = useState<"paginated" | "all">(
    "paginated"
  );

  // Infinite scroll için gösterilecek öğe sayısı
  const [visibleItemsCount, setVisibleItemsCount] = useState(10);

  /**
   * Filtre/Arama Değişikliği Etkisi
   * Filtre veya arama değiştiğinde görünür öğe sayısını sıfırlar
   */
  useEffect(() => {
    setVisibleItemsCount(10);
  }, [searchTerm, filterRole, sortKey, sortOrder]);

  /**
   * Dinamik Rol Seçenekleri
   * Kullanıcı verilerinden benzersiz rolleri çıkararak seçenek listesi oluşturur
   */
  const roleOptions = useMemo(() => {
    const roles = Array.from(new Set(users.map((u) => u.role)));
    return [
      { value: "all", label: "Tümü" },
      ...roles.map((r) => ({
        value: r,
        label: r.charAt(0).toUpperCase() + r.slice(1), // İlk harf büyük
      })),
    ];
  }, [users]);

  /**
   * İşlenmiş Kullanıcı Listesi
   * Arama, filtreleme ve sıralama işlemlerini uygular
   */
  const processedUsers = useMemo(() => {
    let filtered = users;

    // Metin araması - isim, email ve rol alanlarında arar
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Rol filtrelemesi
    if (filterRole !== "all") {
      filtered = filtered.filter((u) => u.role === filterRole);
    }

    // Sıralama işlemi
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      if (sortKey === "name") {
        // İsme göre sıralama (büyük/küçük harf duyarsız)
        aVal = a.name?.toLowerCase?.() || "";
        bVal = b.name?.toLowerCase?.() || "";
      } else if (sortKey === "createdAt") {
        // Oluşturulma tarihine göre sıralama
        aVal = new Date(a.createdAt).getTime();
        bVal = new Date(b.createdAt).getTime();
      } else {
        // Varsayılan: isim sıralaması
        aVal = a.name?.toLowerCase?.() || "";
        bVal = b.name?.toLowerCase?.() || "";
      }

      // Sıralama yönü kontrolü
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [users, searchTerm, filterRole, sortKey, sortOrder]);

  // Sayfa başına öğe sayısı ve toplam sayfa sayısı
  const itemsPerPage = 12;
  const totalPages = Math.ceil(processedUsers.length / itemsPerPage);

  /**
   * Sayfalanmış Kullanıcı Listesi
   * Seçilen moda göre sayfalama veya infinite scroll uygular
   */
  const paginatedUsers = useMemo(() => {
    if (paginationMode === "all") {
      // Infinite scroll modu - sadece görünür öğe sayısı kadar göster
      return processedUsers.slice(0, visibleItemsCount);
    }
    // Klasik sayfalama modu
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

  /**
   * Daha Fazla Veri Yükleme (Infinite Scroll)
   * Infinite scroll modunda daha fazla öğe yükler
   */
  const loadMoreItems = () => {
    if (paginationMode === "all" && visibleItemsCount < processedUsers.length) {
      setVisibleItemsCount((prev) =>
        Math.min(prev + 10, processedUsers.length)
      );
    }
  };

  /**
   * Görünür Öğe Sayısını Sıfırlama
   * Filtreleme sonrası başa dönmek için
   */
  const resetVisibleItems = () => {
    setVisibleItemsCount(10);
  };

  // Daha fazla veri var mı kontrolü
  const hasMoreItems =
    paginationMode === "all" && visibleItemsCount < processedUsers.length;

  // Hook'un döndürdüğü değerler ve fonksiyonlar
  return {
    // Sayfalama kontrolü
    currentPage,
    setCurrentPage,

    // Filtreleme kontrolü
    filterRole,
    setFilterRole,

    // Sıralama kontrolü
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,

    // Arama kontrolü
    searchTerm,
    setSearchTerm,

    // Görüntüleme modu kontrolü
    paginationMode,
    setPaginationMode,

    // Dinamik veriler
    roleOptions, // Rol seçenekleri
    processedUsers, // İşlenmiş kullanıcı listesi
    paginatedUsers, // Sayfalanmış kullanıcı listesi
    itemsPerPage, // Sayfa başına öğe sayısı
    totalPages, // Toplam sayfa sayısı

    // Infinite scroll özellikleri
    loadMoreItems, // Daha fazla veri yükleme
    resetVisibleItems, // Görünür öğeleri sıfırlama
    hasMoreItems, // Daha fazla veri var mı
    visibleItemsCount, // Görünür öğe sayısı
  };
}
