// src/logger/index.ts
var LOGGER = process.env.LOGGER ?? "pino";
async function getLogger() {
  switch (LOGGER) {
    case "pino": {
      const { Logger: PinoLogger } = await import('../pino-M3ZJIO64.mjs');
      return PinoLogger;
    }
    default:
      throw new Error(`Unknown logger: ${process.env.LOGGER}`);
  }
}

export { getLogger };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map