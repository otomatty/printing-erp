'use strict';

var react = require('react');

var AppEventsContext = react.createContext(
  null
);
function AppEventsProvider({ children }) {
  const listeners = react.useRef(
    {}
  );
  const emit = react.useCallback((event) => {
    const eventListeners = listeners.current[event.type] ?? [];
    for (const callback of eventListeners) {
      callback(event);
    }
  }, []);
  const on = react.useCallback((eventType, callback) => {
    listeners.current = {
      ...listeners.current,
      [eventType]: [...listeners.current[eventType] ?? [], callback]
    };
  }, []);
  const off = react.useCallback((eventType, callback) => {
    listeners.current = {
      ...listeners.current,
      [eventType]: (listeners.current[eventType] ?? []).filter(
        (cb) => cb !== callback
      )
    };
  }, []);
  return /* @__PURE__ */ React.createElement(AppEventsContext.Provider, { value: { emit, on, off } }, children);
}
function useAppEvents() {
  const context = react.useContext(AppEventsContext);
  if (!context) {
    throw new Error("useAppEvents must be used within an AppEventsProvider");
  }
  return context;
}

exports.AppEventsProvider = AppEventsProvider;
exports.useAppEvents = useAppEvents;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map