import Colors from "../Styles/Colors";
import React from "react";
import styled, { css } from "styled-components";

type Variant = "contained" | "outlined" | "text" | "link";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  variant?: Variant;
  active?: boolean;
}

const variantStyles = {
  containedActive: css`
    background: ${Colors.primary[500]};
    color: #fff;
    font-weight: 700;
    border: none;
    box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
  `,
  outlinedActive: css`
    background: ${Colors.primary[100]};
    color: ${Colors.primary[600]};
    border: 2px solid ${Colors.primary[600]};
    font-weight: 700;
  `,
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

const StyledButton = styled.button<{ variant: Variant; active?: boolean }>`
  font-size: 1rem;
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  ${({ variant, active }) => {
    if (active) {
      if (variant === "contained") return variantStyles.containedActive;
      if (variant === "outlined") return variantStyles.outlinedActive;
    }
    return variantStyles[variant];
  }}
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
  active = false,
  ...rest
}) => {
  return (
    <StyledButton variant={variant} active={active} {...rest}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {text}
    </StyledButton>
  );
};

export default CustomButton;
