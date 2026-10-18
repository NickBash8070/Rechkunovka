import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";
import {StartupReady} from './components/StartupReady';
import {CookieConsent} from './components/CookieConsent';
window.siteLoader?.set(20);
const path=window.location.pathname.replace(/\/$/, "");
const legalPdf={'/privacy':'/legal/privacy-policy.pdf','/personal-data-consent':'/legal/personal-data-consent.pdf'}[path];
if(legalPdf)window.location.replace(legalPdf);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {!legalPdf&&<StartupReady><App /><CookieConsent/></StartupReady>}
  </React.StrictMode>,
);
