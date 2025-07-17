import React from "react";
import { v4 as uuidv4 } from "uuid";
import type { User } from "../types/types";
import { FormProvider } from "./Form/FormProvider";
import FormTextField from "./Form/FormTextField";
import FormSelect from "./Form/FormSelect";
import FormCheckbox from "./Form/FormCheckbox";
import * as yup from "yup";

import CustomButton from "./CustomButton";
import Colors from "../Styles/Colors";

interface AddUserFormProps {
  onClose: () => void;
  onAddUser: (user: User) => void;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "User",
  active: true,
};

const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
  { value: "Editor", label: "Editor" },
  { value: "Viewer", label: "Viewer" },
];

const schema = yup.object().shape({
  name: yup.string().required("Ad zorunludur"),
  email: yup
    .string()
    .required("Email zorunludur")
    .email("Geçerli bir email adresi girin"),
  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
  role: yup.string().required("Rol zorunludur"),
  active: yup.boolean(),
});

const AddUserForm: React.FC<AddUserFormProps> = ({ onClose, onAddUser }) => {
  // FormProvider context'ine erişmek için bir ref kullanıyoruz
  const formRef = React.useRef<{
    validateAll: () => Promise<boolean>;
    values: typeof initialValues;
    errors: Record<string, string>;
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current && formRef.current.validateAll) {
      const isValid = await formRef.current.validateAll();
      if (isValid && formRef.current.values) {
        const vals = formRef.current.values;
        const newUser: User = {
          id: uuidv4(),
          name: vals.name,
          email: vals.email,
          password: vals.password,
          role: vals.role,
          active: vals.active,
          createdAt: new Date(),
          latitude: Math.random() * 180 - 90,
          longitude: Math.random() * 360 - 180,
        };
        onAddUser(newUser);
        onClose();
      }
    }
  };
  return (
    <div
      style={{
        background: Colors.surface,
        borderRadius: 18,
        boxShadow: `0 4px 24px 0 ${Colors.primary[100]}`,
        border: `1.5px solid ${Colors.border}`,
        padding: 0,
        minWidth: 320,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: Colors.primary[500],
          color: Colors.textLight,
          padding: "22px 28px 12px 28px",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill={Colors.primary[400]} />
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            fill={Colors.textLight}
          />
        </svg>
        <span
          style={{ fontWeight: 800, fontSize: "1.18rem", letterSpacing: 0.01 }}
        >
          Yeni Kullanıcı Ekle
        </span>
      </div>
      <div style={{ padding: 28 }}>
        <FormProvider
          schema={schema}
          initialValues={initialValues}
          ref={formRef}
        >
          <form onSubmit={handleSubmit}>
            <FormTextField label="Ad" name="name" />
            <FormTextField label="Email" name="email" />
            <FormTextField label="Şifre" name="password" />
            <FormSelect label="Rol" name="role" options={roleOptions} />
            <FormCheckbox label="Aktif" name="active" />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 14,
                marginTop: 28,
              }}
            >
              <CustomButton
                type="button"
                onClick={onClose}
                variant="outlined"
                text="İptal"
              />
              <CustomButton type="submit" variant="contained" text="Kaydet" />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddUserForm;
