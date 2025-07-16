import React, { useState } from "react";
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
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState(""); // Arama inputu için state

  // Arama filtresi
  const filteredRows = React.useMemo(() => {
    if (!search.trim()) return rows;
    const lower = search.trim().toLowerCase();
    return rows.filter((row) =>
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
  }, [rows, columns, search]);

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
              return (
                <StyledTh
                  key={col.field}
                  minwidth={col.width}
                  title={col.description}
                  style={{ cursor: isSortable ? "pointer" : "default" }}
                  onClick={() => handleSort(col.field, col.sortable)}
                >
                  {col.headerName}
                  {isSortable && sortField === col.field && (
                    <span style={{ marginLeft: 4 }}>
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                  {isSortable && sortField !== col.field && (
                    <span style={{ marginLeft: 4, color: "#bbb" }}>⇅</span>
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
