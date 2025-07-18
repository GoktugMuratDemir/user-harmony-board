import React from "react";
import styled from "styled-components";
import { useFormContext } from "../../Context/FormContext";
import CustomSelect from "../CustomSelect";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: Option[];
}

const FormContainer = styled.div`
  margin-bottom: 15px;
`;

const ErrorMessage = styled.span`
  color: #e53935;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options }) => {
  const { values, setFieldValue, errors } = useFormContext<string>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <FormContainer>
      <CustomSelect
        label={label}
        name={name}
        value={values[name] || ""}
        onChange={handleChange}
        options={options}
        variant="outlined"
      />
      {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
    </FormContainer>
  );
};

export default FormSelect;
