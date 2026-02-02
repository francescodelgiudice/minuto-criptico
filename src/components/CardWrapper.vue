<template>
  <q-card
    flat
    dense
    rounded
    class="bg-white q-pa-lg rounded-2xl column no-wrap"
    :class="{
      'shadow-offset': props.shadowed,
      'q-gutter-y-md': props.title || props.text,
      'border border-4 border-black': props.bordered,
    }"
  >
    <slot v-if="props.title" name="title">
      <div class="w-full text-center font-sans font-extrabold text-2xl leading-8">
        {{ props.title }}
      </div>
    </slot>

    <slot v-if="props.text" name="text">
      <div class="w-full flex items-center justify-center" style="min-height: 64px">
        <p class="text-center font-sans font-normal text-2xl leading-8">
          {{ props.text }}
        </p>
      </div>
    </slot>

    <slot />
  </q-card>
</template>

<script setup>
const props = defineProps({
  title: String,
  text: String,
  bordered: {
    type: Boolean,
    default: false,
  },
  shadowed: {
    type: Boolean,
    default: false,
  },
})
</script>
