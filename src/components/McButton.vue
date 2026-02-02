<template>
  <q-btn
    v-bind="{ ...props, ...$attrs }"
    rounded
    no-caps
    text-color="black"
    class="mc-button font-serif font-bold text-italic border border-3 text-[20px]"
    :color="color"
    :class="{ large, 'shadow-offset': !props.disabled }"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  accent: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  large: {
    type: Boolean,
    default: false,
  },
})

const color = computed(() => {
  if (props.disabled) {
    return 'transparent'
  }
  if (props.accent) {
    return 'accent'
  }
  return 'primary'
})
</script>

<style>
.q-btn.font-bold span.block {
  font-weight: 800;
}
.q-btn.font-serif span.block {
  font-family: 'Sansita', sans-serif;
}
.mc-button {
  padding: 0 32px;
}
.mc-button.large {
  padding: 0 3.5rem;
}
</style>
