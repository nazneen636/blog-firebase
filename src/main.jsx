import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import database from "../Database/Firebase.config.js";
import AuthProvider from "./Context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
    <ToastContainer/>
     <App />
   </AuthProvider>
  </StrictMode>
);
