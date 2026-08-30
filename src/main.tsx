import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { AlertProvider } from "./context/AlertContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AlertProvider>
      <ToastContainer />
      <App />
    </AlertProvider>
  </React.StrictMode>,
);
