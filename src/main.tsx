import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SettingProvider } from "./context/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SettingProvider>
  </StrictMode>
);
