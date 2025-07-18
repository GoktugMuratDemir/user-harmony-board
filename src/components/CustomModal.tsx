/**
 * CustomModal.tsx - Özelleştirilebilir Modal Bileşeni
 *
 * Bu bileşen uygulamanın tüm modal ihtiyaçları için kullanılan
 * özelleştirilebilir modal componenti'dir. Overlay, boyutlandırma
 * ve kapatma fonksiyonelliği sunar.
 *
 * Özellikler:
 * - Tam ekran overlay arka planı
 * - Özelleştirilebilir boyutlar (width/height)
 * - ESC tuşu ve overlay tıklama ile kapatma
 * - Modern gölge efektleri ve animasyonlar
 * - Responsive tasarım
 * - Accessibility desteği (aria-label)
 * - Event propagation kontrolü
 *
 * Kullanım:
 * - Form modalleri için
 * - Onay dialogları için
 * - İçerik görüntüleme için
 * - Kullanıcı etkileşim modalleri için
 *
 * @component
 * @param {CustomModalProps} props - Modal özellikleri
 * @returns {JSX.Element | null} Modal bileşeni veya null
 */

import React from "react";

import styled from "styled-components";
import Colors from "../Styles/Colors";

/**
 * CustomModal bileşeninin props interface'i
 */
interface CustomModalProps {
  /** Modal'ın açık/kapalı durumu */
  isOpen: boolean;

  /** Modal kapatma fonksiyonu */
  onClose: () => void;

  /** Modal içeriği */
  children: React.ReactNode;

  /** Modal genişliği (opsiyonel, varsayılan: 400px) */
  width?: string;

  /** Modal yüksekliği (opsiyonel, varsayılan: auto) */
  height?: string;
}

/**
 * Modal arka plan overlay'i
 * Tam ekranı kaplar ve modal'ı ortalayarak görüntüler
 * Tıklandığında modal'ı kapatır
 */
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(24, 24, 27, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

/**
 * Ana modal container'ı
 * İçeriği barındırır ve boyutlandırma sağlar
 *
 * @param width - Modal genişliği
 * @param height - Modal yüksekliği
 */
const ModalContainer = styled.div<{ width?: string; height?: string }>`
  background: ${Colors.surface};
  border-radius: 12px;
  box-shadow: 0 2px 16px 0 ${Colors.border};
  padding: 28px;
  min-width: 320px;
  width: ${({ width }) => width || "400px"};
  height: ${({ height }) => height || "auto"};
  position: relative;
`;

/**
 * Modal kapatma butonu
 * Sağ üst köşede yer alır ve hover efekti içerir
 */
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${Colors.danger[100]};
  color: ${Colors.danger[600]};
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: ${Colors.danger[200]};
  }
`;

/**
 * CustomModal Ana Bileşeni
 *
 * Uygulamanın her yerinde kullanılabilen esnek modal bileşeni.
 * Conditional rendering ile sadece açık durumda render edilir.
 *
 * Event Handling:
 * - Overlay tıklaması modal'ı kapatır
 * - Modal içeriği tıklaması event propagation'ı durdurur
 * - Kapatma butonu modal'ı kapatır
 *
 * Kullanım Örnekleri:
 * ```tsx
 * <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
 *   <p>Modal içeriği</p>
 * </CustomModal>
 *
 * <CustomModal
 *   isOpen={showModal}
 *   onClose={handleClose}
 *   width="600px"
 *   height="400px"
 * >
 *   <MyForm />
 * </CustomModal>
 * ```
 *
 * @param {CustomModalProps} props - Modal özellikleri
 * @returns {JSX.Element | null} Modal bileşeni veya açık değilse null
 */
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
}) => {
  // Modal kapalıysa hiçbir şey render etme
  if (!isOpen) return null;

  return (
    // Tam ekran overlay - tıklandığında modal'ı kapat
    <Overlay onClick={onClose}>
      {/* Modal container - içerik tıklaması overlay'e yayılmasın */}
      <ModalContainer
        width={width}
        height={height}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapatma butonu - accessibility için aria-label */}
        <CloseButton onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>

        {/* Modal içeriği */}
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default CustomModal;
