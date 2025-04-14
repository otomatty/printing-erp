'use strict';

var i18next = require('i18next');
var LanguageDetector = require('i18next-browser-languagedetector');
var resourcesToBackend = require('i18next-resources-to-backend');
var reactI18next = require('react-i18next');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var i18next__default = /*#__PURE__*/_interopDefault(i18next);
var LanguageDetector__default = /*#__PURE__*/_interopDefault(LanguageDetector);
var resourcesToBackend__default = /*#__PURE__*/_interopDefault(resourcesToBackend);

// src/i18n.client.ts
var MAX_ITERATIONS = 20;
var iteration = 0;
async function initializeI18nClient(settings, resolver) {
  const loadedLanguages = [];
  const loadedNamespaces = [];
  await i18next__default.default.use(
    resourcesToBackend__default.default(async (language, namespace, callback) => {
      const data = await resolver(language, namespace);
      if (!loadedLanguages.includes(language)) {
        loadedLanguages.push(language);
      }
      if (!loadedNamespaces.includes(namespace)) {
        loadedNamespaces.push(namespace);
      }
      return callback(null, data);
    })
  ).use(LanguageDetector__default.default).use(reactI18next.initReactI18next).init({
    ...settings,
    detection: {
      order: ["htmlTag", "cookie", "navigator"],
      caches: ["cookie"],
      lookupCookie: "lang"
    },
    interpolation: {
      escapeValue: false
    }
  });
  if (iteration >= MAX_ITERATIONS) {
    console.debug(`Max iterations reached: ${MAX_ITERATIONS}`);
    return i18next__default.default;
  }
  if (loadedLanguages.length === 0 || loadedNamespaces.length === 0) {
    iteration++;
    throw new Error("No languages or namespaces loaded");
  }
  return i18next__default.default;
}

exports.initializeI18nClient = initializeI18nClient;
//# sourceMappingURL=chunk-6PEJOTES.js.map
//# sourceMappingURL=chunk-6PEJOTES.js.map