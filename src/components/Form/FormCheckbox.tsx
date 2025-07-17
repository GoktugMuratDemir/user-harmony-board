import React from "react";
import { useFormContext } from "../../Context/FormContext";
import CustomCheckbox from "../CustomCheckbox";

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
      <CustomCheckbox
        label={label}
        name={name}
        checked={!!values[name]}
        onChange={handleChange}
      />
      {errors[name] && (
        <span
          style={{
            color: "#e53935",
            fontSize: 12,
            marginTop: 4,
            display: "block",
          }}
        >
          {errors[name]}
        </span>
      )}
    </div>
  );
};

export default FormCheckbox;
