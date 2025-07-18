/**
 * types.ts - Uygulama Tip Tanımlamaları
 *
 * Bu dosya uygulamada kullanılan tüm TypeScript tip tanımlamalarını içerir.
 * Tip güvenliği sağlamak ve kod kalitesini artırmak için kullanılır.
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

/**
 * User Interface - Kullanıcı Veri Modeli
 *
 * Sistemdeki bir kullanıcının tüm özelliklerini tanımlar.
 * Hem kullanıcı yönetimi hem de coğrafi konum bilgileri içerir.
 *
 * @interface User
 */
export interface User {
  /** Kullanıcının benzersiz kimlik numarası (UUID formatında) */
  id: string;

  /** Kullanıcının adı ve soyadı */
  name: string;

  /** Kullanıcının e-posta adresi (benzersiz olmalı) */
  email: string;

  /** Kullanıcının sistem rolü (Admin, User, Editor, Viewer) */
  role: string;

  /** Kullanıcı hesabının oluşturulma tarihi */
  createdAt: Date;

  /** Kullanıcının şifresi (hashlenmiş olarak saklanmalı) */
  password: string;

  /** Kullanıcı hesabının aktif/pasif durumu */
  active: boolean;

  /** Kullanıcının coğrafi konumu - enlem (-90 ile +90 arası) */
  latitude: number;

  /** Kullanıcının coğrafi konumu - boylam (-180 ile +180 arası) */
  longitude: number;
}
