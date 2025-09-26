import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
