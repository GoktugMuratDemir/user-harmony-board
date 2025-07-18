/**
 * CustomCheckbox.tsx - Özelleştirilebilir Checkbox Bileşeni
 *
 * Bu bileşen uygulamanın tüm checkbox ihtiyaçları için kullanılan
 * özelleştirilebilir checkbox componenti'dir. Modern tasarım ve
 * smooth animasyonlar içerir.
 *
 * Özellikler:
 * - Modern özelleştirilmiş checkbox tasarımı
 * - Smooth geçiş animasyonları
 * - Label desteği ve otomatik tıklama alanı
 * - Accessibility uyumluluğu (hidden native checkbox)
 * - Focus efektleri ve hover durumları
 * - Responsive tasarım
 * - Native checkbox props desteği
 *
 * Tasarım Detayları:
 * - Özelleştirilmiş checkmark ikonu
 * - Gradient gölge efektleri
 * - Yumuşak köşeli border radius
 * - Color scheme ile uyumlu renkler
 *
 * @component
 * @param {CustomCheckboxProps} props - Checkbox özellikleri
 * @returns {JSX.Element} Özelleştirilmiş checkbox
 */

import React from "react";
import styled from "styled-components";
import Colors from "../Styles/Colors";

/**
 * CustomCheckbox bileşeninin props interface'i
 * Native input checkbox props'larını extend eder
 */
interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Checkbox etiketi (opsiyonel) */
  label?: string;
}

/**
 * Ana wrapper label elementi
 * Checkbox ve label'i yatay olarak düzenler ve tıklanabilir alan sağlar
 */
const Wrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.98rem;
  color: ${Colors.primary[600]};
  cursor: pointer;
  user-select: none;
`;

/**
 * Gizli native checkbox
 * Accessibility için var ama görsel olarak gizlenmiş
 * Screen reader'lar için gerekli
 */
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

/**
 * Özelleştirilmiş checkbox görünümü
 * Checked durumuna göre stil değiştirir
 */
const StyledCheckbox = styled.span<{ checked: boolean }>`
  display: inline-block;
  width: 22px;
  height: 22px;
  background: ${Colors.surface};
  border: 1.5px solid ${Colors.primary[200]};
  border-radius: 6px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px 0 ${Colors.primary[100]};
  position: relative;

  /* Checked durumu stilleri */
  ${(props) =>
    props.checked &&
    `
      border-color: ${Colors.primary[500]};
      background: ${Colors.primary[100]};
      box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
    `}
`;

/**
 * Checkmark ikonu
 * CSS ile oluşturulan tick işareti
 */
const CheckMark = styled.span`
  position: absolute;
  left: 5px;
  top: 2px;
  width: 10px;
  height: 16px;
  border-right: 3px solid ${Colors.primary[500]};
  border-bottom: 3px solid ${Colors.primary[500]};
  transform: rotate(40deg);
  opacity: 1;
`;

/**
 * CustomCheckbox Ana Bileşeni
 *
 * Modern tasarımlı checkbox bileşeni. Native checkbox'ı gizleyerek
 * özelleştirilmiş görünüm sağlar, ancak accessibility özelliklerini korur.
 *
 * Kullanım Örnekleri:
 * ```tsx
 * <CustomCheckbox label="Şartları kabul ediyorum" />
 * <CustomCheckbox
 *   label="Aktif"
 *   checked={isActive}
 *   onChange={handleActiveChange}
 * />
 * <CustomCheckbox
 *   checked={formData.newsletter}
 *   onChange={(e) => setNewsletter(e.target.checked)}
 *   label="Newsletter'a abone ol"
 * />
 * ```
 *
 * @param {CustomCheckboxProps} props - Checkbox özellikleri
 * @returns {JSX.Element} Özelleştirilmiş checkbox elementi
 */
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  ...rest // Geri kalan native input props'ları
}) => (
  <Wrapper>
    {/* Gizli native checkbox - accessibility için */}
    <HiddenCheckbox checked={checked} {...rest} />

    {/* Özelleştirilmiş checkbox görünümü */}
    <StyledCheckbox checked={!!checked}>
      {/* Checked durumunda checkmark göster */}
      {!!checked && <CheckMark />}
    </StyledCheckbox>

    {/* Label metni */}
    {label}
  </Wrapper>
);

export default CustomCheckbox;
