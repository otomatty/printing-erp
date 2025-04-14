import { initializeI18nClient } from './chunk-JJU7GKE4.mjs';
import { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

function getServerSettings() {
  if (typeof window === "undefined") return null;
  const settingsElement = document.getElementById("i18n-settings");
  if (!settingsElement) return null;
  try {
    return JSON.parse(settingsElement.getAttribute("data-settings") || "");
  } catch (e) {
    console.error("Failed to parse i18n settings:", e);
    return null;
  }
}
function I18nProvider({
  settings,
  children,
  resolver
}) {
  const [i18n, setI18n] = useState(null);
  useEffect(() => {
    const serverSettings = getServerSettings();
    initializeI18nClient(serverSettings ?? settings, resolver).then(setI18n).catch((err) => {
      console.error("Failed to initialize i18n:", err);
    });
  }, [settings, resolver]);
  if (!i18n) return null;
  return /* @__PURE__ */ React.createElement(I18nextProvider, { i18n }, children);
}

export { I18nProvider };
//# sourceMappingURL=i18n-provider.mjs.map
//# sourceMappingURL=i18n-provider.mjs.map