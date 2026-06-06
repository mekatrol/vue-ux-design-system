<template>
  <div :class="choiceListClass">
    <label v-for="option in options" :key="option.key" class="choice">
      <input
        :checked="isSelected(option.key)"
        :disabled="option.disabled"
        :name="name"
        :type="type"
        :value="option.key"
        @change="updateValue(option.key, ($event.target as HTMLInputElement).checked)"
      />
      <span class="choice__content">
        <span class="choice__label">{{ option.displayValue }}</span>
        <span v-if="option.hint" class="choice__hint">{{ option.hint }}</span>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FormOption } from './form-options';

const props = withDefaults(
  defineProps<{
    modelValue: string | string[];
    name?: string;
    options: readonly FormOption[];
    type?: 'checkbox' | 'radio';
    inline?: boolean;
  }>(),
  {
    name: undefined,
    type: 'radio',
    inline: false
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]];
}>();

const choiceListClass = computed(() => ['choice-list', { 'choice-list--inline': props.inline }]);

const isSelected = (value: string): boolean => {
  if (props.type === 'checkbox') {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value);
  }

  return props.modelValue === value;
};

const updateValue = (value: string, checked: boolean): void => {
  if (props.type === 'radio') {
    emit('update:modelValue', value);
    return;
  }

  const selectedValues = Array.isArray(props.modelValue) ? [...props.modelValue] : [];

  if (checked && !selectedValues.includes(value)) {
    selectedValues.push(value);
  }

  if (!checked) {
    const selectedIndex = selectedValues.indexOf(value);

    if (selectedIndex >= 0) {
      selectedValues.splice(selectedIndex, 1);
    }
  }

  emit('update:modelValue', selectedValues);
};
</script>
