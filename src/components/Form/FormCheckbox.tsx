import React from "react";
import { useFormContext } from "../../Context/FormContext";

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
    <div style={{ marginBottom: 15 }}>
      <label style={{ display: "block", marginBottom: 5 }}>
        <input
          type="checkbox"
          name={name}
          checked={!!values[name]}
          onChange={handleChange}
        />{" "}
        {label}
      </label>
      {errors[name] && (
        <span style={{ color: "red", fontSize: 12 }}>{errors[name]}</span>
      )}
    </div>
  );
};

export default FormCheckbox;
