import React from "react";
import styled from "styled-components";
import Colors from "../Styles/Colors";

interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.98rem;
  color: ${Colors.primary[600]};
  cursor: pointer;
  user-select: none;
`;

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
  ${(props) =>
    props.checked &&
    `
      border-color: ${Colors.primary[500]};
      background: ${Colors.primary[100]};
      box-shadow: 0 4px 16px 0 ${Colors.primary[200]};
    `}
`;

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

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  ...rest
}) => (
  <Wrapper>
    <HiddenCheckbox checked={checked} {...rest} />
    <StyledCheckbox checked={!!checked}>
      {!!checked && <CheckMark />}
    </StyledCheckbox>
    {label}
  </Wrapper>
);

export default CustomCheckbox;
