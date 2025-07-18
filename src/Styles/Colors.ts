/**
 * Colors.ts - Uygulama Renk Paleti
 *
 * Bu dosya uygulamanın tüm renk değerlerini merkezi olarak yönetir.
 * Tutarlı bir tasarım sistemi oluşturmak için kullanılır.
 *
 * Renk Sistemi:
 * - Her renk grubunda 6 farklı ton (100-600 arası)
 * - 100: En açık ton
 * - 600: En koyu ton
 * - Semantic renkler (success, danger, warning, info)
 * - Neutral renkler (background, surface, text, border)
 *
 * Kullanım:
 * - Styled Components ile CSS-in-JS yaklaşımında kullanılır
 * - import Colors from "../Styles/Colors" şeklinde import edilir
 * - Colors.primary[500] veya Colors.surface şeklinde erişilir
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

const Colors = {
  /**
   * Primary Renk Paleti - Mor Tonları
   * Ana marka rengi olarak kullanılır
   */
  primary: {
    100: "#F5F3FF", // En açık mor - Arka planlar için
    200: "#DDD6FE", // Açık mor - Gölgeler için
    300: "#C4B5FD", // Orta açık mor - Hover durumları için
    400: "#A78BFA", // Orta mor - İkonlar ve vurgular için
    500: "#8B5CF6", // Ana mor - Butonlar ve ana elementler için
    600: "#7C3AED", // Koyu mor - Başlıklar ve güçlü vurgular için
  },

  /**
   * Secondary Renk Paleti - Turuncu Tonları
   * İkincil vurgular ve aksanlar için kullanılır
   */
  secondary: {
    100: "#FFF7ED", // En açık turuncu
    200: "#FFEDD5", // Açık turuncu
    300: "#FED7AA", // Orta açık turuncu
    400: "#FDBA74", // Orta turuncu
    500: "#FB923C", // Ana turuncu
    600: "#F97316", // Koyu turuncu
  },

  /**
   * Success Renk Paleti - Yeşil Tonları
   * Başarı mesajları ve pozitif durumlar için
   */
  success: {
    100: "#ECFDF5", // En açık yeşil
    200: "#D1FAE5", // Açık yeşil
    300: "#A7F3D0", // Orta açık yeşil
    400: "#6EE7B7", // Orta yeşil
    500: "#34D399", // Ana yeşil
    600: "#10B981", // Koyu yeşil
  },

  /**
   * Danger Renk Paleti - Kırmızı Tonları
   * Hata mesajları ve uyarılar için
   */
  danger: {
    100: "#FEF2F2", // En açık kırmızı
    200: "#FECACA", // Açık kırmızı
    300: "#FCA5A5", // Orta açık kırmızı
    400: "#F87171", // Orta kırmızı
    500: "#EF4444", // Ana kırmızı
    600: "#DC2626", // Koyu kırmızı
  },

  /**
   * Warning Renk Paleti - Sarı Tonları
   * Uyarı mesajları ve dikkat çekmek için
   */
  warning: {
    100: "#FFFBEB", // En açık sarı
    200: "#FEF3C7", // Açık sarı
    300: "#FDE68A", // Orta açık sarı
    400: "#FCD34D", // Orta sarı
    500: "#FBBF24", // Ana sarı
    600: "#F59E42", // Koyu sarı
  },

  /**
   * Info Renk Paleti - Mavi Tonları
   * Bilgi mesajları ve neutral vurgular için
   */
  info: {
    100: "#EFF6FF", // En açık mavi
    200: "#DBEAFE", // Açık mavi
    300: "#BFDBFE", // Orta açık mavi
    400: "#93C5FD", // Orta mavi
    500: "#60A5FA", // Ana mavi
    600: "#3B82F6", // Koyu mavi
  },

  /** Ana arka plan rengi - Açık gri */
  background: "#F8FAFC",

  /** Koyu tema arka plan rengi */
  backgroundDark: "#18181B",

  /** Kart ve panel arka plan rengi - Beyaz */
  surface: "#FFFFFF",

  /** Koyu tema kart arka plan rengi */
  surfaceDark: "#27272A",

  /** Ana metin rengi - Koyu gri */
  text: "#18181B",

  /** Açık tema metin rengi - Açık gri */
  textLight: "#F3F4F6",

  /** Kenarlık rengi - Orta gri */
  border: "#E5E7EB",

  /** Koyu tema kenarlık rengi */
  borderDark: "#3F3F46",
};

export default Colors;
