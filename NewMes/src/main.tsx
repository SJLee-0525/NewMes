import "@/index.css";

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App.tsx";

async function deferRender() {
  const { worker } = await import("./mocks/browser.js");
  await worker.start();
}

deferRender().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
