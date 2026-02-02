<template>
  <q-layout view="lHh Lpr lFf" class="bg-secondary">
    <q-header class="bg-transparent q-py-sm">
      <q-toolbar
        class="container q-mx-auto row no-wrap justify-between items-center q-px-none"
        style="height: 74px !important"
      >
        <div v-if="isBack" class="row no-wrap items-center">
          <q-btn flat dense class="q-mr-md" @click="onBack">
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-sentry-element="svg"
              data-sentry-component="BackIcon"
              data-sentry-source-file="BackIcon.tsx"
            >
              <path
                d="M24.2904 13.5026H2.70703M2.70703 13.5026L13.4987 24.2943M2.70703 13.5026L13.4987 2.71094"
                stroke="#1E1E1E"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-sentry-element="path"
                data-sentry-source-file="BackIcon.tsx"
              ></path>
            </svg>
          </q-btn>
          <div v-if="isClue" class="column no-wrap">
            <p class="text-[16px] font-bold q-my-none">{{ clueDate }}</p>
            <p class="text-[12px] text-black q-my-none">By Member: Checco</p>
          </div>
          <div v-else class="column items-center">
            <p class="text-[16px] font-bold q-my-none">Indietro</p>
          </div>
        </div>
        <span
          v-else
          class="font-serif text-black text-h5 text-weight-bolder text-italic bg-primary"
          style="line-height: 1"
        >
          minuto criptico
        </span>
        <button
          style="
            background: none;
            color: inherit;
            border: none;
            padding: 0;
            font: inherit;
            cursor: pointer;
            outline: inherit;
            height: 30px;
            transform: translateY(3px);
          "
          @click="routeToProfile"
        >
          <svg
            class="no-pointer-events"
            width="33"
            height="30"
            viewBox="0 0 60 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-component="Logo"
            data-sentry-source-file="Logo.tsx"
          >
            <path
              d="M7.54688 8.17149C7.54688 5.75546 9.54543 3.79688 12.0108 3.79688H59.6256C62.091 3.79688 64.0895 5.75546 64.0895 8.17149V54.834C64.0895 57.2501 62.091 59.2087 59.6256 59.2087H12.0108C9.54543 59.2087 7.54688 57.2501 7.54688 54.834V8.17149Z"
              fill="#FFFFFF"
              data-sentry-element="path"
              data-sentry-source-file="Logo.tsx"
            ></path>
            <path
              d="M3.67188 4.37461C3.67188 1.95858 5.67043 0 8.13577 0H55.7506C58.216 0 60.2145 1.95858 60.2145 4.37461V51.0372C60.2145 53.4532 58.216 55.4118 55.7506 55.4118H8.13577C5.67043 55.4118 3.67188 53.4532 3.67188 51.0372V4.37461Z"
              fill="#F5D1FD"
              data-sentry-element="path"
              data-sentry-source-file="Logo.tsx"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M55.7506 4.08297H8.13577C7.97141 4.08297 7.83818 4.21355 7.83818 4.37461V51.0372C7.83818 51.1982 7.97141 51.3288 8.13577 51.3288H55.7506C55.915 51.3288 56.0482 51.1982 56.0482 51.0372V4.37461C56.0482 4.21355 55.915 4.08297 55.7506 4.08297ZM8.13577 0C5.67043 0 3.67188 1.95858 3.67188 4.37461V51.0372C3.67188 53.4532 5.67043 55.4118 8.13577 55.4118H55.7506C58.216 55.4118 60.2145 53.4532 60.2145 51.0372V4.37461C60.2145 1.95858 58.216 0 55.7506 0H8.13577Z"
              fill="black"
              data-sentry-element="path"
              data-sentry-source-file="Logo.tsx"
            ></path>
            <path
              d="M56.741 43.4827C51.3683 44.5062 48.2762 42.9727 47.4649 38.8823C47.111 37.0982 46.9706 34.4154 47.0436 30.8339C47.1524 27.2005 47.2019 24.6621 47.1921 23.2189C47.1836 19.9239 47.0802 17.7759 46.8817 16.7751C46.4415 14.5558 45.3777 13.6069 43.6904 13.9283C42.5803 14.1398 41.6435 15.1085 40.8799 16.8346C40.1077 18.5171 39.7751 20.9061 39.8823 24.0017L39.831 43.2586L27.102 47.0237L27.1772 30.6895C27.1884 28.6552 27.1515 26.4945 27.0666 24.2076C26.9816 21.9207 26.9046 20.6032 26.8356 20.255C26.4385 18.2534 25.4852 17.3963 23.9755 17.6839C22.9542 17.8784 22.0352 18.8212 21.2186 20.5122C20.402 22.2031 19.985 24.6308 19.9675 27.7953L19.9828 49.1301L7.12064 52.935L7.25241 17.0084L17.85 13.6349L18.0254 20.4431C18.7138 17.8733 20.0244 15.885 21.9572 14.4782C23.8814 13.0278 26.5086 11.9855 29.8388 11.3511C31.7482 10.9874 33.4151 11.144 34.8396 11.821C36.2642 12.4979 37.323 13.5381 38.0161 14.9415C38.4688 13.2747 39.5636 11.8243 41.3003 10.5903C43.0728 9.30428 45.1357 8.43714 47.489 7.98884C49.8868 7.53208 51.7147 7.45483 52.9728 7.75709C54.2666 8.00738 55.3507 8.47825 56.2252 9.1697C57.7261 10.4643 58.7528 12.5041 59.3052 15.2891C59.849 18.0305 60.0867 22.3657 60.0185 28.2945C59.9493 31.1979 60.0182 33.1718 60.2254 34.2161C60.4239 35.217 60.8722 35.967 61.5702 36.4663C62.3127 36.9571 63.1366 37.1614 64.042 37.0793C63.8914 38.6433 63.1253 40.0086 61.7439 41.1749C60.4068 42.3328 58.7392 43.1021 56.741 43.4827Z"
              fill="black"
              data-sentry-element="path"
              data-sentry-source-file="Logo.tsx"
            ></path>
          </svg>
        </button>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { CLUES } from 'src/config'
import { computed } from 'vue'

const router = useRouter()

const isBack = computed(() => router.currentRoute.value.meta.back || false)
const isClue = computed(
  () =>
    router.currentRoute.value.params.index !== undefined &&
    router.currentRoute.value.params.index !== null,
)

const clueDate = computed(() =>
  isClue.value ? CLUES[router.currentRoute.value.params.index].date : null,
)

function onBack() {
  router.push('/')
}
function routeToProfile() {
  router.push('/about')
}
</script>
