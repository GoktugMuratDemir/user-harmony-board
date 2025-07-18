import React from "react";
import styled from "styled-components";
import { useFormContext } from "../../Context/FormContext";
import CustomCheckbox from "../CustomCheckbox";

const FormCheckboxContainer = styled.div`
  margin-bottom: 15px;
`;

const ErrorMessage = styled.span`
  color: #e53935;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

interface FormCheckboxProps {
  label: string;
  name: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ label, name }) => {
  const { values, setFieldValue, errors } = useFormContext<boolean>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.checked);
  };

  return (
    <FormCheckboxContainer>
      <CustomCheckbox
        label={label}
        name={name}
        checked={!!values[name]}
        onChange={handleChange}
      />
      {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
    </FormCheckboxContainer>
  );
};

export default FormCheckbox;
