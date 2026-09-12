import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import { ContactsProvider } from "./context/ContactsContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <ContactsProvider>
          <ToastContainer />
          <App />
        </ContactsProvider>
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>,
);
