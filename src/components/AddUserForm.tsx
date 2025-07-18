/**
 * AddUserForm.tsx - Yeni Kullanıcı Ekleme Formu
 *
 * Bu bileşen yeni kullanıcı ekleme işlemini yönetir. Modal içerisinde açılır
 * ve form validasyonu ile birlikte kullanıcı bilgilerini toplar.
 *
 * Özellikler:
 * - Yup schema validasyonu ile form doğrulaması
 * - FormProvider context ile form yönetimi
 * - Responsive tasarım ve modern UI
 * - UUID ile benzersiz kullanıcı ID'si oluşturma
 * - Rastgele coğrafi konum ataması
 *
 * Form Alanları:
 * - Ad (zorunlu)
 * - Email (zorunlu, email formatı kontrolü)
 * - Şifre (zorunlu, minimum 6 karakter)
 * - Rol (seçim listesi: Admin, User, Editor, Viewer)
 * - Aktif durumu (checkbox)
 *
 * @component
 * @param {AddUserFormProps} props - Bileşen props'ları
 * @returns {JSX.Element} Kullanıcı ekleme formu
 */

import React from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import type { User } from "../types/types";
import { FormProvider } from "./Form/FormProvider";
import FormTextField from "./Form/FormTextField";
import FormSelect from "./Form/FormSelect";
import FormCheckbox from "./Form/FormCheckbox";
import * as yup from "yup";

import CustomButton from "./CustomButton";
import Colors from "../Styles/Colors";

// Styled Components
const FormContainer = styled.div`
  background: ${Colors.surface};
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 ${Colors.primary[100]};
  border: 1.5px solid ${Colors.border};
  padding: 0;
  min-width: 320px;
  overflow: hidden;
`;

const FormHeader = styled.div`
  background: ${Colors.primary[500]};
  color: ${Colors.textLight};
  padding: 22px 28px 12px 28px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: none;
`;

const IconCircle = styled.circle`
  fill: ${Colors.primary[400]};
`;

const IconPath = styled.path`
  fill: ${Colors.textLight};
`;

const HeaderTitle = styled.span`
  font-weight: 800;
  font-size: 1.18rem;
  letter-spacing: 0.01;
`;

const FormContent = styled.div`
  padding: 28px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin-top: 28px;
`;

/**
 * AddUserForm bileşeninin props interface'i
 */
interface AddUserFormProps {
  /** Form kapatma fonksiyonu */
  onClose: () => void;
  /** Yeni kullanıcı ekleme fonksiyonu */
  onAddUser: (user: User) => void;
}

/**
 * Form için başlangıç değerleri
 * Tüm alanlar için varsayılan değerleri tanımlar
 */
const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "User", // Varsayılan rol
  active: true, // Varsayılan olarak aktif
};

/**
 * Rol seçim listesi için seçenekler
 * Sistemdeki mevcut rolleri tanımlar
 */
const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
  { value: "Editor", label: "Editor" },
  { value: "Viewer", label: "Viewer" },
];

/**
 * Yup validasyon şeması
 * Form alanları için doğrulama kurallarını tanımlar
 */
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

/**
 * AddUserForm Ana Bileşeni
 *
 * Yeni kullanıcı ekleme formunu render eder ve form işlemlerini yönetir.
 *
 * @param {AddUserFormProps} props - Bileşen props'ları
 * @returns {JSX.Element} Form bileşeni
 */
const AddUserForm: React.FC<AddUserFormProps> = ({ onClose, onAddUser }) => {
  // FormProvider context'ine erişmek için ref kullanımı
  // Form değerleri ve validasyon fonksiyonlarına erişim sağlar
  const formRef = React.useRef<{
    validateAll: () => Promise<boolean>;
    values: typeof initialValues;
    errors: Record<string, string>;
  }>(null);

  /**
   * Form gönderim işlemini yönetir
   *
   * Adımlar:
   * 1. Form validasyonu kontrolü
   * 2. Yeni User nesnesi oluşturma
   * 3. Rastgele coğrafi konum ataması
   * 4. Parent component'e kullanıcı ekleme
   * 5. Formu kapatma
   *
   * @param {React.FormEvent} e - Form event'i
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current && formRef.current.validateAll) {
      // Tüm form alanlarını validate et
      const isValid = await formRef.current.validateAll();

      if (isValid && formRef.current.values) {
        const vals = formRef.current.values;

        // Yeni kullanıcı nesnesi oluştur
        const newUser: User = {
          id: uuidv4(), // Benzersiz ID oluştur
          name: vals.name,
          email: vals.email,
          password: vals.password,
          role: vals.role,
          active: vals.active,
          createdAt: new Date(), // Oluşturulma tarihi
          // Rastgele coğrafi konum ataması
          latitude: Math.random() * 180 - 90, // -90 ile +90 arası
          longitude: Math.random() * 360 - 180, // -180 ile +180 arası
        };

        // Kullanıcıyı parent component'e ekle
        onAddUser(newUser);
        // Formu kapat
        onClose();
      }
    }
  };

  return (
    <FormContainer>
      {/* Form başlık alanı */}
      <FormHeader>
        {/* Kullanıcı ikonu */}
        <HeaderIcon viewBox="0 0 24 24">
          <IconCircle cx="12" cy="12" r="12" />
          <IconPath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </HeaderIcon>
        <HeaderTitle>Yeni Kullanıcı Ekle</HeaderTitle>
      </FormHeader>

      {/* Form içerik alanı */}
      <FormContent>
        <FormProvider
          schema={schema}
          initialValues={initialValues}
          ref={formRef}
        >
          <form onSubmit={handleSubmit}>
            {/* Form alanları */}
            <FormTextField label="Ad" name="name" />
            <FormTextField label="Email" name="email" />
            <FormTextField label="Şifre" name="password" />
            <FormSelect label="Rol" name="role" options={roleOptions} />
            <FormCheckbox label="Aktif" name="active" />

            {/* Form butonları */}
            <ButtonContainer>
              {/* İptal butonu */}
              <CustomButton
                type="button"
                onClick={onClose}
                variant="outlined"
                text="İptal"
              />
              {/* Kaydet butonu */}
              <CustomButton type="submit" variant="contained" text="Kaydet" />
            </ButtonContainer>
          </form>
        </FormProvider>
      </FormContent>
    </FormContainer>
  );
};

export default AddUserForm;
