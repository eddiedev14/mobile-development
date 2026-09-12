import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { VisitsProvider } from "./context/VisitsContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <VisitsProvider>
          <App />
        </VisitsProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>,
);