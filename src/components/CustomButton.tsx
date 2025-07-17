import Colors from "../Styles/Colors";
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

const StyledButton = styled.button<{ variant: Variant }>`
  font-size: 1rem;
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
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
