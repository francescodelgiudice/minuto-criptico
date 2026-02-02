<template>
  <q-page class="flex justify-center full-width">
    <div class="container column no-wrap q-gutter-y-xl full-width">
      <card-wrapper class="full-width">
        <span class="text-[24px]" v-html="decoratedClue.text"></span>
        <span class="text-[24px]"> {{ decoratedClue.lengthText }} </span>
      </card-wrapper>

      <div class="hints-wrapper">
        <hints-dots
          :used="hintsUsed"
          :par="decoratedClue.par"
          :hints="decoratedClue.hints"
          :solution="decoratedClue.length"
        />
      </div>

      <div class="solution-wrapper" :class="{ animate: animateInput }">
        <solution-input
          :showedLetters="showedLetters"
          :instance="decoratedClue.length"
          @update:solution="(val) => (input = val)"
        />
      </div>

      <div class="full-width row justify-center items-center q-gutter-x-md">
        <mc-button accent label="aiutini" @click="showHintsDialog = true" />
        <mc-button label="check" :disabled="isCheckDisabled" @click="onCheck" />
      </div>

      <hints-dialog v-model="showHintsDialog" :clue="decoratedClue" @show:hint="onShowHint" />
      <hint-dialog v-model="showHintDialog" :hint="currentHint" @back="onBack" />
      <success-dialog v-model="success" :clue="decoratedClue" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import McButton from 'src/components/McButton.vue'
import HintsDots from 'src/components/HintsDots.vue'
import HintDialog from 'src/components/HintDialog.vue'
import HintsDialog from 'src/components/HintsDialog.vue'
import CardWrapper from 'src/components/CardWrapper.vue'
import SuccessDialog from 'src/components/SuccessDialog.vue'
import SolutionInput from 'src/components/SolutionInput.vue'
import { CLUES } from 'src/config'
import { useRouter } from 'vue-router'

const router = useRouter()
const clueIndex = router.currentRoute.value.params.index || 0

const clue = ref(CLUES[clueIndex])
const input = ref('')
const success = ref(false)
const animateInput = ref(false)
const hints = ref({ ...clue.value.hints })
const show = ref(0)

const showHintsDialog = ref(false)
const showHintDialog = ref(false)
const hintToShow = ref(null)

const currentHint = computed(() => {
  if (hintToShow.value && hints.value[hintToShow.value]) {
    return hints.value[hintToShow.value]
  }
  return null
})

const decoratedClue = computed(() => {
  const length = clue.value.solution.split(' ').map((word) => word.length)
  let text = clue.value.text

  // If a hint is being shown, wrap the hint words in <b> tags
  if (currentHint.value) {
    const hint = currentHint.value
    if (hint.strings) {
      hint.strings.forEach((item) => {
        const regex = new RegExp(`(${item.word})`, 'gi')
        text = text.replace(regex, `<span class="show-hint ${hintToShow.value}">$1</span>`)
      })
    }
  }
  return {
    ...clue.value,
    text,
    length,
    lengthText: `(${length.join(', ')})`,
  }
})

const isCheckDisabled = computed(() => {
  return input.value.length < clue.value.solution.length
})

const showedLetters = computed(() => {
  const solution = clue.value.solution
  let count = 0
  let result = ''

  for (let i = 0; i < solution.length; i++) {
    if (solution[i] === ' ') {
      result += ' '
    } else if (count < show.value) {
      result += solution[i]
      count++
    } else {
      result += ''
    }
  }

  return result
})

const hintsUsed = computed(() => {
  return Object.values(hints.value).filter((hint) => hint.used).length + show.value
})

function onCheck() {
  if (input.value.toUpperCase() === clue.value.solution.toUpperCase()) {
    success.value = true
  } else {
    animateInput.value = true
    setTimeout(() => {
      animateInput.value = false
    }, 1000)
  }
}

function onShowHint(hintKey) {
  showHintsDialog.value = false
  if (hintKey === null || hintKey === undefined) {
    return
  } else if (hintKey === 'letter') {
    showLetter()
    return
  } else {
    const hint = hints.value[hintKey]
    if (hint) {
      hint.used = true
      hintToShow.value = hintKey
      showHintDialog.value = true
    }
  }
}

function showLetter() {
  show.value += 1
}

function onBack() {
  showHintDialog.value = false
  showHintsDialog.value = true
}
</script>

<style>
.hints-card {
  min-width: 90vw;
  max-width: 90vw;
}
@media screen and (min-width: 768px) {
  .hints-card {
    min-width: 400px;
  }
}

.show-hint {
  position: relative;
}
.show-hint.definition {
  background: #d5e8ff;
}
.show-hint.indicators {
  background: #f5d1fd;
}
.show-hint.fodders {
  background: #fff2b1;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }

  10% {
    transform: translate(-1px, -2px);
  }

  20% {
    transform: translate(-3px);
  }

  30% {
    transform: translate(3px, 2px);
  }

  40% {
    transform: translate(1px, -1px);
  }

  50% {
    transform: translate(-1px, 2px);
  }

  60% {
    transform: translate(-3px, 1px);
  }

  70% {
    transform: translate(3px, 1px);
  }

  80% {
    transform: translate(-1px, -1px);
  }

  90% {
    transform: translate(1px, 2px);
  }

  to {
    transform: translate(1px, -2px);
  }
}
.solution-wrapper.animate {
  animation: shake 0.5s ease-in-out 1;
}
</style>
