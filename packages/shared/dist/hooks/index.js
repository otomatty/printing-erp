'use strict';

var confetti = require('canvas-confetti');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var confetti__default = /*#__PURE__*/_interopDefault(confetti);

// src/hooks/useCsrfToken.ts
function useCsrfToken() {
  if (typeof document === "undefined") {
    return "";
  }
  const meta = document.querySelector('meta[name="csrf-token"]');
  if (!meta) {
    return "";
  }
  return meta.getAttribute("content") ?? "";
}
var useConfetti = () => {
  const fireConfetti = () => {
    const duration = 5 * 1e3;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti__default.default({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti__default.default({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };
  return { fireConfetti };
};

exports.useConfetti = useConfetti;
exports.useCsrfToken = useCsrfToken;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map