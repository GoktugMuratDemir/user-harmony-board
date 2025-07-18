/**
 * FormContext.ts - Form Yönetimi Context Tanımlamaları
 *
 * Bu dosya form yönetimi için kullanılan React Context tanımlarını içerir.
 * FormProvider ile birlikte kullanılarak merkezi form state yönetimi sağlar.
 *
 * Özellikler:
 * - Generic type desteği ile tip güvenliği
 * - Form değerleri ve hata yönetimi
 * - Field-level ve form-level validasyon
 * - Context hook ile kolay erişim
 * - Error handling ve type checking
 *
 * Kullanım:
 * - FormProvider ile sarılan bileşenlerde kullanılır
 * - useFormContext hook'u ile context'e erişim
 * - Form bileşenlerinin veri ve validasyon yönetimi
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import { createContext, useContext } from "react";

/**
 * Form Context Type Interface
 *
 * Form yönetimi için gereken tüm fonksiyon ve değerleri tanımlar.
 * Generic type ile farklı form tiplerine uyum sağlar.
 *
 * @template T - Form değerlerinin type tanımı
 */
export interface FormContextType<T> {
  /** Form alanlarının mevcut değerleri */
  values: Record<string, T>;

  /** Form alanlarının hata mesajları */
  errors: Record<string, string>;

  /** Belirli bir form alanının değerini güncelleme fonksiyonu */
  setFieldValue: (name: string, value: T) => void;

  /**
   * Belirli bir form alanını validate etme fonksiyonu
   * @param name - Alan adı
   * @param value - Alan değeri
   * @param allValues - Tüm form değerleri (opsiyonel)
   */
  validateField: (
    name: string,
    value: T,
    allValues?: Record<string, T>
  ) => void;

  /** Yup validasyon şeması */
  schema: unknown;

  /** Tüm form alanlarını validate etme fonksiyonu (opsiyonel) */
  validateAll?: () => Promise<boolean>;
}

/**
 * Form Context
 *
 * React Context oluşturur ve FormProvider ile birlikte kullanılır.
 * Generic type ile unknown tipinde başlatılır, kullanımda cast edilir.
 */
export const FormContext = createContext<FormContextType<unknown> | undefined>(
  undefined
);

/**
 * useFormContext Hook
 *
 * Form context'ine erişim sağlayan custom hook.
 * FormProvider dışında kullanılırsa hata fırlatır.
 *
 * Özellikler:
 * - Type safety ile generic type desteği
 * - Context varlığı kontrolü
 * - Error handling
 * - Cast işlemi ile tip güvenliği
 *
 * Kullanım:
 * ```tsx
 * const { values, errors, setFieldValue } = useFormContext<MyFormType>();
 * ```
 *
 * @template T - Form değerlerinin type tanımı
 * @returns {FormContextType<T>} Form context değerleri ve fonksiyonları
 * @throws {Error} FormProvider dışında kullanılırsa hata fırlatır
 */
export function useFormContext<T>() {
  const ctx = useContext(FormContext);

  // Context varlığı kontrolü
  if (!ctx) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  // Generic type'a cast ederek döndür
  return ctx as FormContextType<T>;
}
