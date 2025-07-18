# Evreka Case Study - React TypeScript Dashboard

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş bir kullanıcı yönetim dashboard'udur. Evreka firması için hazırlanmış bir case study çalışmasıdır.

## 🌐 Canlı Demo

**🔗 [Projeyi Görüntüle](https://user-harmony-board.vercel.app/)**

## 🚀 Proje Özellikleri

### Teknoloji Stack'i
- **React 19** - Modern UI kütüphanesi
- **TypeScript** - Tip güvenliği ve kod kalitesi
- **Vite** - Hızlı build tool ve dev server
- **Styled Components** - CSS-in-JS yaklaşımı
- **React Router DOM** - Sayfa yönlendirme
- **Yup** - Form validasyonu
- **Faker.js** - Sahte veri üretimi
- **React Leaflet** - Harita entegrasyonu
- **UUID** - Benzersiz ID üretimi

### Ana Özellikler
- 📊 **Modern Dashboard** - Responsive tasarım ve kullanıcı dostu arayüz
- 👥 **Kullanıcı Yönetimi** - CRUD işlemleri ile tam kullanıcı yönetimi
- 🎛️ **İki Görünüm Modu** - Tablo ve kart görünümleri
- 🔍 **Gelişmiş Arama** - Kullanıcı filtreleme ve sıralama
- 📱 **Responsive Design** - Tüm cihazlarda uyumlu çalışma
- 💾 **LocalStorage** - Veri kalıcılığı
- 🎨 **Modern UI** - Gradient'lar, gölgeler ve smooth animasyonlar
- 📍 **Harita Entegrasyonu** - Kullanıcı konumları görselleştirme

## 📁 Proje Yapısı

```
src/
├── App.css                     # Ana uygulama stilleri
├── App.tsx                     # Ana uygulama bileşeni - Router konfigürasyonu
├── main.tsx                    # Uygulama giriş noktası - React DOM render
├── index.css                   # Global CSS stilleri
├── vite-env.d.ts              # Vite TypeScript tanımları
│
├── assets/                     # Statik dosyalar
│   └── react.svg              # React logosu
│
├── components/                 # Yeniden kullanılabilir UI bileşenleri
│   ├── Form/                  # Form yönetim bileşenleri
│   │   ├── FormCheckbox.tsx   # Context-aware checkbox bileşeni
│   │   ├── FormProvider.tsx   # Form context sağlayıcısı
│   │   ├── FormSelect.tsx     # Context-aware select bileşeni
│   │   └── FormTextField.tsx  # Context-aware text input bileşeni
│   ├── AddUserForm.tsx        # Kullanıcı ekleme modal formu
│   ├── CustomButton.tsx       # Çok varyantlı buton bileşeni
│   ├── CustomCheckbox.tsx     # Özelleştirilebilir checkbox
│   ├── CustomModal.tsx        # Yeniden kullanılabilir modal
│   ├── CustomSelect.tsx       # Dropdown select bileşeni
│   ├── CustomTable.tsx        # Gelişmiş tablo bileşeni (sıralama, filtreleme, sayfalama)
│   ├── CustomTextField.tsx    # Metin input bileşeni (çoklu varyant)
│   ├── Header.tsx             # Dashboard üst başlık
│   └── Sidebar.tsx            # Sol navigasyon menüsü
│
├── Context/                   # React Context tanımları
│   └── FormContext.ts         # Form state yönetimi context'i
│
├── helpers/                   # Yardımcı fonksiyonlar (boş - gelecek genişlemeler için)
│
├── hooks/                     # Custom React hook'ları
│   └── Users/                # Kullanıcı yönetimi hook'ları
│       ├── UserDetail/       # Kullanıcı detay hook'ları (gelecek)
│       └── UserList/         # Kullanıcı listesi hook'ları
│           ├── index.ts      # Hook export dosyası
│           └── useUserCards.ts # Kart görünümü state yönetimi
│
├── Layouts/                   # Sayfa layout bileşenleri
│   └── Dashboard/            # Ana dashboard layout'u
│       └── index.tsx         # Dashboard layout bileşeni
│
├── Pages/                     # Sayfa seviyesi bileşenler
│   ├── Home/                 # Ana sayfa
│   │   └── index.tsx         # Hoş geldin sayfası
│   └── User/                 # Kullanıcı yönetimi sayfaları
│       ├── UserDetail/       # Tekil kullanıcı detay sayfası
│       │   └── index.tsx     # Kullanıcı detayı + harita görünümü
│       └── UserList/         # Kullanıcı listesi sayfası
│           └── index.tsx     # Liste yönetimi ve görünüm modları
│
├── Routes/                    # Yönlendirme yapılandırması
│   └── Routes.tsx            # React Router konfigürasyonu
│
├── Sections/                  # Sayfa bölüm bileşenleri
│   ├── UserDetail/           # Kullanıcı detay bölümleri (gelecek)
│   └── UserList/             # Kullanıcı liste bölümleri
│       ├── UserCards.tsx     # Grid kart görünümü bileşeni
│       └── UserTable.tsx     # Tablo görünümü bileşeni
│
├── Styles/                    # Stil yapılandırmaları
│   ├── Colors.ts             # Merkezi renk paleti
│   └── globalStyles.ts       # Global stil tanımları
│
├── types/                     # TypeScript tip tanımları
│   └── types.ts              # Uygulama veri modelleri (User interface)
│
└── utils/                     # Yardımcı utility fonksiyonları
    └── userGenerator.ts       # Faker.js ile test verisi üretici
```

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Kurulum
```bash
# Depoyu klonlayın
git clone <repository-url>
cd evreka-case-study

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Tarayıcıda açın: http://localhost:5173
```

### Build Komutları
```bash
# Geliştirme için çalıştır
npm run dev

# Production build oluştur
npm run build

# Build'i önizle
npm run preview

# Linting kontrolü
npm run lint
```

## 🎯 Ana Özellikler Detayı

### 1. Dashboard Layout
- **Header**: Logo, başlık ve navigasyon butonları
- **Sidebar**: Ana sayfa navigasyonu
- **Main Content**: Dinamik sayfa içerikleri

### 2. Kullanıcı Yönetimi
- **Kullanıcı Listesi**: 5000+ sahte kullanıcı verisi
- **Tablo Görünümü**: Detaylı veri tablosu
- **Kart Görünümü**: Görsel kart tasarımı
- **Kullanıcı Ekleme**: Modal ile yeni kullanıcı ekleme
- **Form Validasyonu**: Yup ile comprehensive validation

### 3. Form Yönetimi
- **FormProvider**: Context-based form yönetimi
- **Otomatik Validasyon**: Real-time field validation
- **Tip Güvenliği**: Generic TypeScript desteği
- **Reusable Components**: TextField, Select, Checkbox

### 4. Veri Yönetimi
- **LocalStorage**: Kalıcı veri saklama
- **Faker.js**: Gerçekçi test verisi
- **State Management**: Custom hooks ile merkezi yönetim

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: Mor tonları (#7C3AED - #F5F3FF)
- **Secondary**: Turuncu tonları (#F97316 - #FFF7ED)
- **Success**: Yeşil tonları (#10B981 - #ECFDF5)
- **Danger**: Kırmızı tonları (#DC2626 - #FEF2F2)

### UI Bileşenleri
- **Modern Butonlar**: 4 farklı varyant
- **Gradient Tasarımlar**: Çoklu gradient kullanımı
- **Smooth Animations**: Transition efektleri
- **Responsive Grid**: Flexbox tabanlı layout

## 📊 Performans ve Optimizasyon

- **Lazy Loading**: Sayfa bazlı kod bölme
- **Memoization**: React.memo kullanımı
- **Efficient Re-renders**: Optimize edilmiş state güncellemeleri
- **Bundle Optimization**: Vite ile optimize edilmiş build

## 🔧 Geliştirme Notları

### Kod Kalitesi
- **TypeScript**: Strict mode ile tip güvenliği
- **ESLint**: Kod kalitesi kontrolü
- **Prettier**: Kod formatlama
- **Conventional Commits**: Standart commit mesajları

### Mimari Kararlar
- **Component Composition**: Yeniden kullanılabilir bileşenler
- **Custom Hooks**: Logic separation
- **Context API**: State management
- **Styled Components**: CSS-in-JS yaklaşımı

## 📝 Geliştirici Notları

Her dosya detaylı Türkçe dokümantasyon ile açıklanmıştır. Kod içerisindeki yorumlar:
- Bileşen amacı ve özellikleri
- Props ve return değerleri
- Kullanım örnekleri
- State yönetimi açıklamaları
- Performance considerations

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje Evreka Case Study için geliştirilmiştir.

---

**Geliştirici**: Evreka Case Study Team  
**Versiyon**: 1.0.0  
**Son Güncelleme**: 2025
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
