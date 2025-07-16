import React, { useState, useRef } from "react";
import styled from "styled-components";
import CustomTextField from "./CustomTextField";

type Column<T> = {
  field: string;
  headerName: string;
  width?: number;
  type?: string;
  description?: string;
  sortable?: boolean;
  valueGetter?: (value: unknown, row: T) => unknown;
  grouping?: boolean;
};

type CustomTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
};

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const StyledTh = styled.th<{ minwidth?: number }>`
  min-width: ${({ minwidth }) => minwidth || 100}px;
  border: 1px solid #ddd;
  padding: 8px;
  background: #f5f5f5;
  text-align: left;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
`;

const PaginationButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PAGE_SIZE = 10;

function CustomTable<T extends { id?: string | number }>({
  columns,
  rows,
}: CustomTableProps<T>) {
  // Grouping filter state
  const [groupFilters, setGroupFilters] = useState<{
    [field: string]: Set<any>;
  }>({});
  const [openGroupPopup, setOpenGroupPopup] = useState<string | null>(null);
  const groupPopupRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState(""); // Arama inputu için state

  // Arama ve grup filtresi
  const filteredRows = React.useMemo(() => {
    let result = rows;
    // Grouping filter
    Object.entries(groupFilters).forEach(([field, values]) => {
      if (values.size > 0) {
        result = result.filter((row) => values.has((row as any)[field]));
      }
    });
    // Search filter
    if (!search.trim()) return result;
    const lower = search.trim().toLowerCase();
    return result.filter((row) =>
      columns.some((col) => {
        let value = (row as any)[col.field];
        if (col.valueGetter) {
          value = col.valueGetter(value, row);
        }
        return String(value ?? "")
          .toLowerCase()
          .includes(lower);
      })
    );
  }, [rows, columns, search, groupFilters]);
  // Benzersiz grup değerlerini bul
  const getUniqueGroupValues = (field: string) => {
    const values = new Set<any>();
    rows.forEach((row) => {
      values.add((row as any)[field]);
    });
    return Array.from(values);
  };

  // Popup dışında tıklama ile kapatma
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
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openGroupPopup]);

  // Sıralama fonksiyonu
  const sortedRows = React.useMemo(() => {
    if (!sortField) return filteredRows;
    const col = columns.find((c) => c.field === sortField);
    if (!col) return filteredRows;
    const sorted = [...filteredRows].sort((a, b) => {
      let aValue = (a as any)[sortField];
      let bValue = (b as any)[sortField];
      if (col.valueGetter) {
        aValue = col.valueGetter(aValue, a);
        bValue = col.valueGetter(bValue, b);
      }
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
    return sorted;
  }, [filteredRows, sortField, sortDirection, columns]);

  const pageCount = Math.ceil(sortedRows.length / PAGE_SIZE);
  const paginatedRows = sortedRows.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  // Sıralama başlık tıklama
  const handleSort = (field: string, sortable?: boolean) => {
    // sortable false ise sıralama kapalı
    if (sortable === false) return;
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setPage(0);
  };

  // Arama inputu değişince sayfa başa alınır
  React.useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <TableWrapper>
      {/* Arama inputu */}
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
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col) => {
              // sortable undefined veya true ise sıralanabilir
              const isSortable = col.sortable !== false;
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
                    {isSortable && sortField === col.field && (
                      <span style={{ marginLeft: 4 }}>
                        {sortDirection === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                    {isSortable && sortField !== col.field && (
                      <span style={{ marginLeft: 4, color: "#bbb" }}>⇅</span>
                    )}
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
                  {/* Grup popup */}
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
                      {getUniqueGroupValues(col.field).map((val) => (
                        <label
                          key={val}
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
          {paginatedRows.map((row, rowIndex) => (
            <tr key={(row.id as string | number) ?? rowIndex}>
              {columns.map((col) => {
                let value = (row as any)[col.field];
                if (col.valueGetter) {
                  value = col.valueGetter((row as any)[col.field], row);
                }
                return <StyledTd key={col.field}>{value}</StyledTd>;
              })}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {/* Seçili grup filtreleri gösterimi */}
      {Object.entries(groupFilters).some(([_, set]) => set.size > 0) && (
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
