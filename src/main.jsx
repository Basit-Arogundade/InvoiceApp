
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { InvoiceProvider } from "./context/InvoiceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
  </BrowserRouter>
);

const saved = localStorage.getItem("theme") || "light";
document.body.className = saved;

function toggleTheme() {
  const newTheme = document.body.className === "light" ? "dark" : "light";
  document.body.className = newTheme;
  localStorage.setItem("theme", newTheme);
}


