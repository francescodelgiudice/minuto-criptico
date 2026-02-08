<template>
  <div class="row justify-center q-gutter-md">
    <!-- Hidden input for mobile keyboard support -->
    <input
      ref="hiddenInput"
      type="text"
      inputmode="text"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="characters"
      spellcheck="false"
      class="hidden-input"
      @input="handleMobileInput"
      @keydown="handleKeyDown"
    />
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

const hiddenInput = ref(null)

const active = ref({
  letter: 0,
  word: 0,
})

const array = ref(props.instance?.map((word) => new Array(word).map(() => '')) || [])

function onSelectButton(word, letter) {
  active.value = { word, letter }
  // Focus the hidden input to trigger keyboard on mobile
  if (hiddenInput.value) {
    hiddenInput.value.focus()
  }
}

function updateSolution() {
  const solution = array.value.map((word) => word.join('')).join(' ')
  emits('update:solution', solution)
}

function handleKeyDown(event) {
  const key = event.key.toUpperCase()

  // Check if the pressed key is a letter (A-Z)
  if (/^[A-Z]$/.test(key)) {
    event.preventDefault()
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
    // Clear the hidden input
    if (hiddenInput.value) {
      hiddenInput.value.value = ''
    }
  } else if (key === 'BACKSPACE') {
    event.preventDefault()
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

function handleMobileInput(event) {
  // Handle input event for mobile keyboards
  const value = event.target.value.toUpperCase()
  if (value && /^[A-Z]$/.test(value)) {
    const { word, letter } = active.value
    // Update the letter at the active position
    array.value[word][letter] = value

    // Move to the next position
    if (letter < array.value[word].length - 1) {
      active.value.letter += 1
    } else if (word < array.value.length - 1) {
      active.value.word += 1
      active.value.letter = 0
    }
    updateSolution()
  }
  // Clear the input immediately for next character
  event.target.value = ''
}

onMounted(() => {
  // Auto-focus the hidden input on mount to trigger keyboard on mobile
  if (hiddenInput.value) {
    setTimeout(() => {
      hiddenInput.value.focus()
    }, 300)
  }
})

onUnmounted(() => {
  // No cleanup needed for the ref-based approach
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
    updateSolution()
  },
)
</script>

<style>
.hidden-input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: -1;
  height: 1px;
  width: 1px;
  border: none;
  outline: none;
}

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
