import {
  useLocalStorageBoolean,
  useLocalStorageInteger,
  useLocalStorageJson,
  useLocalStorageString,
  type LocalStorageValue
} from './local-storage';

export interface LocalSessionValue<T> {
  setting: T | null;
  remove: () => void;
}

const asLocalSessionValue = <T>(storageValue: LocalStorageValue<T>): LocalSessionValue<T> => ({
  get setting(): T | null {
    return storageValue.value;
  },

  set setting(nextValue: T | null) {
    storageValue.value = nextValue;
  },

  remove: storageValue.remove
});

export const useLocalSessionJsonObject = <T>(key: string): LocalSessionValue<T> =>
  asLocalSessionValue(useLocalStorageJson<T>(key));

export const useLocalSessionString = (key: string): LocalSessionValue<string> =>
  asLocalSessionValue(useLocalStorageString(key));

export const useLocalSessionBool = (key: string): LocalSessionValue<boolean> =>
  asLocalSessionValue(useLocalStorageBoolean(key));

export const useLocalSessionInt = (key: string): LocalSessionValue<number> =>
  asLocalSessionValue(useLocalStorageInteger(key));
