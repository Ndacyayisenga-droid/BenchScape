import type { StoreApi } from "zustand/vanilla";
import { createStore } from "zustand/vanilla";

interface StoreEntity {
  value: StoreApi<unknown>;
  active: boolean;
}

const availableStores: Record<string, StoreEntity> = {};

// appEnv isn't available immediately. Wait a bit before making stores available
// on window in development mode.
setTimeout(() => {
  if (window.appEnv === "development") {
    window["stores"] = availableStores;
  }
}, 1000);

/**
 * Creates a Zustand store.
 *
 * @param name A name by which the store can be looked up later.
 *    Must be unique across the entire application.
 * @param initialState An object which will be the initial state of the store.
 * @returns The newly created store.
 */
export function createGlobalStore<T>(
  name: string,
  initialState: T
): StoreApi<T> {
  const available = availableStores[name];

  if (available) {
    if (available.active) {
      console.error(
        "Cannot override an existing store. Make sure that stores are only created once."
      );
    } else {
      available.value.setState(initialState, true);
    }

    available.active = true;
    return available.value as StoreApi<T>;
  } else {
    const store = createStore<T>()(() => initialState);

    availableStores[name] = {
      value: store,
      active: true,
    };

    return store;
  }
}

/**
 * Returns the existing store named `name`,
 * or creates a new store named `name` if none exists.
 *
 * @param name The name of the store to look up.
 * @param fallbackState The initial value of the new store if no store named `name` exists.
 * @returns The found or newly created store.
 */
export function getGlobalStore<T>(
  name: string,
  fallbackState?: T
): StoreApi<T> {
  const available = availableStores[name];

  if (!available) {
    const store = createStore<T>()(() => fallbackState ?? ({} as unknown as T));
    availableStores[name] = {
      value: store,
      active: false,
    };
    return store;
  }

  return available.value as StoreApi<T>;
}

export function subscribeTo<T, U>(
  store: StoreApi<T>,
  select: (state: T) => U,
  handle: (subState: U) => void
) {
  let previous = select(store.getState());

  return store.subscribe((state) => {
    const current = select(state);

    if (current !== previous) {
      previous = current;
      handle(current);
    }
  });
}

export const filtersStore = createGlobalStore("measurementFilters", {
  filters: {
    environmentIds: "",
    start: "",
    end: "",
  },
  checks: {
    showRealData: true,
    showRealDataMin: false,
    showRealDataMax: false,
    showRealDataError: false,
    showSmoothData: true,
    showSmoothDataMin: false,
    showSmoothDataMax: false,
    showSmoothDataError: false,
  },
});

export const setGlobalFilters = (filters: Filters, checks?: Checks) =>
  filtersStore.setState((state) => ({
    ...state,
    filters: filters,
    checks: checks ?? state.checks,
  }));

type Checks = {
  showRealData: boolean;
  showRealDataMin: boolean;
  showRealDataMax: boolean;
  showRealDataError: boolean;
  showSmoothData: boolean;
  showSmoothDataMin: boolean;
  showSmoothDataMax: boolean;
  showSmoothDataError: boolean;
};

type Filters = {
  environmentIds: string;
  end: string;
  start: string;
};
