import { describe, expect, it } from 'vitest';

import { useLanguageInfo } from '@/composables';

describe('useLanguageInfo', () => {
  it('splits navigator language into base and variant', (): void => {
    const languageInfo = useLanguageInfo();
    const languageParts = /^\s*(?<base>[A-Za-z]{2})(?:-(?<variant>[A-Za-z]{2}))?\s*$/.exec(
      window.navigator.language
    );

    expect(languageInfo.language).toBe(window.navigator.language);
    expect(languageInfo.languages).toBe(window.navigator.languages);
    expect(languageInfo.languageBase).toBe(languageParts?.groups?.base?.toLowerCase() ?? '');
    expect(languageInfo.languageVariant).toBe(languageParts?.groups?.variant?.toUpperCase() ?? '');
  });
});
