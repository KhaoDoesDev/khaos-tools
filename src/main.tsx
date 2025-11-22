import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PDFToImagesPage from "./views/pdf-to-images.tsx";
import LandingPage from "./views/landing.tsx";
import NotFoundPage from "./views/not-found.tsx";
import MinecraftSmallTextPage from "./views/minecraft-small-text.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layout.tsx";
import { HelmetProvider } from "react-helmet-async";
import ThaiIDValidator from "./views/thai-national-id-validator.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="/pdf-to-images" element={<PDFToImagesPage />} />
              <Route path="/minecraft-small-text" element={<MinecraftSmallTextPage />} />
              <Route path="/thai-national-id-validator" element={<ThaiIDValidator />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
