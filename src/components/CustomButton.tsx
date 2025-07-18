/**
 * CustomButton.tsx - Özelleştirilebilir Buton Bileşeni
 *
 * Bu bileşen uygulamanın tüm buton ihtiyaçları için kullanılan
 * özelleştirilebilir buton componenti'dir. Farklı varyantlar ve
 * durumlar destekler.
 *
 * Varyantlar:
 * - contained: Dolu arka plan (varsayılan)
 * - outlined: Sadece kenarlık
 * - text: Sadece metin
 * - link: Link görünümü
 *
 * Özellikler:
 * - İkon desteği
 * - Active state vurgulaması
 * - Hover efektleri
 * - Responsive tasarım
 * - Native button props desteği
 *
 * @component
 * @param {CustomButtonProps} props - Buton özellikleri
 * @returns {JSX.Element} Özelleştirilmiş buton
 */

import Colors from "../Styles/Colors";
import React from "react";
import styled, { css } from "styled-components";

/** Buton varyant tipleri */
type Variant = "contained" | "outlined" | "text" | "link";

/**
 * CustomButton bileşeninin props interface'i
 * Native button props'larını extend eder
 */
interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Buton metni */
  text: string;

  /** Opsiyonel ikon elementi */
  icon?: React.ReactNode;

  /** Buton varyantı (varsayılan: contained) */
  variant?: Variant;

  /** Aktif durum vurgulaması */
  active?: boolean;
}

/**
 * Varyant stilleri object'i
 * Her varyant ve active state için CSS tanımları
 */
const variantStyles = {
  /** Contained varyant aktif durumu */
  containedActive: css`
    background: ${Colors.primary[500]};
    color: #fff;
    font-weight: 700;
    border: none;
    box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
  `,

  /** Outlined varyant aktif durumu */
  outlinedActive: css`
    background: ${Colors.primary[100]};
    color: ${Colors.primary[600]};
    border: 2px solid ${Colors.primary[600]};
    font-weight: 700;
  `,

  /** Contained varyant - dolu arka plan */
  contained: css`
    background: ${Colors.primary[500]};
    color: ${Colors.textLight};
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 ${Colors.primary[100]};
    font-weight: 600;

    &:hover {
      background: ${Colors.primary[600]};
      color: #fff;
      box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
    }
  `,

  /** Outlined varyant - sadece kenarlık */
  outlined: css`
    background: transparent;
    color: ${Colors.primary[500]};
    border: 1.5px solid ${Colors.primary[500]};
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 ${Colors.primary[100]};
    font-weight: 600;

    &:hover {
      background: ${Colors.primary[100]};
      color: ${Colors.primary[600]};
      border: 1.5px solid ${Colors.primary[600]};
    }
  `,

  /** Text varyant - sadece metin */
  text: css`
    background: transparent;
    color: ${Colors.primary[500]};
    border: none;
    font-weight: 600;

    &:hover {
      background: ${Colors.primary[100]};
      color: ${Colors.primary[600]};
    }
  `,

  /** Link varyant - link görünümü */
  link: css`
    background: none;
    color: ${Colors.primary[500]};
    border: none;
    text-decoration: underline;
    padding: 0;
    font-weight: 600;

    &:hover {
      color: ${Colors.primary[600]};
      background: none;
    }
  `,
};

/**
 * Stilize edilmiş buton elementi
 * Varyant ve active durumuna göre stil uygular
 */
const StyledButton = styled.button<{ variant: Variant; active?: boolean }>`
  font-size: 1rem;
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;

  ${({ variant, active }) => {
    // Active durumu varsa özel stiller uygula
    if (active) {
      if (variant === "contained") return variantStyles.containedActive;
      if (variant === "outlined") return variantStyles.outlinedActive;
    }
    // Normal varyant stilini uygula
    return variantStyles[variant];
  }}
`;

/**
 * İkon wrapper elementi
 * İkon ve metin arasında düzgün boşluk sağlar
 */
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
`;

/**
 * CustomButton Ana Bileşeni
 *
 * Uygulamanın her yerinde kullanılabilen esnek buton bileşeni.
 * Farklı varyantlar ve durumlar destekler.
 *
 * Kullanım Örnekleri:
 * ```tsx
 * <CustomButton text="Kaydet" variant="contained" />
 * <CustomButton text="İptal" variant="outlined" />
 * <CustomButton text="Sil" variant="text" icon={<DeleteIcon />} />
 * <CustomButton text="Aktif" variant="outlined" active={true} />
 * ```
 *
 * @param {CustomButtonProps} props - Buton özellikleri
 * @returns {JSX.Element} Özelleştirilmiş buton elementi
 */
const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  variant = "contained", // Varsayılan varyant
  active = false, // Varsayılan aktif durum
  ...rest // Geri kalan native button props'ları
}) => {
  return (
    <StyledButton variant={variant} active={active} {...rest}>
      {/* İkon varsa wrapper ile render et */}
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {/* Buton metni */}
      {text}
    </StyledButton>
  );
};

export default CustomButton;
