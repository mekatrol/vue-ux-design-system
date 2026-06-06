<template>
  <fieldset class="theme-selector">
    <legend class="theme-selector__legend">Theme</legend>
    <label v-for="option in THEME_CHOICES" :key="option.value" class="theme-selector__choice">
      <input
        v-model="theme"
        class="theme-selector__input"
        type="radio"
        name="theme"
        :value="option.value"
        @change="setTheme"
      />
      <span class="theme-selector__label">{{ option.label }}</span>
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  THEME_ATTRIBUTE,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
  type Theme
} from '@/constants/theme.constants';

const THEME_CHOICES: ReadonlyArray<{ label: string; value: Theme }> = [
  { label: 'System', value: THEME_OPTIONS.system },
  { label: 'Light', value: THEME_OPTIONS.light },
  { label: 'Dark', value: THEME_OPTIONS.dark }
];

const setTheme = (): void => {
  applyTheme(theme.value);
  saveTheme(theme.value);
};

const getInitialTheme = (): Theme => getSavedTheme() ?? getPreferredTheme();

const getSavedTheme = (): Theme | null => {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === THEME_OPTIONS.dark ||
      savedTheme === THEME_OPTIONS.light ||
      savedTheme === THEME_OPTIONS.system
      ? savedTheme
      : null;
  } catch {
    return null;
  }
};

const getPreferredTheme = (): Theme => THEME_OPTIONS.system;

const applyTheme = (nextTheme: Theme): void => {
  if (nextTheme === THEME_OPTIONS.system) {
    document.documentElement.removeAttribute(THEME_ATTRIBUTE);
    return;
  }

  document.documentElement.setAttribute(THEME_ATTRIBUTE, nextTheme);
};

const saveTheme = (nextTheme: Theme): void => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // Theme still applies for the current session when storage is unavailable.
  }
};

const theme = ref<Theme>(getInitialTheme());

applyTheme(theme.value);
</script>
