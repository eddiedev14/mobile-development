import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { AlertProvider } from "./context/AlertContext";
import { TaskieProvider } from "./context/TaskieContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <TaskieProvider>
          <ToastContainer />
          <App />
        </TaskieProvider>
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>,
);
