<template>
  <q-dialog>
    <card-wrapper bordered shadowed class="hints-card">
      <div class="column no-wrap">
        <div class="row no-wrap justify-between items-center q-mb-lg">
          <div class="text-black text-base">Seleziona aiutino</div>
          <button
            style="
              background: none;
              color: inherit;
              border: none;
              padding: 0;
              cursor: pointer;
              outline: inherit;
              height: 32px;
            "
            class="flex text-[32px]"
            @click="onClose"
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="0"
              viewBox="0 0 24 24"
              data-sentry-element="CgClose"
              data-sentry-source-file="ModalContentRenderer.tsx"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>

        <div class="column no-wrap hints-list">
          <div
            v-for="(hint, index) in clueHints"
            :key="index"
            class="clue-hint q-py-sm"
            :class="hint.key"
            @click="$emit('show:hint', hint.key)"
          >
            <span class="font-extrabold font-serif text-italic text-xl">
              <b>show {{ hint.key }}</b></span
            >
          </div>
        </div>

        <q-separator class="q-my-lg" />

        <div class="clue-hint letter q-py-sm" @click="showHint('letter')">
          <span class="font-extrabold font-serif text-italic text-xl"> <b>show letters </b></span>
        </div>
      </div>
    </card-wrapper>
  </q-dialog>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import CardWrapper from 'src/components/CardWrapper.vue'

const props = defineProps({
  clue: {
    type: Object,
    required: true,
  },
})
const emits = defineEmits(['update:modelValue', 'show:hint'])

const clueHints = computed(() => {
  return Object.entries(props.clue.hints).map(([key, hint]) => {
    return {
      key,
      ...hint,
    }
  })
})

function showHint(key) {
  emits('show:hint', key)
}

function onClose() {
  emits('update:modelValue', false)
}
</script>

<style>
.clue-hint {
  position: relative;
  cursor: pointer;
}
.clue-hint span {
  position: relative;
  z-index: 1;
}
.clue-hint span b {
  font: inherit;
}

.clue-hint span::before {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 10px;
  opacity: 1;
  z-index: -1;
}
.clue-hint:hover span::before {
  transform: scale(1.2);
}
.clue-hint.definition span:before {
  background: #d5e8ff;
}
.clue-hint.indicators span:before {
  background: #f5d1fd;
}
.clue-hint.fodders span:before,
.clue-hint.letter span:before {
  background: #fff2b1;
}
</style>
