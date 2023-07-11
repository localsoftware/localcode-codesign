<script setup>
import { useLocationStore } from '~/store/location'

const props = defineProps({
  title: { type: String, default: () => '' },
  sectionId: { type: Number, default: () => 0 },
  color: { type: String, default: () => 'bg-sky-400' },
})

const locationStore = useLocationStore()
const { changeCurrentLocation } = locationStore
</script>

<template>
  <div class="w-dull pt-3">
    <a href="#">
      <div
        :class="`h-8 w-full grid grid-cols-1 place-items-center ${color} rounded-full text-white`"
        @click="changeCurrentLocation(sectionId)"
      >
        {{ title }}
      </div>
    </a>
  </div>
</template>

<style scoped></style>
