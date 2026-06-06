<template>
  <label :class="fieldClass">
    <span class="form-field__label">
      {{ label }}
      <span v-if="required" class="form-field__required">*</span>
    </span>
    <slot></slot>
    <span v-if="hint" class="form-field__hint">{{ hint }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label: string;
    required?: boolean;
    wide?: boolean;
    hint?: string;
  }>(),
  {
    required: false,
    wide: false,
    hint: undefined
  }
);

const fieldClass = computed(() => ['form-field', { 'form-field--wide': props.wide }]);
</script>
