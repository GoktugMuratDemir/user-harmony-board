/**
 * userGenerator.ts - Sahte Kullanıcı Verisi Üretici
 *
 * Bu dosya test ve geliştirme amaçlı sahte kullanıcı verisi üretir.
 * Faker.js kütüphanesi kullanarak gerçekçi kullanıcı bilgileri oluşturur.
 *
 * Özellikler:
 * - Faker.js ile gerçekçi veri üretimi
 * - Rastgele kullanıcı adları, email'ler ve coğrafi konumlar
 * - Çoklu rol desteği (Admin, User, Editor, Viewer)
 * - Rastgele aktif/pasif durumları
 * - Geçmiş tarihli hesap oluşturma tarihleri
 *
 * Kullanım:
 * - Test verisi oluşturmak için
 * - Demo amaçlı kullanıcı listesi doldurmak için
 * - Geliştirme sürecinde mock data sağlamak için
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import { faker } from "@faker-js/faker";
import type { User } from "../types/types";

/**
 * Belirtilen sayıda sahte kullanıcı verisi üretir
 *
 * Bu fonksiyon Faker.js kütüphanesini kullanarak gerçekçi kullanıcı
 * verileri oluşturur. Her kullanıcı için benzersiz ID, isim, email,
 * rol, oluşturulma tarihi, şifre ve coğrafi konum bilgileri üretilir.
 *
 * Üretilen Veriler:
 * - ID: UUID formatında benzersiz kimlik
 * - Name: Gerçekçi ad soyad kombinasyonu
 * - Email: Geçerli email formatında adres
 * - Role: Admin, User, Editor, Viewer rollerinden rastgele seçim
 * - CreatedAt: Geçmiş bir tarih
 * - Password: Rastgele güvenli şifre
 * - Active: Rastgele true/false durumu
 * - Latitude/Longitude: Geçerli coğrafi koordinatlar
 *
 * @param {number} count - Oluşturulacak kullanıcı sayısı
 * @returns {User[]} Üretilen kullanıcı listesi
 *
 * @example
 * ```typescript
 * // 10 adet sahte kullanıcı oluştur
 * const users = generateUsers(10);
 *
 * // 100 adet test kullanıcısı oluştur
 * const testUsers = generateUsers(100);
 * ```
 */
export const generateUsers = (count: number): User[] => {
  const users: User[] = [];

  // Belirtilen sayı kadar kullanıcı oluştur
  for (let i = 0; i < count; i++) {
    users.push({
      // Benzersiz UUID kimlik
      id: faker.string.uuid(),

      // Gerçekçi ad soyad
      name: faker.person.fullName(),

      // Geçerli email adresi
      email: faker.internet.email(),

      // Sistemdeki rollerden rastgele seçim
      role: faker.helpers.arrayElement(["Admin", "User", "Editor", "Viewer"]),

      // Geçmiş bir tarihte hesap oluşturma
      createdAt: faker.date.past(),

      // Rastgele güvenli şifre
      password: faker.internet.password(),

      // Rastgele aktif/pasif durumu
      active: faker.datatype.boolean(),

      // Gerçekçi coğrafi koordinatlar
      latitude: faker.address.latitude(), // Enlem (-90 ile +90 arası)
      longitude: faker.address.longitude(), // Boylam (-180 ile +180 arası)
    });
  }

  return users;
};
