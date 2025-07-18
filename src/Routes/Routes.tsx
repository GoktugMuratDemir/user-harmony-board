/**
 * Routes.tsx - Uygulama Yönlendirme Yapılandırması
 *
 * Bu dosya uygulamanın tüm sayfa yönlendirmelerini tanımlar.
 * React Router DOM kullanarak nested routing yapısı oluşturur.
 *
 * Rotalar:
 * - "/" - Ana sayfa (Home)
 * - "/users" - Kullanıcı listesi sayfası
 * - "/users/:id" - Kullanıcı detay sayfası
 *
 * Layout yapısı:
 * - DashboardLayout tüm sayfaları sarar (Header, Sidebar içerir)
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import { createBrowserRouter } from "react-router-dom";

// Sayfa bileşenleri
import Home from "../Pages/Home";
import UserList from "../Pages/User/UserList";
import UserDetail from "../Pages/User/UserDetail";

// Layout bileşeni
import DashboardLayout from "../Layouts/Dashboard";

/**
 * Router yapılandırması
 * Nested routing ile DashboardLayout altında tüm sayfaları organize eder
 */
const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />, // Ana layout - header ve sidebar içerir
    children: [
      {
        index: true, // Ana sayfa rotası
        element: <Home />,
      },
      {
        path: "users", // Kullanıcı listesi rotası
        element: <UserList />,
      },
      {
        path: "users/:id", // Kullanıcı detay rotası (dinamik ID parametresi)
        element: <UserDetail />,
      },
    ],
  },
]);

export default routes;
