import React from "react";

import styled from "styled-components";
import Colors from "../Styles/Colors";

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
  background: rgba(24, 24, 27, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

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
