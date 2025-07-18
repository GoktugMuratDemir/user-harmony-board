/**
 * Main.tsx - Uygulamanın Giriş Noktası
 *
 * Bu dosya React uygulamasının giriş noktasıdır. Uygulamayı DOM'a render eder.
 *
 * Özellikler:
 * - React 18'in createRoot API'sini kullanır
 * - StrictMode ile geliştirme modunda ekstra kontroller sağlar
 * - App komponenti uygulamanın ana bileşenidir
 *
 * @author Evreka Case Study
 * @version 1.0.0
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// DOM'daki 'root' elementini bulup React uygulamasını render et
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
