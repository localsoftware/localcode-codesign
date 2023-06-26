<script setup>
import { useLocationStore } from '~/store/location'

const props = defineProps({
  question: { type: String, default: () => '' },
  options: { type: Array, default: () => [] },
  type: { type: String, default: () => '' },
})

const locationStore = useLocationStore()
const { changeCurrentBorough } = locationStore

const triggerFunction = (type, option) => {
  switch (type) {
    case 'borough':
      changeCurrentBorough(option)
      break
    case 'ecohub':
      break
    default:
      break
  }
}
</script>

<template>
  <div class="grid grid-cols-1 place-items-center">
    <h2 class="uppercase">{{ question }}</h2>
    <div class="grid grid-cols-1 place-items-center overflow-x-scroll mt-4">
      <div class="flex gap-x-2">
        <ul class="contents whitespace-nowrap">
          <li
            v-for="option in options"
            :key="option"
            class="border-2 border-black rounded-full px-3 capitalize hover:bg-black hover:text-white"
            @click="triggerFunction(type, option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
