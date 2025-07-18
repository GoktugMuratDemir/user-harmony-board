/**
 * useUserList Hook - Kullanıcı Listesi State Yönetimi
 *
 * Bu custom hook kullanıcı listesi sayfasının tüm state yönetimini
 * merkezi olarak sağlar. Kullanıcı verilerini localStorage ile
 * persist eder ve sayfa fonksiyonelliklerini yönetir.
 *
 * Özellikler:
 * - LocalStorage ile veri persistence
 * - Otomatik sahte veri üretimi (ilk kullanımda)
 * - Görünüm modu yönetimi (tablo/kart)
 * - Modal durumu kontrolü
 * - Yeni kullanıcı ekleme fonksiyonelliği
 * - Date nesnesi parsing işlemleri
 *
 * State Yönetimi:
 * - users: Kullanıcı listesi array'i
 * - viewMode: Aktif görünüm modu
 * - showModal: Modal açık/kapalı durumu
 *
 * @hook
 * @returns {object} Hook state ve fonksiyonları
 */

import { useState, useEffect } from "react";
import type { User } from "../../../types/types";
import { generateUsers } from "../../../utils/userGenerator";

/**
 * useUserList Hook
 *
 * Kullanıcı listesi sayfası için merkezi state yönetimi sağlar.
 * localStorage kullanarak verileri kalıcı olarak saklar.
 *
 * İlk Yükleme Süreci:
 * 1. localStorage'dan mevcut kullanıcıları kontrol et
 * 2. Eğer veri varsa, tarihleri Date nesnesine çevir
 * 3. Eğer veri yoksa, 5000 adet sahte kullanıcı üret
 * 4. Üretilen verileri localStorage'a kaydet
 *
 * @returns {object} Hook'un döndürdüğü state ve fonksiyonlar
 */
export function useUserList() {
  // Ana kullanıcı listesi state'i
  const [users, setUsers] = useState<User[]>([]);

  // Görünüm modu state'i (tablo veya kart görünümü)
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  // Kullanıcı ekleme modal'ının açık/kapalı durumu
  const [showModal, setShowModal] = useState(false);

  /**
   * Component mount edildiğinde çalışan effect
   * localStorage'dan veri yükler veya yeni veri üretir
   */
  useEffect(() => {
    // localStorage'dan kayıtlı kullanıcıları al
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      // Eğer kayıtlı veri varsa parse et ve tarihleri düzelt
      const parsedUsers = (JSON.parse(storedUsers) as User[]).map((user) => ({
        ...user,
        // JSON'dan gelen string tarihleri Date nesnesine çevir
        createdAt: new Date(user.createdAt),
      }));
      setUsers(parsedUsers);
    } else {
      // Eğer kayıtlı veri yoksa yeni sahte kullanıcılar üret
      const generatedUsers = generateUsers(5000); // 5000 adet test kullanıcısı
      setUsers(generatedUsers);

      // Üretilen verileri localStorage'a kaydet
      localStorage.setItem("users", JSON.stringify(generatedUsers));
    }
  }, []); // Sadece component mount'da çalış

  /**
   * Yeni kullanıcı ekleme fonksiyonu
   *
   * Yeni kullanıcıyı listenin başına ekler ve localStorage'a kaydeder.
   * İşlem tamamlandıktan sonra modal'ı kapatır.
   *
   * @param {User} newUser - Eklenecek yeni kullanıcı objesi
   */
  const handleAddUser = (newUser: User) => {
    // Yeni kullanıcıyı listenin başına ekle
    const updatedUsers = [newUser, ...users];

    // State'i güncelle
    setUsers(updatedUsers);

    // Güncellenmiş listeyi localStorage'a kaydet
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Modal'ı kapat
    setShowModal(false);
  };

  // Hook'un döndürdüğü state ve fonksiyonlar
  return {
    /** Kullanıcı listesi array'i */
    users,

    /** Kullanıcı listesi setter fonksiyonu */
    setUsers,

    /** Mevcut görünüm modu (table/card) */
    viewMode,

    /** Görünüm modu değiştirme fonksiyonu */
    setViewMode,

    /** Modal açık/kapalı durumu */
    showModal,

    /** Modal durumu değiştirme fonksiyonu */
    setShowModal,

    /** Yeni kullanıcı ekleme fonksiyonu */
    handleAddUser,
  };
}
