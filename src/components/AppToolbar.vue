<template>
  <nav class="app-toolbar" aria-label="Application toolbar">
    <label class="app-toolbar__field">
      <span class="app-toolbar__label">Theme</span>
      <select v-model="theme" class="app-toolbar__select" @change="setTheme">
        <option :value="THEME_OPTIONS.system">System</option>
        <option :value="THEME_OPTIONS.light">Light</option>
        <option :value="THEME_OPTIONS.dark">Dark</option>
      </select>
    </label>
    <button class="app-toolbar__button app-toolbar__button--primary" type="button">Login</button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  THEME_ATTRIBUTE,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
  type Theme
} from '@/constants/theme.constants';

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

  document.documentElement.dataset.theme = nextTheme;
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
