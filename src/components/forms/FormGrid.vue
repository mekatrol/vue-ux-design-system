<template>
  <div :class="gridClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    columns?: 'two' | 'three';
  }>(),
  {
    columns: 'two'
  }
);

const gridClass = computed(() => ['form-grid', `form-grid--${props.columns}`]);
</script>
