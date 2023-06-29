<script setup>
import { useLocationStore } from '~/store/location'

const props = defineProps({
  question: { type: String, default: () => '' },
  options: { type: Array, default: () => [] },
  type: { type: String, default: () => '' },
})

const locationStore = useLocationStore()
const activeButton = ref('')
const { changeCurrentBorough, changeCurrentSkill, changeCurrentEmployer } =
  locationStore

const triggerFunction = (type, option) => {
  activeButton.value = option
  switch (type) {
    case 'borough':
      changeCurrentBorough(option)
      break
    case 'skill':
      changeCurrentSkill(option)
      break
    case 'employer':
      changeCurrentEmployer(option)
      break
    case 'ecohub':
      break
    default:
      break
  }
}

const buttonClass =
  'border-2 border-black rounded-full px-3 capitalize hover:bg-black hover:text-white'
const extraClass = ' !bg-black !text-white'
</script>

<template>
  <div class="grid grid-cols-1 place-items-center">
    <h2 class="uppercase">{{ question }}</h2>
    <div
      class="mt-4 grid grid-cols-1 place-items-center overflow-x-scroll scrollbar-hide"
    >
      <div class="flex gap-x-2 scrollbar-hide">
        <ul class="contents whitespace-nowrap scrollbar-hide">
          <li
            v-for="option in options"
            :key="option"
            :class="
              activeButton === option ? buttonClass + extraClass : buttonClass
            "
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
