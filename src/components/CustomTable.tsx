/**
 * CustomTable.tsx
 *
 * Gelişmiş Tablo Bileşeni
 *
 * Bu dosya, kullanıcı verilerini görüntülemek için gelişmiş özelliklerle donatılmış
 * bir tablo bileşeni sunar. Sıralama, filtreleme, gruplama, sayfalama ve arama
 * özelliklerini destekler.
 *
 * Özellikler:
 * - ✅ Sütun bazlı sıralama (ASC/DESC)
 * - ✅ Metin tabanlı arama
 * - ✅ Grup filtreleme (checkbox ile)
 * - ✅ Sayfalama (10 kayıt/sayfa)
 * - ✅ Responsive tasarım
 * - ✅ Zebra satır renklendirmesi
 * - ✅ Özel hücre render fonksiyonları
 * - ✅ Hover efektleri
 *
 * Kullanım:
 * ```tsx
 * const columns = [
 *   { field: 'name', headerName: 'İsim', width: 150, sortable: true },
 *   { field: 'age', headerName: 'Yaş', width: 100, grouping: true }
 * ];
 *
 * <CustomTable
 *   rows={users}
 *   columns={columns}
 * />
 * ```
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import React, { useState, useRef } from "react";
import styled from "styled-components";
import CustomTextField from "./CustomTextField";

// Tablo hücresinde gösterilecek değer tipleri
type FieldValue = string | number | boolean | undefined;

// Tablo sütun yapılandırması
type Column<T> = {
  field: string; // Veri alanı adı
  headerName: string; // Sütun başlığı
  width?: number; // Sütun genişliği (px)
  type?: string; // Veri tipi (date, number vb.)
  description?: string; // Sütun açıklaması (tooltip)
  sortable?: boolean; // Sıralanabilir mi? (varsayılan: true)
  valueGetter?: (value: FieldValue, row: T) => FieldValue; // Değer dönüştürücü
  grouping?: boolean; // Gruplama filtreleme özelliği
  renderCell?: (row: T) => React.ReactNode; // Özel hücre render fonksiyonu
};

// Tablo bileşeni props
type CustomTableProps<T> = {
  columns: Column<T>[]; // Sütun tanımları
  rows: T[]; // Tablo verileri
};

import Colors from "../Styles/Colors";

// Her sayfada gösterilecek kayıt sayısı
const PAGE_SIZE = 10;

/**
 * Tablo Container - Dış sarma elemanı
 * Responsive tasarım ve gölge efekti sağlar
 */
const TableWrapper = styled.div`
  overflow-x: auto; /* Yatay kaydırma */
  background: ${Colors.surface};
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 ${Colors.primary[100]};
  padding: 24px 16px 8px 16px;
`;

/**
 * Ana Tablo Elemanı
 * Modern, temiz tablo görünümü
 */
const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
`;

/**
 * Tablo Başlık Hücreleri
 * Sıralama ve filtreleme interaksiyonları
 */
const StyledTh = styled.th<{ minwidth?: number }>`
  min-width: ${({ minwidth }) => minwidth || 100}px;
  border-bottom: 2px solid ${Colors.primary[300]};
  padding: 14px 10px;
  background: ${Colors.primary[100]};
  color: ${Colors.primary[600]};
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
  position: sticky; /* Kaydırma sırasında sabit kalır */
  top: 0;
  z-index: 2;
  transition: background 0.2s;
`;

/**
 * Tablo Veri Hücreleri
 * Zebra deseni ve hover efektleri
 */
const StyledTd = styled.td<{ zebra?: boolean }>`
  border-bottom: 1px solid ${Colors.border};
  padding: 12px 10px;
  background: ${({ zebra }) => (zebra ? Colors.primary[100] : Colors.surface)};
  color: ${Colors.text};
  font-size: 0.98rem;
  transition: background 0.2s;
`;

/**
 * Tablo Satırları
 * Hover efektleri ve interaktif davranış
 */
const TableRow = styled.tr`
  transition: background 0.18s;
  &:hover td {
    background: ${Colors.primary[200]}; /* Hover rengi */
  }
`;

/**
 * Sayfalama Container
 * Sayfa navigasyon kontrolleri
 */
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
`;

/**
 * Sayfalama Butonları
 * İleri/geri navigasyon butonları
 */
const PaginationButton = styled.button`
  padding: 8px 18px;
  border: 1.5px solid ${Colors.primary[300]};
  background: ${Colors.primary[100]};
  color: ${Colors.primary[600]};
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 ${Colors.primary[100]};
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover:not(:disabled) {
    background: ${Colors.primary[200]};
    color: ${Colors.primary[500]};
    border: 1.5px solid ${Colors.primary[400]};
  }
  &:disabled {
    opacity: 0.5; /* Devre dışı durum */
    cursor: not-allowed;
  }
`;

// Veri objesi için genel tip tanımı
type FieldValueObject = {
  [key: string]: string | number | boolean | undefined;
};

/**
 * Ana Tablo Bileşeni
 *
 * Gelişmiş tablo özelliklerini bir araya getiren ana component.
 * T generic tipi, satır verilerinin tipini belirtir ve id alanı zorunludur.
 *
 * @param columns - Sütun tanımları dizisi
 * @param rows - Tablo verisi dizisi
 * @returns JSX.Element - Renderlanmış tablo bileşeni
 */
function CustomTable<T extends { id?: string | number }>({
  columns,
  rows,
}: CustomTableProps<T>) {
  // Grup filtreleme durumu - her sütun için Set objesi tutar
  const [groupFilters, setGroupFilters] = useState<{
    [field: string]: Set<FieldValue>;
  }>({});

  // Açık grup popup kontrolü
  const [openGroupPopup, setOpenGroupPopup] = useState<string | null>(null);
  const groupPopupRef = useRef<HTMLDivElement | null>(null);

  // Sayfalama kontrolü
  const [page, setPage] = useState(0);

  // Sıralama kontrolü
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Arama metni
  const [search, setSearch] = useState("");

  /**
   * Filtrelenmiş Satırları Hesapla
   * Grup filtreleri ve metin araması uygular
   */
  const filteredRows = React.useMemo(() => {
    let result = rows;

    // Grup filtrelerini uygula
    Object.entries(groupFilters).forEach(([field, values]) => {
      if (values.size > 0) {
        result = result.filter((row) =>
          values.has((row as FieldValueObject)[field] as FieldValue)
        );
      }
    });

    // Metin araması uygula
    if (!search.trim()) return result;
    const lower = search.trim().toLowerCase();
    return result.filter((row) =>
      columns.some((col) => {
        let value = (row as FieldValueObject)[col.field] as FieldValue;
        if (col.valueGetter) {
          value = col.valueGetter(value, row);
        }
        return String(value ?? "")
          .toLowerCase()
          .includes(lower);
      })
    );
  }, [rows, columns, search, groupFilters]);

  /**
   * Belirli Sütun İçin Benzersiz Değerleri Bul
   * Grup filtreleme için kullanılır
   */
  const getUniqueGroupValues = (field: string) => {
    const values = new Set<FieldValue>();
    rows.forEach((row) => {
      values.add((row as FieldValueObject)[field] as FieldValue);
    });
    return Array.from(values);
  };

  /**
   * Popup Dışında Tıklama Algılama
   * Grup filtre popup'ını kapatmak için
   */
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        groupPopupRef.current &&
        !groupPopupRef.current.contains(event.target as Node)
      ) {
        setOpenGroupPopup(null);
      }
    }
    if (openGroupPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openGroupPopup]);

  /**
   * Sıralanmış Satırları Hesapla
   * Aktif sıralama kriterlerine göre verileri sıralar
   */
  const sortedRows = React.useMemo(() => {
    if (!sortField) return filteredRows;
    const col = columns.find((c) => c.field === sortField);
    if (!col) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      let aValue = (a as FieldValueObject)[col.field] as FieldValue;
      let bValue = (b as FieldValueObject)[col.field] as FieldValue;

      // Özel değer dönüştürücü varsa kullan
      if (col.valueGetter) {
        aValue = col.valueGetter(aValue, a);
        bValue = col.valueGetter(bValue, b);
      }

      // Eşit değerler
      if (aValue === bValue) return 0;

      // Null değer kontrolü
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Sayı karşılaştırması
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      // String karşılaştırması
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredRows, sortField, sortDirection, columns]);

  // Sayfa sayısı ve mevcut sayfa verileri
  const pageCount = Math.ceil(sortedRows.length / PAGE_SIZE);
  const paginatedRows = sortedRows.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  /**
   * Sıralama İşleyicisi
   * Sütun başlığına tıklandığında sıralama yönünü değiştirir
   */
  const handleSort = (field: string, sortable?: boolean) => {
    if (sortable === false) return; // Sıralanamaz sütunlar için işlem yapma

    if (sortField === field) {
      // Aynı sütun tekrar tıklandıysa yönü değiştir
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Farklı sütun tıklandıysa yeni sıralama başlat
      setSortField(field);
      setSortDirection("asc");
    }
    setPage(0); // Sıralama değişince ilk sayfaya dön
  };

  // Sayfa navigasyon fonksiyonları
  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  /**
   * Arama Değişikliği Etkisi
   * Arama metni değiştiğinde sayfa numarasını sıfırlar
   */
  React.useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <TableWrapper>
      {/* Arama Giriş Alanı */}
      <div style={{ marginBottom: 12 }}>
        <CustomTextField
          type="text"
          placeholder="Tabloda ara..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Ana Tablo */}
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col) => {
              // Sıralama özelliği kontrolü (varsayılan: true)
              const isSortable = col.sortable !== false;
              // Gruplama özelliği kontrolü
              const isGrouping = col.grouping === true;

              return (
                <StyledTh
                  key={col.field}
                  minwidth={col.width}
                  title={col.description}
                  style={{
                    cursor: isSortable ? "pointer" : "default",
                    position: "relative",
                  }}
                  onClick={() => handleSort(col.field, col.sortable)}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {col.headerName}
                    {/* Aktif sıralama göstergesi */}
                    {isSortable && sortField === col.field && (
                      <span style={{ marginLeft: 4 }}>
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                    {/* Pasif sıralama göstergesi */}
                    {isSortable && sortField !== col.field && (
                      <span style={{ marginLeft: 4, color: "#bbb" }}>⇅</span>
                    )}
                    {/* Grup filtreleme ikonu */}
                    {isGrouping && (
                      <span
                        style={{
                          marginLeft: 6,
                          cursor: "pointer",
                          color: "#888",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenGroupPopup((prev) =>
                            prev === col.field ? null : col.field
                          );
                        }}
                        title="Gruplara göre filtrele"
                      >
                        &#128269;
                      </span>
                    )}
                  </span>

                  {/* Grup Filtreleme Popup */}
                  {isGrouping && openGroupPopup === col.field && (
                    <div
                      ref={groupPopupRef}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        zIndex: 10,
                        background: "#fff",
                        border: "1px solid #ddd",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        padding: 8,
                        minWidth: 160,
                        maxHeight: 220,
                        overflowY: "auto",
                      }}
                    >
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>
                        Filtrele
                      </div>
                      {/* Grup değerleri listesi */}
                      {getUniqueGroupValues(col.field).map((val) => (
                        <label
                          key={String(val)}
                          style={{ display: "block", marginBottom: 4 }}
                        >
                          <input
                            type="checkbox"
                            checked={groupFilters[col.field]?.has(val) || false}
                            onChange={(e) => {
                              setGroupFilters((prev) => {
                                const set = new Set(prev[col.field] || []);
                                if (e.target.checked) {
                                  set.add(val);
                                } else {
                                  set.delete(val);
                                }
                                return { ...prev, [col.field]: set };
                              });
                            }}
                          />
                          <span style={{ marginLeft: 6 }}>{String(val)}</span>
                        </label>
                      ))}
                      {/* Temizle butonu */}
                      <button
                        style={{
                          marginTop: 8,
                          width: "100%",
                          padding: "4px 0",
                          border: "1px solid #ddd",
                          background: "#f5f5f5",
                          borderRadius: 4,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setGroupFilters((prev) => ({
                            ...prev,
                            [col.field]: new Set(),
                          }));
                        }}
                      >
                        Temizle
                      </button>
                    </div>
                  )}
                </StyledTh>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* Tablo Satırları */}
          {paginatedRows.map((row, rowIndex) => (
            <TableRow key={(row.id as string | number) ?? rowIndex}>
              {columns.map((col) => {
                // Özel render fonksiyonu varsa kullan
                if (col.renderCell) {
                  return (
                    <StyledTd zebra={rowIndex % 2 === 1} key={col.field}>
                      {col.renderCell(row)}
                    </StyledTd>
                  );
                }

                // Normal değer gösterimi
                let value = (row as FieldValueObject)[col.field] as FieldValue;
                if (col.valueGetter) {
                  value = col.valueGetter(value, row);
                }
                return (
                  <StyledTd zebra={rowIndex % 2 === 1} key={col.field}>
                    {value}
                  </StyledTd>
                );
              })}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>

      {/* Aktif Filtreler Gösterimi */}
      {Object.entries(groupFilters).some(([, set]) => set.size > 0) && (
        <div style={{ margin: "12px 0", color: "#555" }}>
          <b>Filtreler:</b>
          {Object.entries(groupFilters).map(
            ([field, set]) =>
              set.size > 0 && (
                <span key={field} style={{ marginLeft: 8 }}>
                  {columns.find((c) => c.field === field)?.headerName}:{" "}
                  {Array.from(set).join(", ")}
                  <span
                    style={{ marginLeft: 4, cursor: "pointer", color: "#c00" }}
                    onClick={() =>
                      setGroupFilters((prev) => ({
                        ...prev,
                        [field]: new Set(),
                      }))
                    }
                    title="Filtreyi temizle"
                  >
                    ✕
                  </span>
                </span>
              )
          )}
        </div>
      )}

      {/* Sayfalama Kontrolleri */}
      <PaginationWrapper>
        <PaginationButton onClick={handlePrev} disabled={page === 0}>
          Önceki
        </PaginationButton>
        <span style={{ margin: "0 8px", color: "#888" }}>
          {sortedRows.length === 0
            ? "0 / 0"
            : `${page * PAGE_SIZE + 1} - ${Math.min(
                (page + 1) * PAGE_SIZE,
                sortedRows.length
              )} / ${sortedRows.length}`}
        </span>
        <PaginationButton
          onClick={handleNext}
          disabled={page === pageCount - 1 || pageCount === 0}
        >
          Sonraki
        </PaginationButton>
      </PaginationWrapper>
    </TableWrapper>
  );
}

export default CustomTable;
