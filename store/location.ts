import { defineStore } from 'pinia'

export const useLocationStore = defineStore('locationStore', () => {
  const currentLocation = ref(0)

  function changeCurrentLocation(location: number) {
    currentLocation.value = location
  }

  const currentBorough = ref('Brooklyn')

  function changeCurrentBorough(borough: string) {
    currentBorough.value = borough
  }

  return { changeCurrentLocation, currentLocation, changeCurrentBorough, currentBorough }
})
