import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContactsApp } from "./pages/ContactsApp";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContactsApp />
  </StrictMode>,
);
