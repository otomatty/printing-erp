import { pino } from 'pino';

// src/logger/impl/pino.ts
var Logger = pino({
  browser: {
    asObject: true
  },
  level: "debug",
  base: {
    env: process.env.NODE_ENV
  },
  errorKey: "error"
});

export { Logger };
//# sourceMappingURL=pino-M3ZJIO64.mjs.map
//# sourceMappingURL=pino-M3ZJIO64.mjs.map