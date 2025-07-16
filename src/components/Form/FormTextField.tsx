import React from "react";
import CustomTextField from "../CustomTextField";
import { useFormContext } from "./FormContext";

interface FormTextFieldProps {
  label: string;
  name: string;
}

const FormTextField: React.FC<FormTextFieldProps> = ({ label, name }) => {
  const { values, setFieldValue, errors } = useFormContext<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <CustomTextField
        label={label}
        name={name}
        value={values[name] || ""}
        onChange={handleChange}
      />
      {errors[name] && (
        <span style={{ color: "red", fontSize: 12 }}>{errors[name]}</span>
      )}
    </div>
  );
};

export default FormTextField;
