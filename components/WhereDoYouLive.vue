<script setup>
import { useLocationStore } from '~/store/location'
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { currentBorough } = storeToRefs(locationStore)
console.log(currentBorough.value, '1278128721')

const ecoHubOptions = computed(() => {
  switch (currentBorough.value) {
    case 'Bronx':
      return ['Forest']
    case 'Brooklyn':
      return ['Bay View', 'Howard', 'Red Hook']
    case 'Manhattan':
      return ['Wagner']
    case 'Staten Island':
      return ['Mariners Harbor']
    case 'Queens':
      return ['Astoria Houses']
    default:
      return ['Bay View', 'Howard', 'Red Hook']
  }
})
</script>

<template>
  <OptionButton
    :question="'Where do you live?'"
    :options="['Manhattan', 'Bronx', 'Brooklyn', 'Staten Island', 'Queens']"
    :type="'borough'"
  />

  <SeparatorLine />

  <div class="rounded-3xl bg-blue-500 px-10 py-8">
    <h1 class="uppercase text-center mb-4">💡 Did you know?</h1>
    <p class="text-sm mb-2">
      We have three Eco-Hubs in Brooklyn.<br />Why don’t you come check them
      out? 👀
    </p>
  </div>

  <SeparatorLine />

  <OptionButton
    :question="'Yay, we have 3 farms in your area'"
    :options="ecoHubOptions"
  />
</template>

<style scoped></style>
