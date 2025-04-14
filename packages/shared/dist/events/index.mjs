import { createContext, useRef, useCallback, useContext } from 'react';

var AppEventsContext = createContext(
  null
);
function AppEventsProvider({ children }) {
  const listeners = useRef(
    {}
  );
  const emit = useCallback((event) => {
    const eventListeners = listeners.current[event.type] ?? [];
    for (const callback of eventListeners) {
      callback(event);
    }
  }, []);
  const on = useCallback((eventType, callback) => {
    listeners.current = {
      ...listeners.current,
      [eventType]: [...listeners.current[eventType] ?? [], callback]
    };
  }, []);
  const off = useCallback((eventType, callback) => {
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
  const context = useContext(AppEventsContext);
  if (!context) {
    throw new Error("useAppEvents must be used within an AppEventsProvider");
  }
  return context;
}

export { AppEventsProvider, useAppEvents };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map