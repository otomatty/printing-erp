// src/create-i18n-settings.ts
function createI18nSettings({
  languages,
  language,
  namespaces
}) {
  const lng = language;
  const ns = namespaces;
  return {
    // サポートする言語のリスト
    supportedLngs: languages,
    // 要求された言語が利用できない場合のフォールバック言語
    fallbackLng: languages[0],
    // サーバーサイドでは言語検出を無効化
    detection: void 0,
    // 現在の言語
    lng,
    // 言語コードのみを使用（国コードは無視）
    load: "languageOnly",
    // 起動時に全言語をプリロードしない
    preload: false,
    // 言語コードを小文字に統一
    lowerCaseLng: true,
    // フォールバック時に使用する名前空間
    fallbackNS: ns,
    // 補間値が見つからない場合のハンドラー
    missingInterpolationHandler: (text, value, options) => {
      console.debug(
        `Missing interpolation value for key: ${text}`,
        value,
        options
      );
    },
    // 使用する名前空間
    ns,
    // Reactでの設定
    react: {
      // Suspenseを使用して非同期ローディングを有効化
      useSuspense: true
    }
  };
}

export { createI18nSettings };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map