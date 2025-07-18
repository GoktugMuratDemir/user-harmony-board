/**
 * FormProvider.tsx - Form Yönetim Context Sağlayıcısı
 *
 * Bu bileşen form yönetimini merkezi olarak sağlayan context provider'dır.
 * Yup schema validasyonu ile birlikte form alanlarının değerlerini ve
 * hata durumlarını yönetir.
 *
 * Özellikler:
 * - Generic type desteği ile tip güvenliği
 * - Yup schema ile otomatik validasyon
 * - Field-level ve form-level validasyon
 * - Controlled component yaklaşımı
 * - forwardRef ile parent component'e erişim
 * - Context API ile child component'lere veri sağlama
 *
 * Kullanım:
 * - Form bileşenlerini sarmalar
 * - Schema ve başlangıç değerleri alır
 * - Child form bileşenlerine context sağlar
 * - Parent component'ten validasyon kontrol edilebilir
 *
 * @component
 * @generic T - Form değerlerinin tip tanımı
 */

import React, { useState, useImperativeHandle, forwardRef } from "react";
import { FormContext } from "../../Context/FormContext";
import type { FormContextType } from "../../Context/FormContext";
import * as yup from "yup";

/**
 * FormProvider bileşeninin props interface'i
 *
 * @template T - Form değerlerinin type tanımı
 */
interface FormProviderProps<T extends object> {
  /** Form bileşenlerini içeren children */
  children: React.ReactNode;

  /** Yup validasyon şeması */
  schema: yup.ObjectSchema<T>;

  /** Form alanları için başlangıç değerleri */
  initialValues?: T;
}

/**
 * FormProvider iç bileşeni
 *
 * ForwardRef kullanarak parent component'e form kontrolü sağlar.
 * Generic type ile tip güvenliği sunar.
 *
 * @template T - Form değerlerinin type tanımı
 * @param props - Bileşen props'ları
 * @param ref - Parent component referansı
 */
function FormProviderInner<T extends object>(
  { children, schema, initialValues = {} as T }: FormProviderProps<T>,
  ref: React.Ref<FormProviderRef<T>>
) {
  // Form değerlerini tutan state
  const [values, setValues] = useState<T>(initialValues);

  // Form hata mesajlarını tutan state
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Belirli bir form alanının değerini günceller
   * Değer değiştiğinde otomatik validasyon yapar
   *
   * @param name - Alan adı
   * @param value - Yeni değer
   */
  const setFieldValue: FormContextType<T>["setFieldValue"] = (name, value) => {
    setValues((prev) => {
      const newVals = { ...prev, [name]: value };
      // Değer değişiminde otomatik validasyon
      validateField(name, value, newVals);
      return newVals;
    });
  };

  /**
   * Belirli bir form alanını validate eder
   * Yup schema kullanarak alan bazlı validasyon yapar
   *
   * @param name - Validate edilecek alan adı
   * @param value - Alan değeri
   * @param allValues - Tüm form değerleri (opsiyonel)
   */
  const validateField: FormContextType<T>["validateField"] = async (
    name,
    value,
    allValues
  ) => {
    try {
      // Yup schema ile alan validasyonu
      await schema.validateAt(name, allValues || { ...values, [name]: value });

      // Validasyon başarılı - hatayı temizle
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      // Validasyon hatası - hata mesajını kaydet
      if (err instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  /**
   * Tüm form alanlarını validate eder
   * Form submit işleminden önce çağrılır
   *
   * @returns {Promise<boolean>} Validasyon başarılı ise true
   */
  const validateAll = async () => {
    try {
      // Tüm alanları birden validate et
      await schema.validate(values, { abortEarly: false });

      // Validasyon başarılı - tüm hataları temizle
      setErrors({});
      return true;
    } catch (err) {
      // Validasyon hataları - tüm hataları topla
      if (err instanceof yup.ValidationError && err.inner) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  /**
   * Parent component'e erişim sağlayan ref implementasyonu
   * Form kontrolü için gerekli fonksiyon ve değerleri expose eder
   */
  useImperativeHandle(ref, () => ({
    validateAll, // Tüm form validasyonu
    values, // Mevcut form değerleri
    errors, // Mevcut hata durumları
  }));

  return (
    <FormContext.Provider
      value={
        {
          values, // Form değerleri
          errors, // Hata mesajları
          setFieldValue, // Alan değeri güncelleme
          validateField, // Alan validasyonu
          schema, // Validasyon şeması
          validateAll, // Tüm form validasyonu
        } as unknown as FormContextType<unknown>
      }
    >
      {children}
    </FormContext.Provider>
  );
}

/**
 * FormProvider ref interface'i
 * Parent component'ten erişilebilecek metodları tanımlar
 *
 * @template T - Form değerlerinin type tanımı
 */
type FormProviderRef<T extends object> = {
  /** Tüm form alanlarını validate eden fonksiyon */
  validateAll: () => Promise<boolean>;

  /** Mevcut form değerleri */
  values: T;

  /** Mevcut hata durumları */
  errors: Record<string, string>;
};

/**
 * FormProvider ana bileşeni
 *
 * ForwardRef ile tip güvenliği sağlayan generic form provider.
 * Context API ile child component'lere form yönetim functionality'si sağlar.
 *
 * @template T - Form değerlerinin type tanımı
 */
export const FormProvider = forwardRef(FormProviderInner) as <T extends object>(
  props: FormProviderProps<T> & { ref?: React.Ref<FormProviderRef<T>> }
) => React.ReactElement;
