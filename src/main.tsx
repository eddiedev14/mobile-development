import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { AlertProvider } from "./context/AlertContext";
import { ContactsProvider } from "./context/ContactsContext";
import { FruitsProvider } from "./context/FruitsContext";
import { TaskieProvider } from "./context/TaskieContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <ContactsProvider>
          <FruitsProvider>
            <TaskieProvider>
              <ToastContainer />
              <App />
            </TaskieProvider>
          </FruitsProvider>
        </ContactsProvider>
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>,
);
