import React from "react";
import styled from "styled-components";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div<{ width?: string; height?: string }>`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  padding: 24px;
  min-width: 320px;
  width: ${({ width }) => width || "400px"};
  height: ${({ height }) => height || "auto"};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
}) => {
  if (!isOpen) return null;
  return (
    <Overlay onClick={onClose}>
      <ModalContainer
        width={width}
        height={height}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default CustomModal;
