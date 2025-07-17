import React from "react";
import styled, { css } from "styled-components";
import Colors from "../Styles/Colors";

type Variant = "outlined" | "filled";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  variant?: Variant;
}

const variantStyles = {
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
  filled: css`
    background: ${Colors.info?.[100] || Colors.primary[100]};
    border: none;
    color: ${Colors.text};
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 ${Colors.primary[100]};
    &:focus {
      background: ${Colors.info?.[200] || Colors.primary[200]};
      outline: 2px solid ${Colors.primary[500]};
      box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
    }
  `,
};

const StyledSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledLabel = styled.label`
  font-size: 0.95rem;
  color: ${Colors.primary[600]};
  margin-bottom: 2px;
`;

const StyledSelect = styled.select<{ variant: Variant }>`
  font-size: 1rem;
  padding: 10px 16px;
  border-radius: 10px;
  transition: background 0.2s, border 0.2s, box-shadow 0.2s;
  width: 100%;
  ${(props) => variantStyles[props.variant]}
`;

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  variant = "outlined",
  id,
  ...rest
}) => {
  const selectId =
    id ||
    (label
      ? `custom-select-${label.replace(/\s+/g, "-").toLowerCase()}`
      : undefined);
  return (
    <StyledSelectWrapper>
      {label && <StyledLabel htmlFor={selectId}>{label}</StyledLabel>}
      <StyledSelect id={selectId} variant={variant} {...rest}>
        <option value="" disabled>
          Seçiniz
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    </StyledSelectWrapper>
  );
};

export default CustomSelect;
