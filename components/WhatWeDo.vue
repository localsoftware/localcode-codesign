<script setup>
import { useLocationStore } from '~/store/location'
import { storeToRefs } from 'pinia'

const locationStore = useLocationStore()
const { currentSkill, currentEmployer } = storeToRefs(locationStore)
console.log(currentSkill.value, '124848')

const skillOptions = computed(() => {
  switch (currentSkill.value) {
    case 'Planning':
      return ['Energy Efficiency', 'Land Improvement']
    case 'A Green Thumb':
      return ['Composting', 'Urban Agriculture', 'Land Improvement']
    case 'Team Work':
      return ['Community Engagement']
    case 'Communication':
      return ['Community Engagement']
  }
})

const employerOptions = computed(() => {
  switch (currentEmployer.value) {
    case 'Energy Efficiency':
      return ['EMPOWER NEW YORK', 'ACCORD POWER', 'WILLDAN', 'FRANKLIN ENERGY']
    case 'Composting':
      return ['COMPOST POWER', 'GROW NYC', 'LES ECOLOGY CENTER']
    case 'Urban Agriculture':
      return ['Brooklyn Botanic Garden', 'GROW NYC']
    case 'Land Improvement':
      return ['LES ECOLOGY CENTER', 'Harrison Green']
    case 'Community Engagement':
      return [
        'BROOKLYN BOTANIC GARDEN',
        'GROW NYC',
        'LES ECOLOGY CENTER',
        'C+C Apartment Management',
      ]
      // default:
      return ['EMPOWER NEW YORK', 'ACCORD POWER', 'WILLDAN', 'FRANKLIN ENERGY']
  }
})
</script>

<template>
  <OptionButton
    :question="'Do you want to know more about...'"
    :options="skillOptions"
    :type="'employer'"
  />

  <SeparatorLine />

  <img class="pl-12 -mt-12" src="/imgs/section-05.png" />

  <SeparatorLine />

  <div class="grid grid-cols-1 place-items-center px-5">
    <div class="rounded-3xl bg-blue-300 px-10 py-8">
      <h1 class="uppercase text-center mb-4">💡 Did you know?</h1>
      <p class="text-sm mb-2">GCF Corps Alumns have connections to:</p>
      <ul class="text-sm list-disc">
        <li v-for="option in employerOptions" :key="option">{{ option }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
