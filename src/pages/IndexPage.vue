<template>
  <q-page class="flex justify-center">
    <div class="container">
      <div class="column no-wrap q-gutter-y-lg">
        <card-wrapper
          v-for="clue in decoratedClues"
          :key="clue.index"
          :text="clue.text"
          :title="clue.title"
        >
          <div class="flex items-center full-width justify-center">
            <mc-button large label="play" @click="onClick(clue.index)" />
          </div>
          <p class="w-full text-center font-sans font-normal text-sm leading-5 q-mb-none q-mt-md">
            {{ clue.date }} · By Member: Checco
          </p>
        </card-wrapper>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import CardWrapper from 'src/components/CardWrapper.vue'
import McButton from 'src/components/McButton.vue'
import { CLUES } from 'src/config'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const clues = ref(CLUES)

const decoratedClues = computed(() => {
  return clues.value.map((clue, index) => {
    const length = clue.solution
      .split(' ')
      .map((word) => word.length)
      .join(', ')
    return {
      ...clue,
      index,
      text: `${clue.text}\n\n(${length})`,
    }
  })
})

function onClick(clueIndex = 0) {
  router.push(`/clues/${clueIndex}`)
}
</script>
