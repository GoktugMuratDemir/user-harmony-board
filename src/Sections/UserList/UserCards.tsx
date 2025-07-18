/**
 * UserCards.tsx
 *
 * Kullanıcı Kartları Bileşeni
 *
 * Bu dosya, kullanıcıları kart formatında görüntüleyen section bileşenidir.
 * Arama, filtreleme, sıralama ve sayfalama özelliklerini destekler.
 *
 * Özellikler:
 * - ✅ Grid tabanlı responsive kart düzeni
 * - ✅ Kullanıcı arama (isim, email, rol)
 * - ✅ Rol bazlı filtreleme
 * - ✅ İsim/tarih sıralaması
 * - ✅ Sayfalama (12 kart/sayfa)
 * - ✅ Infinite scroll desteği
 * - ✅ Hover animasyonları
 * - ✅ Kart detay sayfasına yönlendirme
 * - ✅ Modern gradient tasarım
 *
 * Layout:
 * - Mobil: 1 sütun
 * - Tablet: 2 sütun
 * - Desktop: 3 sütun
 *
 * Kullanım:
 * ```tsx
 * <UserCards users={allUsers} />
 * ```
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Colors from "../../Styles/Colors";
import { Link } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField";
import CustomButton from "../../components/CustomButton";
import CustomSelect from "../../components/CustomSelect";
import type { User } from "../../types/types";
import { useUserCards } from "../../hooks/Users/UserList/useUserCards";

/**
 * Kartlar Container
 * Responsive grid düzeni sağlar
 */
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px 28px;
  padding: 36px 8px 16px 8px;
  justify-items: center;
  align-items: stretch;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/**
 * Kullanıcı Kartı
 * Modern gradient tasarım ve hover efektleri
 */
const Card = styled.div`
  border: 1.5px solid ${Colors.primary[200]};
  border-radius: 24px;
  padding: 32px 22px 24px 22px;
  background: linear-gradient(
    120deg,
    ${Colors.surface} 85%,
    ${Colors.primary[100]} 100%
  );
  box-shadow: 0 4px 24px 0 ${Colors.primary[100]};
  transition: transform 0.18s, box-shadow 0.18s, border 0.18s;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 260px;
  width: 100%;
  max-width: 370px;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px) scale(1.025); /* Hover animasyonu */
    box-shadow: 0 10px 32px 0 ${Colors.primary[200]};
    border: 1.5px solid ${Colors.primary[400]};
    background: linear-gradient(
      120deg,
      ${Colors.primary[100]} 60%,
      ${Colors.surface} 100%
    );
  }
`;

/**
 * Kart Başlık
 * Kullanıcı adı gösterimi
 */
const CardHeader = styled.h3`
  margin: 0 0 18px 0;
  color: ${Colors.primary[600]};
  font-size: 1.32rem;
  font-weight: 900;
  letter-spacing: 0.03em;
  text-align: center;
`;

/**
 * Kart Alan Metni
 * Kullanıcı bilgi alanları
 */
const CardField = styled.p`
  margin: 12px 0;
  color: ${Colors.text};
  font-size: 1.09rem;
  letter-spacing: 0.01em;
  text-align: center;
`;

/**
 * Detay Butonu
 * Kullanıcı detay sayfasına yönlendiren link butonu
 */
const DetailButton = styled(Link)`
  display: inline-block;
  margin-top: 22px;
  padding: 13px 34px;
  background: linear-gradient(
    90deg,
    ${Colors.primary[500]},
    ${Colors.primary[400]}
  );
  color: ${Colors.textLight};
  text-decoration: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.09rem;
  box-shadow: 0 2px 12px 0 ${Colors.primary[200]};
  letter-spacing: 0.02em;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;

  &:hover {
    background: linear-gradient(
      90deg,
      ${Colors.primary[600]},
      ${Colors.primary[400]}
    );
    color: #fff;
    box-shadow: 0 6px 20px 0 ${Colors.primary[300]};
  }
`;

/**
 * Kullanıcı Avatar
 * Gradient arka planla avatar placeholder
 */
const UserAvatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  width: 54px;
  height: 54px;
  background: linear-gradient(
    135deg,
    ${Colors.primary[400]} 60%,
    ${Colors.primary[200]} 100%
  );
  border-radius: 50%;
  box-shadow: 0 2px 10px 0 ${Colors.primary[100]};
`;

/**
 * Sayfalama Container
 * Sayfa navigasyon kontrolleri
 */
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  gap: 12px;

  & > button {
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
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

/**
 * Filtre ve Sıralama Çubuğu
 * Arama, filtreleme ve sıralama kontrolleri
 */
const FilterSortBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 18px;
  align-items: center;
  margin-y: 18px;
  justify-content: center;
`;

/**
 * Arama Alanı Wrapper
 * Arama input'u için container
 */
const SearchFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 180px;
`;

/**
 * Arama Etiketi
 * Arama input'u için label
 */
const SearchLabel = styled.label`
  font-size: 0.95rem;
  color: ${Colors.primary[600]};
  margin-bottom: 2px;
`;

/**
 * Styled Metin Alanı
 * Özelleştirilmiş arama input'u
 */
const StyledTextField = styled(CustomTextField)`
  font-size: 1rem;
  padding: 10px 16px;
  border-radius: 10px;
  background: ${Colors.surface};
  border: 1.5px solid ${Colors.primary[200]};
  color: ${Colors.text};
  box-shadow: 0 2px 8px 0 ${Colors.primary[100]};
  transition: background 0.2s, border 0.2s, box-shadow 0.2s;
  width: 100%;

  &:focus {
    border-color: ${Colors.primary[500]};
    outline: none;
    box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
  }
`;

// Bileşen props interface'i
interface UserCardsProps {
  users: User[];
}

// Sıralama seçenekleri
const sortOptions = [
  { value: "name", label: "İsme Göre (A-Z)" },
  { value: "createdAt", label: "Oluşturulma Tarihi" },
];

// Sıralama yönü seçenekleri
const orderOptions = [
  { value: "asc", label: "Artan" },
  { value: "desc", label: "Azalan" },
];

/**
 * Kullanıcı Kartları Ana Bileşeni
 *
 * Kullanıcı listesini kart formatında görüntüler. Hook kullanarak
 * arama, filtreleme, sıralama ve sayfalama işlevselliği sağlar.
 *
 * @param users - Tüm kullanıcı listesi
 * @returns JSX.Element - Kullanıcı kartları bileşeni
 */
const UserCards: React.FC<UserCardsProps> = ({ users }) => {
  // Custom hook'tan tüm gereken state ve fonksiyonları al
  const {
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
    paginatedUsers,
    totalPages,
    // Infinite scroll özellikleri
    loadMoreItems,
    hasMoreItems,
  } = useUserCards(users);

  // Infinite scroll için container referansı
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Infinite Scroll Event Listener
   * Sayfa sonuna yaklaştığında daha fazla veri yükler
   */
  useEffect(() => {
    if (paginationMode !== "all") return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 200; // 200px önceden tetikle

      if (isScrolledToBottom && hasMoreItems) {
        loadMoreItems();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [paginationMode, hasMoreItems, loadMoreItems]);

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: paginationMode === "all" ? "70vh" : "none", // Infinite scroll modu için sabit yükseklik
        overflowY: paginationMode === "all" ? "auto" : "visible",
        padding: paginationMode === "all" ? "0 32px" : "0",
      }}
    >
      {/* Filtre ve Kontrol Çubuğu */}
      <FilterSortBar>
        {/* Arama Alanı */}
        <SearchFieldWrapper>
          <SearchLabel htmlFor="user-search-input">Ara</SearchLabel>
          <StyledTextField
            id="user-search-input"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
          />
        </SearchFieldWrapper>

        {/* Rol Filtresi */}
        <CustomSelect
          value={filterRole}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
            setFilterRole(e.target.value as string)
          }
          options={roleOptions}
          label="Rol"
        />

        {/* Sıralama Alanı */}
        <CustomSelect
          value={sortKey}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
            setSortKey(e.target.value as string)
          }
          options={sortOptions}
          label="Sırala"
        />

        {/* Sıralama Yönü */}
        <CustomSelect
          value={sortOrder}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
            setSortOrder(e.target.value as string)
          }
          options={orderOptions}
          label="Sıra"
        />

        {/* Görüntüleme Modu Değiştirici */}
        <CustomButton
          text={
            paginationMode === "paginated" ? "Tümünü Göster" : "Sayfalandır"
          }
          onClick={() =>
            setPaginationMode((p) => (p === "paginated" ? "all" : "paginated"))
          }
          variant="outlined"
        />
      </FilterSortBar>

      {/* Kullanıcı Kartları Grid */}
      <CardsContainer>
        {paginatedUsers &&
          paginatedUsers.map((user: User) => (
            <Card key={user.id}>
              {/* Avatar - İsmin ilk harfi */}
              <UserAvatar>
                <span
                  style={{
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: Colors.surface,
                    letterSpacing: "1px",
                    userSelect: "none",
                  }}
                >
                  {user.name?.[0]?.toUpperCase()}
                </span>
              </UserAvatar>

              {/* Kullanıcı Bilgileri */}
              <CardHeader>{user.name}</CardHeader>
              <CardField>
                <strong>Email:</strong> {user.email}
              </CardField>
              <CardField>
                <strong>Rol:</strong> {user.role}
              </CardField>
              <CardField>
                <strong>Oluşturulma Tarihi:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </CardField>

              {/* Detay Sayfası Linki */}
              <DetailButton to={`/users/${user.id}`}>Detaylar</DetailButton>
            </Card>
          ))}
      </CardsContainer>

      {/* Infinite Scroll Yükleme Göstergesi */}
      {paginationMode === "all" && hasMoreItems && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: Colors.primary[600],
            fontSize: "0.9rem",
          }}
        >
          Daha fazla yükleniyor...
        </div>
      )}

      {/* Klasik Sayfalama Kontrolleri */}
      {paginationMode === "paginated" && (
        <Pagination>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Önceki
          </button>
          <span>
            Sayfa {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Sonraki
          </button>
        </Pagination>
      )}
    </div>
  );
};

export default UserCards;
