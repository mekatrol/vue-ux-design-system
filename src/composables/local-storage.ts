export interface LocalStorageValue<T> {
  value: T | null;
  remove: () => void;
}

type StorageReader<T> = (storedValue: string) => T | null;
type StorageWriter<T> = (value: T) => string;

const TRUE_STORAGE_VALUE = 'true';
const FALSE_STORAGE_VALUE = 'false';
const ONE_STORAGE_VALUE = '1';
const ZERO_STORAGE_VALUE = '0';
const EMPTY_STORAGE_VALUE = '';
const DECIMAL_RADIX = 10;

const getLocalStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const createLocalStorageValue = <T>(
  key: string,
  readValue: StorageReader<T>,
  writeValue: StorageWriter<T>
): LocalStorageValue<T> => ({
  get value(): T | null {
    const storage = getLocalStorage();

    if (storage === null) {
      return null;
    }

    const storedValue = storage.getItem(key);

    if (storedValue === null) {
      return null;
    }

    return readValue(storedValue);
  },

  set value(nextValue: T | null) {
    const storage = getLocalStorage();

    if (storage === null) {
      return;
    }

    if (nextValue === null) {
      storage.removeItem(key);
      return;
    }

    storage.setItem(key, writeValue(nextValue));
  },

  remove: (): void => {
    const storage = getLocalStorage();
    storage?.removeItem(key);
  }
});

const readBoolean = (storedValue: string): boolean | null => {
  const normalizedValue = storedValue.toLowerCase();

  if (normalizedValue === TRUE_STORAGE_VALUE || normalizedValue === ONE_STORAGE_VALUE) {
    return true;
  }

  if (normalizedValue === FALSE_STORAGE_VALUE || normalizedValue === ZERO_STORAGE_VALUE) {
    return false;
  }

  return null;
};

const readInteger = (storedValue: string): number | null => {
  if (storedValue.trim() === EMPTY_STORAGE_VALUE) {
    return null;
  }

  const parsedValue = Number.parseInt(storedValue, DECIMAL_RADIX);
  return Number.isNaN(parsedValue) ? null : parsedValue;
};

const readJson = <T>(storedValue: string): T | null => {
  if (storedValue.trim() === EMPTY_STORAGE_VALUE) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return null;
  }
};

export const useLocalStorageString = (key: string): LocalStorageValue<string> =>
  createLocalStorageValue(key, (storedValue: string): string => storedValue, String);

export const useLocalStorageBoolean = (key: string): LocalStorageValue<boolean> =>
  createLocalStorageValue(key, readBoolean, (value: boolean): string =>
    value ? TRUE_STORAGE_VALUE : FALSE_STORAGE_VALUE
  );

export const useLocalStorageInteger = (key: string): LocalStorageValue<number> =>
  createLocalStorageValue(key, readInteger, (value: number): string => value.toString());

export const useLocalStorageJson = <T>(key: string): LocalStorageValue<T> =>
  createLocalStorageValue(key, readJson<T>, JSON.stringify);
