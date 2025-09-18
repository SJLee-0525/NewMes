import "@/index.css";

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App.tsx";

async function deferRender() {
  const { worker } = await import("./mocks/browser.js");
  await worker.start();

  navigator.serviceWorker.ready.then((r) => {
    console.log("SW scope:", r.scope);
  });
  console.log("MSW script reachable?", await fetch("/mockServiceWorker.js").then((r) => r.ok));
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
