import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DossierApp } from "./App.tsx";
import "./index.css";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DossierApp />} />
        <Route path="/:lang/*" element={<DossierApp />} />
        <Route path="*" element={<DossierApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
