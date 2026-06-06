export interface LanguageInfo {
  language: string;
  languages: readonly string[];
  languageBase: string;
  languageVariant: string;
}

const EMPTY_LANGUAGE_PART = '';
const LANGUAGE_PARTS_PATTERN = /^\s*(?<base>[A-Za-z]{2})(?:-(?<variant>[A-Za-z]{2}))?\s*$/;

const getNavigator = (): Navigator | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.navigator;
};

export const useLanguageInfo = (): LanguageInfo => {
  const navigator = getNavigator();
  const language = navigator?.language ?? EMPTY_LANGUAGE_PART;
  const languageParts = LANGUAGE_PARTS_PATTERN.exec(language);

  return {
    language,
    languages: navigator?.languages ?? [],
    languageBase: languageParts?.groups?.base?.toLowerCase() ?? EMPTY_LANGUAGE_PART,
    languageVariant: languageParts?.groups?.variant?.toUpperCase() ?? EMPTY_LANGUAGE_PART
  };
};
