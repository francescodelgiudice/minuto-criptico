<template>
  <div class="row justify-center q-gutter-md">
    <template v-for="(word, wIndex) in array" :key="wIndex">
      <div class="row no-wrap items-center">
        <button
          v-for="(letter, lIndex) in word"
          :key="lIndex"
          class="flex input-button justify-center items-center"
          :class="{
            'bg-primary': active.word === wIndex && active.letter === lIndex,
            'bg-white': !(active.word === wIndex && active.letter === lIndex),
            'rounded-l': lIndex === 0,
            'rounded-r': lIndex === word.length - 1,
          }"
          @click="onSelectButton(wIndex, lIndex)"
        >
          <span
            class="font-serif text-[32px] font-extrabold text-italic"
            style="transform: translateY(-15%)"
          >
            {{ letter?.toLowerCase() || '' }}
          </span>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  instance: {
    type: Array,
    required: true,
  },
  showedLetters: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['update:solution'])

const active = ref({
  letter: 0,
  word: 0,
})

const array = ref(props.instance?.map((word) => new Array(word).map(() => '')) || [])

function onSelectButton(word, letter) {
  active.value = { word, letter }
}

function updateSolution() {
  const solution = array.value.map((word) => word.join('')).join(' ')
  emits('update:solution', solution)
}

function handleKeyPress(event) {
  const key = event.key.toUpperCase()

  // Check if the pressed key is a letter (A-Z)
  if (/^[A-Z]$/.test(key)) {
    const { word, letter } = active.value
    // Update the letter at the active position
    array.value[word][letter] = key

    // Move to the next position
    if (letter < array.value[word].length - 1) {
      active.value.letter += 1
    } else if (word < array.value.length - 1) {
      active.value.word += 1
      active.value.letter = 0
    }
    updateSolution()
  } else if (key === 'BACKSPACE') {
    const { word, letter } = active.value

    if (array.value[word][letter] === '' || array.value[word][letter] === undefined) {
      if (letter > 0) {
        active.value.letter -= 1
      } else if (word > 0) {
        active.value.word -= 1
        active.value.letter = array.value[active.value.word].length - 1
      }
    }

    if (array.value[active.value.word][active.value.letter] !== '') {
      array.value[active.value.word][active.value.letter] = ''
    }
    updateSolution()
  }
}

onMounted(() => {
  window.addEventListener('keyup', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyPress)
})

watch(
  () => props.showedLetters,
  (newVal) => {
    let count = 0
    for (let w = 0; w < array.value.length; w++) {
      for (let l = 0; l < array.value[w].length; l++) {
        if (newVal[count] && newVal[count] !== ' ') {
          array.value[w][l] = newVal[count].toUpperCase()
        }
        count++
      }
      // Skip space
      count++
    }
  },
)
</script>

<style>
.input-button {
  max-width: 46px;
  max-height: 46px;
  width: 46px;
  height: 46px;
  outline-color: #000;
  outline-offset: -2px;
  outline-width: 4px;
  outline-style: solid;
}

.rounded-l {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.rounded-r {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
