import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import { MissionsProvider } from "./context/MissionsContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <MissionsProvider>
          <ToastContainer />
          <App />
        </MissionsProvider>
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>,
);
