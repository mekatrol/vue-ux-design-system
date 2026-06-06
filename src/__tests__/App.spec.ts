import { beforeEach, describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import App from '../App.vue';
import { THEME_ATTRIBUTE, THEME_OPTIONS, THEME_STORAGE_KEY } from '@/constants/theme.constants';

describe('App', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute(THEME_ATTRIBUTE);
    window.localStorage.clear();
  });

  it('mounts renders properly', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('App Header');
  });

  it('selects and saves a theme override', async () => {
    const wrapper = mount(App);
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

    const wrapper = mount(App);
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
