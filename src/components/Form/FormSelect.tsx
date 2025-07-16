import React from "react";
import { useFormContext } from "./FormContext";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: Option[];
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options }) => {
  const { values, setFieldValue, errors } = useFormContext<string>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <label style={{ display: "block", marginBottom: 5 }}>{label}</label>
      <select
        name={name}
        value={values[name] || ""}
        onChange={handleChange}
        style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span style={{ color: "red", fontSize: 12 }}>{errors[name]}</span>
      )}
    </div>
  );
};

export default FormSelect;
