import React from "react";
import styled, { css } from "styled-components";

type Variant = "outlined" | "filled";

interface CustomTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: Variant;
  icon?: React.ReactNode;
}

const variantStyles = {
  outlined: css`
    background: #fff;
    border: 1.5px solid #1976d2;
    color: #222;
    &:focus {
      border-color: #1565c0;
      outline: none;
    }
  `,
  filled: css`
    background: #e3f2fd;
    border: none;
    color: #222;
    &:focus {
      background: #bbdefb;
      outline: 2px solid #1976d2;
    }
  `,
};

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledLabel = styled.label`
  font-size: 0.95rem;
  color: #1976d2;
  margin-bottom: 2px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  position: absolute;
  left: 10px;
`;

const StyledInput = styled.input<{ variant: Variant; hasIcon: boolean }>`
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.2s, border 0.2s;
  width: 100%;
  ${(props) => variantStyles[props.variant]}
  ${(props) => props.hasIcon && "padding-left: 36px;"}
`;

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  variant = "outlined",
  icon,
  id,
  ...rest
}) => {
  const inputId =
    id ||
    (label
      ? `custom-textfield-${label.replace(/\s+/g, "-").toLowerCase()}`
      : undefined);
  return (
    <StyledInputWrapper>
      {label && <StyledLabel htmlFor={inputId}>{label}</StyledLabel>}
      <InputContainer>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          id={inputId}
          variant={variant}
          hasIcon={!!icon}
          {...rest}
        />
      </InputContainer>
    </StyledInputWrapper>
  );
};

export default CustomTextField;
