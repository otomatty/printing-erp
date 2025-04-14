'use strict';

var pino = require('pino');

var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/logger/impl/pino.ts
var pino_exports = {};
__export(pino_exports, {
  Logger: () => Logger
});
var Logger;
var init_pino = __esm({
  "src/logger/impl/pino.ts"() {
    Logger = pino.pino({
      browser: {
        asObject: true
      },
      level: "debug",
      base: {
        env: process.env.NODE_ENV
      },
      errorKey: "error"
    });
  }
});

// src/logger/index.ts
var LOGGER = process.env.LOGGER ?? "pino";
async function getLogger() {
  switch (LOGGER) {
    case "pino": {
      const { Logger: PinoLogger } = await Promise.resolve().then(() => (init_pino(), pino_exports));
      return PinoLogger;
    }
    default:
      throw new Error(`Unknown logger: ${process.env.LOGGER}`);
  }
}

exports.getLogger = getLogger;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map