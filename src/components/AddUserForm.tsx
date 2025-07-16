import React from "react";
import { v4 as uuidv4 } from "uuid";
import type { User } from "../types/types";
import { FormProvider } from "./Form/FormProvider";
import FormTextField from "./Form/FormTextField";
import FormSelect from "./Form/FormSelect";
import FormCheckbox from "./Form/FormCheckbox";
import * as yup from "yup";

import CustomButton from "./CustomButton";

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
          role: vals.role,
          createdAt: new Date(),
          password: vals.password,
          active: vals.active,
          latitude: Math.random() * 180 - 90,
          longitude: Math.random() * 360 - 180,
        };
        onAddUser(newUser);
      }
    }
  };

  return (
    <div>
      <h2>Yeni Kullanıcı Ekle</h2>
      <FormProvider schema={schema} initialValues={initialValues} ref={formRef}>
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
              gap: 10,
              marginTop: 20,
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
  );
};

export default AddUserForm;
