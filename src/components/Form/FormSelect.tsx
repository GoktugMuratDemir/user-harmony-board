import React from "react";
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

const FormSelect: React.FC<FormSelectProps> = ({ label, name, options }) => {
  const { values, setFieldValue, errors } = useFormContext<string>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <CustomSelect
        label={label}
        name={name}
        value={values[name] || ""}
        onChange={handleChange}
        options={options}
        variant="outlined"
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

export default FormSelect;
