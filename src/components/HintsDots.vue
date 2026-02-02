<template>
  <div class="row justify-center items-center q-gutter-sm q-pb-lg">
    <div v-for="(hint, index) in decoratedHints" :key="index" class="relative-position">
      <div
        class="hint-dot border-2"
        :class="{ 'bg-white animate-pulseSize': hint.used, 'border border-black': hint.isPar }"
      />

      <span
        v-if="hint.isPar"
        class="absolute-center par-span text-black text-[20px] text-italic font-bold font-serif"
      >
        par
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  used: {
    type: Number,
    default: 0,
  },
  hints: {
    type: Object,
    required: true,
  },
  par: {
    type: Number,
    required: true,
  },
  solution: {
    type: Array,
    required: true,
  },
})

const decoratedHints = computed(() => {
  const wordplayHints = Object.values(props.hints).length

  const lettersAmount = props.solution.reduce((acc, curr) => acc + curr, 0)

  const totalHints = wordplayHints + lettersAmount
  return new Array(totalHints).fill({}).map((hint, index) => {
    return {
      used: index < props.used,
      isPar: index === props.par - 1,
    }
  })
})
</script>

<style>
.hint-dot {
  border-radius: 100%;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
}
.hint-dot:not(.bg-white) {
  background: #d5e8ff;
}

.par-span {
  bottom: 50px;
  top: 100% !important;
}

@keyframes pulseSize {
  0% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.5);
  }

  to {
    transform: scale(1);
  }
}

.animate-pulseSize {
  animation: pulseSize 1s;
}
</style>
