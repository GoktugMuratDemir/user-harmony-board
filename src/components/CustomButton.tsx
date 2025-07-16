import React from "react";
import styled, { css } from "styled-components";

type Variant = "contained" | "outlined" | "text" | "link";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  variant?: Variant;
}

const variantStyles = {
  contained: css`
    background: #1976d2;
    color: #fff;
    border: none;
    &:hover {
      background: #1565c0;
    }
  `,
  outlined: css`
    background: transparent;
    color: #1976d2;
    border: 1.5px solid #1976d2;
    &:hover {
      background: #e3f2fd;
    }
  `,
  text: css`
    background: transparent;
    color: #1976d2;
    border: none;
    &:hover {
      background: #e3f2fd;
    }
  `,
  link: css`
    background: none;
    color: #1976d2;
    border: none;
    text-decoration: underline;
    padding: 0;
    &:hover {
      color: #1565c0;
      background: none;
    }
  `,
};

const StyledButton = styled.button<{ variant: Variant }>`
  font-size: 1rem;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  ${(props) => variantStyles[props.variant]}
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
`;

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  variant = "contained",
  ...rest
}) => {
  return (
    <StyledButton variant={variant} {...rest}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {text}
    </StyledButton>
  );
};

export default CustomButton;
