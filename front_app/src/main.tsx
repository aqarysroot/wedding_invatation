import { createRoot } from "react-dom/client";
import { App } from "@/App";
import { BrowserRouter } from "react-router-dom";

import "@/assets/styles/globals.scss";
import "@/i18n"

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    <App />
  </BrowserRouter>
);
