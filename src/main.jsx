import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { LegalPage } from "./legal/LegalPage.jsx";
import "./styles.css";
import {StartupReady} from './components/StartupReady';
window.siteLoader?.set(20);
const path=window.location.pathname.replace(/\/$/, "");
const legal=path==="/privacy"||path==="/personal-data-consent";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StartupReady>{legal?<LegalPage consent={path==="/personal-data-consent"}/>:<App />}</StartupReady>
  </React.StrictMode>,
);
