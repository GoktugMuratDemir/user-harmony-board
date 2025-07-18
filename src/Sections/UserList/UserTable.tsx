/**
 * UserTable.tsx
 *
 * Kullanıcı Tablosu Bileşeni
 *
 * Bu dosya, kullanıcıları tablo formatında görüntüleyen section bileşenidir.
 * CustomTable bileşenini kullanarak gelişmiş tablo özelliklerini sunar.
 *
 * Özellikler:
 * - ✅ Kullanıcı verilerini tablo formatında gösterim
 * - ✅ Sıralama (isim, email, rol, tarih)
 * - ✅ Rol bazlı grup filtreleme
 * - ✅ Arama özelliği
 * - ✅ Sayfalama (10 kayıt/sayfa)
 * - ✅ Detay sayfası linkli işlem sütunu
 * - ✅ Tarih formatlaması
 * - ✅ Modern container tasarımı
 * - ✅ Hover efektleri
 *
 * Sütunlar:
 * - Ad: Kullanıcı adı
 * - Email: E-posta adresi
 * - Rol: Kullanıcı rolü (grup filtrelemeli)
 * - Oluşturulma Tarihi: Tarih formatlanmış
 * - İşlemler: Detay sayfası linki
 *
 * Kullanım:
 * ```tsx
 * <UserTable users={allUsers} />
 * ```
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import React from "react";
import type { User } from "../../types/types";
import CustomTable from "../../components/CustomTable";
import Colors from "../../Styles/Colors";

// Bileşen props interface'i
type UserTableProps = {
  users: User[]; // Görüntülenecek kullanıcı listesi
};

/**
 * Kullanıcı Tablosu Ana Bileşeni
 *
 * CustomTable bileşenini kullanarak kullanıcı verilerini
 * tablo formatında görüntüler. Sütun tanımları ve veri
 * dönüştürme işlemlerini yönetir.
 *
 * @param users - Tablo'da gösterilecek kullanıcı listesi
 * @returns JSX.Element - Kullanıcı tablosu bileşeni
 */
const UserTable: React.FC<UserTableProps> = ({ users }) => {
  // Tablo sütun tanımları
  const columns = [
    {
      field: "name",
      headerName: "Ad", // Kullanıcı adı sütunu
    },
    {
      field: "email",
      headerName: "Email", // E-posta sütunu
    },
    {
      field: "role",
      headerName: "Rol",
      grouping: true, // Rol bazlı grup filtreleme aktif
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
      // Tarih formatlaması için özel değer dönüştürücü
      valueGetter: (
        _value: string | number | boolean | undefined,
        row: User
      ) => {
        const d = new Date(row.createdAt);
        return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
      },
    },
    {
      field: "actions",
      sortable: false, // İşlemler sütunu sıralanamaz
      headerName: "İşlemler",
      // Özel hücre render - detay sayfası linki
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

  // Kullanıcı verilerini tablo satırları formatına dönüştür
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
      {/* Tablo Başlığı */}
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

      {/* Ana Tablo Bileşeni */}
      <CustomTable<User> columns={columns} rows={rows} />
    </div>
  );
};

export default UserTable;
