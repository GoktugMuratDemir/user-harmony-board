/**
 * CustomSelect.tsx - Özelleştirilebilir Seçim Kutusu Bileşeni
 *
 * Bu bileşen uygulamanın tüm select/dropdown ihtiyaçları için kullanılan
 * özelleştirilebilir select componenti'dir. Farklı varyantlar ve
 * option desteği sunar.
 *
 * Varyantlar:
 * - outlined: Kenarlıklı tasarım (varsayılan)
 * - filled: Dolu arka plan tasarımı
 *
 * Özellikler:
 * - Option array desteği
 * - Label desteği ve otomatik ID bağlama
 * - Focus efektleri ve animasyonlar
 * - Responsive tasarım
 * - Native select props desteği
 * - Accessibility uyumluluğu
 * - Varsayılan "Seçiniz" placeholder'ı
 *
 * @component
 * @param {CustomSelectProps} props - Select özellikleri
 * @returns {JSX.Element} Özelleştirilmiş select kutusu
 */

import React from "react";
import styled, { css } from "styled-components";
import Colors from "../Styles/Colors";

/** Select varyant tipleri */
type Variant = "outlined" | "filled";

/**
 * Select option interface'i
 * Her option için value ve label çifti
 */
interface Option {
  /** Option değeri */
  value: string;

  /** Görüntülenen etiket */
  label: string;
}

/**
 * CustomSelect bileşeninin props interface'i
 * Native select props'larını extend eder
 */
interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Select etiketi (opsiyonel) */
  label?: string;

  /** Seçim seçenekleri array'i */
  options: Option[];

  /** Select varyantı (varsayılan: outlined) */
  variant?: Variant;
}

/**
 * Varyant stilleri object'i
 * Her varyant için CSS tanımları ve focus durumları
 */
const variantStyles = {
  /** Outlined varyant - kenarlıklı tasarım */
  outlined: css`
    background: ${Colors.surface};
    border: 1.5px solid ${Colors.primary[200]};
    color: ${Colors.text};
    box-shadow: 0 2px 8px 0 ${Colors.primary[100]};
    border-radius: 10px;

    &:focus {
      border-color: ${Colors.primary[500]};
      outline: none;
      box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
    }
  `,

  /** Filled varyant - dolu arka plan tasarımı */
  filled: css`
    background: ${Colors.info?.[100] || Colors.primary[100]};
    border: none;
    color: ${Colors.text};
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 ${Colors.primary[100]};

    &:focus {
      background: ${Colors.info?.[200] || Colors.primary[200]};
      outline: 2px solid ${Colors.primary[500]};
      box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
    }
  `,
};

/**
 * Ana select wrapper container'ı
 * Label ve select'i dikey olarak düzenler
 */
const StyledSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

/**
 * Select etiketi stili
 * Accessibility için htmlFor ile select'e bağlanır
 */
const StyledLabel = styled.label`
  font-size: 0.95rem;
  color: ${Colors.primary[600]};
  margin-bottom: 2px;
`;

/**
 * Stilize edilmiş select elementi
 * Varyanta göre stil uygular ve animasyonları içerir
 */
const StyledSelect = styled.select<{ variant: Variant }>`
  font-size: 1rem;
  padding: 10px 16px;
  border-radius: 10px;
  transition: background 0.2s, border 0.2s, box-shadow 0.2s;
  width: 100%;

  /* Varyant stilini uygula */
  ${(props) => variantStyles[props.variant]}
`;

/**
 * CustomSelect Ana Bileşeni
 *
 * Uygulamanın her yerinde kullanılabilen esnek select bileşeni.
 * Option array'i alır ve dropdown listesi oluşturur.
 *
 * Kullanım Örnekleri:
 * ```tsx
 * const roleOptions = [
 *   { value: "admin", label: "Administrator" },
 *   { value: "user", label: "User" }
 * ];
 *
 * <CustomSelect label="Rol" options={roleOptions} />
 * <CustomSelect options={roleOptions} variant="filled" />
 * <CustomSelect
 *   label="Kategori"
 *   options={categories}
 *   onChange={handleCategoryChange}
 * />
 * ```
 *
 * @param {CustomSelectProps} props - Select özellikleri
 * @returns {JSX.Element} Özelleştirilmiş select elementi
 */
const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  variant = "outlined", // Varsayılan varyant
  id,
  ...rest // Geri kalan native select props'ları
}) => {
  // Otomatik ID oluşturma - label'dan türetilir veya manuel verilir
  const selectId =
    id ||
    (label
      ? `custom-select-${label.replace(/\s+/g, "-").toLowerCase()}`
      : undefined);

  return (
    <StyledSelectWrapper>
      {/* Label varsa render et ve select'e bağla */}
      {label && <StyledLabel htmlFor={selectId}>{label}</StyledLabel>}

      {/* Ana select elementi */}
      <StyledSelect id={selectId} variant={variant} {...rest}>
        {/* Varsayılan placeholder option */}
        <option value="" disabled>
          Seçiniz
        </option>

        {/* Options array'ini map ederek option'ları oluştur */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    </StyledSelectWrapper>
  );
};

export default CustomSelect;
