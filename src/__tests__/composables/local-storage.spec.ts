import { beforeEach, describe, expect, it } from 'vitest';

import {
  useLocalSessionBool,
  useLocalSessionInt,
  useLocalSessionJsonObject,
  useLocalSessionString,
  useLocalStorageBoolean,
  useLocalStorageInteger,
  useLocalStorageJson,
  useLocalStorageString
} from '@/composables';

describe('local storage composables', () => {
  beforeEach((): void => {
    window.localStorage.clear();
  });

  it('reads, writes, and removes strings', (): void => {
    const setting = useLocalStorageString('name');

    expect(setting.value).toBe(null);

    setting.value = '';
    expect(setting.value).toBe('');
    expect(window.localStorage.getItem('name')).toBe('');

    setting.value = 'dashboard';
    expect(setting.value).toBe('dashboard');

    setting.remove();
    expect(setting.value).toBe(null);
  });

  it('reads valid booleans and ignores invalid boolean values', (): void => {
    const setting = useLocalStorageBoolean('enabled');

    window.localStorage.setItem('enabled', 'true');
    expect(setting.value).toBe(true);

    window.localStorage.setItem('enabled', '1');
    expect(setting.value).toBe(true);

    window.localStorage.setItem('enabled', 'FALSE');
    expect(setting.value).toBe(false);

    window.localStorage.setItem('enabled', 'maybe');
    expect(setting.value).toBe(null);
  });

  it('stores booleans as strings', (): void => {
    const setting = useLocalStorageBoolean('enabled');

    setting.value = false;
    expect(window.localStorage.getItem('enabled')).toBe('false');

    setting.value = true;
    expect(window.localStorage.getItem('enabled')).toBe('true');
  });

  it('reads integer values with decimal radix', (): void => {
    const setting = useLocalStorageInteger('count');

    window.localStorage.setItem('count', '08');
    expect(setting.value).toBe(8);

    window.localStorage.setItem('count', '0.5');
    expect(setting.value).toBe(0);

    window.localStorage.setItem('count', 'text');
    expect(setting.value).toBe(null);
  });

  it('reads and writes JSON values', (): void => {
    interface TestSetting {
      id: number;
      name: string;
    }

    const setting = useLocalStorageJson<TestSetting>('profile');
    const profile: TestSetting = { id: 42, name: 'Ada' };

    setting.value = profile;

    expect(window.localStorage.getItem('profile')).toBe(JSON.stringify(profile));
    expect(setting.value).toEqual(profile);

    window.localStorage.setItem('profile', '{');
    expect(setting.value).toBe(null);
  });

  it('removes values when set to null', (): void => {
    const setting = useLocalStorageString('name');

    setting.value = 'dashboard';
    setting.value = null;

    expect(window.localStorage.getItem('name')).toBe(null);
  });

  it('supports local-session aliases from the source project', (): void => {
    const stringSetting = useLocalSessionString('label');
    const boolSetting = useLocalSessionBool('visible');
    const intSetting = useLocalSessionInt('page-size');
    const jsonSetting = useLocalSessionJsonObject<{ compact: boolean }>('prefs');

    stringSetting.setting = 'Library';
    boolSetting.setting = true;
    intSetting.setting = 25;
    jsonSetting.setting = { compact: true };

    expect(stringSetting.setting).toBe('Library');
    expect(boolSetting.setting).toBe(true);
    expect(intSetting.setting).toBe(25);
    expect(jsonSetting.setting).toEqual({ compact: true });

    stringSetting.remove();
    expect(stringSetting.setting).toBe(null);
  });
});
