'use strict';

var chunk6PEJOTES_js = require('./chunk-6PEJOTES.js');
var react = require('react');
var reactI18next = require('react-i18next');

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
  const [i18n, setI18n] = react.useState(null);
  react.useEffect(() => {
    const serverSettings = getServerSettings();
    chunk6PEJOTES_js.initializeI18nClient(serverSettings ?? settings, resolver).then(setI18n).catch((err) => {
      console.error("Failed to initialize i18n:", err);
    });
  }, [settings, resolver]);
  if (!i18n) return null;
  return /* @__PURE__ */ React.createElement(reactI18next.I18nextProvider, { i18n }, children);
}

exports.I18nProvider = I18nProvider;
//# sourceMappingURL=i18n-provider.js.map
//# sourceMappingURL=i18n-provider.js.map