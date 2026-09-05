import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { AlertProvider } from "./context/AlertContext";
import App from "./App";
import { ContactsProvider } from "./context/ContactsContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AlertProvider>
      <ContactsProvider>
        <ToastContainer />
        <App />
      </ContactsProvider>
    </AlertProvider>
  </React.StrictMode>,
);
