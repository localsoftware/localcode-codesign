import { defineStore } from 'pinia'

export const useLocationStore = defineStore('locationStore', () => {
  const currentLocation = ref(0)

  function changeCurrentLocation(location: number) {
    currentLocation.value = location
  }

  const currentBorough = ref('Brooklyn')

  const currentSkill = ref('Planning')

  const currentEmployer = ref('')

  function changeCurrentBorough(borough: string) {
    currentBorough.value = borough
  }

  function changeCurrentSkill(skill: string) {
    currentSkill.value = skill
  }

  function changeCurrentEmployer(skill: string) {
    currentEmployer.value = skill
  }

  return {
    changeCurrentLocation,
    currentLocation,
    changeCurrentBorough,
    currentBorough,
    changeCurrentSkill,
    currentSkill,
    changeCurrentEmployer,
    currentEmployer,
  }
})
