import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { AlertProvider } from "./context/AlertContext";
import App from "./App";
import { TaskieProvider } from "./context/TaskieContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AlertProvider>
      <TaskieProvider>
        <ToastContainer />
        <App />
      </TaskieProvider>
    </AlertProvider>
  </React.StrictMode>,
);
