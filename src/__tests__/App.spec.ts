import { beforeEach, describe, expect, it } from 'vitest';

import { mount, type VueWrapper } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import App from '../App.vue';
import { THEME_ATTRIBUTE, THEME_OPTIONS, THEME_STORAGE_KEY } from '@/constants/theme.constants';
import { createAppRouter } from '@/router';

const mountApp = async (): Promise<VueWrapper> => {
  const router = createAppRouter(createMemoryHistory());
  router.push('/');
  await router.isReady();

  return mount(App, {
    global: {
      plugins: [router]
    }
  });
};

describe('App', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute(THEME_ATTRIBUTE);
    window.localStorage.clear();
  });

  it('mounts renders properly', async () => {
    const wrapper = await mountApp();
    expect(wrapper.text()).toContain('App Header');
    expect(wrapper.text()).toContain('App Content');
  });

  it('selects and saves a theme override', async () => {
    const wrapper = await mountApp();
    const systemTheme = wrapper.get('input[value="system"]');
    const darkTheme = wrapper.get('input[value="dark"]');

    expect((systemTheme.element as HTMLInputElement).checked).toBe(true);
    expect(document.documentElement.hasAttribute(THEME_ATTRIBUTE)).toBe(false);

    await darkTheme.setValue(true);

    expect(document.documentElement.dataset.theme).toBe(THEME_OPTIONS.dark);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_OPTIONS.dark);
    expect((darkTheme.element as HTMLInputElement).checked).toBe(true);
  });

  it('clears the theme override when system is selected', async () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, THEME_OPTIONS.light);

    const wrapper = await mountApp();
    const lightTheme = wrapper.get('input[value="light"]');
    const systemTheme = wrapper.get('input[value="system"]');

    expect(document.documentElement.dataset.theme).toBe(THEME_OPTIONS.light);
    expect((lightTheme.element as HTMLInputElement).checked).toBe(true);

    await systemTheme.setValue(true);

    expect(document.documentElement.hasAttribute(THEME_ATTRIBUTE)).toBe(false);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_OPTIONS.system);
    expect((systemTheme.element as HTMLInputElement).checked).toBe(true);
  });
});
