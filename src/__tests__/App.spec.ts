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
    const themeSelect = wrapper.get('select');

    expect(themeSelect.element.value).toBe(THEME_OPTIONS.system);
    expect(document.documentElement.hasAttribute(THEME_ATTRIBUTE)).toBe(false);

    await themeSelect.setValue(THEME_OPTIONS.dark);

    expect(document.documentElement.dataset.theme).toBe(THEME_OPTIONS.dark);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_OPTIONS.dark);
  });

  it('clears the theme override when system is selected', async () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, THEME_OPTIONS.light);

    const wrapper = mount(App);
    const themeSelect = wrapper.get('select');

    expect(document.documentElement.dataset.theme).toBe(THEME_OPTIONS.light);

    await themeSelect.setValue(THEME_OPTIONS.system);

    expect(document.documentElement.hasAttribute(THEME_ATTRIBUTE)).toBe(false);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe(THEME_OPTIONS.system);
  });
});
