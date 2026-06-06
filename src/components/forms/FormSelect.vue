<template>
  <select
    class="form-select"
    :value="modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-if="placeholder" value="">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.key"
      :disabled="option.disabled"
      :value="option.key"
    >
      {{ option.displayValue }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { FormOption } from './form-options';

withDefaults(
  defineProps<{
    modelValue: string;
    options: readonly FormOption[];
    placeholder?: string;
  }>(),
  {
    placeholder: undefined
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>
