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

  it('renders the form workspace', async () => {
    const wrapper = await mountApp();
    expect(wrapper.text()).toContain('App Forms');
    expect(wrapper.text()).toContain('Application');
    expect(wrapper.text()).toContain('Mark ready for review');
  });

  it('uses key-backed options in the application form controls', async () => {
    const wrapper = await mountApp();

    await wrapper.get('input[name="applicationType"][value="renewal"]').setValue(true);
    await wrapper.get('select').setValue('x');

    const selects = wrapper.findAll('select');
    expect(selects).toHaveLength(5);

    const genderSelect = selects[0]!;
    const nameChangeSelect = selects[1]!;
    const citizenshipEvidenceSelect = selects[2]!;
    const photoStatusSelect = selects[3]!;
    const refereeKnownForSelect = selects[4]!;

    await nameChangeSelect.setValue('marriage-certificate');
    await citizenshipEvidenceSelect.setValue('australian-citizenship-certificate');
    await photoStatusSelect.setValue('two-compliant-photos-ready');
    await refereeKnownForSelect.setValue('1-to-2-years');

    await wrapper.get('input[value="identity-document-ready"]').setValue(true);
    await wrapper.get('button[type="submit"]').trigger('submit');

    expect(
      (wrapper.get('input[name="applicationType"][value="renewal"]').element as HTMLInputElement)
        .checked
    ).toBe(true);
    expect((genderSelect.element as HTMLSelectElement).value).toBe('x');
    expect((nameChangeSelect.element as HTMLSelectElement).value).toBe('marriage-certificate');
    expect((citizenshipEvidenceSelect.element as HTMLSelectElement).value).toBe(
      'australian-citizenship-certificate'
    );
    expect((photoStatusSelect.element as HTMLSelectElement).value).toBe(
      'two-compliant-photos-ready'
    );
    expect((refereeKnownForSelect.element as HTMLSelectElement).value).toBe('1-to-2-years');
    expect(wrapper.text()).toContain('Renewal');
    expect(wrapper.text()).toContain('2 of 5');
    expect(wrapper.text()).toContain('Dummy review marked. No data has been sent or saved.');
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
