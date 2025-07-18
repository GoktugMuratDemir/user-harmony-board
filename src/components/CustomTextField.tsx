/**
 * CustomTextField.tsx - Özelleştirilebilir Metin Alanı Bileşeni
 *
 * Bu bileşen uygulamanın tüm text input ihtiyaçları için kullanılan
 * özelleştirilebilir input componenti'dir. Farklı varyantlar ve
 * ikon desteği sunar.
 *
 * Varyantlar:
 * - outlined: Kenarlıklı tasarım (varsayılan)
 * - filled: Dolu arka plan tasarımı
 *
 * Özellikler:
 * - İkon desteği (sol tarafta)
 * - Label desteği ve otomatik ID bağlama
 * - Focus efektleri ve animasyonlar
 * - Responsive tasarım
 * - Native input props desteği
 * - Accessibility uyumluluğu
 *
 * @component
 * @param {CustomTextFieldProps} props - Input özellikleri
 * @returns {JSX.Element} Özelleştirilmiş text input
 */

import React from "react";

import styled, { css } from "styled-components";
import Colors from "../Styles/Colors";

/** Input varyant tipleri */
type Variant = "outlined" | "filled";

/**
 * CustomTextField bileşeninin props interface'i
 * Native input props'larını extend eder
 */
interface CustomTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input etiketi (opsiyonel) */
  label?: string;

  /** Input varyantı (varsayılan: outlined) */
  variant?: Variant;

  /** Sol tarafta gösterilecek ikon (opsiyonel) */
  icon?: React.ReactNode;
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
    background: ${Colors.info[100]};
    border: none;
    color: ${Colors.text};
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 ${Colors.primary[100]};

    &:focus {
      background: ${Colors.info[200]};
      outline: 2px solid ${Colors.primary[500]};
      box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
    }
  `,
};

/**
 * Ana input wrapper container'ı
 * Label ve input'u dikey olarak düzenler
 */
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

/**
 * Input etiketi stili
 * Accessibility için htmlFor ile input'a bağlanır
 */
const StyledLabel = styled.label`
  font-size: 0.95rem;
  color: ${Colors.primary[600]};
  margin-bottom: 2px;
`;

/**
 * Input ve ikon container'ı
 * İkon ve input'u yatay olarak düzenler
 */
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

/**
 * İkon wrapper elementi
 * İkonu input'un sol tarafında konumlandırır
 */
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  position: absolute;
  left: 10px;
`;

/**
 * Stilize edilmiş input elementi
 * Varyant ve ikon durumuna göre stil uygular
 */
const StyledInput = styled.input<{ variant: Variant; hasIcon: boolean }>`
  font-size: 1rem;
  padding: 10px 16px;
  border-radius: 10px;
  transition: background 0.2s, border 0.2s, box-shadow 0.2s;
  width: 100%;

  /* Varyant stilini uygula */
  ${(props) => variantStyles[props.variant]}

  /* İkon varsa sol padding ekle */
  ${(props) => props.hasIcon && "padding-left: 38px;"}
`;

/**
 * CustomTextField Ana Bileşeni
 *
 * Uygulamanın her yerinde kullanılabilen esnek text input bileşeni.
 * Label, ikon ve farklı varyantları destekler.
 *
 * Kullanım Örnekleri:
 * ```tsx
 * <CustomTextField label="Ad" placeholder="Adınızı girin" />
 * <CustomTextField label="Email" variant="filled" />
 * <CustomTextField label="Arama" icon={<SearchIcon />} />
 * <CustomTextField placeholder="Şifre" type="password" />
 * ```
 *
 * @param {CustomTextFieldProps} props - Input özellikleri
 * @returns {JSX.Element} Özelleştirilmiş text input elementi
 */
const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  variant = "outlined", // Varsayılan varyant
  icon,
  id,
  ...rest // Geri kalan native input props'ları
}) => {
  // Otomatik ID oluşturma - label'dan türetilir veya manuel verilir
  const inputId =
    id ||
    (label
      ? `custom-textfield-${label.replace(/\s+/g, "-").toLowerCase()}`
      : undefined);

  return (
    <StyledInputWrapper>
      {/* Label varsa render et ve input'a bağla */}
      {label && <StyledLabel htmlFor={inputId}>{label}</StyledLabel>}

      <InputContainer>
        {/* İkon varsa sol tarafta göster */}
        {icon && <IconWrapper>{icon}</IconWrapper>}

        {/* Ana input elementi */}
        <StyledInput
          id={inputId}
          variant={variant}
          hasIcon={!!icon} // İkon varlığını boolean'a çevir
          {...rest}
        />
      </InputContainer>
    </StyledInputWrapper>
  );
};

export default CustomTextField;
