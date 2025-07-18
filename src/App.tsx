/**
 * App.tsx - Ana Uygulama Bileşeni
 *
 * Bu dosya uygulamanın ana bileşenini içerir. Router yapılandırmasını yükler
 * ve uygulamanın tüm sayfa yönlendirmelerini yönetir.
 *
 * Özellikler:
 * - React Router DOM kullanarak sayfa yönlendirmelerini yönetir
 * - Routes.tsx dosyasından router yapılandırmasını alır
 * - Tüm sayfa geçişlerini merkezi olarak kontrol eder
 *
 * @component
 * @returns {JSX.Element} RouterProvider ile sarılmış uygulama
 */

import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./Routes/Routes";

/**
 * Ana uygulama fonksiyonu
 * Router yapılandırmasını yükler ve uygulamayı başlatır
 */
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
