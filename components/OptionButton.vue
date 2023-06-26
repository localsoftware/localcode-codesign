<script setup>
import { useLocationStore } from '~/store/location'

const props = defineProps({
  question: { type: String, default: () => '' },
  options: { type: Array, default: () => [] },
  type: { type: String, default: () => '' },
})

const locationStore = useLocationStore()
const { changeCurrentBorough } = locationStore
</script>

<template>
  <div class="grid grid-cols-1 place-items-center">
    <h2 class="uppercase">{{ question }}</h2>
    <div class="flex gap-2 mt-2">
      <ul class="contents whitespace-nowrap">
        <li
          v-for="option in options"
          :key="option"
          class="border-2 border-black rounded-full px-3"
          @click="changeCurrentBorough(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
