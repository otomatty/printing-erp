import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

// src/i18n.server.ts
async function initializeServerI18n(settings, resolver) {
  const i18nInstance = createInstance();
  const loadedNamespaces = /* @__PURE__ */ new Set();
  await new Promise((resolve) => {
    void i18nInstance.use(
      // 翻訳リソースを動的にロードするプラグイン
      resourcesToBackend(async (language, namespace, callback) => {
        try {
          const data = await resolver(language, namespace);
          loadedNamespaces.add(namespace);
          return callback(null, data);
        } catch (error) {
          console.log(
            `Error loading i18n file: locales/${language}/${namespace}.json`,
            error
          );
          return callback(null, {});
        }
      })
    ).use({
      type: "3rdParty",
      init: async (i18next) => {
        let iterations = 0;
        const maxIterations = 100;
        while (i18next.isInitializing) {
          iterations++;
          if (iterations > maxIterations) {
            console.error(
              `i18next is not initialized after ${maxIterations} iterations`
            );
            break;
          }
          await new Promise((resolve2) => setTimeout(resolve2, 1));
        }
        initReactI18next.init(i18next);
        resolve(i18next);
      }
    }).init(settings);
  });
  const namespaces = settings.ns;
  if (loadedNamespaces.size === namespaces.length) {
    return i18nInstance;
  }
  const maxWaitTime = 0.1;
  const checkIntervalMs = 5;
  async function waitForNamespaces() {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitTime) {
      const allNamespacesLoaded = namespaces.every(
        (ns) => loadedNamespaces.has(ns)
      );
      if (allNamespacesLoaded) return true;
      await new Promise((resolve) => setTimeout(resolve, checkIntervalMs));
    }
    return false;
  }
  const success = await waitForNamespaces();
  if (!success) {
    console.warn(
      `Not all namespaces were loaded after ${maxWaitTime}ms. Initialization may be incomplete.`
    );
  }
  return i18nInstance;
}
function parseAcceptLanguageHeader(languageHeaderValue, acceptedLanguages) {
  if (!languageHeaderValue) return [];
  const ignoreWildcard = true;
  return languageHeaderValue.split(",").map((lang) => {
    const [locale, q = "q=1"] = lang.split(";");
    if (!locale) return [0, ""];
    const trimmedLocale = locale.trim();
    const numQ = Number(q.replace(/q ?=/, ""));
    return [Number.isNaN(numQ) ? 0 : numQ, trimmedLocale];
  }).sort(([q1], [q2]) => q2 - q1).flatMap(([_, locale]) => {
    if (locale === "*" && ignoreWildcard) return [];
    const languageSegment = locale.split("-")[0];
    if (!languageSegment) return [];
    try {
      return acceptedLanguages.includes(languageSegment) ? [languageSegment] : [];
    } catch {
      return [];
    }
  });
}

export { initializeServerI18n, parseAcceptLanguageHeader };
//# sourceMappingURL=i18n.server.mjs.map
//# sourceMappingURL=i18n.server.mjs.map